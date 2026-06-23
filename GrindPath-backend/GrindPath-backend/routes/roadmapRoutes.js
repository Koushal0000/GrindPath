const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateRoadmap,
  markWeekCompleted,
  getProgress,
  getRoadmapWeeks
} = require("../controllers/roadmapController");


// GENERATE ROADMAP
router.post("/:goalId", protect, generateRoadmap);

router.put("/:id/complete", protect, markWeekCompleted);

router.get("/:goalId/progress", protect, getProgress);

router.get("/:goalId", protect, getRoadmapWeeks);


module.exports = router;