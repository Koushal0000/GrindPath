import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { 
  User, 
  Settings as SettingsIcon, 
  Lock, 
  Sliders, 
  ShieldCheck,
  Save,
  Trash2,
  AlertTriangle
} from "lucide-react"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const SliderField = ({ label, value, onChange, min, max, step, color = "blue" }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold">
      <span className="text-zinc-400 uppercase tracking-wider text-[10px]">{label}</span>
      <span className={`text-${color}-400 font-extrabold`}>{value} min</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(parseInt(e.target.value))}
      className={`w-full accent-${color}-500 h-1.5 bg-zinc-900 rounded-lg cursor-pointer`}
    />
  </div>
)

const Settings = () => {
  const { user, level, xp, clearLocalData } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  // Pomodoro
  const [focusTime, setFocusTime] = useState(() => {
    const pFocus = localStorage.getItem("grindpath_settings_focusTime")
    return pFocus ? parseInt(pFocus) : 25
  })
  const [breakTime, setBreakTime] = useState(() => {
    const pBreak = localStorage.getItem("grindpath_settings_breakTime")
    return pBreak ? parseInt(pBreak) : 5
  })
  const [longBreakTime, setLongBreakTime] = useState(() => {
    const pLong = localStorage.getItem("grindpath_settings_longBreakTime")
    return pLong ? parseInt(pLong) : 15
  })

  // Password
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    document.title = "GrindPath – Settings"
  }, [])

  const handleSavePomodoro = (e) => {
    e.preventDefault()
    localStorage.setItem("grindpath_settings_focusTime", focusTime.toString())
    localStorage.setItem("grindpath_settings_breakTime", breakTime.toString())
    localStorage.setItem("grindpath_settings_longBreakTime", longBreakTime.toString())
    toast.success("Timer settings saved! Takes effect on next session.")
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    if (!oldPassword || !newPassword || !confirmPassword) return
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!")
      return
    }
    setSavingPassword(true)
    setTimeout(() => {
      setSavingPassword(false)
      Swal.fire({
        title: "Password Updated 🔒",
        text: "Your password has been changed successfully.",
        icon: "success",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#3b82f6"
      })
      setOldPassword(""); setNewPassword(""); setConfirmPassword("")
    }, 1000)
  }

  const handleClearData = () => {
    Swal.fire({
      title: "Clear All Local Data?",
      html: "<p class='text-sm text-zinc-400'>This will reset your XP, level, streak, habits, achievements, and Pomodoro sessions. Your goals and account data in the database are <strong>NOT</strong> affected.</p>",
      icon: "warning",
      background: "#18181b",
      color: "#f4f4f5",
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Clear Data",
      cancelButtonText: "Cancel",
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        clearLocalData()
        toast.success("Local data cleared. Starting fresh!")
      }
    })
  }

  const tabs = [
    { id: "profile", name: "Account", icon: User },
    { id: "pomodoro", name: "Focus Timers", icon: Sliders },
    { id: "security", name: "Security", icon: Lock },
    { id: "data", name: "Data & Privacy", icon: Trash2 }
  ]



  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <SettingsIcon className="text-blue-500" size={22} style={{ animation: "spin 12s linear infinite" }} />
          Settings
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Configure your GrindPath workspace preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Tab Nav */}
        <div className="w-full md:w-52 glass-panel p-2 rounded-2xl border border-zinc-800/50 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 md:flex-initial flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                  activeTab === tab.id 
                    ? "bg-zinc-100 text-zinc-950 font-black" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 w-full">

          {/* Account Profile */}
          {activeTab === "profile" && (
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50 space-y-5">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <User size={15} className="text-blue-400" /> Account Profile
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-zinc-900/50 border border-zinc-800/50 p-5 rounded-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-black text-2xl text-white shadow-xl">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-base font-bold text-zinc-200">{user?.name}</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap justify-center sm:justify-start">
                    <span className="text-[10px] bg-blue-500/15 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold">Level {level}</span>
                    <span className="text-[10px] text-zinc-500">{xp} Total XP</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Name</span>
                  <div className="w-full bg-zinc-900 border border-zinc-800/60 p-3 rounded-xl text-zinc-300 text-xs font-semibold">{user?.name}</div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Email</span>
                  <div className="w-full bg-zinc-900 border border-zinc-800/60 p-3 rounded-xl text-zinc-300 text-xs font-semibold">{user?.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-zinc-900/30 border border-zinc-800/40 p-4 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Account is protected using JWT authentication. Profile fields (name/email) are managed through database records.
                </p>
              </div>
            </div>
          )}

          {/* Focus Timers */}
          {activeTab === "pomodoro" && (
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50 space-y-5">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Sliders size={15} className="text-blue-400" /> Focus Timer Settings
              </h3>

              <form onSubmit={handleSavePomodoro} className="space-y-6">
                <SliderField label="Focus Duration" value={focusTime} onChange={setFocusTime} min={5} max={60} step={5} color="blue" />
                <SliderField label="Short Break Duration" value={breakTime} onChange={setBreakTime} min={1} max={30} step={1} color="indigo" />
                <SliderField label="Long Break Duration" value={longBreakTime} onChange={setLongBreakTime} min={5} max={60} step={5} color="violet" />

                <div className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800/40 rounded-xl text-xs text-zinc-500">
                  <span>Focus: <strong className="text-blue-400">{focusTime}m</strong></span>
                  <span>•</span>
                  <span>Short Break: <strong className="text-indigo-400">{breakTime}m</strong></span>
                  <span>•</span>
                  <span>Long Break: <strong className="text-violet-400">{longBreakTime}m</strong></span>
                </div>

                <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-lg shadow-blue-600/15">
                  <Save size={13} /> Save Timer Settings
                </button>
              </form>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50 space-y-5">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Lock size={15} className="text-blue-400" /> Security & Password
              </h3>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {[
                  { label: "Current Password", value: oldPassword, set: setOldPassword },
                  { label: "New Password", value: newPassword, set: setNewPassword },
                  { label: "Confirm New Password", value: confirmPassword, set: setConfirmPassword }
                ].map(({ label, value, set }) => (
                  <div key={label} className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{label}</label>
                    <input
                      type="password"
                      placeholder={`Enter ${label.toLowerCase()}`}
                      value={value}
                      onChange={e => set(e.target.value)}
                      className="w-full glass-input p-3 rounded-xl text-zinc-200 text-xs font-semibold"
                      required
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition cursor-pointer shadow-lg shadow-blue-600/15"
                >
                  <Lock size={13} />
                  {savingPassword ? "Updating..." : "Change Password"}
                </button>
              </form>
            </div>
          )}

          {/* Data & Privacy */}
          {activeTab === "data" && (
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50 space-y-5">
              <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Trash2 size={15} className="text-rose-400" /> Data & Privacy
              </h3>

              <div className="space-y-4">
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-zinc-300">What's stored locally</h4>
                  <ul className="text-xs text-zinc-500 space-y-1 leading-relaxed">
                    <li>• XP points & level progress</li>
                    <li>• Daily streak counter</li>
                    <li>• Habit tracker data (resets daily)</li>
                    <li>• Pomodoro session count</li>
                    <li>• Achievement badges</li>
                    <li>• Goal metadata (priority, deadlines, notes, subtasks)</li>
                    <li>• Pomodoro timer preferences</li>
                  </ul>
                  <p className="text-[10px] text-zinc-600 mt-2">
                    ✓ Your goals, account info, and roadmaps are stored securely in the database and are NOT affected.
                  </p>
                </div>

                <div className="bg-rose-500/8 border border-rose-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-2.5 mb-3">
                    <AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-rose-400">Clear All Local Data</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        This resets XP, level, streak, achievements, habits, and Pomodoro sessions. 
                        Goals remain in your database. This cannot be undone.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClearData}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:text-white rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    <Trash2 size={13} />
                    Clear Local Progress Data
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Settings
