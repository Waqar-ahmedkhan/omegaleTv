# 🌐 ChatVerse – Random Video Chat App (OmegleTV Alternative)

Welcome to **ChatVerse** — a stylish and modern random video chat platform inspired by OmegleTV. Built for spontaneous video connections, anonymous conversations, and real-time interactions, **ChatVerse** offers a secure and responsive WebRTC-powered experience with advanced features like direct calling, user matching, reporting, and monetization options.

---

## 🚀 Features

* 🔄 Random 1-on-1 Video Matching
* 📞 Direct Calling Between Friends (with consent)
* 🧠 Smart Matching Logic (age, region, interest)
* 📩 Real-time Chat Messaging (during call)
* 💫 Stars/Credits System for Call Control
* 🧾 Call History Tracking & Analytics
* 🛑 Report/Block Feature for Abuse Handling
* 🔒 Secure WebRTC with TURN/STUN Servers
* 🌐 Multi-language Support
* 📱 Fully Responsive UI (Mobile/Desktop)
* 🧠 AI-powered Moderation (Optional)

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React Native (or React.js for Web)
* Expo / Tailwind CSS / Styled Components
* Socket.IO (Client-side Signaling)

### 🔹 Backend

* Node.js + Express.js
* MongoDB (Mongoose ORM)
* Socket.IO (Signaling Server)
* WebRTC Signaling (SDP + ICE)
* Redis (Online Users, Call Queue, etc.)

### 🔹 Optional Services

* Firebase Auth (Google/Facebook/Phone)
* WebSockets (Scalable infra)
* TURN/STUN Server (for NAT Traversal)
* Stripe/AdMob (for monetization)
* REST API (for profiles, history, etc.)

---

## 🔐 Authentication

* Firebase or JWT Authentication
* User roles: Guest, Verified, Premium
* Session tracking using Redis or MongoStore

---

## 📦 Installation

```bash
# Clone the repository
https://github.com/Waqar-ahmedkhan/chatverse.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Create .env files
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
TURN_SERVER_URL=your_turn_server

# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm start
```

---

## 📹 WebRTC Flow (Simplified)

1. User A joins a room via signaling
2. Server finds a match via queue
3. SDP offer is created and exchanged
4. ICE candidates shared in real-time
5. WebRTC P2P connection established
6. Media stream shared via browser

---

## 💳 Monetization Ideas

* ⭐ Credit/Stars System to control match duration
* 🎟️ Premium access for verified/pro users
* 🎯 Ad-based or reward-based watching for credits
* 🧾 Call logs/history analytics for insights

---

## 💬 Direct Calling System

* Users can add and search usernames
* Option to accept/reject incoming calls
* Call history and contact list support

---

## 🧠 Smart Matching (Upcoming)

* ML-based user preference learning
* Interest-based pairing using NLP
* Toxicity filtering (via OpenAI or Perspective API)

---

## 📊 Analytics Dashboard (Admin)

* Total users, call time, report count
* Abuse detection via flagged reports
* Active sessions tracking (via Redis)

---

## 📚 Future Roadmap

* AI Chatbot fallback during no-match
* Daily Challenges, Leaderboards, Gamification
* AR Filters / Voice Modulation (like Snapchat)
* AI-powered Quiz Matching
* Localization for global user base

---

## 👤 Author

**Waqar Ahmed Khan**
🌐 GitHub: [Waqar-ahmedkhan](https://github.com/Waqar-ahmedkhan)
📧 Email: [waqarahmed44870@gmail.com](mailto:waqarahmed44870@gmail.com)
🔧 Full Stack DevOps Engineer | AI/ML Enthusiast

---

## 📄 License

MIT License — feel free to fork and contribute!

---

> 🎥 ChatVerse is more than a clone — it's the future of smart, secure, and social random video interaction.

---
