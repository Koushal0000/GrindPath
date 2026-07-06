import { useAuth } from "../context/AuthContext"
import { Calendar, AlertTriangle, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PRIORITY_COLORS = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500"
}

const UpcomingDeadlinesWidget = () => {
  const { analyticsData, goals } = useAuth()
  const navigate = useNavigate()
  const today = new Date()

  // Use backend analytics deadlines when available (no more localStorage bug)
  const upcomingGoals = (() => {
    if (analyticsData?.upcomingDeadlines) {
      return analyticsData.upcomingDeadlines
    }
    // Fallback: client-side filter from goals — read deadline/priority directly from goal obj
    return goals
      .filter(g => g.deadline && !g.completed)
      .map(g => ({
        _id: g._id,
        title: g.title,
        category: g.category,
        priority: g.priority || "Medium",
        deadline: g.deadline,
        daysLeft: Math.ceil((new Date(g.deadline) - today) / (1000 * 60 * 60 * 24))
      }))
      .filter(g => g.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5)
  })()

  return (
    <div className="glass-panel p-5 rounded-2xl border border-zinc-800/50 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar size={14} className="text-blue-400" />
          Upcoming Deadlines
        </h3>
        <button
          onClick={() => navigate("/goals")}
          className="text-[10px] text-zinc-500 hover:text-zinc-300 font-bold uppercase transition flex items-center gap-1"
        >
          View All <ArrowRight size={10} />
        </button>
      </div>

      {upcomingGoals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <Calendar size={28} className="text-zinc-800 mb-2" />
          <p className="text-zinc-500 text-xs font-semibold">No upcoming deadlines</p>
          <p className="text-[10px] text-zinc-600 mt-1">Set a deadline on a goal to see it here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {upcomingGoals.map(g => {
            const daysLeft = typeof g.daysLeft === "number"
              ? g.daysLeft
              : Math.ceil((new Date(g.deadline) - today) / (1000 * 60 * 60 * 24))
            return (
              <div
                key={g._id}
                className="flex items-center gap-3 p-2.5 bg-zinc-900/60 rounded-xl border border-zinc-800/40 hover:border-zinc-700/60 transition cursor-pointer"
                onClick={() => navigate("/goals")}
              >
                <div className={`w-1.5 h-full min-h-[30px] rounded-full shrink-0 ${PRIORITY_COLORS[g.priority] || "bg-blue-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-300 truncate">{g.title}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{g.category} · {g.priority} Priority</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-[10px] font-bold ${daysLeft <= 0 ? "text-rose-400" : daysLeft <= 3 ? "text-amber-400" : daysLeft <= 7 ? "text-yellow-400" : "text-zinc-500"}`}>
                    {daysLeft <= 0 ? "Overdue" : daysLeft === 0 ? "Today!" : `${daysLeft}d left`}
                  </p>
                  {daysLeft < 0 && <AlertTriangle size={10} className="text-rose-400 ml-auto mt-0.5" />}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UpcomingDeadlinesWidget
