import React from "react";
import { motion } from "framer-motion";
import {
    Search,
    Hammer,
    Radio,
    Scale,
    Eye,
    ArrowRight,
    Zap,
    Target,
    Layers
} from "lucide-react";
import GlobalNav from "@/components/GlobalNav";

const ProcessStep = ({
    number,
    title,
    description,
    icon: Icon,
    delay
}: {
    number: string;
    title: string;
    description: string;
    icon: React.ElementType;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className="relative"
    >
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center">
                <Icon size={20} className="text-zinc-400" />
            </div>
            <div>
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    Phase {number}
                </span>
                <h3 className="text-lg font-serif text-white mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {title}
                </h3>
                <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </motion.div>
);

const infrastructureAgents = [
    { name: "Oversight", role: "Quality & Standards", icon: Eye, color: "violet" },
    { name: "Intelligence", role: "Research & Discovery", icon: Search, color: "cyan" },
    { name: "Systems", role: "Build & Deploy", icon: Hammer, color: "amber" },
    { name: "Reach", role: "Distribution & Growth", icon: Radio, color: "emerald" },
    { name: "Logic", role: "Validation & Optimization", icon: Scale, color: "rose" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950" />

            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10">
                <GlobalNav />

                <div className="pt-24 pb-16 px-4 md:px-8">
                    <div className="max-w-4xl mx-auto">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16 text-center"
                        >
                            <h1
                                className="text-4xl md:text-5xl font-serif text-white mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                About the Studio
                            </h1>
                            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                                We build, launch, and operate software products autonomously.
                                Our infrastructure handles the entire lifecycle — from market research
                                to production deployment — with precision and speed.
                            </p>
                        </motion.div>

                        {/* Philosophy */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-20 p-8 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800"
                        >
                            <h2 className="text-xl font-serif text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Our Approach
                            </h2>
                            <p className="text-zinc-400 leading-relaxed mb-4">
                                Stillfrost operates as an autonomous venture studio. We don't take on client work
                                or offer consulting services. Instead, we identify high-friction problems in
                                professional workflows and build products to solve them — products we own and
                                operate indefinitely.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                Every product in our portfolio was conceived, validated, built, and launched
                                through our internal infrastructure. We maintain and grow these products as
                                part of a diversified portfolio of operational software assets.
                            </p>
                        </motion.div>

                        {/* Process */}
                        <div className="mb-20">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Studio Process
                                </h2>
                                <p className="text-sm text-zinc-500 mt-2">
                                    How we take an idea from research to production
                                </p>
                            </motion.div>

                            <div className="space-y-8">
                                <ProcessStep
                                    number="01"
                                    title="Research & Discovery"
                                    description="We continuously scan markets for high-friction problems affecting professionals. Our focus areas include legal tech, real estate, finance tools, and B2B SaaS."
                                    icon={Search}
                                    delay={0.4}
                                />
                                <ProcessStep
                                    number="02"
                                    title="Validation"
                                    description="Before building, we validate demand through signal analysis, competitive positioning, and friction scoring. Only ideas that pass our threshold proceed."
                                    icon={Target}
                                    delay={0.5}
                                />
                                <ProcessStep
                                    number="03"
                                    title="Build & Deploy"
                                    description="We architect, develop, and deploy products rapidly. Our infrastructure enables us to ship production-ready software in days, not months."
                                    icon={Hammer}
                                    delay={0.6}
                                />
                                <ProcessStep
                                    number="04"
                                    title="Launch & Grow"
                                    description="Every product gets a strategic launch with targeted distribution. We handle positioning, messaging, and channel optimization."
                                    icon={Zap}
                                    delay={0.7}
                                />
                                <ProcessStep
                                    number="05"
                                    title="Operate & Iterate"
                                    description="We don't just launch and walk away. Products in our registry receive ongoing optimization, feature development, and performance monitoring."
                                    icon={Layers}
                                    delay={0.8}
                                />
                            </div>
                        </div>

                        {/* Infrastructure */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="mb-16"
                        >
                            <h2 className="text-xl font-serif text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Operational Infrastructure
                            </h2>
                            <p className="text-sm text-zinc-500 mb-8">
                                Our multi-agent system powers every stage of the studio lifecycle
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {infrastructureAgents.map((agent, i) => (
                                    <motion.div
                                        key={agent.name}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`p-2 rounded-lg bg-${agent.color}-500/20 border border-${agent.color}-500/30`}>
                                                <agent.icon size={16} className={`text-${agent.color}-400`} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-zinc-200">{agent.name}</h4>
                                                <p className="text-[10px] font-mono text-zinc-500 uppercase">{agent.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="text-center pt-8 border-t border-zinc-800"
                        >
                            <p className="text-zinc-500 mb-6">
                                See what we're building
                            </p>
                            <a
                                href="/dashboard"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-sm tracking-widest uppercase transition-all"
                            >
                                <span>Visit The Lab</span>
                                <ArrowRight size={14} />
                            </a>
                        </motion.div>

                    </div>
                </div>

                <footer className="border-t border-zinc-900 py-8">
                    <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
                        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                            Stillfrost
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
