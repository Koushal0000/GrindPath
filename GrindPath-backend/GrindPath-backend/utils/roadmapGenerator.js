// Roadmap Generator Engine
//
// AI-READY: This module is the single integration point for roadmap generation.
// To switch from template-based generation to AI (OpenAI, Gemini, etc.), replace
// the internals of `generate()` — the controller and routes never change.
//
// Interface contract:
//   generate({ domain, skillLevel, hoursPerDay }) → Promise<{ weeks[], meta{} }>
//
// weeks[]:
//   { week, title, learningObjectives[], topics[], estimatedStudyHours }
//
// meta{}:
//   { domain, skillLevel, hoursPerDay, estimatedDuration, estimatedWeeks,
//     learningPace, totalTopics, totalHours, generatedAt }

const TEMPLATES = require("./roadmapTemplates/index");

// ─── Constants ────────────────────────────────────────────────────────────────

// How many study hours a learner needs per topic, by skill level.
// Beginners need more time to absorb each concept.
const HOURS_PER_TOPIC = {
  Beginner:     3,
  Intermediate: 2,
  Advanced:     1.5
};

// Realistic study days per week (weekdays only).
const STUDY_DAYS_PER_WEEK = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Derive a qualitative learning pace label from daily hours.
 * @param {number} hoursPerDay
 * @returns {"Slow"|"Moderate"|"Fast"}
 */
function getLearningPace(hoursPerDay) {
  const h = Number(hoursPerDay);
  if (h <= 2) return "Slow";
  if (h <= 4) return "Moderate";
  return "Fast";
}

/**
 * Calculate realistic estimated duration from content and study pace.
 * Formula:
 *   totalTopics      = Σ topics across all template weeks
 *   totalHours       = totalTopics × hoursPerTopic(skillLevel)
 *   hoursPerWeek     = hoursPerDay × STUDY_DAYS_PER_WEEK
 *   estimatedWeeks   = ceil(totalHours / hoursPerWeek)
 *
 * @param {Array}  weeks      - Array of week objects with a `topics` array
 * @param {string} skillLevel - "Beginner" | "Intermediate" | "Advanced"
 * @param {number} hoursPerDay
 * @returns {{ estimatedWeeks: number, totalTopics: number, totalHours: number }}
 */
function calculateDuration(weeks, skillLevel, hoursPerDay) {
  const hpt         = HOURS_PER_TOPIC[skillLevel] || HOURS_PER_TOPIC.Intermediate;
  const totalTopics = weeks.reduce((sum, w) => sum + w.topics.length, 0);
  const totalHours  = totalTopics * hpt;
  const hoursPerWeek = Number(hoursPerDay) * STUDY_DAYS_PER_WEEK;
  const estimatedWeeks = Math.ceil(totalHours / hoursPerWeek);

  return {
    estimatedWeeks,
    totalTopics,
    totalHours: Math.ceil(totalHours)
  };
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * Generate a structured roadmap for a given domain, skill level, and pace.
 *
 * Future AI integration point: replace the template lookup below with an
 * async AI API call that returns the same `blueprint` shape.
 *
 * @param {{ domain: string, skillLevel: string, hoursPerDay: number }} params
 * @returns {Promise<{ weeks: Array, meta: Object }>}
 */
async function generate({ domain, skillLevel, hoursPerDay }) {

  console.log(`[Roadmap Generator] 1. Received domain value: "${domain}"`);
  console.log(`[Roadmap Generator] 2. Searching template key: "${domain}"`);

  // ── 1. Validate inputs ──────────────────────────────────────────────────
  const domainTemplates = TEMPLATES[domain];
  if (!domainTemplates) {
    console.log(`[Roadmap Generator] 3. Match status: NOT FOUND. No template matches domain key "${domain}".`);
    console.log(`[Roadmap Generator] 4. Fallback status: Raising error (unsupported domain).`);
    throw new Error(`Unknown domain "${domain}". Supported: ${Object.keys(TEMPLATES).join(", ")}`);
  }
  console.log(`[Roadmap Generator] 3. Match status: FOUND template for domain key "${domain}".`);

  console.log(`[Roadmap Generator] Searching template key for skill level: "${skillLevel}" under domain "${domain}"`);
  const blueprint = domainTemplates[skillLevel];
  if (!blueprint) {
    console.log(`[Roadmap Generator] 3. Match status: NOT FOUND. No blueprint for level "${skillLevel}".`);
    console.log(`[Roadmap Generator] 4. Fallback status: Raising error (unsupported level).`);
    throw new Error(`No template found for domain "${domain}" at level "${skillLevel}".`);
  }
  console.log(`[Roadmap Generator] 3. Match status: FOUND blueprint matching "${domain}/${skillLevel}".`);
  console.log(`[Roadmap Generator] 4. Fallback status: NO fallback needed. Using matching blueprint.`);

  // ── 2. Calculate per-week study hours ───────────────────────────────────
  const hpt = HOURS_PER_TOPIC[skillLevel] || HOURS_PER_TOPIC.Intermediate;

  // ── 3. Map template blueprint → week documents ──────────────────────────
  // AI FUTURE: Replace `blueprint` above with `await callAI({ domain, skillLevel, hoursPerDay })`
  // and ensure the returned array has the same shape: [{ title, learningObjectives, topics }]
  const weeks = blueprint.map((weekDef, idx) => ({
    week:                idx + 1,
    title:               `Week ${idx + 1}: ${weekDef.title}`,
    learningObjectives:  weekDef.learningObjectives || [],
    topics:              weekDef.topics || [],
    estimatedStudyHours: Math.ceil((weekDef.topics || []).length * hpt)
  }));

  // ── 4. Calculate duration metadata ──────────────────────────────────────
  const { estimatedWeeks, totalTopics, totalHours } = calculateDuration(
    weeks,
    skillLevel,
    hoursPerDay
  );

  const meta = {
    domain,
    skillLevel,
    hoursPerDay:       Number(hoursPerDay),
    estimatedDuration: `${estimatedWeeks} week${estimatedWeeks !== 1 ? "s" : ""}`,
    estimatedWeeks,
    learningPace:      getLearningPace(hoursPerDay),
    totalTopics,
    totalHours,
    generatedAt:       new Date()
  };

  return { weeks, meta };
}

module.exports = {
  generate,
  getLearningPace,
  HOURS_PER_TOPIC,
  STUDY_DAYS_PER_WEEK
};
