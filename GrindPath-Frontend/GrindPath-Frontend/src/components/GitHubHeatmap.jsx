import { useAuth } from "../context/AuthContext"

const GitHubHeatmap = () => {
  const { goals, habits } = useAuth()
  
  // Create a 6-month array of dates
  const dates = []
  const today = new Date()
  const daysInHalfYear = 180
  
  for (let i = daysInHalfYear; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }

  // Calculate intensity based on goals and habits for mock realism
  // In a real app, this would use the activity log or explicit daily stats
  const getActivityIntensity = (dateStr) => {
    let score = 0
    // Did they complete goals?
    const goalsOnDate = goals.filter(g => g.createdAt && g.createdAt.startsWith(dateStr))
    score += goalsOnDate.length * 2
    
    // For today/recent, add habits score (approximate since habits reset daily, so we just use current habits for today)
    if (dateStr === today.toISOString().slice(0, 10)) {
      score += habits.filter(h => h.completed).length
    }

    if (score === 0) return 0
    if (score <= 2) return 1
    if (score <= 4) return 2
    if (score <= 6) return 3
    return 4
  }

  const getColor = (level) => {
    switch(level) {
      case 1: return "bg-blue-900/50"
      case 2: return "bg-blue-600"
      case 3: return "bg-blue-500"
      case 4: return "bg-blue-400"
      default: return "bg-zinc-800/40" // level 0
    }
  }

  return (
    <div className="glass-panel p-5 rounded-2xl border border-zinc-800/50">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Consistency Heatmap</h3>
      <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
        {/* We arrange in columns of 7 days (weeks) */}
        {Array.from({ length: Math.ceil(dates.length / 7) }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1">
            {dates.slice(colIndex * 7, colIndex * 7 + 7).map((dateStr, i) => (
              <div 
                key={i} 
                title={`${dateStr}`}
                className={`w-3.5 h-3.5 rounded-sm ${getColor(getActivityIntensity(dateStr))} transition-colors duration-200 hover:ring-2 ring-blue-500`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-zinc-500 font-medium">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-sm bg-zinc-800/40" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-900/50" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-400" />
        <span>More</span>
      </div>
    </div>
  )
}

export default GitHubHeatmap
