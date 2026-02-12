import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Menu, X, ArrowRight } from 'lucide-react';

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [location] = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Systems', href: '#systems' },
        { name: 'Research', href: '#research' },
        { name: 'Products', href: '#products' },
        { name: 'About', href: '#about' },
    ];

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/">
                        <a className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-[#58a6ff] rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                            <span className="font-sans font-medium text-[#e6edf3] tracking-tight">
                                StillFrost
                            </span>
                        </a>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href.substring(1))}
                                className="text-sm font-medium text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-[#e6edf3]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#06080d] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScrollTo(e, link.href.substring(1))}
                                    className="text-2xl font-medium text-[#e6edf3]"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
