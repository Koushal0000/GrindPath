import { useEffect, useState } from "react"
import { 
  PlusCircle, 
  CheckCircle, 
  Timer, 
  Activity,
  Award,
  Zap
} from "lucide-react"
import { getActivities } from "../services/activityService"
import SkeletonLoader from "./SkeletonLoader"

const ActivityTimeline = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities()
        setActivities(data)
      } catch (err) {
        console.error("Failed to load activities", err)
      } finally {
        setLoading(false)
      }
    }
    fetchActivities()
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case "pomodoro_completed": return Timer;
      case "habit_completed": return CheckCircle;
      case "goal_created": return PlusCircle;
      case "level_up": return Award;
      case "roadmap_milestone_completed": return Zap;
      case "goal_completed": return CheckCircle;
      default: return Activity;
    }
  }

  const getColor = (type) => {
    switch (type) {
      case "pomodoro_completed": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "habit_completed": return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
      case "goal_created": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "level_up": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "goal_completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
  }

  const formatTime = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "Just now"
    if (mins < 60) return `${mins} mins ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    return `${days} days ago`
  }

  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 h-full flex flex-col">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-900/80 mb-5">
        <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg">
          <Activity size={16} />
        </div>
        <h3 className="font-bold text-zinc-200 text-sm">Recent Activity</h3>
      </div>

      <div className="relative flex-1 pl-4 border-l border-zinc-800 space-y-6">
        {loading ? (
          <SkeletonLoader type="timeline" />
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10 text-zinc-500 -ml-4">
            <Activity size={32} className="text-zinc-700 mb-3" />
            <p className="text-xs font-semibold">No recent activity.</p>
            <p className="text-[10px] mt-1 text-zinc-600">Start grinding to build your timeline!</p>
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
