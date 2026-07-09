import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Trash2, Bot } from "lucide-react"

// Components
import AIWelcome from "../components/ai/AIWelcome"
import AIChatBubble from "../components/ai/AIChatBubble"
import AIInput from "../components/ai/AIInput"
import AILoading from "../components/ai/AILoading"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import MobileBottomNav from "../components/MobileBottomNav"

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

  // Save chat history to localStorage locally
  useEffect(() => {
    localStorage.setItem("grindpath_chat_history", JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleAsk = async (promptOverride) => {
    const activeQuestion = (promptOverride || question).trim()
    if (!activeQuestion || loading) return

    // Add user message to state
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: activeQuestion
      }
    ])

    // Clear input box if sending from input area
    if (!promptOverride) {
      setQuestion("")
    }

    try {
      setLoading(true)

      // ── Conversation Memory ────────────────────────────────────────────────
      // Send previous messages as context within the question string to keep backend unchanged
      const previousHistory = messages
        .map((msg) => `${msg.role === "user" ? "User" : "GrindPath AI"}: ${msg.text}`)
        .join("\n\n")

      const finalPrompt = previousHistory
        ? `Here is the conversation history so far for context:\n${previousHistory}\n\nUser: ${activeQuestion}`
        : activeQuestion

      const response = await axios.post(API, {
        question: finalPrompt
      })

      // Add assistant response to state
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-900/8 blur-[150px] pointer-events-none pulse-glow" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-900/8 blur-[150px] pointer-events-none pulse-glow" />
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden pb-20 md:pb-0">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-0 bg-transparent relative">
          
          {/* Header Title inside Content Area */}
          <div className="flex items-center justify-between border-b border-zinc-900/80 px-4 md:px-6 py-4 bg-zinc-950/20 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex">
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md animate-pulse" />
                <div className="relative p-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl">
                  <Bot size={20} className="animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-base font-black text-white flex items-center gap-1.5 leading-none">
                  🤖 GrindPath AI
                  <Sparkles size={12} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                </h1>
                <p className="text-[10px] text-zinc-550 mt-1 font-semibold tracking-wide">
                  Your personal AI learning companion.
                </p>
              </div>
            </div>

            {!isEmpty && (
              <button
                onClick={handleClearChat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 text-[11px] font-bold rounded-xl transition-all cursor-pointer"
              >
                <Trash2 size={13} />
                <span>Clear Chat</span>
              </button>
            )}
          </div>

          {/* Messages Area - flex-1 scrollable */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scrollbar-thin flex flex-col min-h-0">
            <div className={isEmpty ? "my-auto flex flex-col justify-center" : "space-y-6 pb-6 w-full max-w-4xl mx-auto"}>
              <AnimatePresence mode="wait">
                {isEmpty ? (
                  <AIWelcome onSuggest={(prompt) => handleAsk(prompt)} />
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <AIChatBubble key={index} role={msg.role} text={msg.text} />
                    ))}
                    {loading && <AILoading />}
                  </>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Sticky Bottom Input */}
          <div className="w-full max-w-4xl mx-auto px-4 md:px-6 shrink-0">
            <AIInput
              value={question}
              onChange={setQuestion}
              onSend={() => handleAsk()}
              loading={loading}
            />
          </div>

        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  )
}

export default AIMentor