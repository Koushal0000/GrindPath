import { useAuth } from "../context/AuthContext"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { CalendarRange, RefreshCw } from "lucide-react"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] border border-indigo-500/30 px-4 py-3 rounded-2xl shadow-xl">
        <p className="text-xs text-zinc-400 font-bold mb-1">{label}</p>
        <p className="text-sm font-extrabold text-[#3b82f6]">{payload[0].value} Focus Hours</p>
        {payload[1] && <p className="text-xs font-semibold text-[#6366f1] mt-0.5">{payload[1].value} Sessions</p>}
      </div>
    )
  }
  return null
}

const WeeklyChart = () => {
  const { analyticsData, user } = useAuth()

  const data = (() => {
    if (analyticsData?.weeklyData && analyticsData.weeklyData.length > 0) {
      return analyticsData.weeklyData
    }
    if (!user) return []
    const dailyKey = `grindpath_${user._id}_pomodoro_daily`
    const savedDaily = localStorage.getItem(dailyKey)
    const dailyData = savedDaily ? JSON.parse(savedDaily) : {}
    const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const key = d.toDateString()
      const sessions = dailyData[key] || 0
      return {
        day: DAY_LABELS[d.getDay()],
        hours: Math.round((sessions * 25) / 60 * 10) / 10,
        sessions
      }
    })
  })()

  const hasData = data && data.some(d => d.hours > 0 || d.sessions > 0)

  return (
    <div className="bg-[#111827] border border-indigo-500/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/15 border border-blue-500/30 text-[#3b82f6] rounded-xl">
            <CalendarRange size={18} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-100 text-base">Productivity Analytics</h3>
            <p className="text-zinc-400 text-xs font-medium mt-0.5">7-day focus trend</p>
          </div>
        </div>
        {analyticsData && (
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">Live</span>
        )}
      </div>

      <div className="w-full h-52 min-w-0">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#475569"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontWeight: 600 }}
              />
              <YAxis
                stroke="#475569"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, "auto"]}
                tick={{ fill: "#64748b" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorHours)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <RefreshCw size={32} className="text-indigo-500/30" />
            <div className="text-center">
              <p className="text-zinc-300 font-semibold text-sm">No productivity data yet.</p>
              <p className="text-zinc-500 text-xs mt-1">Complete a focus session, habit, or goal to see your chart.</p>
            </div>
          </div>
        )}
      </div>

      {analyticsData?.summary && (
        <div className="mt-4 pt-4 border-t border-indigo-500/15 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-black text-[#3b82f6]">{analyticsData.summary.focusHoursThisMonth}h</p>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">Focus hrs</p>
          </div>
          <div>
            <p className="text-lg font-black text-[#6366f1]">{analyticsData.summary.totalFocusSessions}</p>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">Sessions</p>
          </div>
          <div>
            <p className="text-lg font-black text-emerald-400">{analyticsData.summary.completedRoadmapWeeks}</p>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">Milestones</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyChart
