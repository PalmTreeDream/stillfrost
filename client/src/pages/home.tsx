import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "Live" | "In Dev" | "Soon";
  tags: string[];
  url?: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: "SF-001",
    name: "AssetHunter.io",
    description: "Multi-store intelligence for micro-PE deals. Scanning 14+ platform ecosystems in real-time.",
    status: "Live",
    tags: ["Web", "SaaS", "FinTech"],
    url: "https://assethunter.io",
    year: "2024",
  },
  {
    id: "SF-002",
    name: "Wrist Reads",
    description: "Optimized typography for wearable computing. The world's first standalone long-form reader for Apple Watch.",
    status: "Live",
    tags: ["watchOS", "iOS", "Consumer"],
    url: "https://apps.apple.com/app/wrist-reads",
    year: "2025",
  },
  {
    id: "SF-003",
    name: "Watch Study",
    description: "Active recall systems for wrist-based learning. Converting idle moments into knowledge retention.",
    status: "Soon",
    tags: ["watchOS", "iOS", "Education"],
    year: "2026",
  },
];

const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const meta = {
    Live: { color: "bg-white", label: "OPERATIONAL" },
    "In Dev": { color: "bg-amber-500", label: "DEVELOPMENT" },
    Soon: { color: "bg-zinc-800", label: "PENDING" },
  }[status];

  return (
    <div className="flex items-center gap-3">
      <div className={`h-[2px] w-4 ${meta.color}`} />
      <span className="text-[9px] font-mono tracking-technical text-zinc-500 uppercase">
        {meta.label}
      </span>
    </div>
  );
};

export default function Home() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      <div className="noise" />

      {/* Top Border Bar */}
      <div className="fixed top-0 left-0 w-full h-px bg-zinc-900 z-50" />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24 flex flex-col min-h-screen">

        {/* Header Navigation */}
        <header className="flex justify-between items-baseline mb-32 fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-luxury">
              STILLFROST
            </h1>
          </div>
          <div className="hidden md:flex flex-col items-end font-mono text-[10px] text-zinc-600 tracking-technical">
            <span>INDEX v2.0</span>
            <span>{time} UTC</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-48 md:mb-64 fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col gap-8 max-w-3xl">
            <span className="text-[10px] font-mono tracking-luxury text-zinc-600 uppercase">
              // INDEPENDENT PRODUCT STUDIO
            </span>
            <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] md:leading-[1.05]">
              Building tools for finance, productivity, and the consumer web.
            </h2>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex flex-col gap-24 mb-32">
          <div className="flex justify-between items-end border-b border-zinc-900 pb-8 fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-[10px] font-mono tracking-luxury text-zinc-600 uppercase">
              SELECTED WORKS [001—003]
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROJECTS.map((project, index) => {
              const content = (
                <div className="group h-full flex flex-col border border-zinc-900 p-8 transition-colors duration-500 hover:border-zinc-500 relative bg-[#050505]">
                  {/* Project ID & Year */}
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-[10px] font-mono text-zinc-700 tracking-widest">{project.id}</span>
                    <span className="text-[10px] font-mono text-zinc-700">{project.year}</span>
                  </div>

                  {/* Body */}
                  <div className="flex-grow mb-12">
                    <h4 className="text-2xl font-serif mb-4 group-hover:italic transition-all duration-300">
                      {project.name}
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-6 pt-6 border-t border-zinc-900">
                    <StatusBadge status={project.status} />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest px-2 py-1 border border-zinc-900 group-hover:border-zinc-800 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={project.id}
                  className="fade-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full cursor-none">
                      {content}
                    </a>
                  ) : content}
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing Footer */}
        <footer className="mt-auto pt-24 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-8 fade-in" style={{ animationDelay: "1s" }}>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono text-zinc-700 tracking-widest uppercase italic">
              STILLFROST &copy; 2026. ALL RIGHTS RESERVED.
            </span>
          </div>
          <div className="text-[9px] font-mono text-zinc-800 tracking-technical uppercase text-right">
            Based in the Digital Void.
          </div>
        </footer>
      </main>
    </div>
  );
}
