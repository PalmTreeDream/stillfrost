import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    hover = true,
    delay = 0,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
            className={`
        relative p-6 rounded-2xl 
        bg-white/[0.03] backdrop-blur-xl 
        border border-white/[0.06] 
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${hover ? 'hover:border-white/10 hover:bg-white/[0.05] transition-all' : ''}
        ${className}
      `}
            {...props}
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
