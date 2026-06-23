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
      color: "from-amber-500 to-orange-500 bg-amber-500/10 border-amber-500/20 text-amber-500"
    },
    {
      name: "Active Objectives",
      value: activeCount,
      desc: "Goals currently in grind",
      icon: Target,
      color: "from-blue-500 to-indigo-500 bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    {
      name: "Milestone Completed",
      value: completedCount,
      desc: `${totalCount} overall registered`,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-500 bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      name: "Current Level",
      value: `LVL ${level}`,
      desc: `${xp} accumulated XP`,
      icon: Award,
      color: "from-purple-500 to-pink-500 bg-purple-500/10 border-purple-500/20 text-purple-400"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
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
            className="glass-card rounded-3xl p-5 hover:border-zinc-700 transition duration-300 flex items-start gap-4"
          >
            <div className={`p-3 rounded-2xl border ${stat.color.split(" ").slice(2).join(" ")}`}>
              <Icon size={20} className={stat.color.split(" ").slice(-1)[0]} />
            </div>
            <div>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold block">{stat.name}</span>
              <p className="text-2xl font-black text-zinc-100 tracking-tight mt-1 leading-none">{stat.value}</p>
              <span className="text-zinc-500 text-[10px] block mt-1.5 font-medium">{stat.desc}</span>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default StatsGrid
