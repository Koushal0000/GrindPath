import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Bot, User, Sparkles } from "lucide-react"

// Markdown component overrides — styled for dark SaaS theme with 15px body typography
const markdownComponents = {
  // Headings
  h1: ({ children }) => <h1 className="text-base sm:text-lg font-black text-white mt-4 mb-2 tracking-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm sm:text-base font-bold text-zinc-100 mt-3 mb-1.5 tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xs sm:text-sm font-bold text-zinc-200 mt-2.5 mb-1">{children}</h3>,

  // Paragraphs
  p: ({ children }) => <p className="text-zinc-200 text-sm sm:text-[15px] leading-[1.65] mb-2.5 font-normal">{children}</p>,

  // Lists
  ul: ({ children }) => <ul className="list-disc list-inside space-y-1.5 mb-3 text-zinc-200 text-sm sm:text-[15px] leading-[1.65] pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1.5 mb-3 text-zinc-200 text-sm sm:text-[15px] leading-[1.65] pl-1">{children}</ol>,
  li: ({ children }) => <li className="leading-[1.65]">{children}</li>,

  // Inline & Block Code
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="bg-[#07090e] text-blue-300 text-xs sm:text-[13px] font-mono px-1.5 py-0.5 rounded-md border border-indigo-500/25">
          {children}
        </code>
      )
    }
    return (
      <div className="relative my-3 rounded-xl overflow-hidden border border-indigo-500/20 shadow-lg">
        {className && (
          <div className="flex items-center justify-between bg-[#07090e] border-b border-indigo-500/15 px-3.5 py-1.5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-bold">
              {className.replace("language-", "")}
            </span>
          </div>
        )}
        <pre className="bg-[#07090e] text-xs sm:text-sm font-mono text-zinc-200 p-4 overflow-x-auto leading-relaxed">
          <code>{children}</code>
        </pre>
      </div>
    )
  },

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-blue-500/80 bg-blue-500/5 px-3.5 py-2 text-zinc-300 italic text-sm my-3 rounded-r-xl">
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-xs sm:text-sm border border-indigo-500/20 rounded-xl overflow-hidden">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#07090e] text-zinc-200 font-bold border-b border-indigo-500/20">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-white/[0.06]">{children}</tbody>,
  tr: ({ children }) => <tr className="text-zinc-300">{children}</tr>,
  th: ({ children }) => <th className="px-3.5 py-2.5 text-left font-bold">{children}</th>,
  td: ({ children }) => <td className="px-3.5 py-2.5">{children}</td>,

  // Text Accents
  strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
  em: ({ children }) => <em className="text-zinc-300 italic">{children}</em>,
  hr: () => <hr className="border-white/[0.08] my-4" />,
}

const AIChatBubble = ({ role, text }) => {
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-start gap-3 w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI Robot Avatar (Only for Assistant messages, left-aligned) */}
      {!isUser && (
        <div className="shrink-0 w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/30 mt-0.5">
          <Bot size={19} />
        </div>
      )}

      {/* Message Card Container */}
      <div
        className={`rounded-2xl shadow-xl transition-all duration-200 ${
          isUser
            ? "bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6] text-white px-4.5 py-3 rounded-tr-xs max-w-lg sm:max-w-xl w-fit"
            : "bg-[#0d1117] border border-indigo-500/20 text-zinc-100 px-5 py-4 rounded-tl-xs max-w-2xl sm:max-w-3xl w-full sm:w-auto"
        }`}
      >
        {/* Assistant Header Label */}
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold text-indigo-400">
            <span>GrindPath AI Mentor</span>
            <Sparkles size={12} className="text-amber-400 fill-amber-400" />
          </div>
        )}

        {/* Content Body */}
        {isUser ? (
          <p className="text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap font-medium text-white">{text}</p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {text}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {/* User Avatar (Only for User messages, right-aligned) */}
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-md border border-blue-400/30 mt-0.5">
          <User size={15} />
        </div>
      )}
    </motion.div>
  )
}

export default AIChatBubble
