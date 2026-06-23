import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Target, Clock, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

const PRIORITY_COLORS = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500"
}

const Calendar = () => {
  const { goals } = useAuth()
  const navigate = useNavigate()
  const today = new Date()

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    document.title = "GrindPath – Calendar"
  }, [])

  // Build a map of date string -> goals
  const goalsByDate = goals.reduce((acc, goal) => {
    if (goal.deadline) {
      // Create a date object or use string directly if it's already YYYY-MM-DD
      const dateStr = typeof goal.deadline === 'string' ? goal.deadline : new Date(goal.deadline).toISOString()
      const key = dateStr.slice(0, 10)
      if (!acc[key]) acc[key] = []
      acc[key].push(goal)
    }
    return acc
  }, {})

  // Calendar grid helpers
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => {
    if (i < firstDay) return null
    return i - firstDay + 1
  })

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
    setSelectedDate(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
    setSelectedDate(null)
  }

  const todayKey = today.toISOString().slice(0, 10)
  
  // Goals for selected date
  const selectedKey = selectedDate 
    ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
    : null
  const selectedGoals = selectedKey ? (goalsByDate[selectedKey] || []) : []

  // Upcoming goals (next 14 days)
  const upcomingGoals = goals
    .filter(g => {
      if (!g.deadline || g.completed) return false
      const d = new Date(g.deadline)
      const diff = (d - today) / (1000 * 60 * 60 * 24)
      return diff >= 0 && diff <= 14
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

  // Overdue goals
  const overdueGoals = goals
    .filter(g => {
      if (!g.deadline || g.completed) return false
      return new Date(g.deadline) < today
    })

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <CalendarIcon className="text-blue-500" size={22} />
          Goal Calendar
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Visualize your deadlines and upcoming goals at a glance.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-2xl border border-zinc-800/50 overflow-hidden"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/50">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer">
                <ChevronLeft size={18} />
              </button>
              <h2 className="text-sm font-bold text-zinc-200">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-zinc-800/50">
              {DAY_NAMES.map(d => (
                <div key={d} className="py-2.5 text-center text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar cells */}
            <div className="grid grid-cols-7">
              {cells.map((day, idx) => {
                if (day === null) return <div key={idx} className="h-14 border-b border-r border-zinc-800/20" />
                
                const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const dayGoals = goalsByDate[dateKey] || []
                const isToday = dateKey === todayKey
                const isSelected = day === selectedDate
                const isOverdue = dayGoals.some(g => !g.completed) && new Date(dateKey) < today && dateKey !== todayKey

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                    className={`h-14 border-b border-r border-zinc-800/20 p-1.5 cursor-pointer transition-all duration-150 relative ${
                      isSelected ? "bg-blue-600/20 border-blue-500/30" :
                      isToday ? "bg-blue-500/8" :
                      "hover:bg-zinc-800/30"
                    }`}
                  >
                    <span className={`text-[11px] font-bold block text-center w-6 h-6 rounded-full flex items-center justify-center mx-auto ${
                      isToday ? "bg-blue-600 text-white" :
                      isSelected ? "bg-blue-500/30 text-blue-300" :
                      isOverdue ? "text-rose-400" :
                      "text-zinc-400"
                    }`}>
                      {day}
                    </span>
                    {/* Goal dots */}
                    <div className="flex justify-center gap-0.5 mt-1 flex-wrap">
                      {dayGoals.slice(0, 3).map((g, i) => (
                        <span 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full ${PRIORITY_COLORS[g.priority] || "bg-blue-400"} ${g.completed ? "opacity-40" : ""}`} 
                          title={g.title}
                        />
                      ))}
                      {dayGoals.length > 3 && (
                        <span className="text-[8px] text-zinc-500 font-bold">+{dayGoals.length - 3}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="px-5 py-3 border-t border-zinc-800/50 flex items-center gap-4 text-[10px] text-zinc-500 font-medium flex-wrap">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> High Priority</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Medium</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Low</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Today</div>
            </div>
          </motion.div>

          {/* Selected Day Panel */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 glass-panel rounded-2xl border border-zinc-800/50 p-5"
            >
              <h3 className="text-sm font-bold text-zinc-300 mb-3">
                {MONTH_NAMES[currentMonth]} {selectedDate}, {currentYear}
              </h3>
              {selectedGoals.length === 0 ? (
                <p className="text-zinc-600 text-xs font-medium">No goals due on this date.</p>
              ) : (
                <div className="space-y-2">
                  {selectedGoals.map(g => (
                    <div key={g._id} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${PRIORITY_COLORS[g.priority] || "bg-blue-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold ${g.completed ? "line-through text-zinc-600" : "text-zinc-200"}`}>{g.title}</p>
                        <p className="text-[10px] text-zinc-600">{g.category} • {g.priority}</p>
                      </div>
                      {g.completed && <span className="text-emerald-400 text-[10px] font-bold">Done</span>}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          
          {/* Overdue */}
          {overdueGoals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-rose-500/8 border border-rose-500/25 rounded-2xl p-4"
            >
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <AlertTriangle size={13} /> Overdue ({overdueGoals.length})
              </h3>
              <div className="space-y-2">
                {overdueGoals.slice(0, 4).map(g => (
                  <div key={g._id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <p className="text-xs text-zinc-400 truncate">{g.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-2xl border border-zinc-800/50 p-4"
          >
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Clock size={13} className="text-blue-400" /> Upcoming (14 days)
            </h3>
            {upcomingGoals.length === 0 ? (
              <p className="text-zinc-600 text-xs font-medium">No upcoming deadlines. Add deadlines to your goals!</p>
            ) : (
              <div className="space-y-2">
                {upcomingGoals.slice(0, 8).map(g => {
                  const daysLeft = Math.ceil((new Date(g.deadline) - today) / (1000 * 60 * 60 * 24))
                  return (
                    <div key={g._id} className="flex items-center gap-2.5 p-2.5 bg-zinc-900/60 rounded-xl border border-zinc-800/40">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${PRIORITY_COLORS[g.priority] || "bg-blue-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-300 truncate">{g.title}</p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">{g.category}</p>
                      </div>
                      <span className={`text-[10px] font-bold shrink-0 ${daysLeft <= 2 ? "text-rose-400" : daysLeft <= 5 ? "text-amber-400" : "text-zinc-500"}`}>
                        {daysLeft === 0 ? "Today" : `${daysLeft}d`}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <button
            onClick={() => navigate("/goals")}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-blue-600/15"
          >
            <Target size={13} />
            Manage Goals & Deadlines
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calendar
