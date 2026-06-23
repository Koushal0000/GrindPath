import { useAuth } from "../context/AuthContext"
import { Target, CheckCircle, Zap } from "lucide-react"

const TodayFocusWidget = () => {
  const { goals, habits, pomodoroSessions } = useAuth()

  // Calculate today's focus metrics
  const activeGoals = goals.filter(g => !g.completed)
  const habitsDone = habits.filter(h => h.completed).length
  const habitsTotal = habits.length

  // Assuming a daily target of 4 pomodoros as standard
  const targetPomodoros = 4
  const pomodorosDone = (() => {
    const user = JSON.parse(localStorage.getItem("grindpath_user"))
    if (!user) return 0
    const dailyKey = `grindpath_${user._id}_pomodoro_daily`
    const savedDaily = localStorage.getItem(dailyKey)
    const dailyData = savedDaily ? JSON.parse(savedDaily) : {}
    return dailyData[new Date().toDateString()] || 0
  })()

  return (
    <div className="glass-panel p-5 rounded-2xl border border-zinc-800/50 space-y-4">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Today's Focus</h3>
      
      <div className="space-y-3">
        {/* Goals Metric */}
        <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-3 border border-zinc-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Target size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-200">Active Goals</p>
              <p className="text-[10px] text-zinc-500">Currently in grind</p>
            </div>
          </div>
          <p className="text-lg font-black text-blue-400">{activeGoals.length}</p>
        </div>

        {/* Habits Metric */}
        <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-3 border border-zinc-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <CheckCircle size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-200">Daily Habits</p>
              <p className="text-[10px] text-zinc-500">Completed today</p>
            </div>
          </div>
          <p className="text-lg font-black text-indigo-400">{habitsDone}<span className="text-xs text-zinc-600">/{habitsTotal}</span></p>
        </div>

        {/* Pomodoro Metric */}
        <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-3 border border-zinc-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-200">Focus Sessions</p>
              <p className="text-[10px] text-zinc-500">Target: {targetPomodoros}</p>
            </div>
          </div>
          <p className="text-lg font-black text-amber-400">{pomodorosDone}<span className="text-xs text-zinc-600">/{targetPomodoros}</span></p>
        </div>
      </div>
    </div>
  )
}

export default TodayFocusWidget
