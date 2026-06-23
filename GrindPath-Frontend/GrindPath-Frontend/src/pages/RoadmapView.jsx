import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { 
  getRoadmapWeeks, 
  generateRoadmap, 
  markWeekCompleted, 
  getProgress 
} from "../services/roadmapService"
import { getGoals } from "../services/goalService"
import { 
  ArrowLeft, 
  CheckCircle, 
  Compass, 
  BookmarkCheck,
  Play
} from "lucide-react"
import { toast } from "react-toastify"

const RoadmapView = () => {
  const { goalId } = useParams()
  const navigate = useNavigate()
  
  const [goal, setGoal] = useState(null)
  const [weeks, setWeeks] = useState([])
  const [progress, setProgress] = useState({ totalWeeks: 0, completedWeeks: 0, progress: "0%" })
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch goals to find current goal
      const allGoals = await getGoals()
      const currentGoal = allGoals.find(g => g._id === goalId)
      if (!currentGoal) {
        toast.error("Goal not found")
        navigate("/goals")
        return
      }
      setGoal(currentGoal)

      // Fetch roadmap weeks
      const roadmapWeeks = await getRoadmapWeeks(goalId)
      setWeeks(roadmapWeeks)

      // Fetch progress
      if (roadmapWeeks.length > 0) {
        const progData = await getProgress(goalId)
        setProgress(progData)
      }
    } catch (err) {
      console.log("No roadmap generated yet or service failed", err)
    } finally {
      setLoading(false)
    }
  }, [goalId, navigate])

  useEffect(() => {
    document.title = "GrindPath - Learning Milestone Roadmaps"
    const timer = setTimeout(() => {
      fetchData()
    }, 0)
    return () => clearTimeout(timer)
  }, [fetchData])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      await generateRoadmap(goalId)
      toast.success("Learning path generated successfully! 🚀")
      fetchData()
    } catch (err) {
      console.error(err)
      toast.error("Failed to generate learning path roadmap")
    } finally {
      setGenerating(false)
    }
  }

  const handleCompleteWeek = async (weekId) => {
    try {
      await markWeekCompleted(weekId)
      toast.success("Weekly milestone completed! +20 XP")
      fetchData()
    } catch (err) {
      console.error(err)
      toast.error("Failed to complete weekly milestone")
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold animate-pulse">Querying study roadmaps database...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Navigation and breadcrumb */}
      <div className="flex items-center gap-3">
        <Link 
          to="/goals"
          className="p-2 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl transition cursor-pointer"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Objectives board</span>
          <h2 className="text-zinc-350 text-sm font-semibold mt-0.5">/ Roadmap learning path</h2>
        </div>
      </div>

      {/* Goal details card */}
      {goal && (
        <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                {goal.category}
              </span>
              <span className="text-[10px] bg-zinc-950 px-2.5 py-0.5 border border-zinc-900 rounded-full font-bold text-zinc-500">
                {goal.level}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-3 tracking-tight leading-snug">
              Learning Path: {goal.title}
            </h1>
            <p className="text-zinc-500 text-xs mt-1.5 font-medium leading-relaxed max-w-xl">
              We've mapped out structured milestones based on your goal specifications. Check weeks complete to advance your percentage.
            </p>
          </div>

          {/* Progress box */}
          {weeks.length > 0 && (
            <div className="bg-zinc-950/80 border border-zinc-900 p-4.5 rounded-2xl md:w-72 space-y-3 shrink-0">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                Roadmap summary
              </div>
              <div className="grid gap-2 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="text-zinc-200 font-semibold">{goal.duration} Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Roadmap Weeks</span>
                  <span className="text-zinc-200 font-semibold">{progress.totalWeeks}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs font-semibold text-zinc-400">
                <span>Milestone Progress</span>
                <span className="text-indigo-400 font-bold">{progress.progress}</span>
              </div>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500 shadow-md shadow-indigo-650"
                  style={{ width: progress.progress }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-zinc-500 pt-1">
                <span>{progress.completedWeeks}/{progress.totalWeeks} Weeks completed</span>
                <span>Milestones</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ROADMAP CONTENT */}
      {weeks.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center border-zinc-900 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900/60 border border-zinc-850 text-zinc-650 flex items-center justify-center animate-pulse">
            <Compass size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-400">No Learning Path Initialized</h3>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-1 mx-auto font-medium">
              Initialize GrindPath's roadmap engine to automatically construct week-by-week technical curriculum objectives.
            </p>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={generating}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs cursor-pointer transition shadow-lg shadow-blue-600/10 flex items-center gap-1.5"
          >
            <Play size={12} className="fill-current" />
            <span>{generating ? "Initializing engine..." : "Generate Technical Curriculum"}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((weekItem) => (
            <div 
              key={weekItem._id}
              className={`glass-card rounded-3xl p-5 border transition-all duration-300 relative flex flex-col justify-between gap-4 ${
                weekItem.completed 
                  ? "border-emerald-500/20 bg-emerald-950/5" 
                  : "border-zinc-850 hover:border-zinc-700 bg-zinc-900/20"
              }`}
            >
              {weekItem.completed && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-black px-3.5 py-1 font-bold text-[9px] uppercase rounded-bl-2xl tracking-widest shadow-sm">
                  Completed
                </div>
              )}

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                  Week {weekItem.week} Objective
                </span>
                <h3 className="text-base font-bold text-zinc-200 mt-1 max-w-[85%] truncate" title={weekItem.title}>
                  {weekItem.title}
                </h3>

                {/* Topics list */}
                <div className="mt-4 space-y-2.5">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block">Curriculum Topics</span>
                  {weekItem.topics && weekItem.topics.map((top, tIdx) => (
                    <div 
                      key={tIdx} 
                      className="flex items-center gap-2.5 bg-zinc-950/30 border border-zinc-950 px-3 py-2 rounded-xl"
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                        weekItem.completed ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "border-zinc-700 text-zinc-500"
                      }`}>
                        {weekItem.completed && <CheckCircle size={10} />}
                      </div>
                      <span className="text-xs text-zinc-350 font-semibold">{top}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Action Button */}
              {!weekItem.completed ? (
                <button
                  onClick={() => handleCompleteWeek(weekItem._id)}
                  className="w-full py-2.5 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-indigo-500 text-indigo-400 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookmarkCheck size={14} />
                  <span>Mark Week Complete</span>
                </button>
              ) : (
                <div className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle size={14} />
                  <span>Milestone Achieved</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default RoadmapView
