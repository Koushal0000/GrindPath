import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  getRoadmapWeeks,
  generateRoadmap,
  markWeekCompleted,
  getProgress,
  getRoadmapMeta
} from "../services/roadmapService"
import { getGoals } from "../services/goalService"
import {
  ArrowLeft,
  CheckCircle,
  BookmarkCheck,
  Play,
  Clock,
  Zap,
  Target,
  ChevronDown,
  Layers,
  Brain,
  Cloud,
  Code2,
  BarChart3,
  Sparkles
} from "lucide-react"
import { toast } from "react-toastify"

// ─── Domain Configuration ─────────────────────────────────────────────────────

const DOMAINS = [
  { value: "mern",  label: "MERN Stack",        icon: Layers,  color: "emerald" },
  { value: "java",  label: "Java Development",   icon: Code2,   color: "orange"  },
  { value: "genai", label: "Gen AI",             icon: Brain,   color: "purple"  },
  { value: "dsa",   label: "DSA",                icon: BarChart3, color: "blue"  },
  { value: "cloud", label: "Cloud Computing",    icon: Cloud,   color: "sky"     }
]

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"]

// Approximate topic counts per domain/level — used for client-side live preview only.
// The exact calculation happens server-side in roadmapGenerator.js.
const TOPIC_ESTIMATES = {
  mern:  { Beginner: 57, Intermediate: 40, Advanced: 40 },
  java:  { Beginner: 40, Intermediate: 40, Advanced: 40 },
  genai: { Beginner: 40, Intermediate: 40, Advanced: 40 },
  dsa:   { Beginner: 44, Intermediate: 40, Advanced: 40 },
  cloud: { Beginner: 40, Intermediate: 40, Advanced: 40 }
}

const HOURS_PER_TOPIC = { Beginner: 3, Intermediate: 2, Advanced: 1.5 }
const STUDY_DAYS_PER_WEEK = 5

// Tailwind color map for domain theme accents
const DOMAIN_COLORS = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/20",  text: "text-orange-400",  dot: "bg-orange-400"  },
  purple:  { bg: "bg-purple-500/10",  border: "border-purple-500/20",  text: "text-purple-400",  dot: "bg-purple-400"  },
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-400",    dot: "bg-blue-400"    },
  sky:     { bg: "bg-sky-500/10",     border: "border-sky-500/20",     text: "text-sky-400",     dot: "bg-sky-400"     }
}

