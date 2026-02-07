import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, X, Clock, RefreshCw } from "lucide-react";

interface PendingAction {
  id: string;
  agent: string;
  action_type: string;
  content: {
    draft?: string;
    message?: string;
    recipient?: string;
    report_type?: string;
  };
  created_at: string;
  status: string;
  priority: string;
}

const ActionRequired = () => {
  const [actions, setActions] = useState<PendingAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchPendingActions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/control/pending");
      if (response.ok) {
        const data = await response.json();
        setActions(data.pending_actions || []);
      }
    } catch (error) {
      setActions([
        {
          id: "demo-001",
          agent: "Reach",
          action_type: "report_distribution",
          content: {
            report_type: "quarterly",
            draft: "Quarterly Performance Report - Q4 2025\n\nExecutive Summary: Portfolio returned +12.4% with risk-adjusted Sharpe ratio of 1.89..."
          },
          created_at: new Date().toISOString(),
          status: "pending_approval",
          priority: "high"
        },
        {
          id: "demo-002",
          agent: "Reach",
          action_type: "stakeholder_update",
          content: {
            recipient: "LPs",
            message: "Monthly update: New position initiated in emerging DeFi infrastructure..."
          },
          created_at: new Date().toISOString(),
          status: "pending_approval",
          priority: "normal"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingActions();
    const interval = setInterval(fetchPendingActions, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (actionId: string) => {
    try {
      await fetch(`/api/control/actions/${actionId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: "Approved by Principal" })
      });
      setActions(prev => prev.filter(a => a.id !== actionId));
    } catch (error) {
      setActions(prev => prev.filter(a => a.id !== actionId));
    }
  };

  const handleReject = async (actionId: string) => {
    try {
      await fetch(`/api/control/actions/${actionId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: "Rejected by Principal" })
      });
      setActions(prev => prev.filter(a => a.id !== actionId));
    } catch (error) {
      setActions(prev => prev.filter(a => a.id !== actionId));
    }
  };

  return (
    <div className="h-full flex flex-col" data-testid="action-required">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
            <AlertCircle className="text-amber-600" size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-slate-800">Action Required</h3>
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              Human-in-the-Loop Gate
            </p>
          </div>
        </div>
        <button 
          onClick={fetchPendingActions}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          disabled={loading}
          data-testid="refresh-actions"
        >
          <RefreshCw size={16} className={`text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        <AnimatePresence mode="popLayout">
          {actions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                <Check className="text-emerald-500" size={24} />
              </div>
              <p className="text-sm text-slate-500">No pending actions</p>
              <p className="text-xs text-slate-400 mt-1">All clear for autonomous operation</p>
            </motion.div>
          ) : (
            actions.map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  action.priority === "high" 
                    ? "bg-amber-50/50 border-amber-200 hover:border-amber-300" 
                    : "bg-white/50 border-white/80 hover:border-slate-200"
                }`}
                onClick={() => setExpandedId(expandedId === action.id ? null : action.id)}
                data-testid={`action-${action.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-600 uppercase">
                        {action.agent}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">{action.action_type}</span>
                      {action.priority === "high" && (
                        <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded uppercase">
                          High
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {action.content.draft?.slice(0, 100) || action.content.message?.slice(0, 100) || "Pending review..."}
                      {(action.content.draft?.length || 0) > 100 && "..."}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                      <Clock size={10} />
                      <span>{new Date(action.created_at).toLocaleTimeString()}</span>
                      <span className="font-mono">{action.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApprove(action.id); }}
                      className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 transition-colors"
                      data-testid={`approve-${action.id}`}
                    >
                      <Check size={14} className="text-emerald-600" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleReject(action.id); }}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
                      data-testid={`reject-${action.id}`}
                    >
                      <X size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === action.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 pt-3 border-t border-slate-100 overflow-hidden"
                    >
                      <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono bg-slate-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                        {action.content.draft || action.content.message || JSON.stringify(action.content, null, 2)}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActionRequired;
