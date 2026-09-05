import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  ChevronLeft, 
  ChevronRight, 
  Target,
  Flame,
  Calendar,
  BarChart2,
  User,
  Bot
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const UserCard = ({ collapsed = false, user, level, currentXP, progressPercent, streak }) => (
  <div className={`mb-6 ${collapsed ? "flex flex-col items-center gap-2" : "bg-[#111827] border border-indigo-500/20 rounded-2xl p-4 shadow-lg"}`}>
    {!collapsed ? (
      <>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 text-base shrink-0">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-zinc-100 text-sm leading-tight truncate">{user?.name}</h4>
            <p className="text-zinc-400 text-xs font-medium">Level {level} Grinder</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-300 font-semibold">
            <span>{currentXP}/100 XP</span>
            <span className="text-indigo-400 font-bold">LVL {level}</span>
          </div>
          <div className="w-full bg-[#0b1020] h-2 rounded-full overflow-hidden border border-indigo-500/10">
            <div 
              className="bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 mt-3 text-amber-400 text-xs font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl w-fit">
            <Flame size={14} className="fill-amber-400 animate-bounce" />
            <span>{streak} Day Streak!</span>
          </div>
        )}
      </>
    ) : (
      <>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3b82f6] via-[#6366f1] to-[#a855f7] flex items-center justify-center font-black text-white shadow-lg text-base">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <span className="text-xs text-indigo-400 font-bold bg-[#111827] border border-indigo-500/30 px-2 py-0.5 rounded-full">
          L{level}
        </span>
        {streak > 0 && (
          <div className="text-amber-400" title={`${streak} Day Streak!`}>
            <Flame size={16} className="fill-amber-400" />
          </div>
        )}
      </>
    )}
  </div>
)

const NavLinks = ({
  mobile = false,
  navItems,
  location,
  toggleMobile,
  isCollapsed,
}) => (
  <nav className="space-y-1.5">
    {navItems.map((item) => {
      const Icon = item.icon

      const isActive =
        location.pathname === item.path ||
        (item.path === "/roadmaps" &&
          location.pathname.startsWith("/roadmaps"))

      return (
        <Link
          key={item.name}
          to={item.path}
          onClick={mobile ? toggleMobile : undefined}
          className={`flex items-center rounded-xl transition-all duration-200 group ${
            isActive
              ? "bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] text-white font-bold shadow-lg shadow-blue-600/25 border border-blue-400/30"
              : "text-zinc-300 hover:text-white hover:bg-[#111827] border border-transparent font-semibold"
          } ${
            !isCollapsed || mobile
              ? "gap-3 px-4 py-3 text-sm"
              : "justify-center p-3"
          }`}
          title={isCollapsed && !mobile ? item.name : ""}
        >
          <Icon size={18} className="shrink-0" />

          {(!isCollapsed || mobile) && (
            <span className="text-sm font-semibold">{item.name}</span>
          )}
        </Link>
      )
    })}
  </nav>
)

const Sidebar = () => {
  const { user, level, xp, streak } = useAuth()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Goals Board", path: "/goals", icon: Target },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: SettingsIcon },
    { name: "AI Mentor", path: "/ai-mentor", icon: Bot }
  ]

  const currentXP = xp % 100
  const progressPercent = Math.min(Math.max(currentXP, 0), 100)

  const sidebarVariants = {
    expanded: { width: "260px", transition: { duration: 0.3, ease: "easeInOut" } },
    collapsed: { width: "72px", transition: { duration: 0.3, ease: "easeInOut" } }
  }

  const toggleMobile = () => setIsOpenMobile(!isOpenMobile)

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="hidden md:flex flex-col p-4 bg-[#070b18] border-r border-indigo-500/20 relative z-30 shrink-0 select-none h-screen sticky top-0 overflow-y-auto"
      >
        <div className="flex-1 overflow-hidden">
          {/* Logo + Collapse Toggle */}
          <div className="flex items-center justify-between mb-6">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.span 
                  key="logo-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-2xl font-extrabold bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent tracking-tight"
                >
                  GrindPath
                </motion.span>
              ) : (
                <motion.span 
                  key="logo-short"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xl font-black bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mx-auto"
                >
                  GP
                </motion.span>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-[#111827] border border-transparent hover:border-indigo-500/20 transition-colors ml-auto cursor-pointer"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* User Gamification Card */}
          {user && <UserCard collapsed={isCollapsed} user={user} level={level} currentXP={currentXP} progressPercent={progressPercent} streak={streak} />}

          {/* Navigation Links */}
          <NavLinks navItems={navItems} location={location} toggleMobile={toggleMobile} isCollapsed={isCollapsed} />
        </div>

        {/* Footer */}
        <div className={`border-t border-indigo-500/15 pt-3 text-xs text-zinc-400 font-semibold ${isCollapsed ? "text-center" : ""}`}>
          {isCollapsed ? "GP" : "GrindPath • v2.0"}
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
