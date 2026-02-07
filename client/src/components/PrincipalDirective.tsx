import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Zap, History } from "lucide-react";

interface Directive {
  id: string;
  content: string;
  priority: string;
  created_at: string;
  active: boolean;
}

const PrincipalDirective = () => {
  const [input, setInput] = useState("");
  const [directives, setDirectives] = useState<Directive[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [priority, setPriority] = useState<"high" | "normal">("high");

  const fetchDirectives = async () => {
    try {
      const response = await fetch("/api/control/directives");
      if (response.ok) {
        const data = await response.json();
        setDirectives(data.directives || []);
      }
    } catch (error) {
      setDirectives([
        {
          id: "DIR-0001",
          content: "Avoid all crypto-related investments until regulatory clarity",
          priority: "high",
          created_at: new Date().toISOString(),
          active: true
        }
      ]);
    }
  };

  useEffect(() => {
    fetchDirectives();
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setSubmitting(true);
    try {
      const response = await fetch("/api/control/directives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, priority })
      });
      
      if (response.ok) {
        const data = await response.json();
        setDirectives(prev => [data.directive, ...prev]);
      } else {
        const newDirective: Directive = {
          id: `DIR-${String(directives.length + 1).padStart(4, "0")}`,
          content: input,
          priority,
          created_at: new Date().toISOString(),
          active: true
        };
        setDirectives(prev => [newDirective, ...prev]);
      }
      
      setInput("");
    } catch (error) {
      const newDirective: Directive = {
        id: `DIR-${String(directives.length + 1).padStart(4, "0")}`,
        content: input,
        priority,
        created_at: new Date().toISOString(),
        active: true
      };
      setDirectives(prev => [newDirective, ...prev]);
      setInput("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeactivate = async (directiveId: string) => {
    try {
      await fetch(`/api/control/directives/${directiveId}`, {
        method: "DELETE"
      });
      setDirectives(prev => prev.filter(d => d.id !== directiveId));
    } catch (error) {
      setDirectives(prev => prev.filter(d => d.id !== directiveId));
    }
  };

  return (
    <div className="h-full flex flex-col" data-testid="principal-directive">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
            <MessageSquare className="text-indigo-600" size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-slate-800">Principal's Directive</h3>
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              Oversight Memory Injection
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`p-2 rounded-lg transition-colors ${
            showHistory ? "bg-indigo-100 text-indigo-600" : "hover:bg-slate-100 text-slate-400"
          }`}
          data-testid="toggle-history"
        >
          <History size={16} />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setPriority("high")}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase transition-colors ${
              priority === "high" 
                ? "bg-amber-500 text-white" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
            data-testid="priority-high"
          >
            High Priority
          </button>
          <button
            onClick={() => setPriority("normal")}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase transition-colors ${
              priority === "normal" 
                ? "bg-slate-600 text-white" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
            data-testid="priority-normal"
          >
            Normal
          </button>
        </div>
        
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter directive for Oversight agent... (e.g., 'Avoid all positions in semiconductor sector')"
            className="w-full h-20 px-4 py-3 pr-12 rounded-xl bg-white/60 border border-white/80 text-sm text-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) {
                handleSubmit();
              }
            }}
            data-testid="directive-input"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || submitting}
            className={`absolute right-3 bottom-3 p-2 rounded-lg transition-all ${
              input.trim() && !submitting
                ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md" 
                : "bg-slate-100 text-slate-300"
            }`}
            data-testid="submit-directive"
          >
            {submitting ? (
              <Zap size={16} className="animate-pulse" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 font-mono">
          Press Cmd+Enter to submit
        </p>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-1 overflow-hidden"
          >
            <div className="border-t border-slate-100 pt-4">
              <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-3">
                Active Directives ({directives.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {directives.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No active directives</p>
                ) : (
                  directives.map((directive) => (
                    <motion.div
                      key={directive.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 group"
                      data-testid={`directive-${directive.id}`}
                    >
                      <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        directive.priority === "high" ? "bg-amber-500" : "bg-slate-400"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {directive.content}
                        </p>
                        <p className="font-mono text-[9px] text-slate-400 mt-1">
                          {directive.id} • {new Date(directive.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeactivate(directive.id)}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all"
                        data-testid={`deactivate-${directive.id}`}
                      >
                        <X size={12} className="text-red-500" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showHistory && directives.length > 0 && (
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{directives.length} active directive{directives.length !== 1 ? "s" : ""}</span>
            <span className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span>Injected</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalDirective;
