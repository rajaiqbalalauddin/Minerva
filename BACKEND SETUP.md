# Minerva — Backend Setup

The app is now wired to a real backend: **Firebase Auth + Firestore** for data, and **Qwen (Alibaba DashScope)** for the AI chat. Code works the moment you fill in credentials. Here's the 10-minute setup.

## 1. Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com) → **Add project**.
2. **Build → Authentication → Get started.** Enable two sign-in providers:
   - **Email/Password**
   - **Google** (pick a support email when prompted)
3. **Build → Firestore Database → Create database.** Start in **production mode**, pick a region close to you (e.g. `asia-southeast1` — Singapore, lowest latency from KL).
4. **Project settings (gear icon) → Your apps → Web app (`</>`)**. Register an app; copy the `firebaseConfig` values.

## 2. Fill in `.env.local`

Paste the config into the project root `.env.local` (keys already scaffolded):

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc

VITE_QWEN_API_KEY=sk-...
VITE_QWEN_MODEL=qwen-plus
```

Restart the dev server after any change — Vite only reads env vars at startup.

## 3. Firestore security rules

In **Firestore → Rules**, paste this so each user can only touch their own data, then **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## 4. Qwen / DashScope key

1. Sign in at [Alibaba Cloud Model Studio (DashScope)](https://www.alibabacloud.com/help/en/model-studio/) and create an **API key**.
2. Put it in `VITE_QWEN_API_KEY`. The app calls the **international** endpoint (`dashscope-intl.aliyuncs.com`), correct for use outside mainland China.
3. Default model is `qwen-plus`; change `VITE_QWEN_MODEL` to `qwen-turbo` (cheaper/faster) or `qwen-max` (strongest) if you like.

> Heads-up: `VITE_` env vars are bundled into the browser, so the Qwen key is visible to anyone who inspects the site. Fine for a portfolio/demo build. If this ever goes public with a billed key, move the `chatWithQwen` call behind a serverless function (Vercel/Cloudflare) and keep the key server-side.

## 5. Run

```
npm install
npm run dev
```

Sign up with email/password or Google. A new account auto-seeds starter data (tasks, budget categories, badges, balance) so the dashboard isn't empty.

## What's wired

- **Auth gate** — login/signup screen (`src/components/auth/AuthScreen.jsx`); the app only loads when signed in.
- **Live data** — `src/context/DataContext.jsx` streams the user's Firestore docs into the shape every screen expects, and exposes the mutations.
- **Tasks** — add + toggle complete, persisted per user.
- **Budget** — "Add purchase" form decrements balance and bumps the category; summary cards are computed from live data.
- **Pomodoro** — each completed focus block is saved to `focusSessions` and increments the session count.
- **Profile window** — shows live streak/sessions/badges; Save writes name/email; Log Out ends the session.
- **Upgrade window** — checkout flips the plan to `Premium` (no payment processor wired — that's the next step if you want real billing).
- **AI chat** — real Qwen responses with a typing indicator and in-chat error messages.

## Data model (per user)

```
users/{uid}                    name, email, plan, balance, spendData, streak, sessions, createdAt
users/{uid}/tasks/{id}         title, time, tone, done, createdAt
users/{uid}/budget/{id}        label, tone, spent, cap
users/{uid}/badges/{id}        label, glyph, tone, unlocked, caption
users/{uid}/focusSessions/{id} minutes, at
```

## Not included (deliberately)

- Real payment processing for Upgrade (currently just sets the plan flag).
- Chat history persistence (chat is per-session; say the word and I'll store it under `users/{uid}/chats`).
- A serverless proxy for the Qwen key (see the security note above).
