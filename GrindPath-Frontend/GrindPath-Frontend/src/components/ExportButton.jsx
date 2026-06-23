import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { ACHIEVEMENTS } from "../context/AchievementsData"
import { Download, Loader2 } from "lucide-react"

const ExportButton = () => {
  const { user, goals, xp, level, streak, pomodoroSessions, habits, achievements } = useAuth()
  const [loading, setLoading] = useState(false)

  const getMeta = (goalId) => {
    const saved = localStorage.getItem(`grindpath_goal_${goalId}_metadata`)
    return saved ? JSON.parse(saved) : { priority: "Medium", deadline: "" }
  }

  const handleExport = async () => {
    setLoading(true)
    try {
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
      const pageW = 210
      const margin = 18
      const contentW = pageW - margin * 2
      let y = margin
      const newLine = (h = 6) => { y += h }
      const checkPage = (needed = 15) => {
        if (y + needed > 280) {
          doc.addPage()
          y = margin
        }
      }

      // ── Background ──────────────────────────────────────────────────────────
      doc.setFillColor(9, 9, 11)
      doc.rect(0, 0, 210, 297, "F")

      // ── Header Banner ────────────────────────────────────────────────────────
      doc.setFillColor(37, 99, 235)
      doc.roundedRect(margin, y, contentW, 24, 4, 4, "F")
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(255, 255, 255)
      doc.text("GrindPath — Progress Report", margin + 6, y + 10)
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(190, 210, 255)
      doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`, margin + 6, y + 18)
      y += 30

      // ── User Section ─────────────────────────────────────────────────────────
      doc.setFillColor(24, 24, 27)
      doc.roundedRect(margin, y, contentW, 28, 3, 3, "F")
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(255, 255, 255)
      doc.text(user?.name || "Grinder", margin + 6, y + 9)
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(161, 161, 170)
      doc.text(user?.email || "", margin + 6, y + 16)
      doc.setTextColor(129, 140, 248)
      doc.text(`Level ${level}  •  ${xp} XP Total  •  ${streak} Day Streak`, margin + 6, y + 23)
      y += 34

      // ── Stats Row ─────────────────────────────────────────────────────────────
      const completedGoals = goals.filter(g => g.completed).length
      const activeGoals = goals.filter(g => !g.completed).length
      const totalFocusHours = Math.round((pomodoroSessions * 25) / 60 * 10) / 10
      const habitRate = habits.length > 0 ? Math.round((habits.filter(h => h.completed).length / habits.length) * 100) : 0
      const productivityScore = Math.min(100, Math.round(
        (completedGoals / Math.max(goals.length, 1)) * 40 +
        Math.min(pomodoroSessions, 20) * 2 +
        Math.min(streak * 2, 20)
      ))

      const stats = [
        { label: "Goals Done", value: `${completedGoals}` },
        { label: "Active Goals", value: `${activeGoals}` },
        { label: "Focus Hours", value: `${totalFocusHours}h` },
        { label: "Pomodoros", value: `${pomodoroSessions}` },
        { label: "Habit Rate", value: `${habitRate}%` },
        { label: "Score", value: `${productivityScore}/100` }
      ]
      const boxW = contentW / 3 - 2
      stats.forEach((s, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const bx = margin + col * (boxW + 3)
        const by = y + row * 18
        doc.setFillColor(30, 30, 35)
        doc.roundedRect(bx, by, boxW, 14, 2, 2, "F")
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(255, 255, 255)
        doc.text(s.value, bx + 4, by + 6)
        doc.setFontSize(7)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(113, 113, 122)
        doc.text(s.label, bx + 4, by + 11)
      })
      y += 42

      // ── Section helper ────────────────────────────────────────────────────────
      const sectionHeader = (title, color = [59, 130, 246]) => {
        checkPage(12)
        doc.setFontSize(9)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...color)
        doc.text(title.toUpperCase(), margin, y)
        y += 2
        doc.setDrawColor(...color)
        doc.setLineWidth(0.3)
        doc.line(margin, y, margin + contentW, y)
        y += 5
      }

      // ── Completed Goals ───────────────────────────────────────────────────────
      sectionHeader("Completed Goals", [52, 211, 153])
      const completed = goals.filter(g => g.completed)
      if (completed.length === 0) {
        doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(113, 113, 122)
        doc.text("No completed goals yet.", margin, y); y += 8
      } else {
        completed.forEach(g => {
          checkPage(10)
          const meta = getMeta(g._id)
          doc.setFillColor(20, 30, 22)
          doc.roundedRect(margin, y, contentW, 9, 2, 2, "F")
          doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(134, 239, 172)
          doc.text(`✓  ${g.title}`, margin + 3, y + 5)
          doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(113, 113, 122)
          const info = `${g.category} • ${meta.priority || "Medium"} Priority${meta.deadline ? ` • Due: ${meta.deadline.slice(0, 10)}` : ""}`
          doc.text(info, margin + contentW - doc.getTextWidth(info) - 2, y + 5)
          y += 12
        })
      }
      newLine(3)

      // ── Active Goals ──────────────────────────────────────────────────────────
      sectionHeader("Active Goals", [59, 130, 246])
      const active = goals.filter(g => !g.completed)
      if (active.length === 0) {
        doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(113, 113, 122)
        doc.text("No active goals.", margin, y); y += 8
      } else {
        active.forEach(g => {
          checkPage(10)
          const meta = getMeta(g._id)
          const priorityColor = meta.priority === "High" ? [248, 113, 113] : meta.priority === "Low" ? [52, 211, 153] : [251, 191, 36]
          doc.setFillColor(24, 24, 27)
          doc.roundedRect(margin, y, contentW, 9, 2, 2, "F")
          doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(241, 241, 241)
          doc.text(`◦  ${g.title}`, margin + 3, y + 5)
          doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(...priorityColor)
          const prio = meta.priority || "Medium"
          doc.text(prio, margin + contentW - doc.getTextWidth(prio) - 2, y + 5)
          y += 12
        })
      }
      newLine(3)

      // ── Achievements ──────────────────────────────────────────────────────────
      sectionHeader("Achievements", [129, 140, 248])
      if (achievements.length === 0) {
        doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(113, 113, 122)
        doc.text("No achievements unlocked yet.", margin, y); y += 8
      } else {
        achievements.forEach(id => {
          checkPage(8)
          const found = ACHIEVEMENTS.find(a => a.id === id)
          if (!found) return
          doc.setFontSize(8); doc.setFont("helvetica", "bold"); doc.setTextColor(129, 140, 248)
          doc.text(`${found.icon}  ${found.title}`, margin, y)
          doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(113, 113, 122)
          doc.text(found.desc, margin + 40, y)
          y += 8
        })
      }
      newLine(3)

      // ── Today's Habits ────────────────────────────────────────────────────────
      sectionHeader("Today's Habits", [251, 191, 36])
      if (habits.length === 0) {
        doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(113, 113, 122)
        doc.text("No habits tracked.", margin, y); y += 8
      } else {
        habits.forEach(h => {
          checkPage(8)
          doc.setFontSize(8); doc.setFont("helvetica", "normal")
          doc.setTextColor(h.completed ? [134, 239, 172] : [161, 161, 170])
          doc.text(`${h.completed ? "✓" : "○"}  ${h.text}`, margin, y)
          y += 7
        })
      }
      newLine(5)

      // ── Footer ────────────────────────────────────────────────────────────────
      const totalPages = doc.getNumberOfPages()
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p)
        doc.setFontSize(7)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(63, 63, 70)
        doc.text(`GrindPath — Confidential Progress Report • Page ${p}/${totalPages}`, margin, 290)
      }

      // ── Save ──────────────────────────────────────────────────────────────────
      const dateStr = new Date().toISOString().slice(0, 10)
      doc.save(`GrindPath_Report_${user?.name?.replace(/\s+/g, "_") || "User"}_${dateStr}.pdf`)
    } catch (err) {
      console.error("Export failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      id="export-pdf-btn"
      onClick={handleExport}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 shadow-lg shadow-blue-600/20"
    >
      {loading 
        ? <><Loader2 size={15} className="animate-spin" /><span>Generating PDF...</span></>
        : <><Download size={15} /><span>Export Progress Report (PDF)</span></>
      }
    </button>
  )
}

export default ExportButton
