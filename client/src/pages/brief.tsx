import React from "react";
import GlobalNav from "@/components/GlobalNav";
import CommandPalette from "@/components/CommandPalette";
import { motion } from "framer-motion";

const BriefPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] selection:bg-emerald-200 selection:text-emerald-900">
      <GlobalNav />
      <CommandPalette />
      
      <main className="pt-32 pb-20 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-slate-800 tracking-tight mb-4">The Brief</h1>
          <p className="font-mono text-sm text-slate-500 uppercase tracking-widest mb-8">
             Daily Intelligence & Operations Log
          </p>
          <div className="p-8 border border-dashed border-slate-300 rounded-2xl bg-slate-50">
             <p className="font-serif italic text-slate-400">Compiling intelligence stream...</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default BriefPage;
