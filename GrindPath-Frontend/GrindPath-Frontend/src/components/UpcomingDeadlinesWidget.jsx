import { useAuth } from "../context/AuthContext"
import { Calendar, AlertTriangle, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PRIORITY_BADGE = {
  High:   "bg-rose-500/20 text-rose-400 border-rose-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Low:    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
}

const PRIORITY_DOT = {
  High:   "bg-rose-500",
  Medium: "bg-amber-500",
  Low:    "bg-emerald-500"
}

const UpcomingDeadlinesWidget = () => {
  const { analyticsData, goals } = useAuth()
  const navigate = useNavigate()
  const today = new Date()

  const upcomingGoals = (() => {
    // Only use backend upcomingDeadlines if non-empty
    if (analyticsData?.upcomingDeadlines && analyticsData.upcomingDeadlines.length > 0) {
      return analyticsData.upcomingDeadlines
    }

    if (!goals || goals.length === 0) return []

    return goals
      .filter(g => !g.completed)
      .map(g => {
        let deadlineDate = null
        if (g.deadline) {
          deadlineDate = new Date(g.deadline)
        } else if (g.duration) {
          const created = g.createdAt ? new Date(g.createdAt) : today
          deadlineDate = new Date(created.getTime() + Number(g.duration) * 24 * 60 * 60 * 1000)
        }

        if (!deadlineDate || isNaN(deadlineDate.getTime())) return null

        const diffMs = deadlineDate.getTime() - today.getTime()
        const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

        return {
          _id: g._id,
          title: g.title,
          category: g.category,
          priority: g.priority || "Medium",
          deadline: deadlineDate.toISOString(),
          daysLeft
        }
      })
      .filter(Boolean)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5)
  })()

  return (
    <div className="bg-[#111827] border border-indigo-500/20 rounded-3xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/15 border border-blue-500/30 text-[#3b82f6] rounded-xl">
            <Calendar size={16} />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">Upcoming Deadlines</h3>
        </div>
        <button
          onClick={() => navigate("/goals")}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition flex items-center gap-1 cursor-pointer"
        >
          View All <ArrowRight size={12} />
        </button>
      </div>

      {upcomingGoals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
          <Calendar size={32} className="text-indigo-500/20" />
          <div>
            <p className="text-zinc-300 font-semibold text-sm">No upcoming deadlines</p>
            <p className="text-zinc-500 text-xs mt-1">Set a deadline on a goal to see it here.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {upcomingGoals.map(g => {
            const daysLeft = typeof g.daysLeft === "number"
              ? g.daysLeft
              : Math.ceil((new Date(g.deadline) - today) / (1000 * 60 * 60 * 24))
            const urgencyColor = daysLeft < 0 ? "text-rose-400" : daysLeft === 0 ? "text-rose-400" : daysLeft <= 3 ? "text-amber-400" : daysLeft <= 7 ? "text-yellow-400" : "text-zinc-400"
            return (
              <div
                key={g._id}
                className="flex items-center gap-3 px-4 py-3 bg-[#0b1020] rounded-2xl border border-indigo-500/15 hover:border-indigo-500/35 transition cursor-pointer group"
                onClick={() => navigate("/goals")}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${PRIORITY_DOT[g.priority] || "bg-blue-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-200 truncate group-hover:text-white transition">{g.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${PRIORITY_BADGE[g.priority] || PRIORITY_BADGE.Medium}`}>
                      {g.priority}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium">{g.category}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end gap-0.5">
                  <p className={`text-xs font-extrabold ${urgencyColor}`}>
                    {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? "Today!" : `${daysLeft}d left`}
                  </p>
                  {daysLeft <= 0 && <AlertTriangle size={11} className="text-rose-400" />}
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
