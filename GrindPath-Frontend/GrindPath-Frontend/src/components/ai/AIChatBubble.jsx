import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Markdown component overrides — styled for dark theme
const markdownComponents = {
  // Headings
  h1: ({ children }) => <h1 className="text-lg font-black text-white mt-4 mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-base font-black text-zinc-100 mt-3 mb-1.5">{children}</h2>,
  h3: ({ children }) => <h3 className="text-sm font-bold text-zinc-200 mt-2 mb-1">{children}</h3>,

  // Paragraphs
  p: ({ children }) => <p className="text-zinc-300 text-sm leading-relaxed mb-2">{children}</p>,

  // Lists
  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2 text-zinc-300 text-sm">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2 text-zinc-300 text-sm">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  // Code blocks
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="bg-zinc-800 text-blue-300 text-xs font-mono px-1.5 py-0.5 rounded-md border border-zinc-700">
          {children}
        </code>
      )
    }
    return (
      <div className="relative my-3">
        {className && (
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 border-b-0 rounded-t-xl px-3 py-1.5">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              {className.replace("language-", "")}
            </span>
          </div>
        )}
        <pre className={`bg-zinc-950 border border-zinc-700 text-sm font-mono text-zinc-200 p-4 overflow-x-auto leading-relaxed ${className ? "rounded-b-xl" : "rounded-xl"}`}>
          <code>{children}</code>
        </pre>
      </div>
    )
  },

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-blue-500 pl-3 text-zinc-400 italic text-sm my-2">
      {children}
    </blockquote>
  ),

  // Table
  table: ({ children }) => (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-xs border border-zinc-800 rounded-xl overflow-hidden">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-zinc-900 text-zinc-300 font-bold">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-zinc-800">{children}</tbody>,
  tr: ({ children }) => <tr className="text-zinc-400">{children}</tr>,
  th: ({ children }) => <th className="px-3 py-2 text-left font-bold border-b border-zinc-800">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2">{children}</td>,

  // Strong/Em
  strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
  em: ({ children }) => <em className="text-zinc-300 italic">{children}</em>,

  // Horizontal rule
  hr: () => <hr className="border-zinc-800 my-4" />,
}

const AIChatBubble = ({ role, text }) => {
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse ml-auto max-w-xl" : "mr-auto max-w-3xl"}`}
    >
      {/* Avatar */}
      <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm mt-1 shadow-lg ${
        isUser
          ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-600/20"
          : "bg-zinc-800 border border-zinc-700"
      }`}>
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Bubble */}
      <div className={`rounded-2xl px-4 py-3.5 ${
        isUser
          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm"
          : "bg-zinc-900 border border-zinc-800 rounded-tl-sm"
      }`}>
        {/* Label */}
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
          isUser ? "text-blue-200" : "text-blue-400"
        }`}>
          {isUser ? "You" : "GrindPath AI"}
        </p>

        {/* Content */}
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {text}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  )
}

export default AIChatBubble
