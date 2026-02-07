import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import GlobalNav from "@/components/GlobalNav";

interface JournalEntry {
    date: string;
    title: string;
    excerpt: string;
    category: string;
}

const entries: JournalEntry[] = [
    {
        date: "February 2026",
        title: "Expanding the Registry",
        category: "Operations",
        excerpt: "Stillfrost added three new operational assets to the portfolio this quarter. The studio's focus on high-friction professional workflows continues to drive product development, with particular emphasis on legal tech and real estate tooling.",
    },
    {
        date: "January 2026",
        title: "Infrastructure Upgrades",
        category: "Technical",
        excerpt: "The studio completed a significant overhaul of its operational infrastructure. The multi-agent system now operates with improved coordination, enabling faster research-to-deployment cycles.",
    },
    {
        date: "December 2025",
        title: "Year in Review",
        category: "Strategy",
        excerpt: "Stillfrost closed its foundational year with a clear thesis: build software products that eliminate repetitive professional tasks. The studio's portfolio approach to product development has proven effective at generating consistent operational revenue.",
    },
    {
        date: "November 2025",
        title: "Thesis Refinement",
        category: "Strategy",
        excerpt: "After evaluating dozens of potential product categories, the studio has narrowed its focus to B2B tools serving professionals in regulated industries. These markets exhibit predictable customer behavior and strong willingness to pay.",
    },
];

const JournalCard = ({ entry, delay }: { entry: JournalEntry; delay: number }) => (
    <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
    >
        <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-zinc-800 text-zinc-400 border border-zinc-700">
                {entry.category}
            </span>
            <div className="flex items-center gap-1.5 text-zinc-600">
                <Calendar size={12} />
                <span className="text-[10px] font-mono">{entry.date}</span>
            </div>
        </div>

        <h2
            className="text-xl font-serif text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
            {entry.title}
        </h2>

        <p className="text-sm text-zinc-400 leading-relaxed">
            {entry.excerpt}
        </p>
    </motion.article>
);

export default function JournalPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10">
                <GlobalNav />

                <div className="pt-24 pb-16 px-4 md:px-8">
                    <div className="max-w-3xl mx-auto">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 text-center"
                        >
                            <h1
                                className="text-4xl md:text-5xl font-serif text-white mb-4"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Studio Journal
                            </h1>
                            <p className="text-zinc-500 max-w-xl mx-auto">
                                Operational updates, strategic thinking, and notes from inside the studio.
                            </p>
                        </motion.div>

                        {/* Entries */}
                        <div className="space-y-6 mb-12">
                            {entries.map((entry, i) => (
                                <JournalCard key={entry.title} entry={entry} delay={0.2 + i * 0.1} />
                            ))}
                        </div>

                        {/* Navigation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center pt-8 border-t border-zinc-800"
                        >
                            <p className="text-zinc-600 text-sm mb-6">
                                More updates as the studio evolves
                            </p>
                            <Link href="/registry">
                                <span className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono uppercase tracking-widest border border-zinc-700 transition-colors cursor-pointer">
                                    <span>View The Registry</span>
                                    <ArrowRight size={14} />
                                </span>
                            </Link>
                        </motion.div>

                    </div>
                </div>

                <footer className="border-t border-zinc-900 py-8">
                    <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
                        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                            Stillfrost Journal
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
