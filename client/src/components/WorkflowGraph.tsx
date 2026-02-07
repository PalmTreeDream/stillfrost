import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Globe, Search, Cpu, ShieldCheck } from "lucide-react";

const WorkflowGraph = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between relative overflow-hidden bg-slate-50/10">
      {/* Background Mesh Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="relative z-10 flex flex-col gap-6 p-2 h-full">
        <h3 className="font-serif text-lg text-slate-800 flex items-center gap-2">
          <BrainCircuit size={16} className="text-indigo-500" />
          Neural Architecture
        </h3>

        {/* Visualization Container */}
        <div className="flex-1 flex flex-col items-center justify-center relative my-4">
          
          {/* Central Data Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-indigo-200 to-slate-200 -ml-[0.5px] -z-10" />

          {/* Node 1: Principal (Input) */}
          <div className="flex items-center gap-6 w-full justify-center mb-8">
            <span className="text-[10px] font-mono font-bold text-slate-400 w-20 text-right tracking-widest">PRINCIPAL</span>
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-100 shadow-sm relative z-10" />
              <div className="absolute top-full left-1/2 w-px h-8 bg-slate-300 -ml-[0.5px]" />
            </div>
            <div className="w-20"></div>
          </div>

          {/* Node 2: Oversight (The Core Governor) */}
          <motion.div 
            className="flex items-center gap-6 w-full justify-center mb-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[10px] font-mono font-bold text-indigo-600 w-20 text-right tracking-widest">OVERSIGHT</span>
            
            {/* Complex Node */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer Rotating Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-dashed border-indigo-200"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner Pulsing Ring */}
              <div className="absolute inset-2 rounded-full border border-indigo-100 bg-white/50 backdrop-blur-sm" />
              
              {/* Core Icon */}
              <div className="relative z-10 p-2 bg-indigo-50 rounded-lg border border-indigo-100 shadow-sm">
                <ShieldCheck size={20} className="text-indigo-600" strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="w-20 flex flex-col justify-center">
               <span className="text-[9px] text-slate-400 leading-tight">Governance<br/>Layer</span>
            </div>
          </motion.div>

          {/* Node 3: The Swarm (Agents) */}
          <div className="relative w-full flex justify-center mt-2">
             {/* Horizontal Distributor */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-px bg-slate-200" />
             
             {/* Vertical Connectors */}
             <div className="absolute -top-6 left-[calc(50%-6rem)] h-6 w-px bg-slate-200" />
             <div className="absolute -top-6 right-[calc(50%-6rem)] h-6 w-px bg-slate-200" />
             <div className="absolute -top-6 left-1/2 h-6 w-px bg-slate-200" />

             {/* Agent Nodes */}
             <div className="flex gap-12">
               {/* Intel */}
               <div className="flex flex-col items-center gap-3 group">
                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-sky-300 transition-colors">
                   <Search size={16} className="text-slate-400 group-hover:text-sky-500 transition-colors" />
                 </div>
                 <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-sky-600 transition-colors">INTEL</span>
               </div>

               {/* Logic */}
               <div className="flex flex-col items-center gap-3 group">
                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-indigo-300 transition-colors">
                   <Cpu size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                 </div>
                 <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">LOGIC</span>
               </div>

               {/* Reach */}
               <div className="flex flex-col items-center gap-3 group">
                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-emerald-300 transition-colors">
                   <Globe size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                 </div>
                 <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">REACH</span>
               </div>
             </div>
          </div>

          {/* Animated Data Packets */}
          <motion.div 
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full absolute top-8 left-1/2 -ml-[3px] z-20 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
            animate={{ y: [0, 80], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

        </div>
        
        {/* Status Bar */}
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-auto">
             <motion.div 
               className="h-full bg-indigo-500" 
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 1.5, delay: 0.5 }}
             />
        </div>
      </div>
    </div>
  );
};

export default WorkflowGraph;
