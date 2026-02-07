import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface NavBarProps {
    transparent?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ transparent = false }) => {
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Use cases', href: '/registry' },
        { label: 'About', href: '/about' },
        { label: 'Journal', href: '/journal' },
        { label: 'Contact', href: '/about' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || !transparent
                        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center border border-white/10">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="text-white font-medium text-lg tracking-tight">
                                Stillfrost
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <span className="text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/dashboard">
                            <button className="px-5 py-2.5 bg-white text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors">
                                Get started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-slate-950/98 pt-24 px-6 md:hidden"
                >
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                                <span className="text-white text-2xl font-medium">{link.label}</span>
                            </Link>
                        ))}
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <button className="w-full px-5 py-3 bg-white text-slate-900 text-lg font-medium rounded-lg mt-4">
                                Get started
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </>
    );
};
