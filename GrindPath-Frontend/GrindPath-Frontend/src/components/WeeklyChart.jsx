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
import { CalendarRange } from "lucide-react"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-xl shadow-xl">
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Daily grind</p>
        <p className="text-sm font-bold text-blue-400 mt-0.5">{payload[0].value} Focus Hours</p>
      </div>
    )
  }
  return null
}

const WeeklyChart = () => {
  const { user } = useAuth()
  
  const data = (() => {
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
        hours: Math.round((sessions * 25) / 60 * 10) / 10
      }
    })
  })()

  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-900/80 mb-6">
        <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg">
          <CalendarRange size={16} />
        </div>
        <h3 className="font-bold text-zinc-200 text-sm">Productivity Analytics</h3>
      </div>

      <div className="w-full h-64 min-h-[256px]">
        {data && data.length > 0 ? (
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
                domain={[0, 10]}
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
          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
            No productivity data available yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default WeeklyChart
