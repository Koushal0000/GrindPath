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
      <div className="bg-[#111827] border border-indigo-500/30 px-4 py-2.5 rounded-2xl shadow-xl">
        <span className="text-zinc-100 text-xs font-bold">{payload[0].name}: {payload[0].value} Goal{payload[0].value !== 1 ? "s" : ""}</span>
      </div>
    )
  }
  return null
}

const CategoryStats = () => {
  const { analyticsData, goals } = useAuth()

  const chartData = (() => {
    if (analyticsData?.focusDistribution && analyticsData.focusDistribution.length > 0) {
      return analyticsData.focusDistribution
    }
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
    <div className="bg-[#111827] border border-indigo-500/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 rounded-xl">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-100 text-base">Focus Distribution</h3>
            <p className="text-zinc-400 text-xs font-medium mt-0.5">Goals by category</p>
          </div>
        </div>
        {analyticsData && (
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">Live</span>
        )}
      </div>

      <div className="w-full h-52 flex items-center justify-center min-w-0">
        {chartData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#111827"
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
                wrapperStyle={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center space-y-3">
            <Compass size={32} className="text-indigo-500/25 mx-auto" />
            <div>
              <p className="text-zinc-300 font-semibold text-sm">No goals yet.</p>
              <p className="text-zinc-500 text-xs mt-1">Create goals and generate roadmaps to see your focus distribution.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryStats
