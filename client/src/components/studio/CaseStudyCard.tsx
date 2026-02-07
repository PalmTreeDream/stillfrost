import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
    category: string;
    title: string;
    description?: string;
    metrics?: { label: string; value: string }[];
    onClick?: () => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
    category,
    title,
    description,
    metrics,
    onClick,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="group p-6 md:p-8 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl cursor-pointer hover:border-white/10 transition-all"
        >
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                    {category}
                </span>
            </div>

            <h3 className="text-xl md:text-2xl font-medium text-white mb-3 group-hover:text-emerald-300 transition-colors">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {description}
                </p>
            )}

            {metrics && metrics.length > 0 && (
                <div className="flex flex-wrap gap-6 mb-6">
                    {metrics.map((metric, index) => (
                        <div key={index}>
                            <div className="text-lg font-semibold text-white">{metric.value}</div>
                            <div className="text-xs text-slate-500">{metric.label}</div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-white transition-colors">
                <span>View case study</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </motion.div>
    );
};
