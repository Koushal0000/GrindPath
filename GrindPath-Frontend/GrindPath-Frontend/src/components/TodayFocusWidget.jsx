import { useAuth } from "../context/AuthContext"
import { Target, CheckCircle, Zap } from "lucide-react"

const TodayFocusWidget = () => {
  const { goals, habits, pomodoroSessions, analyticsData, user } = useAuth()

  // Active goals from MongoDB
  const activeGoals = goals.filter(g => !g.completed)

  // Habits from local state (reset daily via AuthContext)
  const habitsDone = habits.filter(h => h.completed).length
  const habitsTotal = habits.length

  // Focus sessions today: prefer backend analytics (habitsCompletedToday) or fallback to localStorage
  const pomodorosDoneToday = (() => {
    // Use analytics summary habitsCompletedToday for habits, but we need today pomodoros specifically
    // Use localStorage for today's specific pomodoro count (persisted per session)
    const storedUser = user || JSON.parse(localStorage.getItem("grindpath_user") || "{}")
    if (!storedUser._id) return pomodoroSessions
    const dailyKey = `grindpath_${storedUser._id}_pomodoro_daily`
    const savedDaily = localStorage.getItem(dailyKey)
    const dailyData = savedDaily ? JSON.parse(savedDaily) : {}
    return dailyData[new Date().toDateString()] || 0
  })()

  // Assuming a daily target of 4 pomodoros as standard
  const targetPomodoros = 4

  const metrics = [
    {
      icon: Target,
      label: "Active Goals",
      sub: "Currently in grind",
      value: activeGoals.length,
      color: "bg-blue-500/10 text-blue-400",
      valueColor: "text-blue-400"
    },
    {
      icon: CheckCircle,
      label: "Daily Habits",
      sub: "Completed today",
      value: habitsDone,
      suffix: `/${habitsTotal}`,
      color: "bg-indigo-500/10 text-indigo-400",
      valueColor: "text-indigo-400"
    },
    {
      icon: Zap,
      label: "Focus Sessions",
      sub: `Target: ${targetPomodoros}`,
      value: pomodorosDoneToday,
      suffix: `/${targetPomodoros}`,
      color: "bg-amber-500/10 text-amber-400",
      valueColor: "text-amber-400"
    }
  ]

  return (
    <div className="glass-panel p-5 rounded-2xl border border-zinc-800/50 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Today&apos;s Focus</h3>
        {analyticsData?.summary && (
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Live</span>
        )}
      </div>

      <div className="space-y-3">
        {metrics.map(({ icon: Icon, label, sub, value, suffix, color, valueColor }) => (
          <div key={label} className="flex items-center justify-between bg-zinc-900 rounded-xl p-3 border border-zinc-800/40">
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg ${color}`}>
                <Icon size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-200">{label}</p>
                <p className="text-[10px] text-zinc-500">{sub}</p>
              </div>
            </div>
            <p className={`text-lg font-black ${valueColor}`}>
              {value}
              {suffix && <span className="text-xs text-zinc-600">{suffix}</span>}
            </p>
          </div>
        ))}
      </div>

      {analyticsData?.summary && (
        <div className="pt-3 border-t border-zinc-900">
          <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">
            This month: <span className="text-zinc-400 font-bold">{analyticsData.summary.completedRoadmapWeeks} roadmap milestones</span> · <span className="text-zinc-400 font-bold">{analyticsData.summary.focusHoursThisMonth}h focus</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default TodayFocusWidget
