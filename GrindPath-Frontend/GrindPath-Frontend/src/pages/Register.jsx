import { useState, useEffect } from "react"
import { registerUser } from "../services/authService"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, User, Target, ArrowRight } from "lucide-react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "GrindPath - Register Console"
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.warn("Please populate all registration entries.")
      return
    }

    setLoading(true)
    try {
      const userData = {
        name: name.trim(),
        email: email.trim(),
        password
      }

      await registerUser(userData)
      toast.success("Account created successfully! Please authenticate to boot console. 🎉")
      
      // Redirect to login page
      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || "Registration failed. Email might already exist."
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex items-center justify-center px-4 relative overflow-hidden select-none font-sans">
      
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] -translate-x-1/2 -translate-y-1/2 pointer-events-none pulse-glow" />
      <div className="absolute bottom-[15%] left-[15%] w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[15%] right-[15%] w-[250px] h-[250px] rounded-full bg-purple-600/5 blur-[90px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="w-full max-w-md glass-panel border border-zinc-800/80 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-2xl"
      >
        {/* Brand header */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <Link to="/" className="group mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 text-blue-400 rounded-2xl w-fit group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/10">
              <Target size={26} />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Register New Account</h1>
          <p className="text-zinc-400 text-xs font-medium max-w-xs leading-relaxed">
            Create an account below to unlock your personalized learning roadmaps and analytics.
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Account Name</label>
            <div className="glass-input rounded-xl px-4 py-3 flex items-center gap-3 transition">
              <User size={16} className="text-zinc-500 shrink-0" />
              <input 
                type="text" 
                placeholder="Marcus Carter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-100 text-xs flex-1 placeholder-zinc-600 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Email Address</label>
            <div className="glass-input rounded-xl px-4 py-3 flex items-center gap-3 transition">
              <Mail size={16} className="text-zinc-500 shrink-0" />
              <input 
                type="email" 
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-100 text-xs flex-1 placeholder-zinc-600 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Password Secret</label>
            <div className="glass-input rounded-xl px-4 py-3 flex items-center gap-3 transition">
              <Lock size={16} className="text-zinc-500 shrink-0" />
              <input 
                type="password" 
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-100 text-xs flex-1 placeholder-zinc-600 font-semibold"
                required
              />
            </div>
          </div>

          {/* Action trigger button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white py-3.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-600/20 active:scale-[0.99] mt-6"
          >
            <span>{loading ? "Creating secure account..." : "Initialize Profile"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-zinc-400 font-medium">
          Already registered?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition underline underline-offset-4">
            Log in to console
          </Link>
        </div>

      </motion.div>
    </div>
  )
}

export default Register