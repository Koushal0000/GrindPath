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

  const loading = false

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
      case "pomodoro_completed":             return "text-[#3b82f6] bg-[#0d1527] border-blue-500/35"
      case "habit_completed":                return "text-[#6366f1] bg-[#12142e] border-indigo-500/35"
      case "goal_created":                   return "text-emerald-400 bg-[#0d211a] border-emerald-500/35"
      case "level_up":                       return "text-[#a855f7] bg-[#221033] border-purple-500/35"
      case "goal_completed":                 return "text-emerald-400 bg-[#0d211a] border-emerald-500/35"
      case "roadmap_milestone_completed":    return "text-amber-400 bg-[#261d0f] border-amber-500/35"
      default:                               return "text-amber-400 bg-[#261d0f] border-amber-500/35"
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
    <div className="bg-[#111827] border border-indigo-500/20 rounded-3xl p-6 shadow-2xl h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-indigo-500/15 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/15 border border-blue-500/25 text-[#3b82f6] rounded-xl">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-100 text-base">Recent Activity</h3>
          </div>
        </div>
        {activities.length > 0 && (
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            {activities.length} events
          </span>
        )}
      </div>

      {/* Timeline List Container */}
      <div className="flex-1 space-y-6 overflow-y-auto max-h-[480px] scrollbar-thin px-3 py-1">
        {loading ? (
          <SkeletonLoader type="timeline" />
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
            <RefreshCw size={32} className="text-indigo-500/20" />
            <div>
              <p className="text-zinc-300 font-semibold text-sm">No activity yet.</p>
              <p className="text-zinc-500 text-xs mt-1">Complete a goal, habit, or focus session to build your timeline!</p>
            </div>
          </div>
        ) : (
          activities.map((act, index) => {
            const Icon = getIcon(act.type)
            const isLast = index === activities.length - 1
            return (
              <div key={act._id} className="flex items-start gap-4 relative">
                {/* Left Column: 32px Icon Badge + Perfectly Centered Connecting Line */}
                <div className="relative flex flex-col items-center shrink-0">
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center relative z-10 shadow-md ${getColor(act.type)}`}>
                    <Icon size={14} />
                  </div>
                  {!isLast && (
                    <div className="absolute top-8 -bottom-6 w-0.5 bg-indigo-500/25 left-1/2 -translate-x-1/2 pointer-events-none" />
                  )}
                </div>

                {/* Right Column: Event Details */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <span className="text-zinc-400 text-[11px] block font-semibold">
                    {formatTime(act.createdAt)}
                  </span>
                  <h4 className="text-zinc-100 text-xs font-bold mt-0.5">{act.title}</h4>
                  <p className="text-zinc-400 text-[11px] mt-0.5 font-medium">{act.desc}</p>
                  {act.xpEarned > 0 && (
                    <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 rounded-full mt-1.5 inline-block">
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
