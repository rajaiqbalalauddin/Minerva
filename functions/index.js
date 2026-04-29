const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// The Gemini API key is stored securely via:
//   firebase functions:secrets:set GEMINI_API_KEY
// Or via .env file for local testing (see .env.example)

const SYSTEM_PROMPT = `You are Minerva AI, a friendly and concise productivity assistant built into the Minerva student productivity app. Your role is to:

- Help students manage tasks, study plans, and habits
- Suggest actionable tasks when asked
- Give study tips, time management advice, and motivational nudges
- Keep responses short (2-4 sentences unless the user asks for detail)
- Be encouraging but practical
- Never discuss topics unrelated to productivity, studying, or personal development
- When suggesting tasks, return them as a simple numbered list

You have access to the user's context (tasks, habits, streaks, XP level) which will be provided with each message. Use this to personalise your advice.`;

exports.chatWithAI = onRequest(
  {
    cors: true,
    secrets: ["GEMINI_API_KEY"],
    // Keep cold starts cheap — minimum instances = 0
    minInstances: 0,
    maxInstances: 10,
    region: "asia-southeast1",  // Match Firestore region
  },
  async (req, res) => {
    // Only allow POST
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { messages, userContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not configured");
      res.status(500).json({ error: "AI service not configured" });
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Build the conversation for Gemini
      const systemInstruction = userContext
        ? `${SYSTEM_PROMPT}\n\nCurrent ${userContext}`
        : SYSTEM_PROMPT;

      const chat = model.startChat({
        systemInstruction,
        history: messages.slice(0, -1).map(msg => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      });

      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.content);
      const reply = result.response.text();

      res.status(200).json({ reply });
    } catch (err) {
      console.error("Gemini API error:", err.message);

      if (err.message?.includes("quota") || err.message?.includes("429")) {
        res.status(429).json({ error: "AI rate limit reached. Please try again in a moment." });
      } else {
        res.status(500).json({ error: "Failed to get AI response. Please try again." });
      }
    }
  }
);
