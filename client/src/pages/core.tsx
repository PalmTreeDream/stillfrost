import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Shield, Zap, Globe, Server, Terminal, Activity } from "lucide-react";
import { Link } from "wouter";
import GlobalNav from "@/components/GlobalNav";
import CommandPalette from "@/components/CommandPalette";

const ArchitectureDiagram = () => {
  return (
    <div className="w-full h-64 md:h-80 relative flex items-center justify-center overflow-hidden rounded-3xl bg-slate-50/50 border border-white/60 mb-12">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {/* Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path 
          d="M 100 160 L 300 160 L 500 160 L 700 160" 
          stroke="url(#flowGradient)" 
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 5"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="relative z-10 flex items-center gap-4 md:gap-12 px-4 overflow-x-auto w-full justify-center">
        
        {/* NODE 1: INGESTION */}
        <div className="flex flex-col items-center gap-4 min-w-[100px]">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center relative">
            <Globe className="text-slate-400" size={24} />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse"></div>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ingestion</span>
        </div>

        <ArrowRight className="text-slate-300 shrink-0" size={20} />

        {/* NODE 2: FROSTGUARD */}
        <div className="flex flex-col items-center gap-4 min-w-[100px]">
          <div className="w-16 h-16 rounded-2xl bg-white border border-indigo-200 shadow-md shadow-indigo-100 flex items-center justify-center relative">
            <Shield className="text-indigo-500" size={24} />
          </div>
          <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-widest">FrostGuard</span>
        </div>

        <ArrowRight className="text-slate-300 shrink-0" size={20} />

        {/* NODE 3: STILLSENSE */}
        <div className="flex flex-col items-center gap-4 min-w-[100px]">
          <div className="w-16 h-16 rounded-2xl bg-white border border-sky-200 shadow-md shadow-sky-100 flex items-center justify-center relative">
            <Cpu className="text-sky-500" size={24} />
          </div>
          <span className="font-mono text-[10px] font-bold text-sky-600 uppercase tracking-widest">StillSense</span>
        </div>

        <ArrowRight className="text-slate-300 shrink-0" size={20} />

        {/* NODE 4: STILLPULSE */}
        <div className="flex flex-col items-center gap-4 min-w-[100px]">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg flex items-center justify-center relative">
            <Zap className="text-emerald-400" size={24} />
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-mono font-bold">LIVE</div>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-800 uppercase tracking-widest">StillPulse</span>
        </div>

      </div>
    </div>
  );
};

const CorePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* Navigation */}
      <GlobalNav />
      <CommandPalette />

      <main className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-slate-800 tracking-tight"
          >
            The Core
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-slate-500 uppercase tracking-widest max-w-lg mx-auto leading-relaxed"
          >
            Autonomous Orchestration Layer v2.4 <br/> 
            <span className="text-slate-400">Systems Operational • 99.98% Uptime</span>
          </motion.p>
        </div>

        {/* 1. Orchestration Layer */}
        <section className="mb-24">
           <div className="flex items-center gap-3 mb-8">
             <Server className="text-slate-400" size={20} />
             <h2 className="font-serif text-2xl text-slate-800">Orchestration Layer</h2>
           </div>
           
           <ArchitectureDiagram />
        </section>

        {/* 2. The Protocol Logic (Agents) */}
        <section className="mb-24">
           <div className="flex items-center gap-3 mb-10">
             <Cpu className="text-slate-400" size={20} />
             <h2 className="font-serif text-2xl text-slate-800">Protocol Logic</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Agent 1 */}
              <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="mb-6 pb-4 border-b border-slate-50 flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-sky-600 uppercase tracking-widest">SCOUT-01</span>
                  <Activity size={16} className="text-slate-300" />
                </div>
                <h3 className="font-serif text-xl text-slate-800 mb-3">Market Intelligence</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  Uses first-principles thinking to identify "Secrets" and market inefficiencies with 99% accuracy. Scans Github, Twitter, and On-chain data continuously.
                </p>
              </div>

              {/* Agent 2 */}
              <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="mb-6 pb-4 border-b border-slate-50 flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-indigo-600 uppercase tracking-widest">ANALYST-ALPHA</span>
                  <Shield size={16} className="text-slate-300" />
                </div>
                <h3 className="font-serif text-xl text-slate-800 mb-3">Risk & Compliance</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  Performs automated due diligence, auditing every decision against current Fintech regulations. Ensures zero-trust security architecture.
                </p>
              </div>

              {/* Agent 3 */}
              <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="mb-6 pb-4 border-b border-slate-50 flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest">PULSE-003</span>
                  <Zap size={16} className="text-slate-300" />
                </div>
                <h3 className="font-serif text-xl text-slate-800 mb-3">Distribution Engine</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                   Automates high-friction outreach and brand presence through agentic content production. Manages multi-channel deployment autonomously.
                </p>
              </div>
           </div>
        </section>

        {/* 3. Technical Stack */}
        <section className="mb-24">
           <div className="flex items-center gap-3 mb-10">
             <Terminal className="text-slate-400" size={20} />
             <h2 className="font-serif text-2xl text-slate-800">The Arsenal</h2>
           </div>
           
           <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-slate-300 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6">
                   <h3 className="text-white font-bold uppercase tracking-widest text-xs border-b border-slate-700 pb-2 mb-4">Core Infrastructure</h3>
                   <ul className="space-y-3">
                     <li className="flex justify-between">
                       <span>Replit Serverless</span>
                       <span className="text-emerald-400">99.98% Uptime</span>
                     </li>
                     <li className="flex justify-between">
                       <span>Next.js 14 / React</span>
                       <span className="text-slate-500">Frontend</span>
                     </li>
                     <li className="flex justify-between">
                       <span>Tailwind CSS</span>
                       <span className="text-slate-500">Styling</span>
                     </li>
                   </ul>
                </div>
                <div className="space-y-6">
                   <h3 className="text-white font-bold uppercase tracking-widest text-xs border-b border-slate-700 pb-2 mb-4">Intelligence Layer</h3>
                   <ul className="space-y-3">
                     <li className="flex justify-between">
                       <span>ElizaOS Framework</span>
                       <span className="text-sky-400">Multi-Agent</span>
                     </li>
                     <li className="flex justify-between">
                       <span>Python LLM Orchestration</span>
                       <span className="text-slate-500">Logic</span>
                     </li>
                     <li className="flex justify-between">
                       <span>PostgreSQL</span>
                       <span className="text-slate-500">Memory</span>
                     </li>
                   </ul>
                </div>
              </div>
           </div>
        </section>

        {/* 4. High-Status Closing */}
        <section className="text-center py-12 px-4">
           <blockquote className="font-serif text-2xl md:text-3xl text-slate-700 leading-relaxed max-w-3xl mx-auto italic relative">
             <span className="absolute -top-8 left-0 text-6xl text-slate-200 font-serif">"</span>
             Automation is not about reducing headcount; it is about increasing the leverage of the Principal. Stillfrost is a 10x multiplier on human intent.
           </blockquote>
           <div className="mt-8 flex justify-center">
             <div className="h-px w-12 bg-slate-300"></div>
           </div>
        </section>

      </main>
      
      {/* Footer */}
      <footer className="w-full py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            © 2026 Stillfrost Inc.
          </p>
          <p className="font-serif italic text-slate-400 text-xs">Authenticated by the Principal</p>
        </div>
      </footer>
    </div>
  );
};

export default CorePage;
