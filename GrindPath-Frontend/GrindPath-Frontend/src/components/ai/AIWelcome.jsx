import { motion } from "framer-motion"
import { Code2, Brain, Layers, Sparkles, Bot } from "lucide-react"

const suggestions = [
  {
    icon: Code2,
    title: "Explain Java OOP",
    desc: "Learn OOP concepts with simple examples.",
    prompt: "Explain Java Object-Oriented Programming concepts with examples.",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20"
  },
  {
    icon: Brain,
    title: "Generate DSA Questions",
    desc: "Practice interview-style DSA problems.",
    prompt: "Generate 5 common Data Structures and Algorithms interview questions with brief solutions.",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20"
  },
  {
    icon: Layers,
    title: "MERN Interview Prep",
    desc: "Prepare for MERN stack interviews.",
    prompt: "Give me a MERN stack interview preparation guide covering MongoDB, Express, React, and Node.js.",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    icon: Sparkles,
    title: "Explain React Hooks",
    desc: "Understand React Hooks with practical examples.",
    prompt: "Explain the most important React Hooks (useState, useEffect, useRef, useMemo, useCallback) with code examples.",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20"
  }
]

const AIWelcome = ({ onSuggest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center px-4 py-4 sm:py-6 max-w-3xl mx-auto my-auto gap-5"
    >
      {/* Central AI Hero Section */}
      <div className="space-y-2 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-lg animate-pulse" />
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
            <Bot size={24} />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight pt-1">
          How can I help you learn today?
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm font-medium max-w-md leading-relaxed">
          Ask about coding, DSA, system design, interview preparation, or learning roadmaps.
        </p>
      </div>

      {/* 4 Quick Action Prompt Suggestions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
        {suggestions.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.button
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
              onClick={() => onSuggest(s.prompt)}
              className="group flex items-start gap-3 p-3.5 bg-[#0d1117] border border-indigo-500/18 hover:border-indigo-500/40 rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-md hover:shadow-indigo-500/10 hover:-translate-y-0.5 relative overflow-hidden"
            >
              {/* Subtle inner hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className={`p-2 rounded-xl border shrink-0 ${s.iconBg} relative z-10`}>
                <Icon size={16} className={s.iconColor} />
              </div>
              <div className="min-w-0 relative z-10">
                <p className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition leading-snug">
                  {s.title}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default AIWelcome
