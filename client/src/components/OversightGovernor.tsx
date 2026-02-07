import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Crown, ShieldCheck, Activity } from "lucide-react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={`
      relative overflow-hidden rounded-2xl 
      bg-white/60 backdrop-blur-xl 
      border border-white/60 
      shadow-lg shadow-indigo-100/30
      ${className}
    `}
  >
    <div className="relative z-10 h-full p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      {children}
    </div>
  </motion.div>
);

const OversightGovernor = () => {
  return (
    <GlassCard className="mb-8 border-t-2 border-t-indigo-500/20" delay={0.1}>
      {/* Identity */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100/50 shadow-sm">
           <Crown className="text-indigo-600" size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-serif text-xl text-slate-800">Stillfrost Oversight</h2>
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">System Governor</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end flex-1">
        
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Task Orchestration</span>
            <span className="font-serif text-slate-700">Active</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <ShieldCheck size={14} className="text-indigo-500" />
           <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Governance Protocol</span>
            <span className="font-serif text-slate-700">Anti-Rubbish v2.1</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <Activity size={14} className="text-slate-500" />
           <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Principal Sync</span>
            <span className="font-serif text-slate-700">Enabled</span>
          </div>
        </div>

      </div>
    </GlassCard>
  );
};

export default OversightGovernor;
