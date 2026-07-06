const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getAnalytics } = require("../controllers/analyticsController");

// GET /api/analytics
router.get("/", protect, getAnalytics);

module.exports = router;
