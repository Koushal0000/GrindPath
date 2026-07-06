const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateRoadmap,
  getRoadmapMeta,
  markWeekCompleted,
  getProgress,
  getRoadmapWeeks
} = require("../controllers/roadmapController");


// GENERATE ROADMAP
router.post("/:goalId", protect, generateRoadmap);

router.put("/:id/complete", protect, markWeekCompleted);

router.get("/:goalId/progress", protect, getProgress);

// GET ROADMAP META — must be before /:goalId to avoid route collision
router.get("/:goalId/meta", protect, getRoadmapMeta);

router.get("/:goalId", protect, getRoadmapWeeks);


module.exports = router;