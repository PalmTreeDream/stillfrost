import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
    value: string;
    label: string;
    sublabel?: string;
}

interface StatsGridProps {
    label?: string;
    title: string;
    stats: Stat[];
    dark?: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ label, title, stats, dark = false }) => {
    const bgClass = dark
        ? 'bg-slate-950 border-white/5'
        : 'bg-white border-slate-200';
    const textClass = dark ? 'text-white' : 'text-slate-900';
    const mutedClass = dark ? 'text-slate-400' : 'text-slate-600';

    return (
        <section className={`py-24 ${dark ? 'bg-slate-950' : 'bg-slate-50'}`}>
            <div className="max-w-7xl mx-auto px-6">
                {label && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`text-xs font-medium uppercase tracking-widest mb-4 ${mutedClass}`}
                    >
                        {label}
                    </motion.p>
                )}

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`text-3xl md:text-4xl lg:text-5xl font-medium ${textClass} max-w-xl mb-16`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {title}
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className={`p-6 rounded-2xl border ${bgClass}`}
                        >
                            <div className={`text-3xl md:text-4xl font-semibold ${textClass} mb-2`}>
                                {stat.value}
                            </div>
                            <div className={`text-sm ${mutedClass}`}>
                                {stat.label}
                            </div>
                            {stat.sublabel && (
                                <div className={`text-xs ${mutedClass} mt-1`}>
                                    {stat.sublabel}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
