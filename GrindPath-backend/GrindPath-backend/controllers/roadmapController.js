const Goal         = require("../models/Goal");
const Roadmap      = require("../models/Roadmap");
const RoadmapMeta  = require("../models/RoadmapMeta");
const Activity     = require("../models/Activity");
const roadmapGenerator = require("../utils/roadmapGenerator");

// Silent activity logger — never throws
const logActivity = async ({ title, desc, type, xpEarned = 0, userId }) => {
  try {
    await Activity.create({ title, desc, type, xpEarned, user: userId });
  } catch (e) {
    console.error("[Activity Log Error]", e.message);
  }
};


// ─── GENERATE ROADMAP ─────────────────────────────────────────────────────────
// POST /api/roadmaps/:goalId
// Body: { domain, skillLevel, hoursPerDay }
// Falls back to goal.level / goal.dailyHours for backward compatibility.

const generateRoadmap = async (req, res) => {

  try {

    const goal = await Goal.findById(req.params.goalId);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Ownership check
    if (goal.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Resolve generation params — body takes priority, goal fields are fallback
    const domain      = req.body.domain     || "mern";
    const skillLevel  = req.body.skillLevel || goal.level      || "Beginner";
    const hoursPerDay = req.body.hoursPerDay || goal.dailyHours || 2;

    console.log(`[Roadmap Controller] Received generation request for Goal ID: ${req.params.goalId}`);
    console.log(`[Roadmap Controller] request.body:`, req.body);
    console.log(`[Roadmap Controller] Resolved domain: "${domain}" (from body: "${req.body.domain}")`);
    console.log(`[Roadmap Controller] Resolved skillLevel: "${skillLevel}" (from body: "${req.body.skillLevel}", goal: "${goal.level}")`);
    console.log(`[Roadmap Controller] Resolved hoursPerDay: ${hoursPerDay} (from body: ${req.body.hoursPerDay}, goal: ${goal.dailyHours})`);

    // ── Delegate all business logic to the generator engine ─────────────────
    // To swap in AI generation later: replace roadmapGenerator internals only.
    const { weeks, meta } = await roadmapGenerator.generate({
      domain,
      skillLevel,
      hoursPerDay: Number(hoursPerDay)
    });

    // ── Persist roadmap weeks (replace old ones) ─────────────────────────────
    await Roadmap.deleteMany({ goal: goal._id });

    const documents = weeks.map(w => ({ ...w, goal: goal._id }));
    const createdWeeks = await Roadmap.insertMany(documents);

    // ── Persist roadmap metadata (upsert — one doc per goal) ────────────────
    const savedMeta = await RoadmapMeta.findOneAndUpdate(
      { goal: goal._id },
      { ...meta, goal: goal._id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Auto-log roadmap generation activity
    await logActivity({
      title: "Roadmap Generated 🗺️",
      desc: `Generated a ${meta.skillLevel} ${meta.domain.toUpperCase()} roadmap (${meta.estimatedDuration})`,
      type: "goal_created",
      xpEarned: 20,
      userId: req.user
    });

    res.status(201).json({ weeks: createdWeeks, meta: savedMeta });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: error.message || "Server Error" });

  }

};


// ─── GET ROADMAP META ─────────────────────────────────────────────────────────
// GET /api/roadmaps/:goalId/meta
// Returns the persisted domain/skillLevel/hoursPerDay/estimatedDuration for a goal.

const getRoadmapMeta = async (req, res) => {

  try {

    const meta = await RoadmapMeta.findOne({ goal: req.params.goalId });

    if (!meta) {
      return res.status(404).json({ message: "No roadmap configuration found for this goal" });
    }

    res.status(200).json(meta);

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server Error" });

  }

};


// ─── MARK WEEK COMPLETED ──────────────────────────────────────────────────────
// PUT /api/roadmaps/:id/complete
// Unchanged from v1.

const markWeekCompleted = async (req, res) => {

  try {

    const roadmap = await Roadmap.findById(req.params.id).populate("goal");

    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap week not found" });
    }

    // Ownership check
    if (roadmap.goal.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    roadmap.completed = true;

    await roadmap.save();

    // Auto-log roadmap milestone completion
    await logActivity({
      title: "Roadmap Milestone Completed ⚡",
      desc: `Completed ${roadmap.title}`,
      type: "roadmap_milestone_completed",
      xpEarned: 20,
      userId: req.user
    });

    res.status(200).json({ message: "Week marked as completed", roadmap });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server Error" });

  }

};


// ─── GET PROGRESS ─────────────────────────────────────────────────────────────
// GET /api/roadmaps/:goalId/progress
// Unchanged from v1.

const getProgress = async (req, res) => {

  try {

    const roadmapWeeks = await Roadmap.find({ goal: req.params.goalId });

    const totalWeeks     = roadmapWeeks.length;
    const completedWeeks = roadmapWeeks.filter(w => w.completed).length;
    const progress       = totalWeeks
      ? ((completedWeeks / totalWeeks) * 100).toFixed(0)
      : 0;

    res.status(200).json({
      totalWeeks,
      completedWeeks,
      progress: `${progress}%`
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server Error" });

  }

};


// ─── GET ROADMAP WEEKS ────────────────────────────────────────────────────────
// GET /api/roadmaps/:goalId
// Unchanged from v1.

const getRoadmapWeeks = async (req, res) => {

  try {

    const roadmapWeeks = await Roadmap.find({ goal: req.params.goalId })
      .sort({ week: 1 });

    res.status(200).json(roadmapWeeks);

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server Error" });

  }

};


module.exports = {
  generateRoadmap,
  getRoadmapMeta,
  markWeekCompleted,
  getProgress,
  getRoadmapWeeks
};