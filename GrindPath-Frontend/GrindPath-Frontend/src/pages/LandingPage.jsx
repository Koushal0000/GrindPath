import { useState } from "react"
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
  Activity,
  ChevronDown
} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const LandingPage = () => {
  const navigate = useNavigate()
  const [faqOpen, setFaqOpen] = useState(null)

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
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400"
    },
    {
      title: "100% Free & Secure",
      desc: "Every feature — roadmaps, analytics, habit tracking, goal boards — is completely free. Your data is stored securely on MongoDB with JWT authentication.",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      title: "Gamified Motivation",
      desc: "RPG-style XP, level progression, streaks, and achievements keep you engaged through long learning sessions and help you build real consistency over time.",
      icon: Award,
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400"
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden select-none font-sans">

      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[130px] pointer-events-none pulse-glow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none pulse-glow"></div>

      {/* HEADER NAVBAR */}
      <nav className="sticky top-0 z-50 bg-zinc-950/70 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight cursor-pointer">
          GrindPath
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-400">
          <a href="#features" className="hover:text-zinc-200 transition">Features</a>
          <a href="#about" className="hover:text-zinc-200 transition">About</a>
          <a href="#benefits" className="hover:text-zinc-200 transition">Benefits</a>
          <a href="#faq" className="hover:text-zinc-200 transition">FAQs</a>
          <a href="#contact" className="hover:text-zinc-200 transition">Contact</a>
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
            className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm cursor-pointer transition shadow-lg shadow-blue-600/10"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-24 pb-20 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse mb-2">
          <Sparkles size={12} />
          <span>Gamified Study &amp; Learning Hub</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.1] tracking-tight">
          Supercharge Your Discipline. <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Build Long-Term Consistency.
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed mt-2 font-medium">
          GrindPath is a full-stack productivity platform for students and developers. Manage goals, generate personalized learning roadmaps, track habits, run focus sessions, and monitor your progress through a live analytics dashboard — all in one place, completely free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-base cursor-pointer transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/15"
          >
            <span>Start Tracking Free</span>
            <ArrowRight size={16} />
          </button>
          <a
            href="#features"
            className="px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-2xl font-bold text-base cursor-pointer transition flex items-center justify-center"
          >
            Explore Features
          </a>
        </div>

        {/* Dashboard Preview — Rich Mockup */}
        <div className="w-full mt-16 rounded-3xl bg-zinc-900/35 border border-zinc-800/80 p-3 shadow-2xl relative overflow-hidden">
          {/* Browser chrome */}
          <div className="h-[52px] bg-zinc-950/60 border-b border-zinc-900 flex items-center px-4 gap-3 rounded-t-2xl">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 max-w-[200px] h-6 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-center font-bold mx-auto">
              grindpath.dev/dashboard
            </div>
          </div>

          {/* Dashboard interior */}
          <div className="mt-0 rounded-b-2xl bg-zinc-950/70 p-4 border-t-0 border border-zinc-900 overflow-hidden">

            {/* Top stats row */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { label: "Active Goals", value: "5", color: "text-blue-400", bar: "bg-blue-500", pct: "60%" },
                { label: "Focus Hours", value: "12.4h", color: "text-indigo-400", bar: "bg-indigo-500", pct: "75%" },
                { label: "Streak", value: "14d 🔥", color: "text-amber-400", bar: "bg-amber-500", pct: "100%" },
                { label: "XP Level", value: "Lvl 7", color: "text-purple-400", bar: "bg-purple-500", pct: "82%" }
              ].map(s => (
                <div key={s.label} className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-2.5 flex flex-col gap-1.5">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{s.label}</span>
                  <span className={`text-sm font-black ${s.color}`}>{s.value}</span>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${s.bar} rounded-full`} style={{ width: s.pct }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-3 gap-2">

              {/* Left col — Productivity Score + Focus Distribution */}
              <div className="space-y-2">
                {/* Productivity Score ring */}
                <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-3">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-2">Productivity Score</span>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="16" fill="none" stroke="#27272a" strokeWidth="5" />
                        <circle cx="20" cy="20" r="16" fill="none" stroke="url(#previewGrad)" strokeWidth="5"
                          strokeLinecap="round" strokeDasharray="72 100" />
                        <defs>
                          <linearGradient id="previewGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#818cf8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[11px] font-black text-white">72</span>
                      </div>
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      {[
                        { l: "Goals", p: 26, max: 35, c: "bg-blue-500" },
                        { l: "Habits", p: 16, max: 20, c: "bg-indigo-500" },
                        { l: "Focus", p: 18, max: 20, c: "bg-purple-500" }
                      ].map(b => (
                        <div key={b.l}>
                          <div className="flex justify-between text-[8px] font-semibold text-zinc-600 mb-0.5">
                            <span>{b.l}</span><span>{b.p}/{b.max}</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className={`h-full ${b.c} rounded-full`} style={{ width: `${(b.p / b.max) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Focus Distribution */}
                <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-3">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-2">Focus Distribution</span>
                  <div className="space-y-1.5">
                    {[
                      { name: "MERN Stack", pct: 40, c: "bg-blue-500" },
                      { name: "Gen AI", pct: 30, c: "bg-indigo-500" },
                      { name: "DSA", pct: 20, c: "bg-emerald-500" },
                      { name: "Cloud", pct: 10, c: "bg-amber-500" }
                    ].map(d => (
                      <div key={d.name} className="flex items-center gap-2">
                        <span className="text-[8px] text-zinc-500 w-14 shrink-0 truncate">{d.name}</span>
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className={`h-full ${d.c} rounded-full`} style={{ width: `${d.pct}%` }} />
                        </div>
                        <span className="text-[8px] text-zinc-600 w-5 text-right">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle col — Today's Focus + Upcoming Deadlines */}
              <div className="space-y-2">
                {/* Today's Focus */}
                <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-3">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-2">Today&apos;s Focus</span>
                  <div className="space-y-1.5">
                    {[
                      { icon: Target, label: "Active Goals", value: "5", color: "text-blue-400" },
                      { icon: CheckCircle2, label: "Habits Done", value: "4/6", color: "text-indigo-400" },
                      { icon: Timer, label: "Focus Sessions", value: "2/4", color: "text-amber-400" }
                    ].map(m => {
                      const Icon = m.icon
                      return (
                        <div key={m.label} className="flex items-center justify-between bg-zinc-950/60 rounded-lg px-2 py-1.5">
                          <div className="flex items-center gap-1.5">
                            <Icon size={10} className={m.color} />
                            <span className="text-[9px] text-zinc-400 font-semibold">{m.label}</span>
                          </div>
                          <span className={`text-[10px] font-black ${m.color}`}>{m.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-3">
                  <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-2">Upcoming Deadlines</span>
                  <div className="space-y-1.5">
                    {[
                      { title: "MERN Roadmap", days: "3d", priority: "bg-rose-500" },
                      { title: "DSA Practice", days: "7d", priority: "bg-amber-500" },
                      { title: "Portfolio Site", days: "14d", priority: "bg-emerald-500" }
                    ].map(d => (
                      <div key={d.title} className="flex items-center gap-2 bg-zinc-950/60 rounded-lg px-2 py-1.5">
                        <div className={`w-1.5 h-4 rounded-full ${d.priority} shrink-0`} />
                        <span className="text-[9px] text-zinc-300 font-semibold flex-1 truncate">{d.title}</span>
                        <span className="text-[9px] text-zinc-500 font-bold shrink-0">{d.days}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right col — Recent Activity Timeline */}
              <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-3 flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block mb-2">Recent Activity</span>
                <div className="space-y-2 flex-1 relative pl-3 border-l border-zinc-800">
                  {[
                    { icon: Timer, label: "Focus Session Completed", time: "2m ago", color: "text-blue-400 bg-blue-500/10", xp: "+50 XP" },
                    { icon: CheckCircle2, label: "Habit: Morning Run ✅", time: "1h ago", color: "text-indigo-400 bg-indigo-500/10", xp: "+10 XP" },
                    { icon: MapPin, label: "Roadmap Milestone ⚡", time: "3h ago", color: "text-amber-400 bg-amber-500/10", xp: "+20 XP" },
                    { icon: Target, label: "New Goal Created 🎯", time: "Yesterday", color: "text-emerald-400 bg-emerald-500/10", xp: "+10 XP" }
                  ].map((a, i) => {
                    const Icon = a.icon
                    return (
                      <div key={i} className="relative">
                        <div className={`absolute -left-[19px] top-0 p-1 rounded-lg border border-zinc-800/50 ${a.color}`}>
                          <Icon size={8} />
                        </div>
                        <div className="pl-1">
                          <p className="text-[9px] font-bold text-zinc-300 leading-tight">{a.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[8px] text-zinc-600">{a.time}</span>
                            <span className="text-[8px] font-bold text-amber-500 bg-amber-500/10 px-1 py-px rounded">{a.xp}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* CTA overlay at bottom */}
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-[10px] text-zinc-600 font-semibold">All data synced in real-time from MongoDB</span>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[10px] cursor-pointer transition shadow-lg shadow-blue-600/10"
              >
                Explore Dashboard →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="px-6 py-20 bg-zinc-900/20 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs text-blue-500 uppercase font-black tracking-widest block">Feature Showcase</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Purpose-Built For Relentless Learning</h2>
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              GrindPath integrates every tool you need to plan, execute, and measure your personal skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="bg-zinc-900/35 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/50 p-6 rounded-3xl transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-2xl border w-fit ${feat.color}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-200 mt-5 tracking-tight group-hover:text-blue-400 transition">{feat.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-2.5 font-medium">{feat.desc}</p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ABOUT GRINDPATH */}
      <section id="about" className="px-6 py-20 border-b border-zinc-900">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs text-indigo-500 uppercase font-black tracking-widest block">About GrindPath</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">Why we built GrindPath</h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-4 font-medium">
              Standard task managers lack depth. Commercial platforms hide features behind paywalls. GrindPath was built as a free, open alternative — a complete productivity system designed around how developers and students actually learn.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-4 font-medium">
              It combines personalized roadmaps, live dashboard analytics, habit tracking, focus sessions, and goal management into a single, gamified workspace — with no subscriptions and no limits.
            </p>
          </div>
          <div className="relative p-6 bg-zinc-900/40 border border-zinc-850 rounded-3xl overflow-hidden">
            <div className="space-y-4">
              {[
                { color: "bg-blue-500", label: "Personalized Learning Roadmaps" },
                { color: "bg-indigo-500", label: "Live Productivity Analytics" },
                { color: "bg-emerald-500", label: "Habit Tracking & Streaks" },
                { color: "bg-purple-500", label: "Gamified Progress System" }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                  <span className="text-xs font-semibold text-zinc-300">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 rounded-full bg-indigo-500/5 blur-[50px]" />
          </div>
        </div>
      </section>

      {/* PRODUCTIVITY BENEFITS */}
      <section id="benefits" className="px-6 py-20 bg-zinc-900/10">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs text-purple-500 uppercase font-black tracking-widest block">Productivity Benefits</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Stay Disciplined. Gain Momentum.</h2>
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              GrindPath is built around the psychology of consistency — turning daily actions into measurable, long-term results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div
                  key={i}
                  className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-3xl relative overflow-hidden"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-4 border`}>
                    <Icon size={16} />
                  </div>
                  <h3 className="text-base font-bold text-zinc-200 tracking-tight">{b.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mt-2.5 font-medium">{b.desc}</p>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="px-6 py-20 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs text-blue-500 uppercase font-black tracking-widest block">Support Hub</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900/40 border border-zinc-850/80 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-bold text-zinc-200 cursor-pointer hover:bg-zinc-900/60 transition"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: faqOpen === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                  >
                    <ChevronDown size={16} className="text-zinc-500" />
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
                      <p className="px-5 pb-5 pt-1 text-zinc-400 text-xs leading-relaxed font-medium">
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

      {/* CONTACT SECTION */}
      <section id="contact" className="px-6 py-20 bg-zinc-900/20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs text-emerald-500 uppercase font-black tracking-widest block">Contact</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Get In Touch</h2>
              <p className="text-zinc-500 text-xs leading-relaxed font-semibold">
                Have a suggestion, found a bug, or want to collaborate? Reach out directly — I read every message.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs font-semibold text-zinc-400">
              <a href="mailto:pkoushal920@gmail.com" className="flex items-center gap-3 hover:text-zinc-200 transition">
                <Mail size={16} className="text-blue-400 shrink-0" />
                <span>pkoushal920@gmail.com</span>
              </a>
              <a
                href="https://github.com/Koushal0000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-zinc-200 transition"
              >
                <FaGithub size={16} className="text-zinc-400 shrink-0" />
                <span>github.com/Koushal0000</span>
              </a>
              <a
                href="https://www.linkedin.com/in/koushal-p-2440413a1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-zinc-200 transition"
              >
                <FaGithub size={16} className="text-blue-400 shrink-0" />
                <span>linkedin.com/in/koushal-p</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            {/* Contact form — currently unavailable, direct to email */}
            <div className="glass-card rounded-3xl p-6 border-zinc-850/80 bg-zinc-900/30 space-y-5">
              <div className="flex items-start gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <MessageSquare size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-200">Direct Message Preferred</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    The contact form is not connected to a backend at this time. Please reach out directly via email at{" "}
                    <a href="mailto:pkoushal920@gmail.com" className="text-blue-400 hover:underline font-bold">
                      pkoushal920@gmail.com
                    </a>{" "}
                    — I typically respond within 24 hours.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    disabled
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-500 text-xs font-semibold opacity-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    disabled
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-500 text-xs font-semibold opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Message</label>
                <textarea
                  placeholder="Use the email above to send your message directly."
                  rows="4"
                  disabled
                  className="w-full glass-input p-3.5 rounded-xl text-zinc-500 text-xs leading-relaxed resize-none opacity-50 cursor-not-allowed"
                />
              </div>

              <a
                href="mailto:pkoushal920@gmail.com"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/10"
              >
                <Mail size={14} />
                <span>Send via Email</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-zinc-900 text-center text-xs text-zinc-500 font-semibold bg-zinc-950">
        <Link to="/" className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight block mb-2">
          GrindPath
        </Link>
        <p className="text-zinc-600 text-[11px] mb-4">Helping students and developers build lasting learning habits.</p>
        <p className="text-zinc-700 text-[11px] mb-5">
          &copy; 2026 GrindPath &nbsp;·&nbsp; Built by <span className="text-zinc-500 font-bold">Koushal P</span>
        </p>
        <div className="flex justify-center gap-6 text-[11px] text-zinc-600 items-center">
          <a
            href="https://github.com/Koushal0000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 flex items-center gap-1.5 transition"
          >
            <FaGithub size={13} /> GitHub
          </a>
          <span className="text-zinc-800">·</span>
          <a
            href="https://www.linkedin.com/in/koushal-p-2440413a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 flex items-center gap-1.5 transition"
          >
            <FaLinkedin size={13} /> LinkedIn
          </a>
          <span className="text-zinc-800">·</span>
          <a
            href="mailto:pkoushal920@gmail.com"
            className="hover:text-zinc-300 transition"
          >
            pkoushal920@gmail.com
          </a>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
