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
  User
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot } from "lucide-react";

const UserCard = ({ collapsed = false, user, level, currentXP, progressPercent, streak }) => (
  <div className={`mb-6 ${collapsed ? "flex flex-col items-center gap-2" : "bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4"}`}>
    {!collapsed ? (
      <>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/10 text-sm shrink-0">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-semibold text-zinc-200 text-sm leading-tight truncate">{user?.name}</h4>
            <p className="text-zinc-500 text-[11px]">Level {level}</p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>{currentXP}/100 XP</span>
            <span className="text-indigo-400 font-bold">LVL {level}</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5 text-amber-500 text-[11px] font-semibold">
            <Flame size={12} className="fill-amber-500 animate-bounce" />
            <span>{streak} Day Streak!</span>
          </div>
        )}
      </>
    ) : (
      <>
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg text-sm">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <span className="text-[10px] text-indigo-400 font-bold bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-full">
          L{level}
        </span>
        {streak > 0 && (
          <div className="text-amber-500" title={`${streak} Day Streak!`}>
            <Flame size={14} className="fill-amber-500" />
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
  <nav className="space-y-1">
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
              ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/15"
              : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
          } ${
            !isCollapsed || mobile
              ? "gap-3 px-3.5 py-2.5"
              : "justify-center p-3"
          }`}
          title={isCollapsed && !mobile ? item.name : ""}
        >
          <Icon size={17} className="shrink-0" />

          {(!isCollapsed || mobile) && (
            <span className="text-sm">{item.name}</span>
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
    { name: "AI Mentor",path: "/ai-mentor",icon: Bot}
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
        className="hidden md:flex flex-col p-4 bg-zinc-950 border-r border-zinc-900 relative z-30 shrink-0"
      >
        <div className="flex-1 overflow-hidden">
          {/* Logo + Collapse Toggle */}
          <div className="flex items-center justify-between mb-7">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.span 
                  key="logo-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight"
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
                  className="text-lg font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mx-auto"
                >
                  GP
                </motion.span>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900 transition-colors ml-auto"
            >
              {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          </div>

          {/* User Gamification Card */}
           {user && <UserCard collapsed={isCollapsed} user={user} level={level} currentXP={currentXP} progressPercent={progressPercent} streak={streak} />}
 
           {/* Navigation */}
           <NavLinks navItems={navItems} location={location} toggleMobile={toggleMobile} isCollapsed={isCollapsed} />
        </div>

        {/* Footer */}
        <div className={`border-t border-zinc-900 pt-3 text-[10px] text-zinc-600 font-medium ${isCollapsed ? "text-center" : ""}`}>
          {isCollapsed ? "GP" : "Free Forever • v2.0"}
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
