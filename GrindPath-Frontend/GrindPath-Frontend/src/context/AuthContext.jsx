/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { getProfile } from "../services/authService"
import { getGoals } from "../services/goalService"
import { createActivity, getActivities } from "../services/activityService"
import { getAnalyticsData } from "../services/analyticsService"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { ACHIEVEMENTS } from "./AchievementsData"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"))
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [goals, setGoals] = useState([])
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)
  const [habits, setHabits] = useState([])
  const [pomodoroSessions, setPomodoroSessions] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [analyticsData, setAnalyticsData] = useState(null)
  const [activities, setActivities] = useState([])

  // ─── Storage Key Helper ───────────────────────────────────────────────────
  const getStorageKey = (keyName) => {
    if (!user) return null
    return `grindpath_${user._id}_${keyName}`
  }

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    setUser(null)
    setGoals([])
    setXp(0)
    setLevel(1)
    setStreak(0)
    setHabits([])
    setPomodoroSessions(0)
    setAchievements([])
    setIsFocusMode(false)
    setAnalyticsData(null)
    setActivities([])
  }, [])

  // ─── Load Client-side Stats Helper ─────────────────────────────────────────
  const loadClientStats = useCallback((userDoc) => {
    if (!userDoc) return

    const getStorageKeyForUser = (keyName) => {
      return `grindpath_${userDoc._id}_${keyName}`
    }

    const xpKey = getStorageKeyForUser("xp")
    const lvlKey = getStorageKeyForUser("level")
    const streakKey = getStorageKeyForUser("streak")
    const streakDateKey = getStorageKeyForUser("streak_date")
    const habitsKey = getStorageKeyForUser("habits")
    const pomodoroKey = getStorageKeyForUser("pomodoro_sessions")
    const achievementsKey = getStorageKeyForUser("achievements")

    // XP & Level
    const savedXp = localStorage.getItem(xpKey)
    const savedLvl = localStorage.getItem(lvlKey)
    if (savedXp) setXp(parseInt(savedXp))
    else setXp(0)
    if (savedLvl) setLevel(parseInt(savedLvl))
    else setLevel(1)

    // Pomodoro Sessions
    const savedPomodoro = localStorage.getItem(pomodoroKey)
    if (savedPomodoro) setPomodoroSessions(parseInt(savedPomodoro))
    else setPomodoroSessions(0)

    // Achievements
    const savedAchievements = localStorage.getItem(achievementsKey)
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
    else setAchievements([])

    // Habits (with daily reset)
    const savedHabits = localStorage.getItem(habitsKey)
    const todayStr = new Date().toDateString()
    if (savedHabits) {
      const parsedHabits = JSON.parse(savedHabits)
      const updated = parsedHabits.map(h => {
        if (h.lastUpdated !== todayStr) {
          return { ...h, completed: false, lastUpdated: todayStr }
        }
        return h
      })
      setHabits(updated)
      localStorage.setItem(habitsKey, JSON.stringify(updated))
    } else {
      const initialHabits = [
        { id: "1", text: "Drink 3L Water", completed: false, lastUpdated: todayStr },
        { id: "2", text: "Read 15 mins", completed: false, lastUpdated: todayStr },
        { id: "3", text: "Exercise / Move", completed: false, lastUpdated: todayStr }
      ]
      setHabits(initialHabits)
      localStorage.setItem(habitsKey, JSON.stringify(initialHabits))
    }

    // Streak
    const savedStreak = localStorage.getItem(streakKey)
    const savedStreakDate = localStorage.getItem(streakDateKey)
    if (savedStreak) {
      const currentStreak = parseInt(savedStreak)
      if (savedStreakDate) {
        const lastDate = new Date(savedStreakDate)
        const diffTime = Math.abs(new Date() - lastDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays > 1) {
          setStreak(0)
          localStorage.setItem(streakKey, "0")
        } else {
          setStreak(currentStreak)
        }
      } else {
        setStreak(currentStreak)
      }
    } else {
      setStreak(0)
    }
  }, [])

  // ─── Load User & All Data ──────────────────────────────────────────────────
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }

    try {
      const data = await getProfile()
      if (data && data.user) {
        setUser(data.user)
        loadClientStats(data.user)
        try {
          const userGoals = await getGoals()
          setGoals(userGoals)
        } catch (err) {
          console.error("Failed to load user goals", err)
        }
        // Load analytics + activity timeline on app start
        try {
          const [analytics, acts] = await Promise.all([
            getAnalyticsData(),
            getActivities()
          ])
          if (analytics) setAnalyticsData(analytics)
          if (acts) setActivities(acts)
        } catch (err) {
          console.error("Failed to load analytics", err)
        }
      } else {
        logout()
      }
    } catch (error) {
      console.error("Auto login failed", error)
      logout()
    } finally {
      setLoading(false)
    }
  }, [logout, loadClientStats])

  // ─── Dashboard Refresh ────────────────────────────────────────────────────
  // Call after any user action that should update dashboard analytics
  const refreshDashboard = useCallback(async () => {
    try {
      const [userGoals, analytics, acts] = await Promise.all([
        getGoals(),
        getAnalyticsData(),
        getActivities()
      ])
      if (userGoals) setGoals(userGoals)
      if (analytics) setAnalyticsData(analytics)
      if (acts) setActivities(acts)
    } catch (err) {
      console.error("refreshDashboard error", err)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUser()
    }, 0)
    return () => clearTimeout(timer)
  }, [loadUser])

  // ─── Login / Logout ───────────────────────────────────────────────────────
  const login = async (token) => {
    localStorage.setItem("token", token)
    await loadUser()
  }

  // ─── Achievement System ───────────────────────────────────────────────────
  const unlockAchievement = (id) => {
    if (!user) return
    const achievementsKey = getStorageKey("achievements")

    setAchievements(prev => {
      if (prev.includes(id)) return prev
      const updated = [...prev, id]
      localStorage.setItem(achievementsKey, JSON.stringify(updated))

      const found = ACHIEVEMENTS.find(a => a.id === id)
      if (found) {
        Swal.fire({
          title: `Achievement Unlocked! ${found.icon}`,
          html: `<p class='text-base font-bold'>${found.title}</p><p class='text-sm text-zinc-400 mt-1'>${found.desc}</p>`,
          background: "#111827",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
          timer: 4000,
          showConfirmButton: false,
          toast: false
        })
      }
      return updated
    })
  }

  const checkAchievements = ({ currentGoals, currentStreak, currentPomodoro, currentLevel }) => {
    // First goal created
    if (currentGoals !== undefined && currentGoals >= 1) unlockAchievement("first_goal")
    // 5 goals completed
    const completedCount = goals.filter(g => g.completed).length
    if (completedCount >= 5) unlockAchievement("goal_5")
    // Streak achievements
    if ((currentStreak || streak) >= 7) unlockAchievement("streak_7")
    if ((currentStreak || streak) >= 30) unlockAchievement("streak_30")
    // Pomodoro achievements
    if ((currentPomodoro || pomodoroSessions) >= 10) unlockAchievement("pomodoro_10")
    if ((currentPomodoro || pomodoroSessions) >= 50) unlockAchievement("pomodoro_50")
    // Level achievement
    if ((currentLevel || level) >= 5) unlockAchievement("lvl_5")
  }

  // ─── XP & Leveling ───────────────────────────────────────────────────────
  const gainXP = (amount) => {
    if (!user) return

    setXp(prevXp => {
      const newXp = prevXp + amount
      const xpKey = getStorageKey("xp")
      const lvlKey = getStorageKey("level")
      const currentLevel = level
      const newLevel = Math.floor(newXp / 100) + 1

      localStorage.setItem(xpKey, newXp.toString())

      if (newLevel > currentLevel) {
        setLevel(newLevel)
        localStorage.setItem(lvlKey, newLevel.toString())

        Swal.fire({
          title: "LEVEL UP! 🎉",
          html: `<p class='text-lg'>You reached <strong>Level ${newLevel}</strong>!</p><p class='text-sm text-blue-400 mt-2'>Keep grinding, stay disciplined!</p>`,
          icon: "success",
          background: "#111827",
          color: "#fff",
          confirmButtonColor: "#3b82f6",
          timer: 5000,
          showConfirmButton: false
        })

        checkAchievements({ currentLevel: newLevel })
      } else {
        toast.success(`+${amount} XP Earned`, { position: "bottom-right", autoClose: 1500 })
      }

      return newXp
    })
  }

  // ─── Pomodoro Session Tracker ─────────────────────────────────────────────
  const incrementPomodoro = () => {
    if (!user) return
    const pomodoroKey = getStorageKey("pomodoro_sessions")

    // Track daily sessions too
    const dailyKey = getStorageKey("pomodoro_daily")
    const todayStr = new Date().toDateString()
    const savedDaily = localStorage.getItem(dailyKey)
    let dailyData = savedDaily ? JSON.parse(savedDaily) : {}
    dailyData[todayStr] = (dailyData[todayStr] || 0) + 1
    localStorage.setItem(dailyKey, JSON.stringify(dailyData))

    setPomodoroSessions(prev => {
      const newCount = prev + 1
      localStorage.setItem(pomodoroKey, newCount.toString())
      checkAchievements({ currentPomodoro: newCount })
      gainXP(50)
      return newCount
    })

    // Persist to MongoDB activity log
    createActivity({ title: "Focus Session Completed 🍅", desc: "Completed a 25-minute Pomodoro session", type: "pomodoro_completed", xpEarned: 50 })
      .then(() => refreshDashboard())
      .catch(err => console.error("Failed to log pomodoro activity", err))
  }

  // ─── Habit Operations ─────────────────────────────────────────────────────
  const addHabit = (text) => {
    if (!user) return
    const habitsKey = getStorageKey("habits")
    const newHabit = {
      id: Date.now().toString(),
      text,
      completed: false,
      lastUpdated: new Date().toDateString()
    }
    const updated = [...habits, newHabit]
    setHabits(updated)
    localStorage.setItem(habitsKey, JSON.stringify(updated))
    toast.success("Habit Added")
  }

  const toggleHabit = (habitId) => {
    if (!user) return
    const habitsKey = getStorageKey("habits")
    const todayStr = new Date().toDateString()
    const updated = habits.map(h => {
      if (h.id === habitId) {
        const nextCompleted = !h.completed
        if (nextCompleted) {
          gainXP(10)
          // Persist habit completion to MongoDB
          createActivity({ title: "Habit Completed ✅", desc: `Completed habit: "${h.text}"`, type: "habit_completed", xpEarned: 10 })
            .then(() => refreshDashboard())
            .catch(err => console.error("Failed to log habit activity", err))
        }
        return { ...h, completed: nextCompleted, lastUpdated: todayStr }
      }
      return h
    })
    setHabits(updated)
    localStorage.setItem(habitsKey, JSON.stringify(updated))

    // Check habit_7 achievement
    const habitDaysKey = getStorageKey("habit_streak_days")
    const savedDays = localStorage.getItem(habitDaysKey)
    const habitDays = savedDays ? JSON.parse(savedDays) : {}
    const allDone = updated.every(h => h.completed)
    if (allDone) {
      habitDays[todayStr] = true
      localStorage.setItem(habitDaysKey, JSON.stringify(habitDays))
      const daysCount = Object.keys(habitDays).length
      if (daysCount >= 7) unlockAchievement("habit_7")
    }
  }

  const deleteHabit = (habitId) => {
    if (!user) return
    const habitsKey = getStorageKey("habits")
    const updated = habits.filter(h => h.id !== habitId)
    setHabits(updated)
    localStorage.setItem(habitsKey, JSON.stringify(updated))
    toast.success("Habit Removed")
  }

  // ─── Streak ───────────────────────────────────────────────────────────────
  const updateStreak = () => {
    if (!user) return

    const streakKey = getStorageKey("streak")
    const streakDateKey = getStorageKey("streak_date")
    const todayStr = new Date().toDateString()
    const lastStreakDate = localStorage.getItem(streakDateKey)

    if (lastStreakDate === todayStr) return

    let newStreak = 1
    if (lastStreakDate) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastStreakDate === yesterday.toDateString()) {
        newStreak = streak + 1
      }
    }

    setStreak(newStreak)
    localStorage.setItem(streakKey, newStreak.toString())
    localStorage.setItem(streakDateKey, todayStr)

    checkAchievements({ currentStreak: newStreak })

    if (newStreak % 3 === 0) {
      toast.success(`🔥 ${newStreak} Day Streak! Keep going!`, { position: "top-center" })
    }
  }

  // ─── Clear All Local Data ─────────────────────────────────────────────────
  const clearLocalData = () => {
    if (!user) return
    const keys = ["xp", "level", "streak", "streak_date", "habits", "pomodoro_sessions", "pomodoro_daily", "achievements", "habit_streak_days"]
    keys.forEach(k => localStorage.removeItem(getStorageKey(k)))
    setXp(0)
    setLevel(1)
    setStreak(0)
    setHabits([])
    setPomodoroSessions(0)
    setAchievements([])
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        goals,
        setGoals,
        xp,
        level,
        streak,
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
        updateStreak,
        gainXP,
        isFocusMode,
        setIsFocusMode,
        pomodoroSessions,
        incrementPomodoro,
        achievements,
        unlockAchievement,
        checkAchievements,
        clearLocalData,
        ACHIEVEMENTS,
        // ── Analytics ────────────────────────────────────
        analyticsData,
        activities,
        refreshDashboard
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
