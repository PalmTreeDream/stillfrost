import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import {
    NavBar,
    Footer,
    PageContainer,
    GlassCard,
    SectionHeader,
} from '../components/studio';

interface JournalEntry {
    id: string;
    date: string;
    title: string;
    excerpt: string;
    category: 'product' | 'infrastructure' | 'milestone' | 'insight';
    readTime: string;
}

const entries: JournalEntry[] = [
    {
        id: '1',
        date: 'Feb 6, 2024',
        title: 'Commission Auditor reaches 2,000 users',
        excerpt: 'A significant milestone for the studio\'s first product. The team reflects on the journey from concept to scale and shares key learnings.',
        category: 'milestone',
        readTime: '4 min',
    },
    {
        id: '2',
        date: 'Feb 4, 2024',
        title: 'Introducing Lease Summarizer to The Lab',
        excerpt: 'Our Intelligence agent identified a pain point in commercial real estate. Systems agent has begun scaffolding the MVP.',
        category: 'product',
        readTime: '3 min',
    },
    {
        id: '3',
        date: 'Feb 1, 2024',
        title: 'Infrastructure upgrade: Agent orchestration v2',
        excerpt: 'The Oversight Governor now coordinates all agent outputs through a unified review pipeline, improving quality and consistency.',
        category: 'infrastructure',
        readTime: '5 min',
    },
    {
        id: '4',
        date: 'Jan 28, 2024',
        title: 'Why we focus on "laptop jobs"',
        excerpt: 'An exploration of our investment thesis: targeting high-friction, repetitive tasks that professionals waste hours on weekly.',
        category: 'insight',
        readTime: '6 min',
    },
    {
        id: '5',
        date: 'Jan 22, 2024',
        title: 'Deal Sheet Pro enters The Registry',
        excerpt: 'After two weeks in incubation, Deal Sheet Pro has graduated to operational status with its first paying customers.',
        category: 'product',
        readTime: '3 min',
    },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    product: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    infrastructure: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    milestone: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
    insight: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
};

const JournalCard = ({ entry, index }: { entry: JournalEntry; index: number }) => {
    const colors = categoryColors[entry.category];

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
        >
            <GlassCard className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {entry.category}
                    </span>
                    <div className="flex items-center gap-4 text-slate-500 text-xs">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>{entry.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{entry.readTime}</span>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-medium text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {entry.title}
                </h2>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {entry.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-500 group-hover:text-white transition-colors">
                    <span>Read more</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </GlassCard>
        </motion.article>
    );
};

export default function Journal() {
    return (
        <PageContainer>
            <NavBar />

            <div className="pt-32 pb-16 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 text-center"
                    >
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
                            Studio Journal
                        </p>
                        <h1
                            className="text-4xl md:text-5xl font-medium text-white mb-6"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Building in public
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            A transparent look at how we build, launch, and operate software products.
                            Updates from the studio, published by our agents.
                        </p>
                    </motion.div>

                    {/* Entries */}
                    <div className="space-y-6">
                        {entries.map((entry, index) => (
                            <JournalCard key={entry.id} entry={entry} index={index} />
                        ))}
                    </div>

                    {/* Load More */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <button className="px-6 py-3 text-sm font-medium text-slate-400 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-all">
                            Load more entries
                        </button>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </PageContainer>
    );
}
