import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Goals from "./pages/Goals"
import RoadmapView from "./pages/RoadmapView"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Calendar from "./pages/Calendar"
import Analytics from "./pages/Analytics"
import ProtectedRoute from "./components/ProtectedRoute"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import MobileBottomNav from "./components/MobileBottomNav"

const DashboardLayout = ({ children }) => {
  const { isFocusMode } = useAuth()

  if (isFocusMode) {
    return <div className="min-h-screen bg-black text-white">{children}</div>
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex relative overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="fixed top-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-900/8 blur-[150px] pointer-events-none pulse-glow" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-900/8 blur-[150px] pointer-events-none pulse-glow" />
      
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden pb-20 md:pb-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}

const AppRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="w-full h-full border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-black text-xs">GP</div>
        </div>
        <p className="mt-4 text-zinc-500 text-sm animate-pulse">Loading GrindPath...</p>
      </div>
    )
  }

  const authRedirect = (element) => user ? <Navigate to="/dashboard" replace /> : element

  const protectedPage = (element) => (
    <ProtectedRoute>
      <DashboardLayout>{element}</DashboardLayout>
    </ProtectedRoute>
  )

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={authRedirect(<Login />)} />
      <Route path="/register" element={authRedirect(<Register />)} />
      <Route path="/dashboard" element={protectedPage(<Dashboard />)} />
      <Route path="/goals" element={protectedPage(<Goals />)} />
      <Route path="/roadmaps/:goalId" element={protectedPage(<RoadmapView />)} />
      <Route path="/calendar" element={protectedPage(<Calendar />)} />
      <Route path="/analytics" element={protectedPage(<Analytics />)} />
      <Route path="/profile" element={protectedPage(<Profile />)} />
      <Route path="/settings" element={protectedPage(<Settings />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "12px",
            fontSize: "13px"
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App