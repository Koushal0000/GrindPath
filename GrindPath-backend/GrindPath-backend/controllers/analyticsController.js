const Goal = require("../models/Goal");
const Roadmap = require("../models/Roadmap");
const RoadmapMeta = require("../models/RoadmapMeta");
const Activity = require("../models/Activity");

// ─── GET CONSOLIDATED ANALYTICS ───────────────────────────────────────────────
// GET /api/analytics
// Returns: productivityScore, weeklyData, focusDistribution, upcomingDeadlines

const getAnalytics = async (req, res) => {
  try {
    const userId = req.user;

    // ── 1. Goals ──────────────────────────────────────────────────────────────
    const goals = await Goal.find({ user: userId });
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.completed).length;
    const goalCompletionRate = totalGoals > 0 ? completedGoals / totalGoals : 0;

    // ── 2. Roadmap Weeks ──────────────────────────────────────────────────────
    const goalIds = goals.map(g => g._id);
    const allWeeks = await Roadmap.find({ goal: { $in: goalIds } });
    const totalWeeks = allWeeks.length;
    const completedWeeks = allWeeks.filter(w => w.completed).length;
    const roadmapRate = totalWeeks > 0 ? completedWeeks / totalWeeks : 0;

    // ── 3. Activity Logs (last 30 days) ───────────────────────────────────────
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivities = await Activity.find({
      user: userId,
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 });

    const focusSessions = recentActivities.filter(a => a.type === "pomodoro_completed").length;
    const habitsCompletedTotal = recentActivities.filter(a => a.type === "habit_completed").length;

    // Today's habit completions
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const habitsToday = recentActivities.filter(
      a => a.type === "habit_completed" && new Date(a.createdAt) >= todayStart
    ).length;

    // ── 4. Productivity Score (0–100) ─────────────────────────────────────────
    // Factor 1: Goal completion rate (0–35 pts)
    const goalFactor = Math.round(goalCompletionRate * 35);
    // Factor 2: Roadmap milestone progress (0–25 pts)
    const roadmapFactor = Math.round(roadmapRate * 25);
    // Factor 3: Focus sessions this month (0–20 pts, caps at 20 sessions)
    const focusFactor = Math.min(20, Math.round((focusSessions / 20) * 20));
    // Factor 4: Habits completed this month (0–20 pts, caps at 30 completions)
    const habitFactor = Math.min(20, Math.round((habitsCompletedTotal / 30) * 20));

    const productivityScore = Math.min(100, goalFactor + roadmapFactor + focusFactor + habitFactor);

    const scoreBreakdown = [
      { label: "Goal Completion", points: goalFactor, max: 35, desc: `${completedGoals}/${totalGoals} goals completed` },
      { label: "Roadmap Milestones", points: roadmapFactor, max: 25, desc: `${completedWeeks}/${totalWeeks} weeks completed` },
      { label: "Focus Sessions", points: focusFactor, max: 20, desc: `${focusSessions} sessions this month` },
      { label: "Habit Consistency", points: habitFactor, max: 20, desc: `${habitsCompletedTotal} habit completions this month` }
    ];

    // ── 5. Weekly Productivity Data (last 7 days) ─────────────────────────────
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const weekActivities = recentActivities.filter(
      a => new Date(a.createdAt) >= sevenDaysAgo
    );

    const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const dayActivities = weekActivities.filter(a => {
        const t = new Date(a.createdAt);
        return t >= dayStart && t <= dayEnd;
      });

      const pomodoroCount = dayActivities.filter(a => a.type === "pomodoro_completed").length;
      const goalsDone = dayActivities.filter(a => a.type === "goal_completed").length;
      const habitsDone = dayActivities.filter(a => a.type === "habit_completed").length;
      const milestoneDone = dayActivities.filter(a => a.type === "roadmap_milestone_completed").length;

      // 25 min per pomodoro → hours. Goals/milestones/habits add bonus time.
      const hours = Math.round(
        (pomodoroCount * 0.42 + goalsDone * 0.5 + habitsDone * 0.1 + milestoneDone * 0.25) * 10
      ) / 10;

      return {
        day: DAY_LABELS[d.getDay()],
        hours,
        sessions: pomodoroCount,
        date: d.toISOString().slice(0, 10)
      };
    });

    // ── 6. Focus Distribution ─────────────────────────────────────────────────
    // Try domain-based first (uses RoadmapMeta), fall back to goal category
    const metas = await RoadmapMeta.find({ goal: { $in: goalIds } });

    let focusDistribution = [];

    if (metas.length > 0) {
      // Build a goalId → domain map
      const goalDomainMap = {};
      metas.forEach(m => { goalDomainMap[m.goal.toString()] = m.domain; });

      const DOMAIN_LABELS = {
        mern:  "MERN Stack",
        java:  "Java Dev",
        genai: "Gen AI",
        dsa:   "DSA",
        cloud: "Cloud"
      };

      const domainCounts = {};
      goals.forEach(g => {
        const domain = goalDomainMap[g._id.toString()];
        if (domain) {
          const label = DOMAIN_LABELS[domain] || domain;
          domainCounts[label] = (domainCounts[label] || 0) + 1;
        } else {
          const cat = g.category || "General";
          domainCounts[cat] = (domainCounts[cat] || 0) + 1;
        }
      });

      focusDistribution = Object.entries(domainCounts).map(([name, value]) => ({ name, value }));
    } else {
      // Fall back: group by goal category
      const catCounts = {};
      goals.forEach(g => {
        const cat = g.category || "General";
        catCounts[cat] = (catCounts[cat] || 0) + 1;
      });
      focusDistribution = Object.entries(catCounts).map(([name, value]) => ({ name, value }));
    }

    // ── 7. Upcoming Deadlines ─────────────────────────────────────────────────
    const now = new Date();
    const upcomingDeadlines = goals
      .filter(g => !g.completed && g.deadline && new Date(g.deadline) >= now)
      .map(g => ({
        _id: g._id,
        title: g.title,
        category: g.category,
        priority: g.priority || "Medium",
        deadline: g.deadline,
        daysLeft: Math.ceil((new Date(g.deadline) - now) / (1000 * 60 * 60 * 24))
      }))
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);

    // ── 8. Summary Stats ──────────────────────────────────────────────────────
    const summary = {
      totalGoals,
      completedGoals,
      activeGoals: totalGoals - completedGoals,
      completionRate: totalGoals > 0 ? Math.round(goalCompletionRate * 100) : 0,
      totalFocusSessions: focusSessions,
      focusHoursThisMonth: Math.round(focusSessions * 0.42 * 10) / 10,
      habitsCompletedToday: habitsToday,
      totalRoadmapWeeks: totalWeeks,
      completedRoadmapWeeks: completedWeeks
    };

    res.status(200).json({
      productivityScore,
      scoreBreakdown,
      weeklyData,
      focusDistribution,
      upcomingDeadlines,
      summary
    });

  } catch (error) {
    console.error("[Analytics]", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAnalytics };
