const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  uid: String,

  // 🎮 VR DATA
  completedSimulations: {
    type: [String],
    default: [],
  },

  score: {
    type: Number,
    default: 0,
  },

  level: {
    type: String,
    default: "beginner",
  },

  timeSpent: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);