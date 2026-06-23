import { useState, useEffect } from "react"
import { loginUser } from "../services/authService"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Mail, Lock, Target, ArrowRight } from "lucide-react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "GrindPath - Authenticate Access"
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.warn("Please populate all credential entries.")
      return
    }

    setLoading(true)
    try {
      const userData = { email: email.trim(), password }
      const data = await loginUser(userData)
      
      if (data && data.token) {
        // Authenticate inside global AuthContext
        await login(data.token)
        toast.success("Welcome back! Login Successful. 🧠")
        navigate("/dashboard")
      } else {
        toast.error("Authentication token failed. Please try again.")
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || "Invalid email or password credentials."
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden select-none font-sans">
      
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[100px] h-[100px] rounded-full bg-indigo-500/5 blur-[50px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {/* Brand header */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-2xl w-fit">
            <Target size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-3">Access Grind Console</h1>
          <p className="text-zinc-500 text-xs font-semibold max-w-xs leading-relaxed">
            Enter credentials below to resume your daily habit and milestone grinds.
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</label>
            <div className="bg-zinc-950 border border-zinc-900 focus-within:border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 transition">
              <Mail size={16} className="text-zinc-650" />
              <input 
                type="email" 
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-200 text-xs flex-1 placeholder-zinc-700 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Password Key</label>
            <div className="bg-zinc-950 border border-zinc-900 focus-within:border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2.5 transition">
              <Lock size={16} className="text-zinc-650" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-200 text-xs flex-1 placeholder-zinc-700 font-semibold"
                required
              />
            </div>
          </div>

          {/* Action trigger button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/10 mt-6"
          >
            <span>{loading ? "Authenticating console..." : "Initialize Session"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-zinc-500 font-semibold">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register new account
          </Link>
        </div>

      </motion.div>
    </div>
  )
}

export default Login