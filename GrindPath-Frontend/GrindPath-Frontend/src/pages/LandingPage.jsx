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
  Layers
} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"

const LandingPage = () => {
  const navigate = useNavigate()
  const [faqOpen, setFaqOpen] = useState(null)
  
  // Contact Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !message) return
    
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success("Thank you! Your message was sent successfully. 🚀")
      setName("")
      setEmail("")
      setMessage("")
    }, 1200)
  }

  const features = [
    {
      title: "Interactive Goal Boards",
      desc: "Segment your learning objectives into custom categories, set deadlines, priority levels, and manage subtasks on a sleek interactive task board.",
      icon: Target,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Focus Arena (Pomodoro)",
      desc: "Immerse yourself in digital deep work using a fullscreen, clutter-free Focus Mode. Configure breaks, play notification sounds, and log focus hours.",
      icon: BrainCircuit,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      title: "Gamified XP & Levels",
      desc: "Earn XP for ticking off goals, completing habits, or finishing focus sessions. Rank up your profile and unlock milestones.",
      icon: Sparkles,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Daily Consistency Streaks",
      desc: "Keep your momentum alive. GrindPath tracks your daily activity and rewards consecutive days of work with high-energy streak flames.",
      icon: Flame,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Daily Habit Loops",
      desc: "Build secondary routines (hydration, reading, coding) with a self-resetting daily checklist. Earn bonus XP for completing all daily habits.",
      icon: Zap,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20"
    },
    {
      title: "Structured Roadmaps",
      desc: "Auto-generate comprehensive weekly study guides for complex software engineering tracks like MERN stack or Java systems directly in your dashboard.",
      icon: ShieldCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    }
  ]

  const benefits = [
    {
      title: "Built for Self-Learners",
      desc: "No corporate bloat or commercial pricing. GrindPath is designed from the ground up for students and independent developers seeking structured accountability.",
      icon: Layers,
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400"
    },
    {
      title: "100% Free & Private",
      desc: "Enjoy unlimited goals, full roadmap libraries, customized pomodoro settings, and analytics reports completely free of charge. Your data remains private.",
      icon: ShieldCheck,
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400"
    },
    {
      title: "Gamified Motivation",
      desc: "Leverage RPG-style feedback loops (XP, leveling, and achievements) to stay motivated through long learning sessions and maintain consistent study habits.",
      icon: Award,
      color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400"
    }
  ]

  const faqs = [
    {
      q: "Is GrindPath really free?",
      a: "Yes! GrindPath is a completely free, modern learning and productivity system. There are no pricing tiers, subscriptions, paywalls, or advertisements. Every feature is unlocked and available immediately."
    },
    {
      q: "How does the XP and leveling system work?",
      a: "Completing tasks, check-listing daily habits, and finishing Pomodoro focus blocks awards you XP. Accumulating 100 XP levels up your grinder rank, and special milestones unlock permanent achievements shown on your Profile page."
    },
    {
      q: "Where is my productivity data stored?",
      a: "Your account credentials, goals, and learning roadmaps are synced to a secure MongoDB database. Study sessions, daily habits, XP progress, streaks, and achievements are cached locally in your browser to ensure lightning-fast interactions and privacy."
    },
    {
      q: "Can I customize the focus and break timers?",
      a: "Absolutely! You can change Focus duration, Short Break duration, and Long Break duration in your Settings panel. The timers will dynamically adjust to your studying rhythm."
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
          <span>Gamified Study & learning Hub</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.1] tracking-tight">
          Supercharge Your Discipline. <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Build Long-Term Consistency.
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed mt-2 font-medium">
          A free, modern learning and productivity platform for students, developers, and self-learners. Track milestones, enter deep focus blocks, build daily habits, and earn rewards completely free.
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

        {/* Dashboard Mockup Display */}
        <div className="w-full mt-16 rounded-3xl bg-zinc-900/35 border border-zinc-800/80 p-3 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[60px] bg-zinc-950/40 border-b border-zinc-850 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 max-w-[200px] h-6 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-center font-bold mx-auto">
              grindpath.dev/dashboard
            </div>
          </div>
          <div className="mt-14 h-56 sm:h-96 rounded-2xl bg-zinc-950/60 flex items-center justify-center p-4 border border-zinc-900 relative">
            
            {/* Visual simulation of dashboard widgets */}
            <div className="grid grid-cols-3 gap-3 w-full h-full max-w-2xl opacity-60">
              <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block text-left">Daily Focus</span>
                <span className="text-2xl font-black text-blue-400 text-left">4.5 Hrs</span>
                <div className="w-full bg-zinc-955 h-1 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-blue-500 rounded-full" />
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block text-left">Grinder Rank</span>
                <span className="text-2xl font-black text-indigo-400 text-left">Level 4</span>
                <div className="w-full bg-zinc-955 h-1 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-indigo-500 rounded-full" />
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest block text-left">Current Streak</span>
                <span className="text-2xl font-black text-amber-500 text-left">12 Days</span>
                <div className="w-full bg-zinc-955 h-1 rounded-full overflow-hidden">
                  <div className="w-[100%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>
              <div className="bg-zinc-900 border border-zinc-850 rounded-2xl col-span-2" />
              <div className="bg-zinc-900 border border-zinc-850 rounded-2xl" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full mb-3 shadow-md">Dashboard Preview</span>
              <h4 className="text-lg font-bold text-zinc-200">Interactive workspace to track goals, habits, and study logs</h4>
              <button 
                onClick={() => navigate("/register")}
                className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs cursor-pointer transition shadow-lg shadow-blue-600/10"
              >
                Access Dashboard
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
              GrindPath integrates the core tools needed to plan, execute, and monitor your personal skill development.
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
              We realized that standard task managers are dry and lack motivation, while commercial SaaS platforms are filled with pricing plans, trial periods, and paywalls.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-4 font-medium">
              GrindPath was created as a <strong>100% free</strong>, open, gamified ecosystem. By merging habit trackers, Pomodoro logs, study roadmaps, and RPG-style levels, we provide the ultimate focus workspace for developers and students.
            </p>
          </div>
          <div className="relative p-6 bg-zinc-900/40 border border-zinc-850 rounded-3xl overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-xs font-semibold text-zinc-300">Gamified learning loop</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-xs font-semibold text-zinc-300">Clean visual analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-zinc-300">100% Privacy-friendly caching</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-xs font-semibold text-zinc-300">No premium paywalls</span>
              </div>
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
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Stay Disciplined, Gain Momentum</h2>
            <p className="text-zinc-500 text-sm leading-relaxed font-semibold">
              The psychological science of gamification helps you build focus and long-term routines.
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
                  <HelpCircle size={16} className="text-zinc-500 shrink-0 ml-4" />
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

      {/* CONTACT FORM */}
      <section id="contact" className="px-6 py-20 bg-zinc-900/20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs text-emerald-500 uppercase font-black tracking-widest block">Contact Us</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Get In Touch</h2>
              <p className="text-zinc-500 text-xs leading-relaxed font-semibold">
                Have ideas or suggestions for roadmaps, features, or developer integrations? Let us know.
              </p>
            </div>

            <div className="space-y-4 pt-4 text-xs font-semibold text-zinc-400">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-blue-400" />
                <span>support@grindpath.dev</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleContactSubmit} className="glass-card rounded-3xl p-6 border-zinc-850/80 bg-zinc-900/30 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Marcus"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-200 text-xs font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input p-3.5 rounded-xl text-zinc-200 text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Message Description</label>
                <textarea 
                  placeholder="Tell us what you're working on or how we can help..."
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full glass-input p-3.5 rounded-xl text-zinc-200 text-xs leading-relaxed resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/10"
              >
                <MessageSquare size={14} />
                <span>{submitting ? "Sending..." : "Submit Message"}</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-12 border-t border-zinc-900 text-center text-xs text-zinc-500 font-semibold space-y-4 bg-zinc-950">
        <Link to="/" className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight block">
          GrindPath
        </Link>
        <p>&copy; {new Date().getFullYear()} GrindPath. Built for relentless developers.</p>
        <div className="flex justify-center gap-6 text-[10px] text-zinc-550 items-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-350 flex items-center gap-1">
            <FaGithub size={12} /> GitHub
          </a>
          <span>&bull;</span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-350 flex items-center gap-1">
            <FaLinkedin size={12} /> LinkedIn
          </a>
          <span>&bull;</span>
          <a href="#contact" className="hover:text-zinc-350">Contact</a>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
