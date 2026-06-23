import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { 
  Plus, 
  Trash2, 
  Check, 
  Compass,
  CalendarCheck
} from "lucide-react"

const HabitTracker = () => {
  const { habits, addHabit, toggleHabit, deleteHabit } = useAuth()
  const [newHabitText, setNewHabitText] = useState("")

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newHabitText.trim()) return
    addHabit(newHabitText.trim())
    setNewHabitText("")
  }

  // Calculate habit checklist progress percentage
  const total = habits.length
  const completed = habits.filter(h => h.completed).length
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 flex flex-col justify-between h-full">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
            <CalendarCheck size={16} />
          </div>
          <h3 className="font-bold text-zinc-200 text-sm">Daily Habits</h3>
        </div>
        <span className="text-[10px] bg-zinc-950 px-2.5 py-1 border border-zinc-900 rounded-full font-bold text-zinc-500">
          {completed}/{total} Done
        </span>
      </div>

      {/* Progress slider bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[11px] font-semibold text-zinc-500 mb-1">
          <span>Habit Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-zinc-950 h-1.5 border border-zinc-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-550"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Habits item checklist */}
      <div className="space-y-2 flex-1 overflow-y-auto max-h-[170px] custom-scrollbar pr-1 mb-4">
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-zinc-650">
            <Compass size={24} className="stroke-zinc-700 animate-spin" />
            <p className="text-zinc-650 text-xs italic mt-2">Add a daily habit checklist to build long-term routine discipline!</p>
          </div>
        ) : (
          habits.map((h) => (
            <div 
              key={h.id} 
              className="flex items-center justify-between bg-zinc-950/40 hover:bg-zinc-950/70 border border-zinc-900/60 px-3.5 py-2.5 rounded-xl transition"
            >
              <button 
                onClick={() => toggleHabit(h.id)}
                className="flex items-center gap-3 text-left cursor-pointer flex-1"
              >
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                  h.completed 
                    ? "bg-indigo-600 border-indigo-500 text-white" 
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/40"
                }`}>
                  {h.completed && <Check size={12} className="stroke-[3]" />}
                </div>
                <span className={`text-xs font-semibold ${h.completed ? "line-through text-zinc-500" : "text-zinc-300"}`}>
                  {h.text}
                </span>
              </button>
              <button 
                onClick={() => deleteHabit(h.id)}
                className="text-zinc-700 hover:text-rose-400 p-1 transition cursor-pointer"
                title="Remove Habit"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Habit input insertion form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input 
          type="text"
          placeholder="New daily habit..."
          value={newHabitText}
          onChange={(e) => setNewHabitText(e.target.value)}
          className="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:border-zinc-800 outline-none"
        />
        <button 
          type="submit"
          className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-md shadow-indigo-600/10 cursor-pointer"
        >
          <Plus size={16} />
        </button>
      </form>

    </div>
  )
}

export default HabitTracker
