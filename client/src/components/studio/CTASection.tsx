import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    label?: string;
    title: string;
    description?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    dark?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
    label,
    title,
    description,
    primaryCta,
    secondaryCta,
    dark = false,
}) => {
    const bgClass = dark ? 'bg-slate-950' : 'bg-slate-50';
    const textClass = dark ? 'text-white' : 'text-slate-900';
    const mutedClass = dark ? 'text-slate-400' : 'text-slate-600';

    return (
        <section className={`py-24 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
                    <div className="max-w-2xl">
                        {label && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`text-xs font-medium uppercase tracking-widest mb-4 ${dark ? 'text-slate-500' : 'text-slate-500'}`}
                            >
                                {label}
                            </motion.p>
                        )}

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`text-3xl md:text-4xl lg:text-5xl font-medium ${textClass}`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            {title}
                        </motion.h2>

                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className={`text-lg ${mutedClass} mt-4 leading-relaxed`}
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>

                    {(primaryCta || secondaryCta) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {primaryCta && (
                                <Link href={primaryCta.href}>
                                    <button className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                                        {primaryCta.label}
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            )}
                            {secondaryCta && (
                                <Link href={secondaryCta.href}>
                                    <button className={`px-6 py-3 text-sm font-medium rounded-lg border transition-colors ${dark
                                            ? 'border-white/20 text-white hover:bg-white/5'
                                            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                                        }`}>
                                        {secondaryCta.label}
                                    </button>
                                </Link>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};
