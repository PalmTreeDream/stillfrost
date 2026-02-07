import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
    name: string;
    role: string;
    image?: string;
}

interface TeamGridProps {
    label?: string;
    title: string;
    subtitle?: string;
    members: TeamMember[];
}

export const TeamGrid: React.FC<TeamGridProps> = ({ label, title, subtitle, members }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {label && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4"
                    >
                        {label}
                    </motion.p>
                )}

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-medium text-slate-900 mb-4"
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
                        className="text-lg text-slate-600 max-w-2xl mb-16"
                    >
                        {subtitle}
                    </motion.p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                        <span className="text-4xl font-medium text-slate-400">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-base font-medium text-slate-900">{member.name}</h3>
                            <p className="text-sm text-slate-500">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
