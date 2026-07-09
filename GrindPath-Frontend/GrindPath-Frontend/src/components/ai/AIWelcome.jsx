import { motion } from "framer-motion"

const suggestions = [
  { icon: "☕", label: "Explain Java OOP", prompt: "Explain Java Object-Oriented Programming concepts with examples." },
  { icon: "🧩", label: "Generate DSA Questions", prompt: "Generate 5 common Data Structures and Algorithms interview questions with brief solutions." },
  { icon: "⚡", label: "MERN Interview Prep", prompt: "Give me a MERN stack interview preparation guide covering MongoDB, Express, React, and Node.js." },
  { icon: "⚛️", label: "Explain React Hooks", prompt: "Explain the most important React Hooks (useState, useEffect, useRef, useMemo, useCallback) with code examples." }
]

const AIWelcome = ({ onSuggest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 gap-8 my-auto"
    >
      {/* Central greeting */}
      <div className="space-y-3">
        <div className="relative inline-flex">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl shadow-xl shadow-blue-600/20">
            🤖
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-4">
          How can I help you today?
        </h2>
        <p className="text-zinc-500 text-sm font-medium max-w-md">
          Ask me anything about coding, DSA, system design, interview prep, or learning roadmaps.
        </p>
      </div>

      {/* Suggestion cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-2xl">
        {suggestions.map((s, i) => (
          <motion.button
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            onClick={() => onSuggest(s.prompt)}
            className="group flex items-start gap-3 p-4 bg-zinc-900 border border-zinc-800/80 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] rounded-2xl text-left transition-all duration-300 cursor-pointer"
          >
            <span className="text-xl shrink-0">{s.icon}</span>
            <div>
              <p className="text-sm font-bold text-zinc-200 group-hover:text-blue-400 transition">{s.label}</p>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed line-clamp-2">{s.prompt}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default AIWelcome
