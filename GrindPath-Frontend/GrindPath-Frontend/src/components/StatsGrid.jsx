import { useAuth } from "../context/AuthContext"
import { 
  Target, 
  Flame, 
  Award, 
  CheckCircle2 
} from "lucide-react"
import { motion } from "framer-motion"

const StatsGrid = () => {
  const { goals, streak, xp, level } = useAuth()

  const activeCount = goals.filter(g => !g.completed).length
  const completedCount = goals.filter(g => g.completed).length
  const totalCount = goals.length

  const stats = [
    {
      name: "Streak Discipline",
      value: streak === 0 ? "0 Days" : `${streak} Days`,
      desc: "Consecutive goal days",
      icon: Flame,
      accent: "text-amber-400",
      iconBg: "bg-amber-500/15 border-amber-500/30",
      border: "border-amber-500/15 hover:border-amber-500/30",
      glow: "hover:shadow-amber-500/10"
    },
    {
      name: "Active Objectives",
      value: activeCount,
      desc: "Goals currently in grind",
      icon: Target,
      accent: "text-[#3b82f6]",
      iconBg: "bg-blue-500/15 border-blue-500/30",
      border: "border-indigo-500/15 hover:border-indigo-500/35",
      glow: "hover:shadow-blue-500/10"
    },
    {
      name: "Milestones Completed",
      value: completedCount,
      desc: `${totalCount} goals total`,
      icon: CheckCircle2,
      accent: "text-emerald-400",
      iconBg: "bg-emerald-500/15 border-emerald-500/30",
      border: "border-indigo-500/15 hover:border-emerald-500/30",
      glow: "hover:shadow-emerald-500/10"
    },
    {
      name: "Current Level",
      value: `LVL ${level}`,
      desc: `${xp} accumulated XP`,
      icon: Award,
      accent: "text-[#a855f7]",
      iconBg: "bg-purple-500/15 border-purple-500/30",
      border: "border-indigo-500/15 hover:border-purple-500/30",
      glow: "hover:shadow-purple-500/10"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.name}
            variants={cardVariants}
            className={`bg-[#111827] border ${stat.border} ${stat.glow} rounded-3xl p-5 md:p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-4`}
          >
            <div className={`p-3 rounded-2xl border shrink-0 ${stat.iconBg}`}>
              <Icon size={22} className={stat.accent} />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block leading-tight">{stat.name}</span>
              <p className={`text-3xl font-black tracking-tight mt-1.5 leading-none ${stat.accent}`}>{stat.value}</p>
              <span className="text-zinc-400 text-xs block mt-2 font-medium">{stat.desc}</span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default StatsGrid
