import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface FooterProps {
    dark?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ dark = true }) => {
    const bgClass = dark ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-200';
    const textClass = dark ? 'text-white' : 'text-slate-900';
    const mutedClass = dark ? 'text-slate-500' : 'text-slate-500';

    const currentYear = new Date().getFullYear();

    const links = {
        product: [
            { label: 'Use cases', href: '/registry' },
            { label: 'The Lab', href: '/dashboard' },
            { label: 'Registry', href: '/registry' },
        ],
        company: [
            { label: 'About', href: '/about' },
            { label: 'Journal', href: '/journal' },
            { label: 'Contact', href: '/about' },
        ],
    };

    return (
        <footer className={`py-16 border-t ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/">
                            <div className="flex items-center gap-3 mb-4 cursor-pointer">
                                <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center border border-white/10">
                                    <span className={`font-bold text-sm ${textClass}`}>S</span>
                                </div>
                                <span className={`font-medium text-lg tracking-tight ${textClass}`}>
                                    Stillfrost
                                </span>
                            </div>
                        </Link>
                        <p className={`text-sm ${mutedClass} max-w-xs`}>
                            We build, launch, and operate software products autonomously.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className={`text-xs font-medium uppercase tracking-widest ${mutedClass} mb-4`}>
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {links.product.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <span className={`text-sm ${mutedClass} hover:${textClass} transition-colors cursor-pointer`}>
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className={`text-xs font-medium uppercase tracking-widest ${mutedClass} mb-4`}>
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {links.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>
                                        <span className={`text-sm ${mutedClass} hover:${textClass} transition-colors cursor-pointer`}>
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className={`mt-16 pt-8 border-t ${dark ? 'border-white/5' : 'border-slate-200'} flex flex-col md:flex-row items-center justify-between gap-4`}>
                    <p className={`text-sm ${mutedClass}`}>
                        © {currentYear} Stillfrost. All rights reserved.
                    </p>
                    <p className={`text-xs ${mutedClass}`}>
                        Autonomous Venture Studio
                    </p>
                </div>
            </div>
        </footer>
    );
};
