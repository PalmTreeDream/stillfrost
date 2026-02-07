import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { 
  Search, 
  Cpu, 
  Globe, 
  Shield, 
  Terminal, 
  ArrowRight,
  LayoutDashboard,
  FileText,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/60 overflow-hidden relative z-[101]"
          >
            <Command className="w-full">
              <div className="flex items-center border-b border-slate-100 px-4">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-slate-500" />
                <Command.Input 
                  placeholder="Principal's Command Key..." 
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 font-mono text-slate-800"
                />
              </div>
              
              <Command.List className="max-h-[300px] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-slate-500 font-mono">
                  No signals found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/"))}
                  >
                    <LayoutDashboard size={14} className="text-slate-400" />
                    <span>Dashboard</span>
                  </Command.Item>
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/core"))}
                  >
                    <Cpu size={14} className="text-sky-500" />
                    <span>The Core</span>
                  </Command.Item>
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/registry"))}
                  >
                    <Database size={14} className="text-indigo-500" />
                    <span>The Registry</span>
                  </Command.Item>
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/brief"))}
                  >
                    <FileText size={14} className="text-emerald-500" />
                    <span>The Brief</span>
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-slate-100" />

                <Command.Group heading="Subsidiaries" className="px-2 py-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/registry"))}
                  >
                    <Globe size={14} className="text-slate-400" />
                    <span>ElizaOS</span>
                  </Command.Item>
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/registry"))}
                  >
                    <Terminal size={14} className="text-slate-400" />
                    <span>AssetHunter</span>
                  </Command.Item>
                </Command.Group>
                
                <Command.Separator className="my-1 h-px bg-slate-100" />
                
                <Command.Group heading="System Layers" className="px-2 py-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  <Command.Item 
                    className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-100 text-slate-700 aria-selected:bg-slate-100 transition-colors"
                    onSelect={() => runCommand(() => setLocation("/core"))}
                  >
                    <Shield size={14} className="text-slate-400" />
                    <span>FrostGuard Protocol</span>
                  </Command.Item>
                </Command.Group>

              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
