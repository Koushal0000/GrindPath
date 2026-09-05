import { useAuth } from "../context/AuthContext"
import { Target, CheckCircle, Zap } from "lucide-react"

const TodayFocusWidget = () => {
  const { goals, habits, pomodoroSessions, analyticsData, user } = useAuth()

  const activeGoals = goals.filter(g => !g.completed)
  const habitsDone = habits.filter(h => h.completed).length
  const habitsTotal = habits.length

  const pomodorosDoneToday = (() => {
    const storedUser = user || JSON.parse(localStorage.getItem("grindpath_user") || "{}")
    if (!storedUser._id) return pomodoroSessions
    const dailyKey = `grindpath_${storedUser._id}_pomodoro_daily`
    const savedDaily = localStorage.getItem(dailyKey)
    const dailyData = savedDaily ? JSON.parse(savedDaily) : {}
    return dailyData[new Date().toDateString()] || 0
  })()

  const targetPomodoros = 4

  const metrics = [
    {
      icon: Target,
      label: "Active Goals",
      sub: "Currently in grind",
      value: activeGoals.length,
      accent: "text-[#3b82f6]",
      iconBg: "bg-blue-500/15 border-blue-500/30"
    },
    {
      icon: CheckCircle,
      label: "Daily Habits",
      sub: "Completed today",
      value: habitsDone,
      suffix: `/${habitsTotal}`,
      accent: "text-[#6366f1]",
      iconBg: "bg-indigo-500/15 border-indigo-500/30"
    },
    {
      icon: Zap,
      label: "Focus Sessions",
      sub: `Target: ${targetPomodoros}`,
      value: pomodorosDoneToday,
      suffix: `/${targetPomodoros}`,
      accent: "text-amber-400",
      iconBg: "bg-amber-500/15 border-amber-500/30"
    }
  ]

  return (
    <div className="bg-[#111827] border border-indigo-500/20 rounded-3xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-100">Today&apos;s Focus</h3>
        {analyticsData?.summary && (
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">Live</span>
        )}
      </div>

      <div className="space-y-3">
        {metrics.map(({ icon: Icon, label, sub, value, suffix, accent, iconBg }) => (
          <div key={label} className="flex items-center justify-between bg-[#0b1020] rounded-2xl px-4 py-3.5 border border-indigo-500/15">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${iconBg}`}>
                <Icon size={15} className={accent} />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-100">{label}</p>
                <p className="text-xs text-zinc-400 font-medium">{sub}</p>
              </div>
            </div>
            <p className={`text-2xl font-black ${accent}`}>
              {value}
              {suffix && <span className="text-xs text-zinc-500 font-semibold">{suffix}</span>}
            </p>
          </div>
        ))}
      </div>

      {analyticsData?.summary && (
        <div className="pt-4 border-t border-indigo-500/15">
          <p className="text-xs text-zinc-400 font-medium leading-relaxed">
            This month: <span className="text-zinc-200 font-bold">{analyticsData.summary.completedRoadmapWeeks} milestones</span> · <span className="text-zinc-200 font-bold">{analyticsData.summary.focusHoursThisMonth}h focus</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default TodayFocusWidget
