import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

interface LogEntry {
  agent: string;
  action: string;
  type: string;
  timestamp?: string;
}

const demoLogs: LogEntry[] = [
  { agent: "SCOUT-01", action: "Scanning GitHub trending repositories for high-velocity Python projects...", type: "info" },
  { agent: "ANALYST-ALPHA", action: "Detected sentiment shift in DeFi sector. Calculating correlation coefficients.", type: "analysis" },
  { agent: "SYSTEM", action: "New asset identified: 'HyperLiquid' protocol. Initiating due diligence protocol.", type: "success" },
  { agent: "OVERSIGHT", action: "Goal received. Decoupling task for Stillfrost Intelligence.", type: "system" },
  { agent: "BUILDER-V2", action: "Compiling daily performance report. 47% efficiency gain noted in module X.", type: "info" },
  { agent: "RISK-GUARD", action: "Portfolio exposure within nominal limits. Volatility index: LOW.", type: "info" },
  { agent: "OVERSIGHT", action: "Stillfrost Reach output REJECTED. Reasoning: High-Friction signal insufficient.", type: "warning" },
  { agent: "SCOUT-01", action: "Indexing 15,000 commits from target repository...", type: "process" },
  { agent: "ANALYST-ALPHA", action: "Cross-referencing founder background with YC alumni database.", type: "analysis" },
];

const formatTelemetryEvent = (event: any): LogEntry => {
  const source = (event.source || "SYSTEM").toUpperCase();
  const eventType = event.type || event.data?.type || "info";
  
  let action = "";
  if (event.data?.message) {
    action = event.data.message;
  } else if (eventType === "review_cycle") {
    action = `Review cycle status: ${event.data?.status || "active"}`;
  } else if (eventType === "scanning") {
    action = `Scanning sectors: ${(event.data?.sectors || []).join(", ")}`;
  } else if (eventType === "optimization") {
    action = `Portfolio optimization in progress. Sharpe target: ${event.data?.sharpe_target || "1.8"}`;
  } else if (eventType === "health_check") {
    action = event.data?.all_nominal ? "All systems nominal" : "Health check in progress";
  } else if (eventType === "report_scheduled") {
    action = `Next report scheduled: ${event.data?.next || "pending"}`;
  } else if (eventType === "action_approved") {
    action = `Action from ${event.data?.agent || "agent"} approved. Friction: ${event.data?.friction_score?.toFixed(2) || "N/A"}`;
  } else if (eventType === "action_rejected") {
    action = `Action from ${event.data?.agent || "agent"} REJECTED. ${event.data?.reason || ""}`;
  } else if (eventType === "workflow_started") {
    action = `Workflow ${event.data?.task_id || ""} initiated: ${event.data?.task_type || ""}`;
  } else if (eventType === "workflow_completed") {
    action = `Workflow ${event.data?.task_id || ""} ${event.data?.success ? "completed successfully" : "terminated"}`;
  } else if (eventType === "phase_started") {
    action = `Entering phase: ${event.data?.phase || "processing"}`;
  } else if (eventType === "research_started" || eventType === "research_completed") {
    action = `Research ${eventType.includes("started") ? "initiated" : "completed"}: ${event.data?.topic || ""}`;
  } else {
    action = JSON.stringify(event.data || event).slice(0, 100);
  }
  
  return {
    agent: source,
    action,
    type: eventType.includes("error") || eventType.includes("rejected") ? "warning" : 
          eventType.includes("approved") || eventType.includes("completed") ? "success" : "info",
    timestamp: event.timestamp
  };
};

const AgentTerminal = () => {
  const [lines, setLines] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const demoIndexRef = useRef(0);

  const connectWebSocket = useCallback(() => {
    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.hostname}:8001/ws/telemetry`;
      
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        setIsConnected(true);
        setLines(prev => [...prev, {
          agent: "SYSTEM",
          action: "Telemetry stream connected. Receiving live agent data.",
          type: "success"
        }].slice(-8));
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "connected" || data.type === "pong") return;
          
          const logEntry = formatTelemetryEvent(data);
          setLines(prev => [...prev, logEntry].slice(-8));
        } catch (e) {
          // Ignore parse errors
        }
      };
      
      wsRef.current.onclose = () => {
        setIsConnected(false);
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      };
      
      wsRef.current.onerror = () => {
        wsRef.current?.close();
      };
    } catch (e) {
      // Fall back to demo mode
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connectWebSocket();
    
    return () => {
      wsRef.current?.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  useEffect(() => {
    if (isConnected) return;
    
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, demoLogs[demoIndexRef.current]];
        if (newLines.length > 8) newLines.shift();
        return newLines;
      });
      demoIndexRef.current = (demoIndexRef.current + 1) % demoLogs.length;
    }, 2500);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="h-full flex flex-col font-mono text-xs md:text-sm" data-testid="agent-terminal">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2 text-sky-400">
          <Terminal size={14} />
          <span className="tracking-widest uppercase text-[10px] font-bold">Live Operations Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isConnected ? "bg-emerald-400" : "bg-amber-400"} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${isConnected ? "bg-emerald-500" : "bg-amber-500"}`}></span>
          </span>
          <span className={`text-[10px] font-bold tracking-widest ${isConnected ? "text-emerald-500" : "text-amber-500"}`}>
            {isConnected ? "LIVE" : "DEMO"}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden space-y-3 relative">
        <AnimatePresence mode="popLayout">
          {lines.map((log, i) => (
            <motion.div
              key={`${log.agent}-${i}-${log.action.slice(0, 20)}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
              data-testid={`log-entry-${i}`}
            >
              <span className={`
                shrink-0 font-bold w-24 text-[10px] uppercase tracking-wider py-0.5 px-1.5 rounded-sm h-fit text-center
                ${log.agent === "SYSTEM" ? "bg-white/10 text-slate-300" : 
                  log.agent === "OVERSIGHT" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" :
                  log.agent === "INTELLIGENCE" ? "bg-sky-500/10 text-sky-400" :
                  log.agent === "LOGIC" ? "bg-violet-500/10 text-violet-400" :
                  log.agent === "SYSTEMS" ? "bg-slate-500/10 text-slate-400" :
                  log.agent === "REACH" ? "bg-teal-500/10 text-teal-400" :
                  log.agent === "SCOUT-01" ? "bg-sky-500/10 text-sky-400" :
                  log.agent === "ANALYST-ALPHA" ? "bg-indigo-500/10 text-indigo-400" :
                  log.type === "warning" ? "bg-amber-500/10 text-amber-400" :
                  "bg-emerald-500/10 text-emerald-400"}
              `}>
                {log.agent.length > 12 ? log.agent.slice(0, 10) + ".." : log.agent}
              </span>
              <span className="text-slate-400/90 leading-relaxed">
                {log.action}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 pointer-events-none" />
      </div>
    </div>
  );
};

export default AgentTerminal;
