import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ContentCardProps {
    eyebrow?: string;
    title: string;
    description?: string;
    image?: string;
    href?: string;
    dark?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
    eyebrow,
    title,
    description,
    image,
    href,
    dark = false,
}) => {
    const bgClass = dark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200';
    const textClass = dark ? 'text-white' : 'text-slate-900';
    const mutedClass = dark ? 'text-slate-400' : 'text-slate-600';

    const Wrapper = href ? motion.a : motion.div;

    return (
        <Wrapper
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            href={href}
            className={`group block p-6 rounded-2xl border ${bgClass} overflow-hidden cursor-pointer hover:shadow-xl transition-all`}
        >
            {image && (
                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-slate-100">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            {eyebrow && (
                <p className={`text-xs font-medium uppercase tracking-widest mb-2 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
                    {eyebrow}
                </p>
            )}

            <div className="flex items-start justify-between gap-4">
                <h3 className={`text-lg font-medium ${textClass} group-hover:text-emerald-500 transition-colors`}>
                    {title}
                </h3>
                {href && (
                    <ArrowUpRight size={18} className={`${mutedClass} group-hover:text-emerald-500 transition-colors flex-shrink-0`} />
                )}
            </div>

            {description && (
                <p className={`text-sm ${mutedClass} mt-2 leading-relaxed`}>
                    {description}
                </p>
            )}
        </Wrapper>
    );
};
