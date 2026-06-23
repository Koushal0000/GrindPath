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
  "/dashboard": "Dashboard",
  "/goals": "Goals Board",
  "/calendar": "Calendar",
  "/analytics": "Analytics",
  "/profile": "My Profile",
  "/settings": "Settings"
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

  const pageTitle = PAGE_TITLES[location.pathname] || "Workspace"

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
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-4 md:px-6 py-3.5 flex items-center justify-between">
      
      {/* Left — Page Context */}
      <div className="flex items-center gap-2 pl-12 md:pl-0">
        <h2 className="text-zinc-100 font-semibold text-lg">{pageTitle}</h2>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* Streak Badge */}
        {streak > 0 && (
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-xs font-bold cursor-help"
            title="Daily activity streak — keep it alive!"
          >
            <Flame size={13} className="fill-amber-500 animate-pulse" />
            <span className="hidden sm:inline">{streak}d</span>
            <span className="sm:hidden">{streak}</span>
          </div>
        )}

        {/* XP Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold">
          <Sparkles size={13} />
          <span>{xp} XP</span>
        </div>

        {/* Focus Mode Toggle */}
        <button
          id="focus-mode-toggle"
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 border ${
            isFocusMode 
              ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
              : "bg-blue-600/10 hover:bg-blue-600 border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white"
          }`}
        >
          {isFocusMode ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
          <span className="hidden sm:inline">{isFocusMode ? "Exit Focus" : "Focus Mode"}</span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            id="profile-menu-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg cursor-pointer hover:shadow-blue-500/30 transition-shadow"
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
                className="absolute right-0 mt-3 w-52 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden p-2 z-50"
              >
                <div className="px-3 py-2.5 border-b border-zinc-800 mb-1.5">
                  <p className="text-zinc-200 text-xs font-semibold truncate">{user?.name}</p>
                  <p className="text-zinc-500 text-[10px] truncate mt-0.5">{user?.email}</p>
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition text-xs text-left"
                  >
                    <Icon size={13} />
                    <span>{label}</span>
                  </button>
                ))}

                <div className="border-t border-zinc-800 mt-1.5 pt-1.5">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition text-xs text-left"
                  >
                    <LogOut size={13} />
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