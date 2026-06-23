import { useState } from "react"
import { X, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const GoalModal = ({ isOpen, onClose, onSubmit, goalToEdit }) => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Tech")
  const [level, setLevel] = useState("Beginner")
  const [duration, setDuration] = useState("")
  const [dailyHours, setDailyHours] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [deadline, setDeadline] = useState("")
  const [notes, setNotes] = useState("")

  const [prevGoalToEdit, setPrevGoalToEdit] = useState(null)
  const [prevIsOpen, setPrevIsOpen] = useState(false)

  if (goalToEdit !== prevGoalToEdit || isOpen !== prevIsOpen) {
    setPrevGoalToEdit(goalToEdit)
    setPrevIsOpen(isOpen)
    
    if (goalToEdit) {
      setTitle(goalToEdit.title || "")
      setCategory(goalToEdit.category || "Tech")
      setLevel(goalToEdit.level || "Beginner")
      setDuration(goalToEdit.duration || "")
      setDailyHours(goalToEdit.dailyHours || "")
      
      setPriority(goalToEdit.priority || "Medium")
      setDeadline(goalToEdit.deadline ? goalToEdit.deadline.slice(0, 10) : "")
      setNotes(goalToEdit.notes || "")
    } else {
      setTitle("")
      setCategory("Tech")
      setLevel("Beginner")
      setDuration("")
      setDailyHours("")
      setPriority("Medium")
      setDeadline("")
      setNotes("")
    }
  }

  const categories = ["Tech", "Health", "Fitness", "Finance", "Career", "Custom"]
  const priorities = ["Low", "Medium", "High"]
  const levels = ["Beginner", "Intermediate", "Advanced"]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !duration || !dailyHours) return

    const goalData = {
      title: title.trim(),
      category,
      level,
      duration: Number(duration),
      dailyHours: Number(dailyHours),
      // Pass local metadata down to save it
      priority,
      deadline,
      notes
    }

    onSubmit(goalData)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Dark backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Form container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative z-10"
          >
            
            {/* Header section */}
            <div className="px-6 py-5 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl">
                  <Sparkles size={16} />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">
                  {goalToEdit ? "Modify Goal Objective" : "Create New Goal Objective"}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable form body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
              
              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Goal Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Master MERN Stack Development"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full glass-input p-4 rounded-xl text-zinc-200 text-sm font-semibold"
                  required
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Category select dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-300 text-sm font-medium cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-zinc-900 text-zinc-300">{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty select button */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Difficulty Level</label>
                  <select 
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-300 text-sm font-medium cursor-pointer"
                  >
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl} className="bg-zinc-900 text-zinc-300">{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time commit grid inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Duration select */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Duration (Days)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 30"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-200 text-sm font-semibold"
                    required
                  />
                </div>

                {/* Daily hours commit */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Daily Commitment (Hrs)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 4"
                    min="1"
                    max="24"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-200 text-sm font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Extra elements: Priority and Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Priority Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Goal Priority</label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-300 text-sm font-medium cursor-pointer"
                  >
                    {priorities.map((prio) => (
                      <option key={prio} value={prio} className="bg-zinc-900 text-zinc-300">{prio} Priority</option>
                    ))}
                  </select>
                </div>

                {/* Deadline Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Target Deadline Date</label>
                  <input 
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-300 text-sm font-medium cursor-pointer"
                  />
                </div>
              </div>

              {/* Notes Description */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Goal Notes & Description</label>
                <textarea 
                  placeholder="Summarize instructions, resources, or notes for this goal..."
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full glass-input p-3.5 rounded-xl text-zinc-250 text-xs leading-relaxed resize-none"
                />
              </div>

              {/* Action triggers button */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 py-3.5 rounded-xl text-sm font-bold transition border border-zinc-750 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-600/10 cursor-pointer"
                >
                  {goalToEdit ? "Update Goal" : "Add Goal"}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default GoalModal
