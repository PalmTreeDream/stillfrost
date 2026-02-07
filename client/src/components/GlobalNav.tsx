import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const GlobalNav = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Registry", path: "/registry" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50 py-3"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <Link href="/">
            <span 
              className="font-serif text-lg text-white tracking-tight cursor-pointer hover:text-zinc-300 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              STILLFROST
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span className={`font-mono text-xs tracking-widest uppercase transition-colors cursor-pointer ${
                    location === link.path ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}>
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {!isLoading && (
              isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/control">
                    <button 
                      className="flex items-center gap-2 px-3 py-1.5 rounded bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 text-xs font-mono font-bold uppercase tracking-wider border border-violet-500/30 transition-colors"
                      data-testid="nav-control-button"
                    >
                      <Shield size={12} />
                      <span>Control</span>
                    </button>
                  </Link>
                  <a href="/api/logout">
                    <button 
                      className="flex items-center gap-2 px-3 py-1.5 text-zinc-500 hover:text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors"
                      data-testid="nav-logout-button"
                    >
                      <LogOut size={12} />
                    </button>
                  </a>
                </div>
              ) : (
                <a href="/api/login">
                  <button 
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-mono uppercase tracking-wider border border-zinc-700 transition-colors"
                    data-testid="nav-login-button"
                  >
                    <LogIn size={12} />
                    <span>Principal</span>
                  </button>
                </a>
              )
            )}

            <button 
              className="md:hidden p-2 -mr-2 text-zinc-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-2xl font-serif text-white">{link.name}</span>
                </Link>
              ))}
              
              {!isLoading && (
                isAuthenticated ? (
                  <>
                    <Link 
                      href="/control"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-3 text-2xl font-serif text-violet-400">
                        <Shield size={24} />
                        Control
                      </span>
                    </Link>
                    <a 
                      href="/api/logout"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-3 text-lg font-serif text-zinc-500">
                        <LogOut size={20} />
                        Logout
                      </span>
                    </a>
                  </>
                ) : (
                  <a 
                    href="/api/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3 text-2xl font-serif text-zinc-400">
                      <LogIn size={24} />
                      Principal Login
                    </span>
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalNav;
