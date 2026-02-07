import React from 'react';
import { motion } from 'framer-motion';
import {
    Eye,
    Search,
    Hammer,
    Radio,
    Scale,
    ArrowRight,
} from 'lucide-react';
import {
    NavBar,
    Footer,
    PageContainer,
    GlassCard,
    SectionHeader,
    CTASection,
} from '../components/studio';

const agents = [
    {
        name: 'Oversight Governor',
        role: 'Quality & Compliance',
        icon: Eye,
        color: 'violet',
        description: 'Reviews all agent outputs before they reach the outside world. Ensures brand consistency and quality standards.',
    },
    {
        name: 'Intelligence Scout',
        role: 'Opportunity Discovery',
        icon: Search,
        color: 'cyan',
        description: 'Continuously scans markets for automation opportunities and emerging pain points worth solving.',
    },
    {
        name: 'Systems Forge',
        role: 'Product Development',
        icon: Hammer,
        color: 'amber',
        description: 'Builds, deploys, and maintains our software products. Handles the entire development lifecycle.',
    },
    {
        name: 'Reach Signal',
        role: 'Distribution & Growth',
        icon: Radio,
        color: 'emerald',
        description: 'Manages market presence, customer acquisition, and growth initiatives across all products.',
    },
    {
        name: 'Logic Gatekeeper',
        role: 'Validation & Testing',
        icon: Scale,
        color: 'rose',
        description: 'Validates business logic, runs quality assurance, and ensures products meet the Stillfrost Standard.',
    },
];

const methodologySteps = [
    {
        step: '01',
        title: 'Identify',
        description: 'Our Intelligence agent scans for high-friction "laptop jobs" that professionals waste hours on weekly.',
    },
    {
        step: '02',
        title: 'Validate',
        description: 'Logic agent validates market size, competition, and technical feasibility before we commit resources.',
    },
    {
        step: '03',
        title: 'Build',
        description: 'Systems agent scaffolds, develops, and deploys a working MVP in days, not months.',
    },
    {
        step: '04',
        title: 'Launch',
        description: 'Reach agent handles go-to-market, from landing pages to initial customer acquisition.',
    },
    {
        step: '05',
        title: 'Operate',
        description: 'All agents collaborate to maintain, improve, and scale the product indefinitely.',
    },
];

const AgentCard = ({ agent }: { agent: typeof agents[0] }) => {
    const Icon = agent.icon;
    const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
        violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-400' },
        cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
        amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
        emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
        rose: { bg: 'bg-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-400' },
    };
    const colors = colorClasses[agent.color];

    return (
        <GlassCard>
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                    <Icon size={20} className={colors.text} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">{agent.name}</h3>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
                        {agent.role}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        {agent.description}
                    </p>
                </div>
            </div>
        </GlassCard>
    );
};

export default function About() {
    return (
        <PageContainer>
            <NavBar />

            {/* Hero */}
            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-6"
                    >
                        About the Studio
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.1] tracking-tight mb-8"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        We build software that runs itself
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Stillfrost is an autonomous venture studio. Our AI agents conceive, build,
                        launch, and operate software products — while we focus on strategy and growth.
                    </motion.p>
                </div>
            </section>

            {/* Methodology */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <SectionHeader
                        label="Methodology"
                        title="From idea to revenue in weeks, not years"
                        subtitle="Our agent-powered process eliminates the traditional bottlenecks of product development."
                    />

                    <div className="grid md:grid-cols-5 gap-6">
                        {methodologySteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="relative"
                            >
                                <div className="text-5xl font-bold text-slate-800 mb-4">{step.step}</div>
                                <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                                {index < methodologySteps.length - 1 && (
                                    <ArrowRight size={16} className="hidden md:block absolute top-8 -right-3 text-slate-700" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agents */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <SectionHeader
                        label="Infrastructure"
                        title="Meet the agents"
                        subtitle="Five specialized AI agents work in coordination to operate the studio around the clock."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* CTA */}
            <CTASection
                label="Work with us"
                title="Let's build something together"
                description="Whether you're looking for automation solutions or want to explore partnership opportunities, we'd love to hear from you."
                primaryCta={{ label: 'Get in touch', href: '/journal' }}
                dark={false}
            />

            <Footer />
        </PageContainer>
    );
}
