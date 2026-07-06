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
      <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-xl shadow-xl">
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">{label}</p>
        <p className="text-sm font-bold text-blue-400 mt-0.5">{payload[0].value} Focus Hours</p>
        {payload[1] && <p className="text-xs font-semibold text-indigo-400 mt-0.5">{payload[1].value} Sessions</p>}
      </div>
    )
  }
  return null
}

const WeeklyChart = () => {
  const { analyticsData, user } = useAuth()

  // Use backend analytics data when available, fall back to localStorage for pomodoro
  const data = (() => {
    if (analyticsData?.weeklyData && analyticsData.weeklyData.length > 0) {
      return analyticsData.weeklyData
    }
    // Fallback: localStorage-based calculation
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
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900/80 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg">
            <CalendarRange size={16} />
          </div>
          <h3 className="font-bold text-zinc-200 text-sm">Productivity Analytics</h3>
        </div>
        {analyticsData && (
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Live</span>
        )}
      </div>

      <div className="w-full h-64 min-h-[256px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#52525b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#52525b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, "auto"]}
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
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 text-xs gap-3">
            <RefreshCw size={24} className="text-zinc-800" />
            <p className="font-semibold">No productivity data yet.</p>
            <p className="text-[10px] text-zinc-700">Complete a focus session, habit, or goal to see your chart.</p>
          </div>
        )}
      </div>

      {analyticsData?.summary && (
        <div className="mt-4 pt-4 border-t border-zinc-900 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-sm font-black text-blue-400">{analyticsData.summary.focusHoursThisMonth}h</p>
            <p className="text-[10px] text-zinc-600 font-medium">Focus hrs</p>
          </div>
          <div>
            <p className="text-sm font-black text-indigo-400">{analyticsData.summary.totalFocusSessions}</p>
            <p className="text-[10px] text-zinc-600 font-medium">Sessions</p>
          </div>
          <div>
            <p className="text-sm font-black text-emerald-400">{analyticsData.summary.completedRoadmapWeeks}</p>
            <p className="text-[10px] text-zinc-600 font-medium">Milestones</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyChart
