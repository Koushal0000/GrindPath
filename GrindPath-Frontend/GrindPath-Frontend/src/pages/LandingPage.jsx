import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Flame,
  Target,
  BrainCircuit,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
  Mail,
  MessageSquare,
  Sparkles,
  Award,
  Layers,
  BarChart2,
  MapPin,
  CheckCircle2,
  Timer,
  ChevronDown,
  Compass
} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const LandingPage = () => {
  const navigate = useNavigate()
  const [faqOpen, setFaqOpen] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const features = [
    {
      title: "Goal Management",
      desc: "Set structured goals with deadlines, priorities, and subtasks. Track completion across categories and monitor your overall progress at a glance.",
      icon: Target,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Domain-Based Roadmaps",
      desc: "Auto-generate a personalized, week-by-week learning curriculum for MERN, Java, Gen AI, DSA, or Cloud — tailored to your skill level and daily hours.",
      icon: MapPin,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "Live Productivity Analytics",
      desc: "Track your productivity score, weekly focus hours, focus distribution, and activity timeline — all powered by real-time MongoDB data.",
      icon: BarChart2,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      title: "Focus Sessions",
      desc: "Enter a distraction-free fullscreen Focus Mode with a configurable timer. Each completed session is logged and contributes to your productivity score.",
      icon: BrainCircuit,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Habit Builder",
      desc: "Build daily routines with a self-resetting habit checklist. Earn XP for each habit completed and maintain multi-day streaks to stay consistent.",
      icon: Zap,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    },
    {
      title: "Gamified XP & Levels",
      desc: "Earn XP for completing goals, habits, and focus sessions. Level up your grinder rank and unlock achievements shown on your profile.",
      icon: Sparkles,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    }
  ]

  const benefits = [
    {
      title: "Built for Self-Learners",
      desc: "Designed from the ground up for students and developers. No corporate bloat, no pricing plans — just a focused workspace built around how real learners actually work.",
      icon: Layers,
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400"
    },
    {
      title: "100% Free & Secure",
      desc: "Every feature — roadmaps, analytics, habit tracking, goal boards — is completely free. Your data is stored securely on MongoDB with JWT authentication.",
      icon: ShieldCheck,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
    },
    {
      title: "Gamified Motivation",
      desc: "RPG-style XP, level progression, streaks, and achievements keep you engaged through long learning sessions and help you build real consistency over time.",
      icon: Award,
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
    }
  ]

  const faqs = [
    {
      q: "How do personalized roadmaps work?",
      a: "When you create a goal, you select a domain (MERN, Java, Gen AI, DSA, or Cloud) and your skill level. GrindPath generates a complete week-by-week learning roadmap — with topics, tasks, and milestones — customized to your daily available hours and experience level."
    },
    {
      q: "How is my productivity score calculated?",
      a: "Your productivity score (0–100) is calculated from four real factors: goal completion rate (35 pts), roadmap milestone progress (25 pts), focus sessions this month (20 pts), and habit consistency (20 pts). It updates live as you complete activities."
    },
    {
      q: "Is my progress synchronized across devices?",
      a: "Yes. Goals, roadmaps, and activity data are stored in MongoDB and synced via your account on any device. Your dashboard analytics reflect the same data everywhere you log in."
    },
    {
      q: "Is GrindPath completely free?",
      a: "Yes — 100% free with no subscriptions, trials, or paywalls. Every feature including unlimited goals, domain roadmaps, live analytics, and habit tracking is available immediately after creating an account."
    },
    {
      q: "Can I track long-term learning progress?",
      a: "Absolutely. The dashboard shows your full activity timeline, weekly productivity chart, roadmap milestone completions, and upcoming deadlines. You can track months of progress through the analytics panel."
    }
  ]

  return (
    <div className="min-h-screen bg-[#070b18] aurora-hero text-zinc-100 relative select-none font-sans">

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />

      {/* Visible Ambient Radial Aurora Mesh Layers for Hero */}
      <div className="absolute top-[-8%] left-[15%] w-[65%] h-[50%] rounded-full bg-gradient-to-tr from-[#3b82f6]/25 via-[#6366f1]/20 to-[#a855f7]/15 blur-[170px] pointer-events-none pulse-glow" />
      <div className="absolute top-[25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#6366f1]/20 via-[#8b5cf6]/15 to-[#a855f7]/20 blur-[170px] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <nav className={`sticky top-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#070b18]/92 backdrop-blur-2xl border-b border-indigo-500/30 shadow-[0_4px_32px_rgba(99,102,241,0.08)]"
          : "bg-[#070b18]/60 backdrop-blur-xl border-b border-indigo-500/10"
      }`}>
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent tracking-tight cursor-pointer">
          GrindPath
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#benefits" className="hover:text-blue-400 transition">Benefits</a>
          <a href="#faq" className="hover:text-blue-400 transition">FAQs</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-zinc-300 hover:text-white font-semibold text-sm cursor-pointer transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 shadow-lg shadow-blue-600/25 active:scale-[0.99]"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-20 sm:pt-28 lg:pt-32 pb-16 max-w-6xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-blue-500/10"
        >
          <Sparkles size={13} className="animate-pulse text-blue-400" />
          <span>Gamified Study &amp; Learning Hub</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black text-white leading-[1.12] tracking-tight max-w-5xl mx-auto py-1"
        >
          <span className="block sm:inline md:block py-0.5">Supercharge Your Discipline.</span>{" "}
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent block sm:inline md:block py-0.5 mt-1 sm:mt-0 md:mt-1">
            Build Long-Term Consistency.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-300 text-base sm:text-lg max-w-3xl leading-relaxed mt-5 font-medium mx-auto"
        >
          GrindPath is a full-stack productivity platform for students and developers. Manage goals, generate personalized learning roadmaps, track habits, run focus sessions, and monitor your progress through a live analytics dashboard — all in one place, completely free.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-7 w-full sm:w-auto justify-center"
        >
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-black text-base cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-[0.99] group"
          >
            <span>Start Tracking Free</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#features"
            className="px-8 py-4 bg-[#111827]/80 border border-indigo-500/25 hover:border-indigo-500/50 hover:bg-[#111827] text-zinc-200 hover:text-white rounded-2xl font-bold text-base cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg shadow-black/40"
          >
            Explore Features
          </a>
        </motion.div>

        {/* ── Substantial Floating Dashboard Product Preview ──────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 150 }}
          className="w-full mt-10 sm:mt-12 rounded-3xl bg-[#0b1020]/90 border border-indigo-500/30 p-3 sm:p-4 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-500"
        >
          {/* Ambient Glow behind preview */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-gradient-to-tr from-[#3b82f6]/15 via-[#6366f1]/15 to-[#a855f7]/15 blur-[110px] pointer-events-none rounded-full" />

          {/* Browser Chrome Header */}
          <div className="h-12 bg-[#070b18]/90 border-b border-indigo-500/20 flex items-center px-4 gap-3 rounded-t-2xl relative z-10">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/30" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/30" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
            </div>
            <div className="flex-1 max-w-xs h-6.5 rounded-lg bg-[#111827] border border-indigo-500/20 text-[11px] text-indigo-300 flex items-center justify-center font-mono font-bold mx-auto tracking-wide">
              grindpath.dev/dashboard
            </div>
          </div>

          {/* Dashboard Preview Interior */}
          <div className="rounded-b-2xl bg-[#070b18]/95 p-4 sm:p-6 border-t-0 border border-indigo-500/20 relative z-10 text-left">

            {/* Top Stat Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-4">
              {[
                { label: "Active Goals", value: "5 Goals", color: "text-[#3b82f6]", bar: "bg-[#3b82f6]", pct: "60%" },
                { label: "Focus Hours", value: "12.4 Hours", color: "text-[#6366f1]", bar: "bg-[#6366f1]", pct: "75%" },
                { label: "Streak", value: "14 Days 🔥", color: "text-[#f59e0b]", bar: "bg-[#f59e0b]", pct: "100%" },
                { label: "XP Level", value: "Level 7", color: "text-[#a855f7]", bar: "bg-[#a855f7]", pct: "82%" }
              ].map(s => (
                <div key={s.label} className="bg-[#111827] border border-indigo-500/20 rounded-2xl p-3.5 flex flex-col justify-between gap-2.5 shadow-lg">
                  <span className="text-[9px] text-zinc-400 uppercase font-black tracking-widest">{s.label}</span>
                  <span className={`text-sm sm:text-base font-black ${s.color}`}>{s.value}</span>
                  <div className="w-full h-1.5 bg-[#0b1020] rounded-full overflow-hidden">
                    <div className={`h-full ${s.bar} rounded-full`} style={{ width: s.pct }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Main Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Left Column — Productivity Score & Focus Distribution */}
              <div className="space-y-4">
                {/* Productivity Score */}
                <div className="bg-[#111827] border border-indigo-500/20 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">Productivity Score</span>
                    <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">Live</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#1e293b" strokeWidth="4.5" />
                        <circle cx="20" cy="20" r="16" fill="none" stroke="url(#heroScoreGrad)" strokeWidth="4.5"
                          strokeLinecap="round" strokeDasharray="72 100" />
                        <defs>
                          <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black text-white">72</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {[
                        { l: "Goal Completion", p: 26, max: 35, c: "bg-[#3b82f6]" },
                        { l: "Roadmap Milestones", p: 18, max: 25, c: "bg-[#6366f1]" },
                        { l: "Focus Sessions", p: 16, max: 20, c: "bg-[#a855f7]" }
                      ].map(b => (
                        <div key={b.l}>
                          <div className="flex justify-between text-[9px] font-semibold text-zinc-300 mb-0.5">
                            <span>{b.l}</span>
                            <span>{b.p}/{b.max} pts</span>
                          </div>
                          <div className="w-full h-1 bg-[#0b1020] rounded-full overflow-hidden">
                            <div className={`h-full ${b.c} rounded-full`} style={{ width: `${(b.p / b.max) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Focus Distribution */}
                <div className="bg-[#111827] border border-indigo-500/20 rounded-2xl p-4 shadow-lg">
                  <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider block mb-3">Focus Distribution</span>
                  <div className="space-y-2">
                    {[
                      { name: "MERN Stack", pct: 40, c: "bg-[#3b82f6]" },
                      { name: "Gen AI", pct: 30, c: "bg-[#6366f1]" },
                      { name: "DSA", pct: 20, c: "bg-[#10b981]" },
                      { name: "Cloud", pct: 10, c: "bg-[#f59e0b]" }
                    ].map(d => (
                      <div key={d.name} className="flex items-center gap-2.5">
                        <span className="text-[10px] text-zinc-300 w-20 shrink-0 font-medium truncate">{d.name}</span>
                        <div className="flex-1 h-2 bg-[#0b1020] rounded-full overflow-hidden">
                          <div className={`h-full ${d.c} rounded-full`} style={{ width: `${d.pct}%` }} />
                        </div>
                        <span className="text-[10px] text-zinc-400 w-6 text-right font-bold">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column — Today's Focus & Upcoming Deadlines */}
              <div className="space-y-4">
                {/* Today's Focus */}
                <div className="bg-[#111827] border border-indigo-500/20 rounded-2xl p-4 shadow-lg">
                  <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider block mb-3">Today&apos;s Focus</span>
                  <div className="space-y-2">
                    {[
                      { icon: Target, label: "Active Goals", value: "5", color: "text-[#3b82f6] bg-[#3b82f6]/15" },
                      { icon: CheckCircle2, label: "Daily Habits Done", value: "4/6", color: "text-[#6366f1] bg-[#6366f1]/15" },
                      { icon: Timer, label: "Focus Sessions", value: "2/4", color: "text-[#f59e0b] bg-[#f59e0b]/15" }
                    ].map(m => {
                      const Icon = m.icon
                      return (
                        <div key={m.label} className="flex items-center justify-between bg-[#0b1020] rounded-xl px-3 py-2 border border-indigo-500/10">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded-lg ${m.color}`}>
                              <Icon size={12} />
                            </div>
                            <span className="text-xs text-zinc-200 font-semibold">{m.label}</span>
                          </div>
                          <span className={`text-xs font-black ${m.color.split(" ")[0]}`}>{m.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-[#111827] border border-indigo-500/20 rounded-2xl p-4 shadow-lg">
                  <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider block mb-3">Upcoming Deadlines</span>
                  <div className="space-y-2">
                    {[
                      { title: "MERN Roadmap Week 4", days: "3 days left", priority: "bg-rose-500", cat: "MERN" },
                      { title: "DSA Graphs & Trees", days: "7 days left", priority: "bg-amber-500", cat: "DSA" },
                      { title: "Portfolio System Deploy", days: "14 days left", priority: "bg-emerald-500", cat: "Cloud" }
                    ].map(d => (
                      <div key={d.title} className="flex items-center gap-2.5 bg-[#0b1020] rounded-xl px-3 py-2 border border-indigo-500/10">
                        <div className={`w-1.5 h-6 rounded-full ${d.priority} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-200 font-semibold truncate">{d.title}</p>
                          <p className="text-[9px] text-zinc-400">{d.cat}</p>
                        </div>
                        <span className="text-[10px] text-zinc-300 font-bold shrink-0">{d.days}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column — Recent Activity Timeline */}
              <div className="bg-[#111827] border border-indigo-500/20 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                <div>
                  <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider block mb-3">Recent Activity Timeline</span>
                  <div className="space-y-3 relative pl-3.5 border-l border-indigo-500/20">
                    {[
                      { icon: Timer, label: "Focus Session Completed 🍅", time: "2m ago", color: "text-[#3b82f6] bg-[#3b82f6]/15", xp: "+50 XP" },
                      { icon: CheckCircle2, label: "Habit: Morning Run ✅", time: "1h ago", color: "text-[#6366f1] bg-[#6366f1]/15", xp: "+10 XP" },
                      { icon: MapPin, label: "Roadmap Milestone Completed ⚡", time: "3h ago", color: "text-[#f59e0b] bg-[#f59e0b]/15", xp: "+20 XP" },
                      { icon: Target, label: "New Goal Created 🎯", time: "Yesterday", color: "text-[#10b981] bg-[#10b981]/15", xp: "+10 XP" }
                    ].map((a, i) => {
                      const Icon = a.icon
                      return (
                        <div key={i} className="relative">
                          <div className={`absolute -left-[21px] top-0.5 p-1 rounded-lg border border-indigo-500/20 ${a.color}`}>
                            <Icon size={10} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-200 leading-tight">{a.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-zinc-400 font-medium">{a.time}</span>
                              <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/25 px-1.5 py-0.5 rounded-full">{a.xp}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-500/15 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-medium">Synced with MongoDB</span>
                  <span className="text-[10px] text-blue-400 font-bold flex items-center gap-1">
                    Live Stream <Compass size={10} className="animate-spin" />
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Preview Bar */}
            <div className="mt-4 pt-4 border-t border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-zinc-300 font-medium">
                ⚡ Real-time workspace analytics tracking goals, domain roadmaps, habits, and focus sessions.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs cursor-pointer transition-all duration-300 shadow-md shadow-blue-600/20 shrink-0"
              >
                Live Dashboard Preview →
              </button>
            </div>

          </div>
        </motion.div>

      </section>

      {/* CORE FEATURES GRID — Indigo & Purple Atmosphere */}
      <section id="features" className="px-6 py-24 bg-[#070b18] border-y border-indigo-500/20 relative z-10 overflow-hidden">
        {/* Section Ambient Glows */}
        <div className="absolute top-[20%] left-[-10%] w-[45%] h-[50%] rounded-full bg-[#6366f1]/15 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[50%] rounded-full bg-[#8b5cf6]/12 blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs text-blue-400 uppercase font-black tracking-widest block">Feature Showcase</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Purpose-Built For Relentless Learning</h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              GrindPath integrates every tool you need to plan, execute, and measure your personal skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="bg-[#111827]/80 border border-indigo-500/20 hover:border-indigo-500/45 hover:bg-[#151d30] rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className={`p-3 rounded-2xl border w-fit ${feat.color}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 mt-6 tracking-tight group-hover:text-blue-400 transition">{feat.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-2.5 font-medium">{feat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-indigo-500/15 flex items-center justify-between text-[11px] font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ABOUT GRINDPATH — Blue & Purple Atmosphere */}
      <section id="about" className="px-6 py-24 bg-[#070b18] border-b border-indigo-500/20 relative z-10 overflow-hidden">
        {/* Section Ambient Glows */}
        <div className="absolute top-[10%] left-[25%] w-[50%] h-[60%] rounded-full bg-gradient-to-r from-[#3b82f6]/15 via-[#6366f1]/15 to-[#a855f7]/15 blur-[160px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="text-xs text-indigo-400 uppercase font-black tracking-widest block">About GrindPath</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">Why we built GrindPath</h2>
            <p className="text-zinc-300 text-sm leading-relaxed mt-4 font-medium">
              Standard task managers lack depth. Commercial platforms hide features behind paywalls. GrindPath was built as a free, open alternative — a complete productivity system designed around how developers and students actually learn.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed mt-4 font-medium">
              It combines personalized roadmaps, live dashboard analytics, habit tracking, focus sessions, and goal management into a single, gamified workspace — with no subscriptions and no limits.
            </p>
          </div>

          <div className="bg-[#111827]/85 p-8 rounded-3xl border border-indigo-500/25 relative overflow-hidden shadow-2xl space-y-4">
            <div className="space-y-4 relative z-10">
              {[
                { color: "bg-[#3b82f6]", label: "Personalized Learning Roadmaps" },
                { color: "bg-[#6366f1]", label: "Live Productivity Analytics" },
                { color: "bg-[#10b981]", label: "Habit Tracking & Streaks" },
                { color: "bg-[#a855f7]", label: "Gamified Progress System" }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3.5 bg-[#0b1020] rounded-2xl border border-indigo-500/20">
                  <span className={`w-3 h-3 rounded-full ${item.color} shrink-0 shadow-md`} />
                  <span className="text-sm font-semibold text-zinc-200">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-[-20%] right-[-10%] w-56 h-56 rounded-full bg-gradient-to-tr from-[#6366f1]/25 to-[#a855f7]/25 blur-[60px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* PRODUCTIVITY BENEFITS — Deep Electric Blue Atmosphere */}
      <section id="benefits" className="px-6 py-24 bg-[#070b18] relative z-10 overflow-hidden">
        {/* Section Ambient Glows */}
        <div className="absolute top-[15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#3b82f6]/18 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#6366f1]/12 blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs text-purple-400 uppercase font-black tracking-widest block">Productivity Benefits</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Stay Disciplined. Gain Momentum.</h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              GrindPath is built around the psychology of consistency — turning daily actions into measurable, long-term results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div
                  key={i}
                  className="bg-[#111827]/80 border border-indigo-500/20 hover:border-indigo-500/45 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-6 border shadow-lg`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 tracking-tight">{b.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-3 font-medium">{b.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* FAQ SECTION — Indigo & Blue Atmosphere */}
      <section id="faq" className="px-6 py-24 bg-[#070b18] border-t border-indigo-500/20 relative z-10 overflow-hidden">
        {/* Section Ambient Glows */}
        <div className="absolute top-[20%] left-[20%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#6366f1]/15 via-[#3b82f6]/12 to-[#a855f7]/10 blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs text-blue-400 uppercase font-black tracking-widest block">Support Hub</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#111827]/85 border border-indigo-500/20 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between text-sm font-bold text-zinc-200 cursor-pointer hover:bg-[#151d30] transition"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: faqOpen === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                  >
                    <ChevronDown size={16} className="text-zinc-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pt-1 text-zinc-400 text-xs leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT SECTION — Blue & Purple Atmosphere */}
      <section id="contact" className="px-6 py-24 bg-[#070b18] border-t border-indigo-500/20 relative z-10 overflow-hidden">
        {/* Section Ambient Glows */}
        <div className="absolute top-[15%] left-[-5%] w-[45%] h-[55%] rounded-full bg-[#3b82f6]/15 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[50%] rounded-full bg-[#a855f7]/15 blur-[160px] pointer-events-none" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">

          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs text-emerald-400 uppercase font-black tracking-widest block">Contact</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Get In Touch</h2>
              <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                Have a suggestion, found a bug, or want to collaborate? Reach out directly — I read every message.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs font-semibold text-zinc-300">
              <a href="mailto:pkoushal920@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span>pkoushal920@gmail.com</span>
              </a>
              <a
                href="https://github.com/Koushal0000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-400 transition"
              >
                <FaGithub size={16} className="text-zinc-400 shrink-0" />
                <span>github.com/Koushal0000</span>
              </a>
              <a
                href="https://www.linkedin.com/in/koushal-p-2440413a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-400 transition"
              >
                <FaLinkedin size={16} className="text-blue-400 shrink-0" />
                <span>linkedin.com/in/koushal-p</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#111827]/85 rounded-3xl p-6 sm:p-8 border border-indigo-500/20 space-y-5 shadow-2xl">
              <div className="flex items-start gap-3 p-4 bg-[#0b1020] border border-indigo-500/15 rounded-2xl">
                <MessageSquare size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-200">Direct Message Preferred</p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Please reach out directly via email at{" "}
                    <a href="mailto:pkoushal920@gmail.com" className="text-blue-400 hover:underline font-bold">
                      pkoushal920@gmail.com
                    </a>{" "}
                    — I typically respond within 24 hours.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    disabled
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-500 text-xs font-semibold opacity-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    disabled
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-500 text-xs font-semibold opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Message</label>
                <textarea
                  placeholder="Use the email above to send your message directly."
                  rows="4"
                  disabled
                  className="w-full glass-input p-3.5 rounded-xl text-zinc-500 text-xs leading-relaxed resize-none opacity-50 cursor-not-allowed"
                />
              </div>

              <a
                href="mailto:pkoushal920@gmail.com"
                className="w-full bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] hover:from-blue-500 hover:to-purple-500 text-white py-3.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
              >
                <Mail size={14} />
                <span>Send via Email</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER — Base Deep Navy #070b18 with Subtle Bottom Glow */}
      <footer className="px-6 py-12 border-t border-indigo-500/20 text-center text-xs text-zinc-400 font-medium bg-[#070b18] relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 space-y-4">
          <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent tracking-tight inline-block">
            GrindPath
          </Link>
          <p className="text-zinc-400 text-xs">Helping students and developers build lasting learning habits.</p>
          <p className="text-zinc-500 text-xs">
            &copy; 2026 GrindPath &nbsp;·&nbsp; Built by <span className="text-zinc-300 font-bold">Koushal P</span>
          </p>
          <div className="flex justify-center gap-6 text-xs text-zinc-400 items-center pt-2">
            <a
              href="https://github.com/Koushal0000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition"
            >
              <FaGithub size={14} /> GitHub
            </a>
            <span className="text-zinc-700">·</span>
            <a
              href="https://www.linkedin.com/in/koushal-p-2440413a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition"
            >
              <FaLinkedin size={14} /> LinkedIn
            </a>
            <span className="text-zinc-700">·</span>
            <a
              href="mailto:pkoushal920@gmail.com"
              className="hover:text-white transition"
            >
              pkoushal920@gmail.com
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
