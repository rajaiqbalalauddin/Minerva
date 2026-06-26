// src/context/DataContext.jsx
// Why: turns the logged-in user's Firestore documents into the exact `data`
// shape the screens already expect (user, tasks, balance, budget, badges...),
// plus the mutation functions. Screens stay dumb; all persistence lives here.
//
// Firestore layout (per user):
//   users/{uid}                      -> profile: name, email, plan, balance, spendData, streak, sessions
//   users/{uid}/tasks/{id}           -> { title, time, tone, done, createdAt }
//   users/{uid}/budget/{id}          -> { label, tone, spent, cap }
//   users/{uid}/badges/{id}          -> { label, glyph, tone, unlocked, caption }
//   users/{uid}/focusSessions/{id}   -> { minutes, at }
import { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { useAuth } from "./AuthContext.jsx";

const DataContext = createContext(null);

const NAV = ["Dashboard", "Pomodoro", "Tasks", "Budget", "Badges", "AI Chat"];

// Cycled through when auto-assigning a color to a new budget category.
const TONES = ["orange", "blue", "teal", "red"];

// Defaults written once when a brand-new user signs in, so the app isn't empty.
const DEFAULT_BUDGET = [
  { label: "Food", tone: "orange", spent: 320, cap: 500 },
  { label: "Transport", tone: "blue", spent: 140, cap: 200 },
  { label: "Books", tone: "teal", spent: 90, cap: 150 },
  { label: "Fun", tone: "red", spent: 210, cap: 220 },
];
const DEFAULT_BADGES = [
  { label: "First Focus", glyph: "⚡", tone: "orange", unlocked: true, caption: "1 session" },
  { label: "Focus x10", glyph: "🔥", tone: "orange", unlocked: true, caption: "10 sessions" },
  { label: "Big Saver", glyph: "💰", tone: "teal", unlocked: true, caption: "Under budget" },
  { label: "Task Master", glyph: "✅", tone: "blue", unlocked: true, caption: "50 tasks done" },
  { label: "Night Owl", glyph: "🦉", tone: "navy", unlocked: false, caption: "Study after 11pm" },
  { label: "Streak x30", glyph: "🏆", tone: "red", unlocked: false, caption: "30-day streak" },
];
const DEFAULT_TASKS = [
  { title: "Walk the cat", time: "9.00 a.m , Today", tone: "red", done: false },
  { title: "Assignment", time: "7.00 a.m , Today", tone: "red", done: false },
  { title: "Gym", time: "12.00 p.m , Tomorrow", tone: "orange", done: false },
  { title: "Watch Anime", time: "9.00 a.m , 27 June", tone: "teal", done: false },
];

// "Wednesday 25 June 2026" — matches the rest of the app's date style.
function todayLabel() {
  const d = new Date();
  const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
  return `${weekday} ${d.getDate()} ${d.toLocaleDateString("en-GB", { month: "long" })} ${d.getFullYear()}`;
}

const formatRM = (n) =>
  "RM " + Number(n || 0).toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Bucket purchases into total spend per day for the last `days` days (oldest
// -> newest), so the sparkline shows a real spending trend.
function buildDailySpend(purchases, days = 10) {
  const series = new Array(days).fill(0);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));
  for (const p of purchases) {
    // `at` is a Firestore Timestamp once written; may be null for a beat after add.
    const when = p.at?.toDate ? p.at.toDate() : p.at ? new Date(p.at) : null;
    if (!when) continue;
    const idx = Math.floor((when - start) / 86400000);
    if (idx >= 0 && idx < days) series[idx] += Number(p.amount) || 0;
  }
  return series;
}

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [budget, setBudget] = useState([]);
  const [badges, setBadges] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null); // surfaced instead of hanging

  const uid = user?.uid;
  const userRef = uid ? doc(db, "users", uid) : null;
  const col = (name) => collection(db, "users", uid, name);

  // Seed defaults for a first-time user, then subscribe to live updates.
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      try {
        const snap = await getDoc(userRef);
        if (!snap.exists() && !cancelled) {
          await seedNewUser(uid, user);
        }
      } catch (e) {
        // Seeding/read failed (usually rules or no database) — surface it.
        if (!cancelled) {
          setError(describeFirestoreError(e));
          setReady(true);
        }
      }
    })();

    // Any listener error (permission-denied, missing DB, etc.) must unstick the
    // loading state and explain itself instead of spinning forever.
    const onErr = (e) => {
      setError(describeFirestoreError(e));
      setReady(true);
    };

    // Live profile.
    const unsubProfile = onSnapshot(
      userRef,
      (s) => {
        setProfile(s.data() || null);
        setReady(true);
      },
      onErr
    );
    // Live tasks, newest first.
    const unsubTasks = onSnapshot(
      query(col("tasks"), orderBy("createdAt", "desc")),
      (s) => setTasks(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
      onErr
    );
    const unsubBudget = onSnapshot(col("budget"), (s) => setBudget(s.docs.map((d) => ({ id: d.id, ...d.data() }))), onErr);
    const unsubBadges = onSnapshot(col("badges"), (s) => setBadges(s.docs.map((d) => ({ id: d.id, ...d.data() }))), onErr);
    const unsubFocus = onSnapshot(col("focusSessions"), (s) => setSessionCount(s.size), onErr);
    // Purchase history powers the real spending graph on the dashboard.
    const unsubPurch = onSnapshot(col("purchases"), (s) =>
      setPurchases(s.docs.map((d) => ({ id: d.id, ...d.data() }))), onErr);

    return () => {
      cancelled = true;
      unsubProfile();
      unsubTasks();
      unsubBudget();
      unsubBadges();
      unsubFocus();
      unsubPurch();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // ---- Mutations -----------------------------------------------------------
  const addTask = (title) =>
    addDoc(col("tasks"), { title, time: "Today", tone: "orange", done: false, createdAt: serverTimestamp() });

  const toggleTask = (id, done) => updateDoc(doc(db, "users", uid, "tasks", id), { done });

  const deleteTask = (id) => deleteDoc(doc(db, "users", uid, "tasks", id));

  // Add a purchase: record it (for the spending graph), then either bump an
  // existing category or CREATE a new one (when the user typed a new type), and
  // drop the balance. `newCap` is the monthly budget for a freshly-made category.
  const addPurchase = async (label, amount, newCap) => {
    const amt = Number(amount);
    const name = (label || "").trim();
    if (!amt || amt <= 0 || !name) return;
    await addDoc(col("purchases"), { amount: amt, category: name, at: serverTimestamp() });
    const cat = budget.find((b) => b.label.toLowerCase() === name.toLowerCase());
    if (cat) {
      await updateDoc(doc(db, "users", uid, "budget", cat.id), { spent: increment(amt) });
    } else {
      await addDoc(col("budget"), {
        label: name,
        tone: TONES[budget.length % TONES.length],
        spent: amt,
        cap: Number(newCap) > 0 ? Number(newCap) : 500,
      });
    }
    await updateDoc(userRef, { balance: increment(-amt) });
  };

  // Persist a finished focus block and nudge the running total on the profile.
  const addFocusSession = async (minutes = 25) => {
    await addDoc(col("focusSessions"), { minutes, at: serverTimestamp() });
    await updateDoc(userRef, { sessions: increment(1) });
  };

  const updateUserProfile = (fields) => updateDoc(userRef, fields);

  const setPlan = (plan) => updateDoc(userRef, { plan });

  // ---- Derived `data` in the legacy shape screens consume -----------------
  const data = {
    user: {
      name: profile?.name || user?.displayName || user?.email?.split("@")[0] || "Student",
      email: profile?.email || user?.email || "",
      plan: profile?.plan || "Free",
    },
    today: todayLabel(),
    nav: NAV,
    tasks,
    balance: formatRM(profile?.balance),
    // Real per-day spending over the last 10 days. Until the user logs any
    // purchases we fall back to the seeded sample so the graph isn't a flat line.
    spendData: purchases.length
      ? buildDailySpend(purchases, 10)
      : profile?.spendData || [22, 30, 18, 42, 36, 58, 48, 70, 62, 88],
    budget,
    badges,
  };

  const stats = {
    streak: profile?.streak ?? 0,
    sessions: profile?.sessions ?? sessionCount,
    badges: badges.filter((b) => b.unlocked).length,
  };

  const value = {
    ready,
    error,
    data,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    addPurchase,
    addFocusSession,
    updateUserProfile,
    setPlan,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}

// Turn a Firestore error into a one-line, actionable explanation.
function describeFirestoreError(e) {
  const code = e?.code || "";
  if (code === "permission-denied")
    return "Firestore denied the read. Publish the security rules from BACKEND SETUP.md (Firestore → Rules → Publish).";
  if (code === "unavailable" || code === "failed-precondition")
    return "Couldn't reach Firestore. Make sure you created the database (Firestore → Create database) in the Firebase console.";
  if (code === "unauthenticated") return "Session expired. Try logging out and back in.";
  return `Firestore error: ${e?.message || code || "unknown"}.`;
}

// One-time write of starter content for a new account, in a single batch.
async function seedNewUser(uid, user) {
  const batch = writeBatch(db);
  batch.set(doc(db, "users", uid), {
    name: user?.displayName || user?.email?.split("@")[0] || "Student",
    email: user?.email || "",
    plan: "Free",
    balance: 6767.67,
    spendData: [22, 30, 18, 42, 36, 58, 48, 70, 62, 88],
    streak: 3,
    sessions: 0,
    createdAt: serverTimestamp(),
  });
  DEFAULT_BUDGET.forEach((b) => batch.set(doc(collection(db, "users", uid, "budget")), b));
  DEFAULT_BADGES.forEach((b) => batch.set(doc(collection(db, "users", uid, "badges")), b));
  DEFAULT_TASKS.forEach((t, i) =>
    // Stagger createdAt so the default ordering is stable.
    batch.set(doc(collection(db, "users", uid, "tasks")), { ...t, createdAt: new Date(Date.now() - i * 1000) })
  );
  await batch.commit();
}
