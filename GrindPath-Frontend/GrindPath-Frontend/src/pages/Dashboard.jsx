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
    <div className="space-y-6">

      {/* Greeting Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/30 border border-zinc-800/50 p-5 md:p-6 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none" />
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, {user?.name?.split(" ")[0] || "Grinder"}</span>
            <Sparkles size={18} className="text-yellow-400 fill-yellow-400 animate-pulse" />
          </h1>
          <p className="text-zinc-500 text-xs mt-1 font-medium">
            Level {level} • {xp} XP total • {streak > 0 ? `🔥 ${streak} day streak` : "Start your streak today!"}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/goals")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-lg shadow-blue-600/15"
          >
            <PlusCircle size={13} />
            <span>New Goal</span>
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition"
          >
            <BarChart2 size={13} />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition"
          >
            <Calendar size={13} />
            <span>Calendar</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Row */}
      <StatsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Analytics & Widgets — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeeklyChart />
            <CategoryStats />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TodayFocusWidget />
            <UpcomingDeadlinesWidget />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PomodoroTimer />
            <HabitTracker />
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-6">

          {/* Productivity Score Card */}
          <div className="glass-panel p-5 rounded-2xl border border-zinc-800/50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Productivity Score</h3>
              {analyticsData && (
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Live</span>
              )}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#27272a" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="url(#prodGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${productivityScore * 2.51} 251`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="prodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{productivityScore}</span>
                  <span className="text-[10px] text-zinc-500 font-bold">/100</span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            {scoreBreakdown ? (
              <div className="space-y-2">
                {scoreBreakdown.map(item => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-zinc-500">{item.label}</span>
                      <span className="text-zinc-400">{item.points}/{item.max} pts</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${(item.points / item.max) * 100}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-zinc-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-zinc-900 rounded-xl p-3">
                  <p className="text-base font-black text-blue-400">{completedGoals}</p>
                  <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Goals Done</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-3">
                  <p className="text-base font-black text-indigo-400">{pomodoroSessions}</p>
                  <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Sessions</p>
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