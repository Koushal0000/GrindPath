const Goal = require("../models/Goal");
const Activity = require("../models/Activity");

// ─── Helper: silently log an activity (never throws) ─────────────────────────
const logActivity = async ({ title, desc, type, xpEarned = 0, userId }) => {
  try {
    await Activity.create({ title, desc, type, xpEarned, user: userId });
  } catch (e) {
    console.error("[Activity Log Error]", e.message);
  }
};

// ─── CREATE GOAL ──────────────────────────────────────────────────────────────
const createGoal = async (req, res) => {
  try {
    const { title, category, level, duration, dailyHours, priority, deadline, notes, subtasks } = req.body;

    const goal = await Goal.create({
      title, category, level, duration, dailyHours,
      priority, deadline, notes, subtasks,
      user: req.user
    });

    // Auto-log activity
    await logActivity({
      title: "New Goal Created",
      desc: `Started working towards "${title}"`,
      type: "goal_created",
      xpEarned: 10,
      userId: req.user
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ─── GET USER GOALS ───────────────────────────────────────────────────────────
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ─── UPDATE GOAL ──────────────────────────────────────────────────────────────
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (goal.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Auto-log when a goal is marked as completed
    if (!goal.completed && req.body.completed === true) {
      await logActivity({
        title: "Goal Completed! 🎯",
        desc: `Completed the goal "${goal.title}"`,
        type: "goal_completed",
        xpEarned: 100,
        userId: req.user
      });
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ─── DELETE GOAL ──────────────────────────────────────────────────────────────
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    if (goal.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await goal.deleteOne();
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createGoal, getGoals, updateGoal, deleteGoal };