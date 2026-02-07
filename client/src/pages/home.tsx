import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  Eye, 
  Search, 
  Hammer, 
  Radio, 
  Scale,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const agents = [
  { 
    id: "oversight", 
    name: "OVERSIGHT", 
    role: "Governor",
    icon: Eye,
    action: "Reviewing agent outputs...",
    color: "violet"
  },
  { 
    id: "intelligence", 
    name: "INTELLIGENCE", 
    role: "Scout",
    icon: Search,
    action: "Scanning for automation opportunities...",
    color: "cyan"
  },
  { 
    id: "systems", 
    name: "SYSTEMS", 
    role: "Forge",
    icon: Hammer,
    action: "Scaffolding micro-utility...",
    color: "amber"
  },
  { 
    id: "reach", 
    name: "REACH", 
    role: "Signal",
    icon: Radio,
    action: "Drafting market outreach...",
    color: "emerald"
  },
  { 
    id: "logic", 
    name: "LOGIC", 
    role: "Gatekeeper",
    icon: Scale,
    action: "Validating Stillfrost Standard...",
    color: "rose"
  },
];

const AgentNode = ({ agent, isActive, delay }: { agent: typeof agents[0]; isActive: boolean; delay: number }) => {
  const Icon = agent.icon;
  
  const colorClasses = {
    violet: { bg: "bg-violet-500/20", border: "border-violet-500/40", text: "text-violet-400", glow: "shadow-violet-500/20" },
    cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/40", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
    amber: { bg: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-400", glow: "shadow-amber-500/20" },
    emerald: { bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
    rose: { bg: "bg-rose-500/20", border: "border-rose-500/40", text: "text-rose-400", glow: "shadow-rose-500/20" },
  };
  
  const colors = colorClasses[agent.color as keyof typeof colorClasses];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`relative p-4 rounded-xl border transition-all duration-500 ${
        isActive 
          ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}` 
          : "bg-zinc-900/40 border-zinc-800"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${isActive ? colors.bg : "bg-zinc-800"} ${isActive ? colors.border : "border-zinc-700"} border`}>
          <Icon size={16} className={isActive ? colors.text : "text-zinc-500"} />
        </div>
        <div>
          <h3 className={`text-sm font-mono font-bold ${isActive ? colors.text : "text-zinc-500"}`}>
            {agent.name}
          </h3>
          <p className="text-[10px] font-mono text-zinc-600">{agent.role}</p>
        </div>
        {isActive && (
          <span className={`ml-auto w-2 h-2 rounded-full animate-pulse ${colors.text.replace("text-", "bg-")}`} />
        )}
      </div>
      
      <AnimatePresence>
        {isActive && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-zinc-400 font-mono mt-2 pl-11"
          >
            {agent.action}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Home() {
  const [activeAgent, setActiveAgent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />
      
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-serif text-lg text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            STILLFROST
          </motion.span>
          
          <div className="hidden md:flex items-center gap-8">
            {["Dashboard", "Registry", "Protocol"].map((item, i) => (
              <Link 
                key={item} 
                href={item === "Dashboard" ? "/dashboard" : item === "Registry" ? "/registry" : "#"}
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-300 uppercase tracking-widest cursor-pointer transition-colors"
                >
                  {item}
                </motion.span>
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-zinc-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {["Dashboard", "Registry", "Protocol"].map((item) => (
                <Link 
                  key={item} 
                  href={item === "Dashboard" ? "/dashboard" : item === "Registry" ? "/registry" : "#"}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-2xl font-serif text-white">{item}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
          >
            STILLFROST
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The staff-less future is definite. We don't hunt for opportunities; 
            we crystallize them through capitalized autonomy.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full max-w-2xl mb-16"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
              Synthetic Workforce Active
            </span>
          </div>
          
          <div className="space-y-3">
            {agents.map((agent, index) => (
              <AgentNode 
                key={agent.id}
                agent={agent}
                isActive={index === activeAgent}
                delay={1.4 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Link href="/dashboard">
            <button 
              className="group flex items-center gap-3 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-sm tracking-widest uppercase transition-all duration-300"
              data-testid="button-enter-terminal"
            >
              <span>Enter Terminal</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            Staff-less Micro-Utility Factory
          </p>
        </motion.div>
      </div>
    </div>
  );
}
