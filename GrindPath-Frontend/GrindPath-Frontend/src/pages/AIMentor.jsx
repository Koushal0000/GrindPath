import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Bot, Circle } from "lucide-react"

// Components
import AIWelcome from "../components/ai/AIWelcome"
import AIChatBubble from "../components/ai/AIChatBubble"
import AIInput from "../components/ai/AIInput"
import AILoading from "../components/ai/AILoading"

const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/chat"
    : "https://grindpath.onrender.com/api/chat"

const AIMentor = () => {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("grindpath_chat_history")
    return saved ? JSON.parse(saved) : []
  })
  const [loading, setLoading] = useState(false)
  
  const chatEndRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("grindpath_chat_history", JSON.stringify(messages))
  }, [messages])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleAsk = async (promptOverride) => {
    const activeQuestion = (promptOverride || question).trim()
    if (!activeQuestion || loading) return

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: activeQuestion
      }
    ])

    if (!promptOverride) {
      setQuestion("")
    }

    try {
      setLoading(true)

      const previousHistory = messages
        .map((msg) => `${msg.role === "user" ? "User" : "GrindPath AI"}: ${msg.text}`)
        .join("\n\n")

      const finalPrompt = previousHistory
        ? `Here is the conversation history so far for context:\n${previousHistory}\n\nUser: ${activeQuestion}`
        : activeQuestion

      const response = await axios.post(API, {
        question: finalPrompt
      })

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.data.answer
        }
      ])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Something went wrong. Please try again."
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
    localStorage.removeItem("grindpath_chat_history")
  }

  const isEmpty = messages.length === 0

  return (
    <div className="space-y-5 max-w-5xl mx-auto select-none flex flex-col min-h-[calc(100vh-125px)] relative">

      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/8 blur-[120px] pointer-events-none rounded-full" />

      {/* Page Title & Clean Status Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Bot className="text-blue-500" size={26} />
              <span>AI Mentor</span>
            </h1>
            {/* Status indicator pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Circle size={7} className="fill-blue-400 animate-pulse" />
              Ready to help
            </span>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-1">
            Your personal learning companion for coding, DSA, interviews, and career growth.
          </p>
        </div>

        {!isEmpty && (
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0d1117] hover:bg-rose-500/10 border border-indigo-500/20 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-xs font-bold rounded-xl transition cursor-pointer shadow-md"
          >
            <Trash2 size={13} />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      {/* Main AI Workspace Container */}
      <div className="flex-1 flex flex-col justify-between bg-[#0d1117]/90 border border-indigo-500/20 rounded-3xl overflow-hidden shadow-2xl relative z-10 backdrop-blur-xl">

        {/* Scrollable Conversation / Hero Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 scrollbar-thin min-h-[360px] flex flex-col">
          <AnimatePresence mode="wait">
            {isEmpty ? (
              <AIWelcome onSuggest={(prompt) => handleAsk(prompt)} />
            ) : (
              <div className="space-y-6 pb-4 w-full flex flex-col">
                {messages.map((msg, index) => (
                  <AIChatBubble key={index} role={msg.role} text={msg.text} />
                ))}
                {loading && <AILoading />}
                <div ref={chatEndRef} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer Input Area */}
        <div className="w-full shrink-0 border-t border-white/[0.06] bg-[#07090e]/60 backdrop-blur-xl">
          <AIInput
            value={question}
            onChange={setQuestion}
            onSend={() => handleAsk()}
            onSuggest={(prompt) => handleAsk(prompt)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default AIMentor