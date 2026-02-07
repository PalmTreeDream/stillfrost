import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Globe,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  TrendingUp,
  Users
} from "lucide-react";
import GlobalNav from "@/components/GlobalNav";

interface AssetCardProps {
  name: string;
  description: string;
  category: string;
  launchDate: string;
  metrics: { label: string; value: string }[];
  link?: string;
  delay: number;
}

const AssetCard = ({ name, description, category, launchDate, metrics, link, delay }: AssetCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="group p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{category}</span>
        <h3 className="text-xl font-serif text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          {name}
        </h3>
      </div>
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase border border-emerald-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Operational
      </span>
    </div>

    <p className="text-sm text-zinc-400 leading-relaxed mb-6">{description}</p>

    <div className="grid grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, i) => (
        <div key={i} className="text-center p-3 rounded-lg bg-zinc-800/50">
          <p className="text-lg font-mono font-bold text-white">{metric.value}</p>
          <p className="text-[10px] font-mono text-zinc-500 uppercase">{metric.label}</p>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
      <div className="flex items-center gap-2 text-zinc-600">
        <Calendar size={12} />
        <span className="text-[10px] font-mono">Launched {launchDate}</span>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
        >
          <span>Visit Asset</span>
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  </motion.div>
);

const operationalAssets = [
  {
    name: "Commission Auditor",
    description: "Real estate commission calculator with tiered splits, tax liability estimates, and instant PDF export for agents and brokers.",
    category: "Real Estate Tech",
    launchDate: "Jan 2026",
    metrics: [
      { label: "Users", value: "2.4K" },
      { label: "Calculations", value: "18K" },
      { label: "Revenue", value: "$847" },
    ],
    link: "#",
  },
  {
    name: "Lease Summarizer",
    description: "AI-powered lease analysis that flags predatory clauses, highlights key terms, and generates plain-English summaries for tenants.",
    category: "Legal Tech",
    launchDate: "Dec 2025",
    metrics: [
      { label: "Leases", value: "890" },
      { label: "Flags", value: "3.2K" },
      { label: "Revenue", value: "$1.2K" },
    ],
    link: "#",
  },
  {
    name: "Deal Sheet Formatter",
    description: "Transform raw CSV data into high-status investment memos with automatic formatting, charts, and professional templates.",
    category: "Finance Tools",
    launchDate: "Nov 2025",
    metrics: [
      { label: "Sheets", value: "456" },
      { label: "Exports", value: "1.8K" },
      { label: "Revenue", value: "$623" },
    ],
    link: "#",
  },
];

export default function Registry() {
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10">
        <GlobalNav />

        <div className="pt-24 pb-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe size={24} className="text-emerald-400" />
                <h1 className="text-3xl md:text-4xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Registry
                </h1>
              </div>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                Products We Own & Operate
              </p>
              <p className="text-sm text-zinc-400 max-w-xl mx-auto">
                Each product in our portfolio was conceived, built, and launched by Stillfrost.
                We operate these products indefinitely as part of our software asset portfolio.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800"
            >
              {[
                { label: "Total Assets", value: "3", icon: Globe },
                { label: "Monthly Users", value: "5.7K", icon: Users },
                { label: "Revenue MTD", value: "$2.7K", icon: TrendingUp },
                { label: "Uptime", value: "99.9%", icon: ArrowUpRight },
              ].map((stat, i) => (
                <div key={i} className="text-center py-2">
                  <p className="text-2xl font-mono font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {operationalAssets.map((asset, i) => (
                <AssetCard key={asset.name} {...asset} delay={0.3 + i * 0.1} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Link href="/dashboard">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono uppercase tracking-widest border border-zinc-700 transition-colors">
                  <span>Return to Terminal</span>
                  <ArrowUpRight size={14} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        <footer className="border-t border-zinc-900 py-8">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              Stillfrost Registry
            </p>
            <p className="font-mono text-[10px] text-zinc-600">
              Autonomous Venture Studio
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
