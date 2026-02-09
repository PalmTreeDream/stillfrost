import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
    Eye,
    Search,
    Hammer,
    Radio,
    Scale,
    ArrowRight,
    Linkedin,
    Twitter,
    Github,
    Mail,
    MapPin,
    Calendar,
} from 'lucide-react';
import {
    NavBar,
    Footer,
    PageContainer,
    GlassCard,
    SectionHeader,
} from '../components/studio';

const agents = [
    {
        name: 'Oversight',
        role: 'Quality & Compliance',
        icon: Eye,
        color: 'violet',
        description: 'Reviews all outputs before external delivery. Maintains brand standards and quality.',
    },
    {
        name: 'Intelligence',
        role: 'Market Research',
        icon: Search,
        color: 'cyan',
        description: 'Scans markets for automation opportunities. Validates demand before we build.',
    },
    {
        name: 'Systems',
        role: 'Engineering',
        icon: Hammer,
        color: 'amber',
        description: 'Builds and deploys products. Handles the full development lifecycle.',
    },
    {
        name: 'Reach',
        role: 'Growth',
        icon: Radio,
        color: 'emerald',
        description: 'Drives customer acquisition. Manages marketing and distribution.',
    },
    {
        name: 'Logic',
        role: 'Validation',
        icon: Scale,
        color: 'rose',
        description: 'Tests business logic. Ensures products meet quality standards.',
    },
];

const timeline = [
    { year: '2023', event: 'Studio founded. First product launched within 60 days.' },
    { year: 'Q4 2023', event: 'PropertyPulse acquired. First successful exit.' },
    { year: '2024', event: 'Portfolio scales to 6 products, $50K+ combined MRR.' },
    { year: 'Today', event: '18K+ users across products. Fully autonomous operations.' },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-400' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    rose: { bg: 'bg-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-400' },
};

const AgentCard = ({ agent }: { agent: typeof agents[0] }) => {
    const Icon = agent.icon;
    const colors = colorClasses[agent.color];

    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <div className={`p-2.5 rounded-xl ${colors.bg} border ${colors.border}`}>
                <Icon size={18} className={colors.text} />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-white mb-0.5">{agent.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{agent.role}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{agent.description}</p>
            </div>
        </div>
    );
};

export default function About() {
    return (
        <PageContainer>
            <NavBar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-6"
                    >
                        About Stillfrost
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight mb-8"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Building the future of<br />autonomous software
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Stillfrost is an AI-native venture studio that builds, launches, and operates
                        B2B software products. Our autonomous agents handle the entire product lifecycle—
                        from market research to customer acquisition.
                    </motion.p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '6', label: 'Products Built' },
                            { value: '$50K+', label: 'Combined MRR' },
                            { value: '18K+', label: 'Users Served' },
                            { value: '1', label: 'Exit' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Thesis */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
                                Investment Thesis
                            </p>
                            <h2
                                className="text-3xl md:text-4xl font-semibold text-white mb-6"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                We target "laptop jobs"
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Every industry has high-friction, repetitive tasks that professionals spend
                                hours on weekly. These "laptop jobs" are perfect for automation.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                We find these pain points, validate demand, build products that solve them,
                                and operate those products indefinitely. Our AI agents handle every step—from
                                initial research to scaling revenue.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                                >
                                    <div className="flex items-center gap-2 text-emerald-400 shrink-0">
                                        <Calendar size={14} />
                                        <span className="text-sm font-mono font-medium">{item.year}</span>
                                    </div>
                                    <p className="text-sm text-slate-400">{item.event}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Agents */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
                            The Infrastructure
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-white mb-4"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            Five agents. One mission.
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Specialized AI agents work in coordination to operate the studio 24/7.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {agents.map((agent, index) => (
                            <motion.div
                                key={agent.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <AgentCard agent={agent} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
                        Get in Touch
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-semibold text-white mb-4"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Let's connect
                    </h2>
                    <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto">
                        Interested in our products, methodology, or potential collaboration?
                        We'd love to hear from you.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        <a
                            href="mailto:hello@stillfrost.co"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <Mail size={18} />
                            hello@stillfrost.co
                        </a>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </PageContainer>
    );
}
