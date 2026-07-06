import { useAuth } from "../context/AuthContext"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Compass } from "lucide-react"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl shadow-xl">
        <span className="text-zinc-200 text-xs font-bold">{payload[0].name}: {payload[0].value} Goal{payload[0].value !== 1 ? "s" : ""}</span>
      </div>
    )
  }
  return null
}

const CategoryStats = () => {
  const { analyticsData, goals } = useAuth()

  // Use backend analytics focus distribution when available
  const chartData = (() => {
    if (analyticsData?.focusDistribution && analyticsData.focusDistribution.length > 0) {
      return analyticsData.focusDistribution
    }
    // Fallback: client-side goal category grouping
    const counts = {}
    goals.forEach(g => {
      const cat = g.category || "General"
      counts[cat] = (counts[cat] || 0) + 1
    })
    const result = Object.keys(counts).map(key => ({ name: key, value: counts[key] }))
    return result.length > 0 ? result : null
  })()

  const COLORS = ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#ec4899", "#84cc16"]

  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
            <Compass size={16} />
          </div>
          <h3 className="font-bold text-zinc-200 text-sm">Focus Distribution</h3>
        </div>
        {analyticsData && (
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Live</span>
        )}
      </div>

      <div className="w-full h-56 flex items-center justify-center">
        {chartData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-zinc-950 focus:outline-none"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconSize={10}
                iconType="circle"
                wrapperStyle={{ fontSize: 11, color: "#a1a1aa" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-zinc-600 text-xs space-y-2">
            <Compass size={28} className="text-zinc-800 mx-auto" />
            <p className="font-semibold">No goals yet.</p>
            <p className="text-[10px] text-zinc-700">Create goals and generate roadmaps to see your focus distribution.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryStats
