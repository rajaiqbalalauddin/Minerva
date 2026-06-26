// src/services/qwen.js
// Why: isolates the AI provider so the chat UI doesn't care which model it talks
// to. Swapping Qwen for another OpenAI-compatible API is a one-file change.
//
// Uses Alibaba DashScope's OpenAI-compatible endpoint. We hit the *international*
// host because the app's users are outside mainland China (KL/MYT).
//
// SECURITY: the key is read from a VITE_ env var, so it ships in the browser
// bundle. Acceptable for a demo/portfolio build. For production, move this call
// behind a serverless function and keep the key server-side.

const ENDPOINT =
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

// .trim() guards against stray spaces in .env.local (e.g. "VITE_QWEN_MODEL= x").
const MODEL = (import.meta.env.VITE_QWEN_MODEL || "qwen-plus").trim() || "qwen-plus";

// Shared POST helper so both chat + insight go through one place.
async function callQwen(body) {
  const key = (import.meta.env.VITE_QWEN_API_KEY || "").trim();
  if (!key) {
    throw new Error(
      "Missing VITE_QWEN_API_KEY. Add your DashScope key to .env.local and restart the dev server."
    );
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Qwen request failed (${res.status}). ${detail}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || "";
}

// Persona so the assistant stays on-brand as Minerva's study coach.
const SYSTEM_PROMPT =
  "You are Minerva AI, a friendly study and productivity coach inside a student " +
  "app. Help users plan study sessions, break down assignments, manage time with " +
  "the Pomodoro technique, and stay motivated. Keep answers concise and practical.";

/**
 * Send a conversation to Qwen and return the assistant's reply text.
 * @param {{role: "user"|"ai", text: string}[]} history - UI message list
 * @returns {Promise<string>} assistant reply
 */
export async function chatWithQwen(history) {
  // Map our UI message shape -> OpenAI chat format. "ai" becomes "assistant".
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.text,
    })),
  ];
  return (await callQwen({ model: MODEL, messages })) || "(no response)";
}

/**
 * Fetch a short money/business insight. Uses DashScope's web search so the tip
 * can reflect recent news rather than only the model's training data.
 * @returns {Promise<string>} 1-2 sentence insight
 */
export async function getBusinessInsight() {
  const messages = [
    {
      role: "system",
      content:
        "You are a finance news assistant. Give ONE concise, current money or " +
        "business insight a student would find useful (markets, saving, the " +
        "economy, or personal finance). 1-2 sentences, plain language, no preamble.",
    },
    { role: "user", content: "Give me today's money/business insight." },
  ];
  // enable_search asks DashScope to ground the answer with a web lookup.
  return (await callQwen({ model: MODEL, messages, enable_search: true })) ||
    "No insight available right now.";
}
