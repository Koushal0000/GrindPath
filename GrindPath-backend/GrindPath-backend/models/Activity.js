const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["goal_created", "goal_completed", "habit_completed", "pomodoro_completed", "roadmap_milestone_completed", "level_up"],
    required: true
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
