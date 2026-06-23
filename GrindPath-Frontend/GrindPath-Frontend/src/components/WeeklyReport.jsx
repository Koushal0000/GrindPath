import { useAuth } from "../context/AuthContext"
import { Clock, Target, CheckCircle, Flame } from "lucide-react"

const WeeklyReport = () => {
  const { pomodoroSessions, goals, habits, xp } = useAuth()

  // Calculate stats for the report
  const totalFocusHours = Math.round((pomodoroSessions * 25) / 60 * 10) / 10
  const completedGoals = goals.filter(g => g.completed).length
  const completedHabits = habits.filter(h => h.completed).length
  
  // Basic mock score calculation based on current stats
  const score = Math.min(100, Math.round(
    (completedGoals * 15) + (completedHabits * 5) + (totalFocusHours * 2)
  ))

  return (
    <div className="glass-panel p-5 rounded-2xl border border-zinc-800/50">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        <Flame size={14} className="text-blue-400" />
        Weekly Overview
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-blue-400 mb-1">
            <Clock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Focus Hrs</span>
          </div>
          <p className="text-xl font-black text-white">{totalFocusHours}</p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
            <Target size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Goals Done</span>
          </div>
          <p className="text-xl font-black text-white">{completedGoals}</p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
            <CheckCircle size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Habits Done</span>
          </div>
          <p className="text-xl font-black text-white">{completedHabits}</p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-amber-400 mb-1">
            <Flame size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Score</span>
          </div>
          <p className="text-xl font-black text-white">{score}/100</p>
        </div>
      </div>
    </div>
  )
}

export default WeeklyReport
