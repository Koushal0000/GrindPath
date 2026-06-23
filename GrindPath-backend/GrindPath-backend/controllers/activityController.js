const Activity = require("../models/Activity");

// GET USER ACTIVITIES
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE ACTIVITY
const createActivity = async (req, res) => {
  try {
    const { title, desc, type, xpEarned } = req.body;

    const activity = await Activity.create({
      title,
      desc,
      type,
      xpEarned,
      user: req.user
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getActivities,
  createActivity
};
