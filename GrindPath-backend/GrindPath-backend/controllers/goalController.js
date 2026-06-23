const Goal = require("../models/Goal");


// CREATE GOAL
const createGoal = async (req, res) => {

  try {

    const {
      title,
      category,
      level,
      duration,
      dailyHours,
      priority,
      deadline,
      notes,
      subtasks
    } = req.body;

    const goal = await Goal.create({
      title,
      category,
      level,
      duration,
      dailyHours,
      priority,
      deadline,
      notes,
      subtasks,
      user: req.user
    });

    res.status(201).json(goal);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET USER GOALS
const getGoals = async (req, res) => {

  try {

    const goals = await Goal.find({
      user: req.user
    });

    res.status(200).json(goals);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};

const updateGoal = async (req, res) => {

  try {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {

      return res.status(404).json({
        message: "Goal not found"
      });

    }

    // CHECK OWNERSHIP
    if (goal.user.toString() !== req.user) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

    const updatedGoal = await Goal.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    );

    res.status(200).json(updatedGoal);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};
const deleteGoal = async (req, res) => {

  try {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {

      return res.status(404).json({
        message: "Goal not found"
      });

    }

    // CHECK OWNERSHIP
    if (goal.user.toString() !== req.user) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

    await goal.deleteOne();

    res.status(200).json({
      message: "Goal deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
};