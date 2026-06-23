const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  dailyHours: {
    type: Number,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },

  deadline: {
    type: Date
  },

  notes: {
    type: String,
    default: ""
  },

  subtasks: [{
    id: String,
    text: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, {
  timestamps: true
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;