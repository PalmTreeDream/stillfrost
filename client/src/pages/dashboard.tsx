import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowUpRight,
  Terminal,
  Lock,
  Check,
  X,
  Beaker,
  Server,
  Globe,
} from 'lucide-react';
import AgentTerminal from '@/components/AgentTerminal';
import { useAuth } from '@/hooks/use-auth';
import {
  NavBar,
  Footer,
  PageContainer,
  GlassCard,
  SectionHeader,
} from '../components/studio';

// Badge component for status indicators
const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'incubation' | 'operational' | 'pending' }) => {
  const styles = variant === 'incubation'
    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    : variant === 'operational'
      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
      : variant === 'pending'
        ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
        : 'bg-slate-800 text-slate-400 border border-slate-700';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${styles}`}>
      {variant === 'incubation' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
      {variant === 'operational' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
      {children}
    </span>
  );
};

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
  </span>
);

const VaultItem = ({ title, type, status }: { title: string; type: 'product' | 'thread'; status: string }) => (
  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{type}</span>
        <h4 className="text-sm font-medium text-slate-200 mt-1">{title}</h4>
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
  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
    <div className="flex items-start justify-between mb-2">
      <div>
        <h4 className="text-sm font-medium text-slate-300">{title}</h4>
        <span className="text-[10px] font-mono text-slate-500">{agent}</span>
      </div>
      <Badge variant="incubation">Building</Badge>
    </div>
    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-3">
      <div
        className="h-full bg-gradient-to-r from-amber-500/60 to-amber-400/80 rounded-full transition-all duration-1000"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

  const agentStatuses = [
    { name: 'Oversight', status: 'Active', color: 'emerald' },
    { name: 'Intelligence', status: 'Scanning', color: 'amber' },
    { name: 'Systems', status: 'Building', color: 'amber' },
    { name: 'Reach', status: 'Idle', color: 'slate' },
    { name: 'Logic', status: 'Validating', color: 'emerald' },
  ];

  return (
    <PageContainer>
      <NavBar />

      <div className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-2">
              <h1
                className="text-3xl md:text-4xl font-medium text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                The Lab
              </h1>
              <LiveIndicator />
            </div>
            <p className="text-sm text-slate-500 uppercase tracking-widest">
              Active Product Incubation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Main Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* Terminal Feed */}
              <GlassCard delay={0.1} hover={false} className="p-0">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal size={16} className="text-slate-500" />
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                      Studio Operations Feed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-600">AGENTS ACTIVE</span>
                    <LiveIndicator />
                  </div>
                </div>
                <div className="h-[400px]">
                  <AgentTerminal />
                </div>
              </GlassCard>

              {/* Vault - Pending Authorizations */}
              {isAuthenticated && (
                <GlassCard delay={0.2}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-violet-500/20 rounded-lg border border-violet-500/30">
                      <Lock size={16} className="text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">The Vault</h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Pending Principal Authorization
                      </p>
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

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-600">ESTIMATED COST THIS RUN</span>
                    <span className="text-sm font-mono text-emerald-400">$0.47</span>
                  </div>
                </GlassCard>
              )}

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">

              {/* Active Incubation */}
              <GlassCard delay={0.15}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                    <Beaker size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Incubation</h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Products in Development
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <LabItem title="Lease Summarizer" agent="SYSTEMS (Forge)" progress={65} />
                  <LabItem title="Deal Sheet Formatter" agent="INTELLIGENCE (Scout)" progress={30} />
                </div>
              </GlassCard>

              {/* System Status */}
              <GlassCard delay={0.2}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                    <Server size={16} className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">System Status</h3>
                </div>

                <div className="space-y-3">
                  {agentStatuses.map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm text-slate-400">{agent.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.color === 'emerald' ? 'bg-emerald-400' :
                            agent.color === 'amber' ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'
                          }`} />
                        <span className={`text-[10px] font-mono uppercase ${agent.color === 'emerald' ? 'text-emerald-400' :
                            agent.color === 'amber' ? 'text-amber-400' : 'text-slate-600'
                          }`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Registry Link */}
              <Link href="/registry">
                <GlassCard delay={0.25} className="cursor-pointer hover:border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                        <Globe size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">The Registry</h3>
                        <p className="text-[10px] font-mono text-slate-500">View operational assets</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-600" />
                  </div>
                </GlassCard>
              </Link>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </PageContainer>
  );
}
