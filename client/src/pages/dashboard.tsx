import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowUpRight,
  Terminal,
  Shield,
  Globe,
  Zap,
  Cpu,
  Activity,
  Server,
  ShieldCheck,
  Beaker,
  Lock,
  Check,
  X
} from "lucide-react";
import AgentTerminal from "@/components/AgentTerminal";
import GlobalNav from "@/components/GlobalNav";
import { useAuth } from "@/hooks/use-auth";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
}

const GlassCard = ({ children, className = "", delay = 0, noPadding = false }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={`
      group relative overflow-hidden rounded-2xl 
      bg-zinc-900/60 backdrop-blur-xl 
      border border-zinc-800 
      hover:border-zinc-700
      transition-all duration-500
      ${className}
    `}
  >
    <div className={`relative z-10 h-full ${noPadding ? '' : 'p-6'}`}>
      {children}
    </div>
  </motion.div>
);

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "incubation" | "operational" | "pending";
}

const Badge = ({ children, variant = "default" }: BadgeProps) => {
  const styles = variant === "incubation"
    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
    : variant === "operational"
      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      : variant === "pending"
        ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
        : "bg-zinc-800 text-zinc-400 border border-zinc-700";

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase
      ${styles}
    `}>
      {variant === "incubation" && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
      {variant === "operational" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
      {children}
    </span>
  );
};

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
  </span>
);

const VaultItem = ({ title, type, status }: { title: string; type: "product" | "thread"; status: string }) => (
  <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{type}</span>
        <h4 className="text-sm font-medium text-zinc-200 mt-1">{title}</h4>
      </div>
      <Badge variant="pending">{status}</Badge>
    </div>
    <div className="flex gap-2">
      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-mono font-bold rounded border border-emerald-500/30 transition-colors">
        <Check size={12} />
        AUTHORIZE
      </button>
      <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono rounded border border-red-500/20 transition-colors">
        <X size={12} />
      </button>
    </div>
  </div>
);

const LabItem = ({ title, agent, progress }: { title: string; agent: string; progress: number }) => (
  <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
    <div className="flex items-start justify-between mb-2">
      <div>
        <h4 className="text-sm font-medium text-zinc-300">{title}</h4>
        <span className="text-[10px] font-mono text-zinc-500">{agent}</span>
      </div>
      <Badge variant="incubation">Building</Badge>
    </div>
    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-3">
      <div
        className="h-full bg-amber-500/60 rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10">
        <GlobalNav />

        <div className="pt-24 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Lab
                </h1>
                <LiveIndicator />
              </div>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Active Product Incubation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              <div className="lg:col-span-8 space-y-6">

                <GlassCard delay={0.1} noPadding>
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Terminal size={16} className="text-zinc-500" />
                      <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Studio Operations Feed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-600">AGENTS ACTIVE</span>
                      <LiveIndicator />
                    </div>
                  </div>
                  <div className="h-[400px]">
                    <AgentTerminal />
                  </div>
                </GlassCard>

                {isAuthenticated && (
                  <GlassCard delay={0.2}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-violet-500/20 rounded-lg border border-violet-500/30">
                        <Lock size={16} className="text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-white">The Vault</h3>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Pending Principal Authorization</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <VaultItem
                        title="Commission Auditor v1.0"
                        type="product"
                        status="Awaiting Deploy"
                      />
                      <VaultItem
                        title="Thread: Real Estate Tech Pain Points"
                        type="thread"
                        status="Awaiting Post"
                      />
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-600">ESTIMATED COST THIS RUN</span>
                      <span className="text-sm font-mono text-emerald-400">$0.47</span>
                    </div>
                  </GlassCard>
                )}

              </div>

              <div className="lg:col-span-4 space-y-6">

                <GlassCard delay={0.15}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                      <Beaker size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white">The Lab</h3>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Active Incubation</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <LabItem
                      title="Lease Summarizer"
                      agent="SYSTEMS (Forge)"
                      progress={65}
                    />
                    <LabItem
                      title="Deal Sheet Formatter"
                      agent="INTELLIGENCE (Scout)"
                      progress={30}
                    />
                  </div>
                </GlassCard>

                <GlassCard delay={0.2}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                      <Server size={16} className="text-emerald-400" />
                    </div>
                    <h3 className="font-serif text-lg text-white">System Status</h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Oversight", status: "Active", color: "emerald" },
                      { name: "Intelligence", status: "Scanning", color: "amber" },
                      { name: "Systems", status: "Building", color: "amber" },
                      { name: "Reach", status: "Idle", color: "zinc" },
                      { name: "Logic", status: "Validating", color: "emerald" },
                    ].map((agent) => (
                      <div key={agent.name} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                        <span className="text-sm text-zinc-400">{agent.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${agent.color === "emerald" ? "bg-emerald-400" :
                              agent.color === "amber" ? "bg-amber-400 animate-pulse" :
                                "bg-zinc-600"
                            }`} />
                          <span className={`text-[10px] font-mono uppercase ${agent.color === "emerald" ? "text-emerald-400" :
                              agent.color === "amber" ? "text-amber-400" :
                                "text-zinc-600"
                            }`}>{agent.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <Link href="/registry">
                  <GlassCard delay={0.25} className="cursor-pointer hover:border-emerald-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg border border-zinc-700">
                          <Globe size={16} className="text-zinc-400" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-white">The Registry</h3>
                          <p className="text-[10px] font-mono text-zinc-500">View operational assets</p>
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-zinc-600" />
                    </div>
                  </GlassCard>
                </Link>

              </div>
            </div>

          </div>
        </div>

        <footer className="border-t border-zinc-900 py-8">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              Stillfrost
            </p>
            <div className="flex items-center gap-2">
              <LiveIndicator />
              <span className="text-[10px] font-mono text-zinc-600">Autonomous Venture Studio</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
