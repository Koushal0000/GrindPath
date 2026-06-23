import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ACHIEVEMENTS } from "../context/AchievementsData"
import { motion } from "framer-motion"
import { 
  Flame, Sparkles, Target, Clock, Trophy, 
  TrendingUp, User, Download, ArrowRight, CheckCircle2, Calendar
} from "lucide-react"
import ExportButton from "../components/ExportButton"
import GitHubHeatmap from "../components/GitHubHeatmap"

const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="glass-panel p-5 rounded-2xl border border-zinc-800/50 flex items-center gap-4"
  >
    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shrink-0`}>
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="text-xl font-black text-white">{value}</p>
      <p className="text-xs text-zinc-500 font-medium mt-0.5">{label}</p>
    </div>
  </motion.div>
)

const Profile = () => {
  const { user, xp, level, streak, goals, pomodoroSessions, achievements } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "GrindPath – My Profile"
  }, [])

  const currentXP = xp % 100
  const progressPercent = Math.min(currentXP, 100)
  const completedGoals = goals.filter(g => g.completed).length
  const totalFocusHours = Math.round((pomodoroSessions * 25) / 60 * 10) / 10

  const stats = [
    { icon: Target, label: "Goals Completed", value: completedGoals, color: "from-blue-500 to-indigo-600", delay: 0.1 },
    { icon: Flame, label: "Current Streak", value: `${streak}d`, color: "from-amber-500 to-orange-600", delay: 0.15 },
    { icon: Clock, label: "Focus Hours", value: `${totalFocusHours}h`, color: "from-emerald-500 to-teal-600", delay: 0.2 },
    { icon: Sparkles, label: "Total XP", value: xp, color: "from-violet-500 to-purple-600", delay: 0.25 },
    { icon: Trophy, label: "Current Level", value: `Lv. ${level}`, color: "from-rose-500 to-pink-600", delay: 0.3 },
    { icon: TrendingUp, label: "Pomodoros Done", value: pomodoroSessions, color: "from-cyan-500 to-blue-600", delay: 0.35 }
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <User className="text-blue-500" size={22} />
          My Profile
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Your productivity identity and achievement history.</p>
      </motion.div>

      {/* Profile Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-panel p-6 rounded-2xl border border-zinc-800/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-full bg-gradient-to-l from-blue-500/8 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-black text-3xl text-white shadow-xl shadow-blue-500/20 shrink-0">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-black text-white">{user?.name}</h2>
            <p className="text-zinc-500 text-sm mt-0.5">{user?.email}</p>
            <div className="flex items-center flex-wrap gap-2 mt-3">
              <span className="text-xs bg-blue-500/15 border border-blue-500/25 text-blue-400 px-3 py-1 rounded-full font-bold">
                Level {level}
              </span>
              {streak > 0 && (
                <span className="text-xs bg-amber-500/15 border border-amber-500/25 text-amber-400 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Flame size={11} className="fill-amber-400" /> {streak} Day Streak
                </span>
              )}
              <span className="text-xs bg-violet-500/15 border border-violet-500/25 text-violet-400 px-3 py-1 rounded-full font-bold">
                {achievements.length} Achievements
              </span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="w-full sm:w-48 shrink-0">
            <div className="flex justify-between text-[11px] font-bold mb-1.5">
              <span className="text-zinc-400">XP Progress</span>
              <span className="text-indigo-400">{currentXP}/100</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
              />
            </div>
            <p className="text-[10px] text-zinc-600 mt-1 font-medium">{100 - currentXP} XP to Level {level + 1}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* GitHub Heatmap */}
      <GitHubHeatmap />

      {/* Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" />
            Achievements
          </h2>
          <span className="text-xs text-zinc-500 font-medium">{achievements.length}/{ACHIEVEMENTS.length} Unlocked</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((achievement, i) => {
            const isUnlocked = achievements.includes(achievement.id)
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                className={`relative p-4 rounded-2xl border text-center transition-all duration-300 ${
                  isUnlocked 
                    ? "border-zinc-700 bg-zinc-900/60 hover:border-zinc-600" 
                    : "border-zinc-800/40 bg-zinc-900/20 opacity-50 grayscale"
                }`}
              >
                {isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto mb-3 text-xl shadow-lg ${isUnlocked ? "" : "opacity-50"}`}>
                  {achievement.icon}
                </div>
                <p className={`text-xs font-bold ${isUnlocked ? "text-zinc-200" : "text-zinc-500"}`}>
                  {achievement.title}
                </p>
                <p className="text-[10px] text-zinc-600 mt-0.5 leading-tight">
                  {achievement.desc}
                </p>
                {!isUnlocked && (
                  <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider mt-1 block">Locked</span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Export Section */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50">
        <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-1">
          <Download size={15} className="text-blue-400" />
          Export Progress Report
        </h3>
        <p className="text-xs text-zinc-500 mb-4">Generate a PDF summary of your goals, streaks, XP, achievements, and productivity data.</p>
        <ExportButton />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "View Goals Board", path: "/goals", icon: Target },
          { label: "Check Analytics", path: "/analytics", icon: TrendingUp },
          { label: "Open Calendar", path: "/calendar", icon: Flame }
        ].map(({ label, path, icon: Icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl text-zinc-400 hover:text-zinc-200 text-xs font-semibold transition group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Icon size={14} />
              <span>{label}</span>
            </div>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Profile
