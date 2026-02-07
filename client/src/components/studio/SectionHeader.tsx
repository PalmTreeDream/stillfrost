import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    label?: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    dark?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    label,
    title,
    subtitle,
    align = 'left',
    dark = true,
}) => {
    const alignClass = align === 'center' ? 'text-center mx-auto' : '';
    const textClass = dark ? 'text-white' : 'text-slate-900';
    const mutedClass = dark ? 'text-slate-400' : 'text-slate-600';
    const labelClass = dark ? 'text-slate-500' : 'text-slate-500';

    return (
        <div className={`max-w-3xl ${alignClass} mb-16`}>
            {label && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-xs font-medium uppercase tracking-widest mb-4 ${labelClass}`}
                >
                    {label}
                </motion.p>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight ${textClass}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`text-lg ${mutedClass} mt-6 leading-relaxed`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};
