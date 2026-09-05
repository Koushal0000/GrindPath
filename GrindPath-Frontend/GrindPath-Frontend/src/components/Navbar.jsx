import { useState, useRef, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { 
  LogOut, 
  Flame, 
  Sparkles, 
  Settings as SettingsIcon,
  Play,
  Pause,
  User,
  Calendar,
  BarChart2
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const PAGE_TITLES = {
  "/dashboard": "Dashboard Overview",
  "/goals": "Goals Board",
  "/calendar": "Schedule & Calendar",
  "/analytics": "Productivity Analytics",
  "/profile": "My Profile",
  "/settings": "Settings",
  "/ai-mentor": "AI Mentor Assistant"
}

const Navbar = () => {
  const { 
    user, 
    logout, 
    streak, 
    xp, 
    isFocusMode, 
    setIsFocusMode
  } = useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const pageTitle = PAGE_TITLES[location.pathname] || (location.pathname.startsWith("/roadmaps") ? "Learning Roadmap" : "Workspace Overview")

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-40 bg-[#070b18]/85 backdrop-blur-xl border-b border-indigo-500/20 px-4 md:px-6 py-4 flex items-center justify-between">
      
      {/* Left — Page Context */}
      <div className="flex items-center gap-2 pl-12 md:pl-0">
        <h2 className="text-zinc-100 font-extrabold text-xl sm:text-2xl tracking-tight">{pageTitle}</h2>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">
        
        {/* Streak Badge */}
        {streak > 0 && (
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-xs font-extrabold shadow-sm"
            title="Daily activity streak — keep it alive!"
          >
            <Flame size={14} className="fill-amber-400 animate-pulse" />
            <span className="hidden sm:inline">{streak} Day Streak</span>
            <span className="sm:hidden">{streak}d</span>
          </div>
        )}

        {/* XP Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-extrabold shadow-sm">
          <Sparkles size={14} className="text-indigo-400" />
          <span>{xp} XP</span>
        </div>

        {/* Focus Mode Toggle */}
        <button
          id="focus-mode-toggle"
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all duration-300 border ${
            isFocusMode 
              ? "bg-gradient-to-r from-[#3b82f6] to-[#6366f1] border-blue-400 text-white shadow-lg shadow-blue-600/25" 
              : "bg-[#111827] border-indigo-500/25 text-indigo-300 hover:text-white hover:border-indigo-500/50"
          }`}
        >
          {isFocusMode ? <Pause size={13} className="fill-current" /> : <Play size={13} className="fill-current" />}
          <span className="hidden sm:inline">{isFocusMode ? "Exit Focus Mode" : "Focus Mode"}</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            id="profile-menu-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] flex items-center justify-center font-black text-white shadow-lg cursor-pointer hover:shadow-blue-500/30 transition-all border border-blue-400/30"
          >
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#111827] border border-indigo-500/30 shadow-2xl overflow-hidden p-2 z-50"
              >
                <div className="px-3.5 py-3 border-b border-indigo-500/20 mb-1.5">
                  <p className="text-zinc-100 text-xs font-bold truncate">{user?.name}</p>
                  <p className="text-zinc-400 text-[11px] truncate mt-0.5 font-medium">{user?.email}</p>
                </div>

                {[
                  { icon: User, label: "My Profile", path: "/profile" },
                  { icon: Calendar, label: "Calendar", path: "/calendar" },
                  { icon: BarChart2, label: "Analytics", path: "/analytics" },
                  { icon: SettingsIcon, label: "Settings", path: "/settings" }
                ].map(({ icon: Icon, label, path }) => (
                  <button 
                    key={path}
                    onClick={() => { setProfileOpen(false); navigate(path) }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-[#0b1020] transition text-xs font-semibold text-left"
                  >
                    <Icon size={14} className="text-indigo-400" />
                    <span>{label}</span>
                  </button>
                ))}

                <div className="border-t border-indigo-500/20 mt-1.5 pt-1.5">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition text-xs font-bold text-left"
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  )
}

export default Navbar