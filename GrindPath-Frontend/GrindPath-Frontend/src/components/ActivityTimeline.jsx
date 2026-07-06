import { useAuth } from "../context/AuthContext"
import {
  PlusCircle,
  CheckCircle,
  Timer,
  Activity,
  Award,
  Zap,
  Map,
  RefreshCw
} from "lucide-react"
import SkeletonLoader from "./SkeletonLoader"

const ActivityTimeline = () => {
  const { activities } = useAuth()

  const loading = false // activities loaded via AuthContext

  const getIcon = (type) => {
    switch (type) {
      case "pomodoro_completed": return Timer
      case "habit_completed": return CheckCircle
      case "goal_created": return PlusCircle
      case "level_up": return Award
      case "roadmap_milestone_completed": return Zap
      case "goal_completed": return CheckCircle
      case "roadmap_generated": return Map
      default: return Activity
    }
  }

  const getColor = (type) => {
    switch (type) {
      case "pomodoro_completed": return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      case "habit_completed": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
      case "goal_created": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      case "level_up": return "text-purple-400 bg-purple-500/10 border-purple-500/20"
      case "goal_completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      case "roadmap_milestone_completed": return "text-amber-400 bg-amber-500/10 border-amber-500/20"
      default: return "text-amber-400 bg-amber-500/10 border-amber-500/20"
    }
  }

  const formatTime = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "Just now"
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return days === 1 ? "Yesterday" : `${days}d ago`
  }

  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900/80 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg">
            <Activity size={16} />
          </div>
          <h3 className="font-bold text-zinc-200 text-sm">Recent Activity</h3>
        </div>
        {activities.length > 0 && (
          <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {activities.length} events
          </span>
        )}
      </div>

      <div className="relative flex-1 pl-4 border-l border-zinc-800 space-y-6 overflow-y-auto max-h-[420px] scrollbar-thin">
        {loading ? (
          <SkeletonLoader type="timeline" />
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 text-zinc-500 -ml-4">
            <RefreshCw size={32} className="text-zinc-700 mb-3" />
            <p className="text-xs font-semibold">No activity yet.</p>
            <p className="text-[10px] mt-1 text-zinc-600">Complete a goal, habit, or focus session to build your timeline!</p>
          </div>
        ) : (
          activities.map((act) => {
            const Icon = getIcon(act.type)
            return (
              <div key={act._id} className="relative">
                <div className={`absolute -left-[27px] top-0 p-1.5 rounded-xl border ${getColor(act.type)}`}>
                  <Icon size={12} />
                </div>
                <div className="pl-2">
                  <span className="text-zinc-500 text-[10px] block font-semibold">
                    {formatTime(act.createdAt)}
                  </span>
                  <h4 className="text-zinc-200 text-xs font-bold mt-0.5">{act.title}</h4>
                  <p className="text-zinc-500 text-[11px] mt-0.5 font-medium">{act.desc}</p>
                  {act.xpEarned > 0 && (
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full mt-1 inline-block">
                      +{act.xpEarned} XP
                    </span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ActivityTimeline
