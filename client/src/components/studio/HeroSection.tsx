import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface HeroSectionProps {
    label?: string;
    title: string;
    subtitle?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    label,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
}) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px',
                }}
            />

            {/* Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {label && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-6"
                    >
                        {label}
                    </motion.p>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-8"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {(primaryCta || secondaryCta) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {primaryCta && (
                            <Link href={primaryCta.href}>
                                <button className="px-8 py-4 bg-white text-slate-900 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    {primaryCta.label}
                                </button>
                            </Link>
                        )}
                        {secondaryCta && (
                            <Link href={secondaryCta.href}>
                                <button className="px-8 py-4 bg-transparent text-white text-sm font-medium rounded-lg border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all">
                                    {secondaryCta.label}
                                </button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
};
