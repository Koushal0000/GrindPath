import { useState, useEffect, useRef } from "react"
import { useAuth } from "../context/AuthContext"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Coffee,
  BrainCircuit
} from "lucide-react"
import { toast } from "react-toastify"

const PomodoroTimer = () => {
  const { gainXP, isFocusMode, setIsFocusMode, goals } = useAuth()
  
  // Timer durations (in seconds)
  const getTimerSetting = (key, defaultValue) => {
    try {
      const val = localStorage.getItem(key)
      return val ? parseInt(val) * 60 : defaultValue
    } catch {
      return defaultValue
    }
  }

  const WORK_TIME = getTimerSetting("grindpath_settings_focusTime", 25 * 60)
  const SHORT_BREAK = getTimerSetting("grindpath_settings_breakTime", 5 * 60)
  const LONG_BREAK = 15 * 60

  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const focusTime = localStorage.getItem("grindpath_settings_focusTime")
      return focusTime ? parseInt(focusTime) * 60 : 25 * 60
    } catch {
      return 25 * 60
    }
  })
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState("work") // work, short, long
  const [totalDuration, setTotalDuration] = useState(() => {
    try {
      const focusTime = localStorage.getItem("grindpath_settings_focusTime")
      return focusTime ? parseInt(focusTime) * 60 : 25 * 60
    } catch {
      return 25 * 60
    }
  })
  const [selectedGoal, setSelectedGoal] = useState("")

  const [prevMode, setPrevMode] = useState("work")

  if (mode !== prevMode) {
    setPrevMode(mode)
    const secs = mode === "work" ? WORK_TIME : (mode === "short" ? SHORT_BREAK : LONG_BREAK)
    setTimeLeft(secs)
    setTotalDuration(secs)
  }

  const intervalRef = useRef(null)
  
  // Create audio notification sound
  const audioContextRef = useRef(null)
  
  const playAlertSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioContextRef.current
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(880, ctx.currentTime) // A5 note
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2)
      
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 1.2)
    } catch (err) {
      console.log("Audio not allowed to play before user interaction", err)
    }
  }

  const handleTimerComplete = () => {
    setIsActive(false)
    playAlertSound()

    if (mode === "work") {
      // Award 50 XP
      gainXP(50)
      toast.success("Focus Session Complete! Earned 50 XP 🧠", {
        position: "top-center"
      })
      // Auto transition to short break
      setMode("short")
      setTimeLeft(SHORT_BREAK)
      setTotalDuration(SHORT_BREAK)
    } else {
      toast.info("Break ended! Back to grinding! 🚀")
      setMode("work")
      setTimeLeft(WORK_TIME)
      setTotalDuration(WORK_TIME)
    }
  }

  const handleCompleteRef = useRef(handleTimerComplete)
  useEffect(() => {
    handleCompleteRef.current = handleTimerComplete
  })

  // Countdowns
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleCompleteRef.current()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive])

  const togglePlay = () => {
    setIsActive(!isActive)
    // Initialize audio context on click to satisfy browser policies
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  const resetTimer = () => {
    setIsActive(false)
    if (mode === "work") {
      setTimeLeft(WORK_TIME)
      setTotalDuration(WORK_TIME)
    } else if (mode === "short") {
      setTimeLeft(SHORT_BREAK)
      setTotalDuration(SHORT_BREAK)
    } else {
      setTimeLeft(LONG_BREAK)
      setTotalDuration(LONG_BREAK)
    }
  }

  const handleModeChange = (newMode, duration) => {
    setIsActive(false)
    setMode(newMode)
    setTimeLeft(duration)
    setTotalDuration(duration)
  }

  // Format time
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const rem = secs % 60
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`
  }

  // Circular progress calculations
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (timeLeft / totalDuration) * circumference

  // Render full screen focus view
  if (isFocusMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center p-6 select-none">
        
        {/* Neon focus lines background */}
        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute top-[20%] right-[10%] w-[100px] h-[100px] rounded-full bg-purple-500/5 blur-[50px] pointer-events-none"></div>

        {/* Header action */}
        <button
          onClick={() => setIsFocusMode(false)}
          className="absolute top-6 right-6 flex items-center gap-1.5 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-xl text-xs font-semibold cursor-pointer transition"
        >
          <Minimize2 size={14} />
          <span>Exit Focus Mode</span>
        </button>

        <div className="w-full max-w-md flex flex-col items-center gap-8">
          
          <div className="text-center">
            <span className="text-[10px] tracking-widest font-black uppercase text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full">
              {mode === "work" ? "Focusing" : "Rest Mode"}
            </span>
            <h1 className="text-2xl font-bold text-zinc-300 mt-3 font-medium">Clear Your Mind. Grind.</h1>
          </div>

          {/* Active focus goal helper */}
          <div className="w-full">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-center block mb-2">Active Objective Task</label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-850 hover:border-zinc-800 rounded-2xl px-4 py-3.5 text-zinc-300 text-sm font-semibold text-center outline-none cursor-pointer"
            >
              <option value="">No specific goal selected (Pure Grind)</option>
              {goals.map(g => (
                <option key={g._id} value={g._id} className="bg-zinc-950 text-zinc-300">{g.title}</option>
              ))}
            </select>
          </div>

          {/* Big timer circle */}
          <div className="relative flex items-center justify-center">
            <svg className="w-64 h-64 transform -rotate-95">
              <circle
                cx="128"
                cy="128"
                r={radius}
                className="stroke-zinc-900"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r={radius}
                className={mode === "work" ? "stroke-blue-500" : "stroke-indigo-500"}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-5xl font-black text-white tracking-tight">{formatTime(timeLeft)}</span>
              <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">
                {mode === "work" ? "Session Running" : "Break Timer"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg ${
                isActive 
                  ? "bg-zinc-900 border border-zinc-850 text-zinc-300 hover:text-white" 
                  : "bg-blue-600 hover:bg-blue-500 text-white glow-indigo"
              }`}
            >
              {isActive ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </button>

            <button
              onClick={resetTimer}
              className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition cursor-pointer"
            >
              <RotateCcw size={20} />
            </button>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg">
            <BrainCircuit size={16} />
          </div>
          <h3 className="font-bold text-zinc-200 text-sm">Focus Arena</h3>
        </div>

        {/* Immersive button */}
        <button
          onClick={() => setIsFocusMode(true)}
          className="p-1.5 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl transition cursor-pointer"
          title="Enter Fullscreen Focus mode"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* Mode selection toggles */}
      <div className="flex bg-zinc-950/80 border border-zinc-900/80 p-1 rounded-2xl mb-4 gap-1">
        <button
          onClick={() => handleModeChange("work", WORK_TIME)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
            mode === "work" 
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" 
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <BrainCircuit size={13} />
          <span>Work</span>
        </button>
        <button
          onClick={() => handleModeChange("short", SHORT_BREAK)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
            mode === "short" 
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Coffee size={13} />
          <span>Break</span>
        </button>
      </div>

      {/* SVG Ring + Time display */}
      <div className="flex flex-col items-center justify-center py-2 relative">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="64"
            className="stroke-zinc-950"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="64"
            className={mode === "work" ? "stroke-blue-500" : "stroke-indigo-500"}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 64}
            strokeDashoffset={2 * Math.PI * 64 - (timeLeft / totalDuration) * 2 * Math.PI * 64}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-3xl font-black text-white tracking-tight">{formatTime(timeLeft)}</span>
          <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mt-0.5">
            {mode === "work" ? "Focus" : "Break"}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-900/60">
        <button
          onClick={togglePlay}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            isActive 
              ? "bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-zinc-400" 
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/10"
          }`}
        >
          {isActive ? <Pause size={14} /> : <Play size={14} />}
          <span>{isActive ? "Pause" : "Start"}</span>
        </button>
        
        <button
          onClick={resetTimer}
          className="px-3.5 bg-zinc-950 border border-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-xl transition cursor-pointer"
          title="Reset Timer"
        >
          <RotateCcw size={14} />
        </button>
      </div>

    </div>
  )
}

export default PomodoroTimer
