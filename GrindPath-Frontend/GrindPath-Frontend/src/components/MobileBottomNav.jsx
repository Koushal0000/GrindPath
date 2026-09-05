import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Target, Calendar, User } from "lucide-react"

const MobileBottomNav = () => {
  const location = useLocation()
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Profile", path: "/profile", icon: User }
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#07090e]/95 backdrop-blur-xl border-t border-zinc-800/60 z-50 flex items-center justify-around px-2 py-3 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path || (item.path === "/goals" && location.pathname.startsWith("/roadmaps"))
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              isActive ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default MobileBottomNav
