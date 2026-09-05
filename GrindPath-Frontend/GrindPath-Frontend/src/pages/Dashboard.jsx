import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import StatsGrid from "../components/StatsGrid"
import WeeklyChart from "../components/WeeklyChart"
import CategoryStats from "../components/CategoryStats"
import PomodoroTimer from "../components/PomodoroTimer"
import HabitTracker from "../components/HabitTracker"
import ActivityTimeline from "../components/ActivityTimeline"
import TodayFocusWidget from "../components/TodayFocusWidget"
import UpcomingDeadlinesWidget from "../components/UpcomingDeadlinesWidget"
import { Sparkles, PlusCircle, BarChart2, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user, goals, pomodoroSessions, streak, xp, level, analyticsData } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "GrindPath – Dashboard"
  }, [])

  const completedGoals = goals.filter(g => g.completed).length
  const totalGoals = goals.length

  // Use backend score when available, fall back to client-side formula
  const productivityScore = analyticsData?.productivityScore ?? Math.min(100, Math.round(
    (completedGoals / Math.max(totalGoals, 1)) * 40 +
    Math.min(pomodoroSessions, 20) * 2 +
    Math.min(streak * 2, 20)
  ))

  const scoreBreakdown = analyticsData?.scoreBreakdown || null

  return (
    <div className="space-y-8 select-none">

      {/* Greeting Banner / Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#111827] border border-indigo-500/25 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-blue-600/10 via-indigo-600/10 to-transparent pointer-events-none" />
        <div className="space-y-1.5 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>Welcome back, {user?.name?.split(" ")[0] || "Grinder"}</span>
            <Sparkles size={22} className="text-amber-400 fill-amber-400 animate-pulse" />
          </h1>
          <p className="text-zinc-300 text-sm font-semibold">
            Level {level} • <span className="text-indigo-400 font-bold">{xp} XP Total</span> • {streak > 0 ? `🔥 ${streak} Day Streak active!` : "Start your streak today!"}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap relative z-10 w-full sm:w-auto">
          <button
            onClick={() => navigate("/goals")}
            className="px-5 py-3 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-extrabold text-xs flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-xl shadow-blue-600/20 active:scale-[0.99]"
          >
            <PlusCircle size={15} />
            <span>New Goal</span>
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="px-4.5 py-3 bg-[#0b1020] hover:bg-[#151d30] border border-indigo-500/20 text-zinc-200 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-md"
          >
            <BarChart2 size={15} className="text-blue-400" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="px-4.5 py-3 bg-[#0b1020] hover:bg-[#151d30] border border-indigo-500/20 text-zinc-200 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-md"
          >
            <Calendar size={15} className="text-indigo-400" />
            <span>Calendar</span>
          </button>
        </div>
      </motion.div>

      {/* Top 4 Stat Cards */}
      <StatsGrid />

      {/* Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Analytics & Core Widgets — left 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WeeklyChart />
            <CategoryStats />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TodayFocusWidget />
            <UpcomingDeadlinesWidget />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PomodoroTimer />
            <HabitTracker />
          </div>
        </div>

        {/* Right Column — Productivity Score & Timeline */}
        <div className="space-y-8">

          {/* Productivity Score Card */}
          <div className="bg-[#111827] p-6 rounded-3xl border border-indigo-500/25 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">Productivity Score</h3>
              {analyticsData && (
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">Live Data</span>
              )}
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="url(#dashScoreGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${productivityScore * 2.51} 251`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="dashScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{productivityScore}</span>
                  <span className="text-xs text-zinc-400 font-bold">/ 100</span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            {scoreBreakdown ? (
              <div className="space-y-3 pt-2">
                {scoreBreakdown.map(item => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-300">{item.label}</span>
                      <span className="text-indigo-400 font-bold">{item.points}/{item.max} pts</span>
                    </div>
                    <div className="w-full bg-[#0b1020] h-2 rounded-full overflow-hidden border border-indigo-500/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] rounded-full transition-all duration-700"
                        style={{ width: `${(item.points / item.max) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-center pt-2">
                <div className="bg-[#0b1020] border border-indigo-500/15 rounded-2xl p-4">
                  <p className="text-xl font-black text-blue-400">{completedGoals}</p>
                  <p className="text-xs text-zinc-400 font-semibold mt-0.5">Goals Done</p>
                </div>
                <div className="bg-[#0b1020] border border-indigo-500/15 rounded-2xl p-4">
                  <p className="text-xl font-black text-indigo-400">{pomodoroSessions}</p>
                  <p className="text-xs text-zinc-400 font-semibold mt-0.5">Sessions</p>
                </div>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <ActivityTimeline />
        </div>
      </div>
    </div>
  )
}

export default Dashboard