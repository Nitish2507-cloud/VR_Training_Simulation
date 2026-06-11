const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 🔥 Firebase Admin
const admin = require("firebase-admin");
const serviceAccount = require("./backendserviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// ==========================
// ✅ MIDDLEWARE
// ==========================
app.use(express.json());

app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ==========================
// 🔥 CONNECT MONGODB
// ==========================
mongoose.connect("mongodb://127.0.0.1:27017/vr-app")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// ==========================
// 👤 USER MODEL
// ==========================
const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  uid: String,
  completedSimulations: { type: [String], default: [] },
  score: { type: Number, default: 0 },
  level: { type: String, default: "beginner" },
  timeSpent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}));

// ==========================
// 🔐 VERIFY TOKEN
// ==========================
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("❌ No token received");
    return res.status(401).json({ message: "No token ❌" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err);
    return res.status(401).json({ message: "Invalid token ❌" });
  }
};

// ==========================
// 🔐 LOGIN ROUTE
// ==========================
app.post("/login", verifyFirebaseToken, async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      user = await User.create({
        email: req.user.email,
        uid: req.user.uid,
      });
    }

    res.json({ user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ==========================
// 🎮 UPDATE PROGRESS
// ==========================
app.post("/update-progress", verifyFirebaseToken, async (req, res) => {
  try {
    const { simulation, score, time } = req.body;

    let user = await User.findOne({ uid: req.user.uid });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    if (!user.completedSimulations.includes(simulation)) {
      user.completedSimulations.push(simulation);
    }

    user.score += Number(score || 0);
    user.timeSpent += Number(time || 0);

    if (user.score > 200) user.level = "advanced";
    else if (user.score > 100) user.level = "intermediate";

    await user.save();

    res.json({ message: "Updated ✅", user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error ❌" });
  }
});

// ==========================
// 🚀 START SERVER
// ==========================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});