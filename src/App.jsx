import { useState } from "react";
import { Logo } from "./components/ds/Logo.jsx";
import { NavItem } from "./components/ds/NavItem.jsx";
import { PromoCard } from "./components/ds/PromoCard.jsx";
import { Button } from "./components/ds/Button.jsx";
import DashboardScreen from "./pages/DashboardScreen.jsx";
import PomodoroScreen from "./pages/PomodoroScreen.jsx";
import TasksScreen from "./pages/TasksScreen.jsx";
import BudgetScreen from "./pages/BudgetScreen.jsx";
import BadgesScreen from "./pages/BadgesScreen.jsx";
import AIChatScreen from "./pages/AIChatScreen.jsx";
import ProfileWindow from "./components/windows/ProfileWindow.jsx";
import UpgradeWindow from "./components/windows/UpgradeWindow.jsx";
import AuthScreen from "./components/auth/AuthScreen.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { DataProvider, useData } from "./context/DataContext.jsx";
import { NavProvider } from "./context/NavContext.jsx";
import { isFirebaseConfigured } from "./firebase.js";
import { startCheckout } from "./services/stripe.js";
import logo from "./assets/minerva-logo.png";
import "./styles/global.css";

// Tiny full-screen status message reused for the loading + connecting states.
function Splash({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--mv-navy)",
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontSize: 28,
      }}
    >
      {children}
    </div>
  );
}

// Shown when .env.local still has placeholder Firebase values, so the user gets
// actionable guidance instead of a blank screen or an endless spinner.
function ConfigNeeded() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "var(--mv-navy)",
      }}
    >
      <div
        style={{
          width: 480,
          maxWidth: "100%",
          background: "var(--mv-white)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lift)",
          padding: "32px 30px",
        }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--mv-navy)", marginTop: 0 }}>
          Almost there
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--mv-navy)", lineHeight: 1.6 }}>
          Minerva can't reach Firebase yet because <code>.env.local</code> still has
          empty values. Add your Firebase web config and Qwen key, then restart the
          dev server:
        </p>
        <pre
          style={{
            background: "#f1f4f6",
            borderRadius: "var(--radius-sm)",
            padding: "14px 16px",
            fontSize: 13,
            overflowX: "auto",
            color: "var(--mv-navy)",
          }}
        >{`VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_QWEN_API_KEY=...`}</pre>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--mv-grey)", lineHeight: 1.6 }}>
          Full walkthrough is in <strong>BACKEND SETUP.md</strong>. Then run{" "}
          <code>npm run dev</code> again.
        </p>
      </div>
    </div>
  );
}

// Top-level gate: wait for auth, show login if logged out, else load the app.
export default function App() {
  // Constant for the app's lifetime, so this early return keeps hook order stable.
  if (!isFirebaseConfigured) return <ConfigNeeded />;

  return <AuthedApp />;
}

function AuthedApp() {
  const { user, loading } = useAuth();

  if (loading) return <Splash>Loading Minerva…</Splash>;
  if (!user) return <AuthScreen />;

  return (
    <DataProvider>
      <Shell />
    </DataProvider>
  );
}

// The authenticated app: sidebar + active screen + the two modal windows.
function Shell() {
  const { ready, error, data, stats, addTask, toggleTask, addPurchase, addFocusSession, updateUserProfile } =
    useData();
  const { logout } = useAuth();

  const [page, setPage] = useState("Dashboard");
  const [profileOpen, setProfileOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const go = (p) => {
    setPage(p);
    document.querySelector(".mv-content")?.scrollTo(0, 0);
  };

  if (!ready) return <Splash>Loading your data…</Splash>;

  // A read failed — show why (and a way out) instead of a dead dashboard.
  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background: "var(--mv-navy)",
        }}
      >
        <div
          style={{
            width: 480,
            maxWidth: "100%",
            background: "var(--mv-white)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lift)",
            padding: "32px 30px",
          }}
        >
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--mv-navy)", marginTop: 0 }}>
            Couldn't load your data
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--mv-navy)", lineHeight: 1.6 }}>
            {error}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Button variant="ghost" onClick={() => logout()}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const screens = {
    Dashboard: (
      <DashboardScreen
        data={data}
        onStartPomodoro={() => go("Pomodoro")}
        onAddTask={() => go("Tasks")}
        onGoBudget={() => go("Budget")}
        onProfile={() => setProfileOpen(true)}
      />
    ),
    Pomodoro: <PomodoroScreen data={data} onFocusComplete={() => addFocusSession(25)} />,
    Tasks: <TasksScreen data={data} onAdd={addTask} onToggle={toggleTask} />,
    Budget: <BudgetScreen data={data} onAddPurchase={addPurchase} />,
    Badges: <BadgesScreen data={data} />,
    "AI Chat": <AIChatScreen data={data} />,
  };

  return (
    <NavProvider value={{ openProfile: () => setProfileOpen(true), goTasks: () => go("Tasks") }}>
    <div style={{ display: "flex", height: "100vh", background: "var(--mv-white)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "var(--sidebar-w)",
          minHeight: "100%",
          background: "var(--mv-navy)",
          boxShadow: "var(--shadow-inset)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 24px 18px",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <Logo src={logo} height={80} style={{ alignSelf: "stretch", justifyContent: "flex-start" }} />

        <nav style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 56 }}>
          {data.nav.map((label) => (
            <NavItem key={label} active={label === page} onClick={() => go(label)}>
              {label}
            </NavItem>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <PromoCard onUpgrade={() => setUpgradeOpen(true)} />
        </div>
      </aside>

      {/* Content area */}
      <main
        className="mv-content"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "32px 40px 48px",
          overflowY: "auto",
        }}
      >
        {screens[page]}
      </main>

      {/* Account modal — saves to Firestore, hands off to upgrade, logs out. */}
      <ProfileWindow
        open={profileOpen}
        plan={data.user.plan}
        name={data.user.name}
        email={data.user.email}
        stats={stats}
        onClose={() => setProfileOpen(false)}
        onSave={async (fields) => {
          await updateUserProfile(fields);
          setProfileOpen(false);
        }}
        onLogout={async () => {
          setProfileOpen(false);
          await logout();
        }}
        onUpgrade={() => {
          setProfileOpen(false);
          setUpgradeOpen(true);
        }}
      />

      {/* Premium paywall — checkout redirects to Stripe; the webhook sets the
          plan to Premium on real payment, and the live profile listener updates. */}
      <UpgradeWindow
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onCheckout={async (billing) => {
          try {
            await startCheckout(billing);
          } catch (e) {
            alert(e.message);
          }
        }}
        onMaybeLater={() => setUpgradeOpen(false)}
      />
    </div>
    </NavProvider>
  );
}
