import { useRef, useEffect } from "react"
import { Send } from "lucide-react"

const AIInput = ({ value, onChange, onSend, loading }) => {
  const textareaRef = useRef(null)

  // Auto-resize height of textarea based on content
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
    <div className="border-t border-zinc-900/80 bg-zinc-950/90 backdrop-blur-md p-4 w-full shrink-0">
      <div className="w-full flex gap-2 bg-zinc-900/60 border border-zinc-800/80 focus-within:border-blue-500/50 rounded-2xl p-2 transition-all duration-300">
        <textarea
          ref={textareaRef}
          rows="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Java, DSA, MERN, GenAI..."
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-550 outline-none resize-none px-3 py-2.5 max-h-32 min-h-[40px] leading-relaxed"
          style={{ height: "auto" }}
        />
        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="w-10 h-10 shrink-0 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800/50 disabled:text-zinc-650 text-white rounded-xl flex items-center justify-center transition-all duration-255 cursor-pointer shadow-lg shadow-blue-600/10 disabled:shadow-none"
        >
          <Send size={15} />
        </button>
      </div>
      <p className="text-[10px] text-zinc-650 text-center mt-2 font-medium tracking-wide">
        GrindPath AI may produce inaccurate info. Consider checking important sources.
      </p>
    </div>
  )
}

export default AIInput
