import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { BarChart2, Clock, Target, Flame, TrendingUp, CheckCircle2, Zap } from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from "recharts"

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MetricCard = ({ icon: Icon, label, value, sub, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-panel p-5 rounded-2xl border border-zinc-800/50"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon size={17} className="text-white" />
      </div>
    </div>
    <p className="text-2xl font-black text-white">{value}</p>
    <p className="text-xs font-semibold text-zinc-400 mt-0.5">{label}</p>
    {sub && <p className="text-[10px] text-zinc-600 mt-1">{sub}</p>}
  </motion.div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs shadow-xl">
      <p className="text-zinc-400 font-bold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}{p.name.includes("Min") ? " min" : ""}
        </p>
      ))}
    </div>
  )
}

const Analytics = () => {
  const { goals, pomodoroSessions, streak, habits, xp, user } = useAuth()

  useEffect(() => {
    document.title = "GrindPath – Analytics"
  }, [])

  // Build weekly Pomodoro sessions data (last 7 days)
  const weeklyData = (() => {
    if (!user) return []
    const dailyKey = `grindpath_${user._id}_pomodoro_daily`
    const savedDaily = localStorage.getItem(dailyKey)
    const dailyData = savedDaily ? JSON.parse(savedDaily) : {}

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const key = d.toDateString()
      const dateKey = d.toISOString().slice(0, 10)
      return {
        day: DAY_LABELS[d.getDay()],
        sessions: dailyData[key] || 0,
        focusMins: (dailyData[key] || 0) * 25,
        date: dateKey
      }
    })
  })()

  // Category breakdown
  const categoryData = (() => {
    const catMap = goals.reduce((acc, g) => {
      if (!acc[g.category]) acc[g.category] = { total: 0, completed: 0 }
      acc[g.category].total++
      if (g.completed) acc[g.category].completed++
      return acc
    }, {})
    return Object.entries(catMap).map(([name, v]) => ({
      name,
      total: v.total,
      completed: v.completed,
      active: v.total - v.completed
    }))
  })()

  // Analytics calculations
  const totalGoals = goals.length
  const completedGoals = goals.filter(g => g.completed).length
  const activeGoals = goals.filter(g => !g.completed).length
  const totalFocusMins = pomodoroSessions * 25
  const totalFocusHours = Math.round(totalFocusMins / 60 * 10) / 10
  const habitTotal = habits.length
  const habitCompleted = habits.filter(h => h.completed).length
  const habitRate = habitTotal > 0 ? Math.round((habitCompleted / habitTotal) * 100) : 0
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  // Productivity Score
  const productivityScore = Math.min(100, Math.round(
    (completedGoals / Math.max(totalGoals, 1)) * 40 +
    Math.min(pomodoroSessions, 20) * 2 +
    Math.min(streak * 2, 20)
  ))

  const weeklyFocusMins = weeklyData.reduce((s, d) => s + d.focusMins, 0)
  const weeklyFocusHours = Math.round(weeklyFocusMins / 60 * 10) / 10
  const weeklyPomodoros = weeklyData.reduce((s, d) => s + d.sessions, 0)

  const CHART_COLORS = ["#3b82f6", "#818cf8", "#34d399", "#f59e0b", "#f472b6", "#22d3ee"]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BarChart2 className="text-blue-500" size={22} />
          Study Analytics
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Deep insights into your productivity, focus patterns, and goal progress.</p>
      </motion.div>

      {totalGoals === 0 && weeklyPomodoros === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center border-zinc-900 flex flex-col items-center justify-center gap-4 mt-6">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900/60 border border-zinc-850 text-zinc-650 flex items-center justify-center animate-pulse">
            <BarChart2 size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-400">No Analytics Available</h3>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-1 mx-auto font-medium">
              Start by creating goals, completing habits, or logging focus sessions to generate your analytics.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={Clock} label="Total Focus Hours" value={`${totalFocusHours}h`} sub={`${pomodoroSessions} sessions all-time`} color="from-blue-500 to-indigo-600" delay={0.05} />
        <MetricCard icon={Target} label="Goal Completion Rate" value={`${completionRate}%`} sub={`${completedGoals}/${totalGoals} goals done`} color="from-emerald-500 to-teal-600" delay={0.1} />
        <MetricCard icon={Flame} label="Current Streak" value={`${streak}d`} sub="Consecutive active days" color="from-amber-500 to-orange-600" delay={0.15} />
        <MetricCard icon={CheckCircle2} label="Habit Rate Today" value={`${habitRate}%`} sub={`${habitCompleted}/${habitTotal} habits done`} color="from-violet-500 to-purple-600" delay={0.2} />
      </div>

      {/* Productivity Score + Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Productivity Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-panel p-5 rounded-2xl border border-zinc-800/50 flex flex-col items-center justify-center"
        >
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Productivity Score</h3>
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="7" />
              <circle 
                cx="50" cy="50" r="42" 
                fill="none" 
                stroke="url(#scoreGrad)" 
                strokeWidth="7" 
                strokeLinecap="round"
                strokeDasharray={`${productivityScore * 2.638} 263.8`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{productivityScore}</span>
              <span className="text-[10px] text-zinc-500 font-bold">/100</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4 text-center">
            {productivityScore >= 80 ? "🔥 Excellent performance!" : 
             productivityScore >= 50 ? "📈 Good momentum, keep going!" : 
             "🎯 Kick it up a notch!"}
          </p>
        </motion.div>

        {/* Weekly Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 glass-panel p-5 rounded-2xl border border-zinc-800/50"
        >
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <TrendingUp size={13} className="text-blue-400" /> This Week
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Focus Hours", value: `${weeklyFocusHours}h`, icon: Clock, color: "text-blue-400" },
              { label: "Pomodoros", value: weeklyPomodoros, icon: Zap, color: "text-indigo-400" },
              { label: "Active Goals", value: activeGoals, icon: Target, color: "text-amber-400" },
              { label: "XP Earned", value: `${xp} total`, icon: Flame, color: "text-rose-400" }
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-zinc-900 rounded-xl p-3 flex items-center gap-2.5">
                <Icon size={14} className={color} />
                <div>
                  <p className="text-sm font-black text-white">{value}</p>
                  <p className="text-[10px] text-zinc-600">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Focus Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-panel p-5 rounded-2xl border border-zinc-800/50"
        >
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Daily Focus Minutes (Last 7 Days)</h3>
          <div className="w-full h-[200px] min-h-[200px]">
            {weeklyData && weeklyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="focusMins" name="Focus Mins" stroke="#3b82f6" fill="url(#focusGrad)" strokeWidth={2} dot={{ fill: "#3b82f6", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No focus data yet.</div>
            )}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-5 rounded-2xl border border-zinc-800/50"
        >
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Goals by Category</h3>
          {categoryData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-zinc-600 text-xs">
              No goals yet. Create goals to see category analytics.
            </div>
          ) : (
            <div className="w-full h-[200px] min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="completed" name="Completed" stackId="a" radius={[0, 0, 0, 0]}>
                    {categoryData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Bar>
                  <Bar dataKey="active" name="Active" stackId="a" radius={[4, 4, 0, 0]}>
                    {categoryData.map((_, i) => <Cell key={i} fill={`${CHART_COLORS[i % CHART_COLORS.length]}44`} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>

      {/* Daily Pomodoro Sessions Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-panel p-5 rounded-2xl border border-zinc-800/50"
      >
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Daily Focus Sessions</h3>
        <div className="w-full h-[140px] min-h-[140px]">
          {weeklyData && weeklyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sessions" name="Sessions" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, i) => (
                    <Cell key={i} fill={entry.sessions > 0 ? "#818cf8" : "#27272a"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No sessions yet.</div>
          )}
        </div>
        </motion.div>
        </>
      )}
    </div>
  )
}

export default Analytics
