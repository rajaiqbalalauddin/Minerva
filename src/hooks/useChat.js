// src/hooks/useChat.js
// Why: keeps AI chat history in Firestore (per user) so conversations survive
// reloads and logins. The component stays simple: read `messages`, call
// `addMessage` — the live listener handles updates.
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";
import { useAuth } from "../context/AuthContext.jsx";

export function useChat() {
  const { user } = useAuth();
  const uid = user?.uid;
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, "users", uid, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(
      q,
      (s) => {
        setMessages(s.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoaded(true);
      },
      () => setLoaded(true) // on error, stop showing the loading state
    );
    return unsub;
  }, [uid]);

  // role: "user" | "ai"
  const addMessage = (role, text) =>
    addDoc(collection(db, "users", uid, "messages"), { role, text, createdAt: serverTimestamp() });

  return { messages, loaded, addMessage };
}
