import { Bot } from "lucide-react"

const AILoading = () => {
  return (
    <div className="flex items-start gap-3 max-w-2xl mr-auto w-full">
      {/* Robot Avatar */}
      <div className="shrink-0 w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/30 mt-0.5">
        <Bot size={19} />
      </div>

      {/* Loading Card Bubble */}
      <div className="bg-[#0d1117] border border-indigo-500/20 rounded-2xl rounded-tl-xs px-5 py-3.5 min-w-[160px] shadow-xl">
        <p className="text-xs font-bold text-indigo-400 mb-2">GrindPath AI Mentor</p>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs font-medium">Thinking</span>
          <span className="flex gap-1 items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AILoading
