import { useRef, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"

const capabilityChips = [
  { label: "DSA", prompt: "Give me a quick review of Data Structures and Algorithms key concepts." },
  { label: "Java", prompt: "Explain Core Java fundamentals and best practices." },
  { label: "MERN", prompt: "Summarize MERN stack architecture and component communication." },
  { label: "GenAI", prompt: "Explain Generative AI, LLMs, and prompt engineering principles." },
  { label: "Interview Prep", prompt: "Give me top technical interview preparation tips and practice questions." }
]

const AIInput = ({ value, onChange, onSend, onSuggest, loading }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="p-3.5 sm:p-4 w-full shrink-0 space-y-2.5">

      {/* Modern AI Assistant Composer */}
      <div className="w-full flex gap-3 bg-[#0d1117] border border-indigo-500/20 focus-within:border-blue-500/50 focus-within:shadow-[0_0_25px_rgba(59,130,246,0.15)] rounded-2xl p-2.5 transition-all duration-300">
        <textarea
          ref={textareaRef}
          rows="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Java, DSA, MERN, GenAI..."
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none resize-none px-3 py-2 max-h-32 min-h-[40px] leading-relaxed font-medium"
          style={{ height: "auto" }}
        />
        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="w-10 h-10 shrink-0 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 disabled:hover:from-[#3b82f6] text-white rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg shadow-blue-600/20 disabled:shadow-none active:scale-95"
        >
          <Send size={15} />
        </button>
      </div>

      {/* Visually connected Topic Chips below composer */}
      <div className="flex items-center justify-between gap-2 px-1 flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles size={10} className="text-indigo-400" />
            Topics:
          </span>
          {capabilityChips.map((chip, idx) => (
            <div key={chip.label} className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onSuggest ? onSuggest(chip.prompt) : onChange(chip.prompt)}
                className="px-2.5 py-0.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-indigo-500/30 text-zinc-400 hover:text-white rounded-full text-[11px] font-medium cursor-pointer transition-all duration-150"
              >
                {chip.label}
              </button>
              {idx < capabilityChips.length - 1 && (
                <span className="text-zinc-700 text-[10px] hidden sm:inline">•</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-[10px] text-zinc-500 font-medium tracking-wide shrink-0">
          GrindPath AI Mentor
        </p>
      </div>
    </div>
  )
}

export default AIInput
