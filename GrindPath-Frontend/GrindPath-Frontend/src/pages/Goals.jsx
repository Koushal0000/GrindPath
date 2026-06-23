import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { 
  getGoals, 
  createGoal, 
  updateGoal, 
  deleteGoal 
} from "../services/goalService"
import GoalCard from "../components/GoalCard"
import GoalModal from "../components/GoalModal"
import { 
  PlusCircle, 
  Search, 
  ArrowUpDown, 
  ListFilter,
  Compass,
  Target
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"

const Goals = () => {
  const { goals, setGoals, gainXP, updateStreak } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editGoal, setEditGoal] = useState(null)

  // Filters & Searching
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [statusFilter, setStatusFilter] = useState("Active") // Active, Completed, Archived
  const [sortBy, setSortBy] = useState("Newest") // Newest, Oldest, Progress, Priority

  const categories = ["All", "Tech", "Health", "Fitness", "Finance", "Career", "Custom"]
  const statuses = ["Active", "Completed", "Archived"]
  const sortOptions = ["Newest", "Oldest", "Progress", "Priority"]

  useEffect(() => {
    document.title = "GrindPath - Goals Board"
    const timer = setTimeout(() => {
      const fetchGoals = async () => {
        try {
          const data = await getGoals()
          setGoals(data)
        } catch (err) {
          console.error("Failed to load goals", err)
        }
      }
      fetchGoals()
    }, 0)
    return () => clearTimeout(timer)
  }, [setGoals])

  // CRUD Operations
  const handleModalSubmit = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        duration: formData.duration,
        dailyHours: formData.dailyHours,
        priority: formData.priority,
        deadline: formData.deadline,
        notes: formData.notes
      }

      if (editGoal) {
        // Edit Goal
        const updated = await updateGoal(editGoal._id, { ...payload, subtasks: editGoal.subtasks || [] })
        setGoals(goals.map((g) => g._id === editGoal._id ? { ...updated } : g))
        toast.success("Goal objective updated successfully")
        setEditGoal(null)
      } else {
        // Create Goal
        const created = await createGoal({ ...payload, subtasks: [] })
        setGoals([...goals, created])
        gainXP(25) // 25 XP for goal creation
        toast.success("New goal objective created! +25 XP 🚀")
      }
      setModalOpen(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to process goal submission")
    }
  }

  const handleDelete = async (goalId) => {
    try {
      await deleteGoal(goalId)
      setGoals(goals.filter((g) => g._id !== goalId))
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete goal")
    }
  }

  const handleEditClick = (goal) => {
    setEditGoal(goal)
    setModalOpen(true)
  }

  const handleAddClick = () => {
    setEditGoal(null)
    setModalOpen(true)
  }

  const handleToggleComplete = async (goal) => {
    try {
      const nextCompletedState = !goal.completed
      const updated = await updateGoal(goal._id, {
        ...goal,
        completed: nextCompletedState
      })

      if (nextCompletedState) {
        gainXP(40) // 40 XP for goal completion
        updateStreak()
        toast.success("Goal complete! +40 XP 🏆", { position: "top-center" })
      }

      setGoals(goals.map((g) => g._id === goal._id ? { ...updated } : g))
    } catch (err) {
      console.error(err)
      toast.error("Failed to toggle goal complete status")
    }
  }

  const handleUpdate = async (goalId, updatedFields) => {
    try {
      const updated = await updateGoal(goalId, updatedFields)
      setGoals(goals.map(g => g._id === goalId ? { ...updated } : g))
    } catch (err) {
      console.error(err)
      toast.error("Failed to update goal")
    }
  }

  // Process filters, sorting, search
  const filteredGoals = goals.filter(g => {
    // Search match
    const searchMatch = g.title.toLowerCase().includes(search.toLowerCase()) || 
                        g.category.toLowerCase().includes(search.toLowerCase())
    
    // Category match
    const catMatch = selectedCategory === "All" || g.category === selectedCategory

    // Status / Archive match
    const isArchived = g.archived || false
    let statusMatch
    if (statusFilter === "Archived") {
      statusMatch = isArchived
    } else if (statusFilter === "Completed") {
      statusMatch = g.completed && !isArchived
    } else {
      statusMatch = !g.completed && !isArchived
    }

    return searchMatch && catMatch && statusMatch
  }).sort((a, b) => {
    if (sortBy === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
    if (sortBy === "Progress") {
      const progA = (a.subtasks && a.subtasks.length > 0) ? (a.subtasks.filter(s => s.completed).length / a.subtasks.length) : (a.completed ? 1 : 0)
      const progB = (b.subtasks && b.subtasks.length > 0) ? (b.subtasks.filter(s => s.completed).length / b.subtasks.length) : (b.completed ? 1 : 0)
      return progB - progA
    }
    if (sortBy === "Priority") {
      const prioVal = { High: 3, Medium: 2, Low: 1 }
      return (prioVal[b.priority] || 2) - (prioVal[a.priority] || 2)
    }
    // Default Newest
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className="space-y-6">
      
      {/* GOAL MODAL COMPONENT */}
      <GoalModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setEditGoal(null) }} 
        onSubmit={handleModalSubmit}
        goalToEdit={editGoal}
      />

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Target className="text-blue-500" />
            <span>Discipline Objective Board</span>
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-semibold mt-1">
            Build and monitor your long-term focus objectives. Customize checklists and technical roadmaps.
          </p>
        </div>

        <button 
          onClick={handleAddClick}
          className="px-4.5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-lg shadow-blue-600/10"
        >
          <PlusCircle size={14} />
          <span>New Goal Objective</span>
        </button>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="glass-panel p-4 rounded-3xl border-zinc-900 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search */}
          <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 focus-within:border-zinc-800 transition">
            <Search size={16} className="text-zinc-650" />
            <input 
              type="text"
              placeholder="Search objectives or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-zinc-200 text-xs flex-1 placeholder-zinc-700"
            />
          </div>

          <div className="flex gap-2">
            
            {/* Sorting select dropdown */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 cursor-pointer">
              <ArrowUpDown size={14} className="text-zinc-500" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-350 text-xs font-semibold cursor-pointer"
              >
                {sortOptions.map(opt => (
                  <option key={opt} value={opt} className="bg-zinc-950 text-zinc-400 font-semibold">{opt}</option>
                ))}
              </select>
            </div>

            {/* Status select dropdown */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 cursor-pointer">
              <ListFilter size={14} className="text-zinc-500" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-350 text-xs font-semibold cursor-pointer"
              >
                {statuses.map(st => (
                  <option key={st} value={st} className="bg-zinc-950 text-zinc-400 font-semibold">{st}</option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Category Tabs list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 custom-scrollbar border-t border-zinc-950 pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border ${
                selectedCategory === cat 
                  ? "bg-zinc-100 border-zinc-100 text-zinc-950 font-black shadow-md" 
                  : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-450 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GOALS CARDS LISTING GRID */}
      {filteredGoals.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center border-zinc-900 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900/60 border border-zinc-850 text-zinc-650 flex items-center justify-center animate-pulse">
            <Compass size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-400">No Goal Objectives Located</h3>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-1 mx-auto font-medium">
              Start by inserting a new focus objective card or tweak your filters at the panel above.
            </p>
          </div>
          <button 
            onClick={handleAddClick}
            className="mt-2 px-5 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl font-bold text-xs cursor-pointer border border-blue-500/20 hover:border-blue-500 transition"
          >
            Create Initial Goal
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGoals.map((g) => (
              <motion.div
                key={g._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <GoalCard 
                  goal={g}
                  onDelete={handleDelete}
                  onEdit={handleEditClick}
                  onToggleComplete={handleToggleComplete}
                  onUpdate={handleUpdate}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    </div>
  )
}

export default Goals
