import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Check
} from "lucide-react"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const GoalCard = ({ goal, onDelete, onEdit, onToggleComplete, onUpdate }) => {
  const { gainXP, updateStreak } = useAuth()
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [newSubtaskText, setNewSubtaskText] = useState("")
  
  const priority = goal.priority || "Medium"
  const deadline = goal.deadline || ""
  const notes = goal.notes || ""
  const subtasks = goal.subtasks || []

  // Calculate dynamic progress
  const totalSubtasks = subtasks.length
  const completedSubtasksCount = subtasks.filter((s) => s.completed).length
  const progressPercent = totalSubtasks > 0 
    ? Math.round((completedSubtasksCount / totalSubtasks) * 100) 
    : (goal.completed ? 100 : 0)

  // Subtask actions
  const handleAddSubtask = (e) => {
    e.preventDefault()
    if (!newSubtaskText.trim()) return

    const newSub = {
      id: `${subtasks.length}_${newSubtaskText.trim()}`,
      text: newSubtaskText.trim(),
      completed: false
    }

    const updated = [...subtasks, newSub]
    setNewSubtaskText("")
    onUpdate(goal._id, { subtasks: updated })
    toast.success("Subtask added")
  }

  const toggleSubtask = (subtaskId) => {
    const updated = subtasks.map((s) => {
      if (s.id === subtaskId) {
        const nextCompleted = !s.completed
        if (nextCompleted) {
          gainXP(5) // Award 5 XP per subtask checked
        }
        return { ...s, completed: nextCompleted }
      }
      return s
    })

    onUpdate(goal._id, { subtasks: updated })

    // If all subtasks are complete, check if we should auto-toggle the main goal
    const allDone = updated.length > 0 && updated.every(s => s.completed)
    if (allDone && !goal.completed) {
      onToggleComplete(goal)
      gainXP(30)
      updateStreak()
    }
  }

  const deleteSubtask = (subtaskId) => {
    const updated = subtasks.filter((s) => s.id !== subtaskId)
    onUpdate(goal._id, { subtasks: updated })
    toast.success("Subtask deleted")
  }

  // Delete Goal sweetalert check
  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will delete the goal: "${goal.title}"`,
      icon: "warning",
      showCancelButton: true,
      background: "#18181b",
      color: "#f4f4f5",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(goal._id)
        Swal.fire({
          title: "Deleted!",
          text: "Your goal has been removed.",
          icon: "success",
          background: "#18181b",
          color: "#f4f4f5",
          confirmButtonColor: "#3b82f6"
        })
      }
    })
  }

  const handleRoadmapClick = () => {
    navigate(`/roadmaps/${goal._id}`)
  }

  const getPriorityColor = () => {
    switch (priority) {
      case "High": return "bg-rose-500/10 border-rose-500/30 text-rose-400"
      case "Low": return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
      default: return "bg-amber-500/10 border-amber-500/20 text-amber-400"
    }
  }

  return (
    <div 
      className={`glass-card rounded-3xl p-6 transition-all duration-300 relative overflow-hidden ${
        goal.completed 
          ? "border-emerald-500/20 bg-emerald-950/5 shadow-lg shadow-emerald-950/10" 
          : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/30"
      }`}
    >
      {/* Complete tag banner */}
      {goal.completed && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-black px-4 py-1 font-bold text-[10px] uppercase rounded-bl-2xl tracking-widest shadow-sm flex items-center gap-1">
          <CheckCircle size={10} className="stroke-[3]" />
          <span>Completed</span>
        </div>
      )}

      {/* Main info row */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
              {goal.category}
            </span>
            <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold">
              {goal.level}
            </span>
            <span className={`text-[10px] border px-2.5 py-0.5 rounded-full font-bold ${getPriorityColor()}`}>
              {priority}
            </span>
          </div>

          <h3 className="text-xl font-bold text-zinc-100 tracking-tight leading-snug mt-1 max-w-[85%] truncate" title={goal.title}>
            {goal.title}
          </h3>
        </div>

        {/* Details timeline specs */}
        <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400 font-medium bg-zinc-950/30 border border-zinc-900/50 p-3 rounded-2xl">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-blue-400" />
            <span>{goal.dailyHours} hrs / day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-indigo-400" />
            <span>Duration: {goal.duration} Days</span>
          </div>
          {deadline && (
            <div className="flex items-center gap-1.5 col-span-2 border-t border-zinc-900/60 pt-2 text-[11px] text-zinc-400 mt-1">
              <Calendar size={13} className="text-rose-400" />
              <span>Deadline: {new Date(deadline).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
            </div>
          )}
        </div>

        {/* Dynamic visual slider */}
        <div className="mt-1">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            <span className="text-zinc-400">Task Progress</span>
            <span className={goal.completed ? "text-emerald-400" : "text-blue-400"}>{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-950 h-2.5 border border-zinc-900 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                goal.completed 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400 glow-emerald" 
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action button triggers */}
        <div className="flex items-center justify-between mt-3 pt-4 border-t border-zinc-900/80">
          <div className="flex gap-2">
            <button 
              onClick={() => onToggleComplete(goal)}
              className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                goal.completed 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black" 
                  : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
              }`}
              title={goal.completed ? "Mark Incomplete" : "Mark Goal Completed"}
            >
              <CheckCircle size={15} />
            </button>
            <button 
              onClick={() => onEdit(goal)}
              className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              title="Edit Goal"
            >
              <Edit3 size={15} />
            </button>
            <button 
              onClick={handleDeleteClick}
              className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 hover:border-rose-500/30 text-zinc-500 hover:text-rose-400 transition cursor-pointer"
              title="Delete Goal"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRoadmapClick}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-md shadow-indigo-600/10"
            >
              <BookOpen size={13} />
              <span>🗺️ View Roadmap</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold cursor-pointer transition"
            >
              <span>Subtasks</span>
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>
      </div>

      {/* Subtasks dropdown container */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-zinc-900/60 space-y-3">
          {notes && (
            <div className="bg-zinc-950/40 border border-zinc-900 p-3 rounded-2xl">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block mb-1">Goal Notes</span>
              <p className="text-zinc-400 text-xs leading-relaxed">{notes}</p>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Subtasks checklist</span>
            {subtasks.length === 0 ? (
              <p className="text-zinc-500 text-xs italic">No subtasks added yet</p>
            ) : (
              <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar pr-1">
                {subtasks.map((sub) => (
                  <div 
                    key={sub.id} 
                    className="flex items-center justify-between bg-zinc-950/20 hover:bg-zinc-950/40 border border-zinc-900/40 p-2.5 rounded-xl transition"
                  >
                    <button 
                      onClick={() => toggleSubtask(sub.id)}
                      className="flex items-center gap-2.5 text-left cursor-pointer flex-1"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                        sub.completed 
                          ? "bg-blue-600 border-blue-500 text-white" 
                          : "border-zinc-700 hover:border-zinc-550"
                      }`}>
                        {sub.completed && <Check size={10} className="stroke-[3]" />}
                      </div>
                      <span className={`text-xs ${sub.completed ? "line-through text-zinc-500" : "text-zinc-300"}`}>
                        {sub.text}
                      </span>
                    </button>
                    <button 
                      onClick={() => deleteSubtask(sub.id)}
                      className="text-zinc-600 hover:text-rose-400 p-0.5 transition cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Subtask insert form */}
          <form onSubmit={handleAddSubtask} className="flex gap-2">
            <input 
              type="text"
              placeholder="Add subtask..."
              value={newSubtaskText}
              onChange={(e) => setNewSubtaskText(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:border-zinc-700 outline-none"
            />
            <button 
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default GoalCard
