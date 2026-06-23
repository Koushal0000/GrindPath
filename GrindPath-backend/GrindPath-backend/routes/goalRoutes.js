const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
} = require("../controllers/goalController");


// CREATE GOAL
router.post("/", protect, createGoal);


// GET USER GOALS
router.get("/", protect, getGoals);

router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);
module.exports = router;