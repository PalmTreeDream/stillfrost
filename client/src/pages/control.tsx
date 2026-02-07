import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Shield,
  ArrowLeft,
  LogOut,
  User,
  Lock,
  Check,
  X,
  Terminal,
  Send,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PendingApproval {
  id: string;
  type: string;
  title: string;
  content: any;
  estimatedCost: string;
  status: string;
}

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const VaultItem = ({
  item,
  onAuthorize,
  onReject,
  isLoading
}: {
  item: PendingApproval;
  onAuthorize: () => void;
  onReject: () => void;
  isLoading: boolean;
}) => (
  <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{item.type}</span>
        <h4 className="text-sm font-medium text-zinc-200 mt-1">{item.title}</h4>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
        <DollarSign size={10} />
        <span>${item.estimatedCost}</span>
      </div>
    </div>

    {item.content?.description && (
      <p className="text-xs text-zinc-400 mb-3">{item.content.description}</p>
    )}

    <div className="flex gap-2">
      <button
        onClick={onAuthorize}
        disabled={isLoading}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-mono font-bold rounded border border-emerald-500/30 transition-colors disabled:opacity-50"
        data-testid={`authorize-${item.id}`}
      >
        <Check size={12} />
        AUTHORIZE
      </button>
      <button
        onClick={onReject}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono rounded border border-red-500/20 transition-colors disabled:opacity-50"
        data-testid={`reject-${item.id}`}
      >
        <X size={12} />
      </button>
    </div>
  </div>
);

const ControlPage = () => {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useAuth();
  const [directive, setDirective] = useState("");
  const queryClient = useQueryClient();

  const { data: pendingItems = [], isLoading: pendingLoading } = useQuery<PendingApproval[]>({
    queryKey: ["/api/vault/pending"],
    enabled: isAuthenticated,
  });

  const authorizeMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("POST", `/api/vault/authorize/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vault/pending"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("POST", `/api/vault/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vault/pending"] });
    },
  });

  const directiveMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/vault/directive", { content });
    },
    onSuccess: () => {
      setDirective("");
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 font-mono text-sm">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black" data-testid="control-page">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors text-sm" data-testid="back-to-dashboard">
                <ArrowLeft size={16} />
                <span>The Lab</span>
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-violet-500/20 rounded-xl border border-violet-500/30">
                <Shield className="text-violet-400" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="font-serif text-2xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Command Center
                </h1>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Principal Control Interface
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Profile" className="w-6 h-6 rounded-full" />
              ) : (
                <User size={16} className="text-zinc-500" />
              )}
              <span className="text-sm text-zinc-300 font-medium">
                {user?.firstName || user?.email || "Principal"}
              </span>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-zinc-700 transition-colors text-sm"
              data-testid="logout-button"
            >
              <LogOut size={16} />
            </button>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <GlassCard delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-violet-500/20 rounded-lg border border-violet-500/30">
                <Lock size={16} className="text-violet-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">The Vault</h3>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Pending Authorization
                </p>
              </div>
            </div>

            {pendingLoading ? (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : pendingItems.length === 0 ? (
              <div className="text-center py-8 text-zinc-600">
                <Lock size={32} className="mx-auto mb-3 opacity-50" />
                <p className="font-mono text-sm">No pending approvals</p>
                <p className="text-xs mt-1">The workforce is operating autonomously</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <VaultItem
                    key={item.id}
                    item={item}
                    onAuthorize={() => authorizeMutation.mutate(item.id)}
                    onReject={() => rejectMutation.mutate(item.id)}
                    isLoading={authorizeMutation.isPending || rejectMutation.isPending}
                  />
                ))}
              </div>
            )}
          </GlassCard>

          <GlassCard delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
                <Terminal size={16} className="text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">Principal Directive</h3>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Inject into Oversight Memory
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                  Directive Content
                </label>
                <textarea
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  placeholder="Enter directive for Oversight Governor..."
                  className="w-full h-32 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 resize-none"
                  data-testid="directive-input"
                />
              </div>

              <button
                onClick={() => directiveMutation.mutate(directive)}
                disabled={!directive.trim() || directiveMutation.isPending}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-mono text-sm font-bold uppercase tracking-wider rounded-xl border border-amber-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="inject-directive"
              >
                <Send size={14} />
                {directiveMutation.isPending ? "Injecting..." : "Inject Directive"}
              </button>

              <p className="text-[10px] text-zinc-600 text-center">
                Directives are injected into the Oversight Governor's context memory
              </p>
            </div>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="font-mono text-xs text-zinc-600">
            STILLFROST • COMMAND & CONTROL • PRINCIPAL ACCESS ONLY
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ControlPage;
