import React from 'react';
import { motion } from 'framer-motion';

interface LogoItem {
    name: string;
    icon?: React.ReactNode;
}

interface LogoCloudProps {
    label?: string;
    logos: LogoItem[];
}

export const LogoCloud: React.FC<LogoCloudProps> = ({ label, logos }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="py-12 border-t border-white/5"
        >
            {label && (
                <p className="text-center text-slate-600 text-xs font-medium uppercase tracking-widest mb-8">
                    {label}
                </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        {logo.icon}
                        <span className="text-sm font-medium">{logo.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
