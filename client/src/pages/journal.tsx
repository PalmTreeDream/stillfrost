import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Zap, TrendingUp, Package, Lightbulb } from 'lucide-react';
import {
    NavBar,
    Footer,
    PageContainer,
    GlassCard,
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
        date: 'Feb 9, 2024',
        title: 'Portfolio crosses $50K MRR milestone',
        excerpt: 'Combined monthly recurring revenue across all products has surpassed a significant milestone. A breakdown of what drove this growth and what comes next.',
        category: 'milestone',
        readTime: '4 min',
    },
    {
        id: '2',
        date: 'Feb 5, 2024',
        title: 'CommissionIQ hits 4,000 active users',
        excerpt: 'Our flagship real estate product continues to accelerate. Early adopter feedback has been instrumental in shaping the roadmap.',
        category: 'product',
        readTime: '3 min',
    },
    {
        id: '3',
        date: 'Jan 28, 2024',
        title: 'Launching ReplyEngine into beta',
        excerpt: 'Our newest product tackles cold email response rates. Initial tests show 3x improvement over baseline. Now accepting beta users.',
        category: 'product',
        readTime: '5 min',
    },
    {
        id: '4',
        date: 'Jan 20, 2024',
        title: 'Why we focus on "laptop jobs"',
        excerpt: 'An in-depth look at our investment thesis: targeting high-friction, repetitive B2B workflows that professionals spend hours on weekly.',
        category: 'insight',
        readTime: '6 min',
    },
    {
        id: '5',
        date: 'Jan 12, 2024',
        title: 'Agent orchestration v2 is live',
        excerpt: 'Major infrastructure upgrade: our Oversight Governor now coordinates all agent outputs through a unified review pipeline.',
        category: 'infrastructure',
        readTime: '4 min',
    },
    {
        id: '6',
        date: 'Dec 15, 2023',
        title: 'PropertyPulse acquisition closes',
        excerpt: 'Our real-time property valuation API has been acquired. Breaking down the journey from idea to exit in under 6 months.',
        category: 'milestone',
        readTime: '7 min',
    },
];

const categoryConfig = {
    product: {
        label: 'Product',
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        icon: Package,
    },
    infrastructure: {
        label: 'Infrastructure',
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        icon: Zap,
    },
    milestone: {
        label: 'Milestone',
        bg: 'bg-violet-500/20',
        text: 'text-violet-400',
        border: 'border-violet-500/30',
        icon: TrendingUp,
    },
    insight: {
        label: 'Insight',
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        icon: Lightbulb,
    },
};

const JournalCard = ({ entry, index, featured = false }: { entry: JournalEntry; index: number; featured?: boolean }) => {
    const config = categoryConfig[entry.category];
    const Icon = config.icon;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
        >
            <GlassCard className={`group cursor-pointer h-full ${featured ? 'md:p-10' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                    <div className={`p-2 rounded-lg ${config.bg} ${config.border} border`}>
                        <Icon size={14} className={config.text} />
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${config.text}`}>
                        {config.label}
                    </span>
                    <div className="flex items-center gap-4 text-slate-500 text-xs ml-auto">
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

                <h2 className={`font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                    {entry.title}
                </h2>

                <p className={`text-slate-400 leading-relaxed mb-6 ${featured ? 'text-base' : 'text-sm'}`}>
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
    const [featuredEntry, ...restEntries] = entries;

    return (
        <PageContainer>
            <NavBar />

            <div className="pt-32 pb-16 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 text-center"
                    >
                        <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-4">
                            Studio Journal
                        </p>
                        <h1
                            className="text-4xl md:text-5xl font-semibold text-white mb-6"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Building in public
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            A transparent look at how we build, launch, and operate products.
                            Updates from the studio, published by our team.
                        </p>
                    </motion.div>

                    {/* Featured Entry */}
                    <div className="mb-12">
                        <JournalCard entry={featuredEntry} index={0} featured />
                    </div>

                    {/* Entries Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {restEntries.map((entry, index) => (
                            <JournalCard key={entry.id} entry={entry} index={index + 1} />
                        ))}
                    </div>

                    {/* Load More */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <button className="px-8 py-4 text-sm font-medium text-slate-400 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-all">
                            Load more entries
                        </button>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </PageContainer>
    );
}