const PACE_COLORS = {
  Slow:     "text-yellow-400",
  Moderate: "text-blue-400",
  Fast:     "text-emerald-400"
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function estimateWeeks(domain, skillLevel, hoursPerDay) {
  const topics = TOPIC_ESTIMATES[domain]?.[skillLevel] || 40
  const hpt = HOURS_PER_TOPIC[skillLevel] || 2
  const totalHours = topics * hpt
  const hoursPerWeek = Number(hoursPerDay) * STUDY_DAYS_PER_WEEK
  return Math.ceil(totalHours / Math.max(hoursPerWeek, 1))
}

function getLearningPace(hoursPerDay) {
  const h = Number(hoursPerDay)
  if (h <= 2) return "Slow"
  if (h <= 4) return "Moderate"
  return "Fast"
}

function getDomainConfig(domainValue) {
  return DOMAINS.find(d => d.value === domainValue) || DOMAINS[0]
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

// Single custom select dropdown styled to match GrindPath's dark theme
const StyledSelect = ({ value, onChange, options, placeholder, id }) => (
  <div className="relative">
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full appearance-none bg-zinc-950/80 border border-zinc-800 text-zinc-200 text-sm font-semibold rounded-2xl px-4 py-3 pr-10 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition cursor-pointer"
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(opt => (
        <option
          key={typeof opt === "string" ? opt : opt.value}
          value={typeof opt === "string" ? opt : opt.value}
          className="bg-zinc-950 text-zinc-200"
        >
          {typeof opt === "string" ? opt : opt.label}
        </option>
      ))}
    </select>
    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const RoadmapView = () => {
  const { goalId } = useParams()
  const navigate = useNavigate()

  const [goal, setGoal]         = useState(null)
  const [weeks, setWeeks]       = useState([])
  const [progress, setProgress] = useState({ totalWeeks: 0, completedWeeks: 0, progress: "0%" })
  const [roadmapMeta, setRoadmapMeta] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [generating, setGenerating] = useState(false)

  // Setup form state — pre-filled from goal when available
  const [setupData, setSetupData] = useState({
    domain:     "mern",
    skillLevel: "Beginner",
    hoursPerDay: 2
  })

  // ── Fetch all data ────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const allGoals = await getGoals()
      const currentGoal = allGoals.find(g => g._id === goalId)
      if (!currentGoal) {
        toast.error("Goal not found")
        navigate("/goals")
        return
      }
      setGoal(currentGoal)

      // Pre-fill setup form from goal fields
      setSetupData(prev => ({
        ...prev,
        skillLevel:  currentGoal.level      || prev.skillLevel,
        hoursPerDay: currentGoal.dailyHours || prev.hoursPerDay
      }))

      // Fetch roadmap weeks
      const roadmapWeeks = await getRoadmapWeeks(goalId)
      setWeeks(roadmapWeeks)

      // Fetch progress
      if (roadmapWeeks.length > 0) {
        const progData = await getProgress(goalId)
        setProgress(progData)
      }

      // Fetch persisted meta (null if no roadmap yet — handled gracefully)
      const meta = await getRoadmapMeta(goalId)
      setRoadmapMeta(meta)

    } catch (err) {
      console.error("fetchData error:", err)
    } finally {
      setLoading(false)
    }
  }, [goalId, navigate])

  useEffect(() => {
    document.title = "GrindPath - Learning Milestone Roadmaps"
    const timer = setTimeout(() => { fetchData() }, 0)
    return () => clearTimeout(timer)
  }, [fetchData])

  // ── Live preview — recalculates instantly as form inputs change ───────────
  const preview = useMemo(() => {
    const estWeeks = estimateWeeks(setupData.domain, setupData.skillLevel, setupData.hoursPerDay)
    const pace = getLearningPace(setupData.hoursPerDay)
    return { estWeeks, pace }
  }, [setupData])

  // ── Generate roadmap ──────────────────────────────────────────────────────
  const handleGenerate = async () => {
    const h = Number(setupData.hoursPerDay)
    if (!setupData.domain) {
      toast.error("Please select a domain")
      return
    }
    if (h < 1 || h > 16) {
      toast.error("Hours per day must be between 1 and 16")
      return
    }

    setGenerating(true)
    try {
      await generateRoadmap(goalId, {
        domain:      setupData.domain,
        skillLevel:  setupData.skillLevel,
        hoursPerDay: h
      })
      toast.success("Learning roadmap generated successfully! 🚀")
      fetchData()
    } catch (err) {
      console.error(err)
      toast.error("Failed to generate roadmap")
    } finally {
      setGenerating(false)
    }
  }

  // ── Mark week complete ────────────────────────────────────────────────────
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

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="mt-4 text-xs font-semibold animate-pulse">Querying study roadmaps database...</p>
      </div>
    )
  }

  // ── Domain config for meta strip ─────────────────────────────────────────
  const activeDomainConfig = roadmapMeta ? getDomainConfig(roadmapMeta.domain) : null
  const activeDomainColors = activeDomainConfig ? DOMAIN_COLORS[activeDomainConfig.color] : null

  // ── Setup domain config for setup panel icon ──────────────────────────────
  const setupDomainConfig  = getDomainConfig(setupData.domain)
  const setupDomainColors  = DOMAIN_COLORS[setupDomainConfig.color]
  const SetupDomainIcon    = setupDomainConfig.icon

  return (
    <div className="space-y-6">

      {/* ── Navigation Breadcrumb ─────────────────────────────────────────── */}
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

      {/* ── Goal Details Card ─────────────────────────────────────────────── */}
      {goal && (
        <div className="bg-zinc-900/30 border border-zinc-900 p-6 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
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
              Week-by-week technical curriculum mapped to your goal specifications.
            </p>

            {/* Roadmap meta strip — shown after generation */}
            {roadmapMeta && activeDomainColors && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${activeDomainColors.bg} ${activeDomainColors.border} ${activeDomainColors.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeDomainColors.dot}`} />
                  {activeDomainConfig.label}
                </span>
                <span className="text-zinc-700 text-xs">•</span>
                <span className="text-[11px] font-semibold text-zinc-400">
                  {roadmapMeta.skillLevel}
                </span>
                <span className="text-zinc-700 text-xs">•</span>
                <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                  <Clock size={11} />
                  {roadmapMeta.hoursPerDay} hrs/day
                </span>
                <span className="text-zinc-700 text-xs">•</span>
                <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                  <Zap size={11} />
                  Est. {roadmapMeta.estimatedDuration}
                </span>
                <span className="text-zinc-700 text-xs">•</span>
                <span className={`text-[11px] font-bold ${PACE_COLORS[roadmapMeta.learningPace] || "text-zinc-400"}`}>
                  {roadmapMeta.learningPace} Pace
                </span>
              </div>
            )}
          </div>

          {/* Progress box — only shown when weeks exist */}
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
                {roadmapMeta?.totalTopics && (
                  <div className="flex justify-between">
                    <span>Total Topics</span>
                    <span className="text-zinc-200 font-semibold">{roadmapMeta.totalTopics}</span>
                  </div>
                )}
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

      {/* ── ROADMAP CONTENT ───────────────────────────────────────────────── */}

      {weeks.length === 0 ? (

        /* ── Setup Panel (no roadmap generated yet) ──────────────────────── */
        <div className="glass-panel rounded-3xl border-zinc-900 overflow-hidden">

          {/* Panel header */}
          <div className="px-6 pt-6 pb-5 border-b border-zinc-900/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Sparkles size={16} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-100 tracking-tight">Configure Your Learning Path</h3>
              <p className="text-zinc-500 text-xs font-medium mt-0.5">
                Set your domain, level, and pace to generate a personalized roadmap.
              </p>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-8">

            {/* ── Left: Form Fields ───────────────────────────────────────── */}
            <div className="space-y-5">

              {/* Domain */}
              <div className="space-y-2">
                <label htmlFor="domain-select" className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest block">
                  Domain
                </label>
                <StyledSelect
                  id="domain-select"
                  value={setupData.domain}
                  onChange={v => setSetupData(prev => ({ ...prev, domain: v }))}
                  options={DOMAINS.map(d => ({ value: d.value, label: d.label }))}
                />
                {/* Domain badge */}
                <div className={`inline-flex items-center gap-2 mt-1 px-3 py-1.5 rounded-xl border text-xs font-bold ${setupDomainColors.bg} ${setupDomainColors.border} ${setupDomainColors.text}`}>
                  <SetupDomainIcon size={13} />
                  <span>{setupDomainConfig.label}</span>
                </div>
              </div>

              {/* Skill Level */}
              <div className="space-y-2">
                <label htmlFor="level-select" className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest block">
                  Skill Level
                </label>
                <StyledSelect
                  id="level-select"
                  value={setupData.skillLevel}
                  onChange={v => setSetupData(prev => ({ ...prev, skillLevel: v }))}
                  options={SKILL_LEVELS}
                />
                <p className="text-[11px] text-zinc-600 font-medium">
                  {setupData.skillLevel === "Beginner"     && "No prior experience required"}
                  {setupData.skillLevel === "Intermediate" && "Some experience with programming concepts"}
                  {setupData.skillLevel === "Advanced"     && "Experienced developer looking to deepen expertise"}
                </p>
              </div>

              {/* Hours per Day */}
              <div className="space-y-2">
                <label htmlFor="hours-input" className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest block">
                  Hours Per Day
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="hours-input"
                    type="number"
                    min={1}
                    max={16}
                    value={setupData.hoursPerDay}
                    onChange={e => setSetupData(prev => ({ ...prev, hoursPerDay: Math.max(1, Math.min(16, Number(e.target.value))) }))}
                    className="w-24 bg-zinc-950/80 border border-zinc-800 text-zinc-200 text-sm font-bold rounded-2xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition text-center"
                  />
                  <span className="text-zinc-500 text-sm font-semibold">hrs / day</span>
                </div>
                <p className="text-[11px] text-zinc-600 font-medium">
                  Recommended: 1–2 hrs (casual) · 3–4 hrs (focused) · 5+ hrs (intensive)
                </p>
              </div>

            </div>

            {/* ── Right: Live Preview ─────────────────────────────────────── */}
            <div className="flex flex-col gap-4">

              {/* Preview card */}
              <div className="flex-1 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 space-y-4">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  Roadmap Preview
                </div>

                {/* Estimated Duration */}
                <div className="flex items-center justify-between py-3 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Clock size={13} className="text-indigo-400" />
                    </div>
                    <span className="text-xs font-semibold">Estimated Duration</span>
                  </div>
                  <span className="text-sm font-black text-zinc-100">
                    ~{preview.estWeeks} {preview.estWeeks === 1 ? "week" : "weeks"}
                  </span>
                </div>

                {/* Learning Pace */}
                <div className="flex items-center justify-between py-3 border-b border-zinc-900">
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Zap size={13} className="text-emerald-400" />
                    </div>
                    <span className="text-xs font-semibold">Learning Pace</span>
                  </div>
                  <span className={`text-sm font-black ${PACE_COLORS[preview.pace]}`}>
                    {preview.pace}
                  </span>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Target size={13} className="text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold">Difficulty</span>
                  </div>
                  <span className="text-sm font-black text-zinc-100">{setupData.skillLevel}</span>
                </div>

                <p className="text-[10px] text-zinc-600 font-medium leading-relaxed pt-1">
                  * Duration is estimated based on topic count and your daily study hours. Actual duration may vary.
                </p>
              </div>

              {/* Generate button */}
              <button
                id="generate-roadmap-btn"
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black text-sm cursor-pointer transition-all duration-200 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
              >
                {generating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating Roadmap...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} className="fill-current group-hover:scale-110 transition-transform" />
                    <span>Generate Roadmap</span>
                  </>
                )}
              </button>

            </div>
          </div>
        </div>

      ) : (

        /* ── Week Cards Grid ──────────────────────────────────────────────── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((weekItem) => (
            <div
              key={weekItem._id}
              id={`week-card-${weekItem.week}`}
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

                {/* Estimated study hours badge */}
                {weekItem.estimatedStudyHours && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-zinc-500 bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded-full">
                    <Clock size={9} />
                    ~{weekItem.estimatedStudyHours} hrs
                  </span>
                )}

                {/* Learning Objectives */}
                {weekItem.learningObjectives && weekItem.learningObjectives.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold block">Learning Objectives</span>
                    {weekItem.learningObjectives.map((obj, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-2">
                        <div className={`w-3.5 h-3.5 mt-0.5 rounded-sm border flex items-center justify-center shrink-0 ${
                          weekItem.completed
                            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                            : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                        }`}>
                          {weekItem.completed
                            ? <CheckCircle size={9} />
                            : <Target size={9} />
                          }
                        </div>
                        <span className={`text-[11px] leading-relaxed font-medium ${
                          weekItem.completed ? "text-zinc-500 line-through" : "text-zinc-400"
                        }`}>{obj}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Topics list */}
                <div className="mt-4 space-y-2">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold block">Curriculum Topics</span>
                  {weekItem.topics && weekItem.topics.map((top, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-center gap-2.5 bg-zinc-950/30 border border-zinc-950 px-3 py-2 rounded-xl"
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                        weekItem.completed
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : "border-zinc-700 text-zinc-500"
                      }`}>
                        {weekItem.completed && <CheckCircle size={10} />}
                      </div>
                      <span className="text-xs text-zinc-350 font-semibold">{top}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action button */}
              {!weekItem.completed ? (
                <button
                  onClick={() => handleCompleteWeek(weekItem._id)}
                  id={`complete-week-${weekItem.week}`}
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
