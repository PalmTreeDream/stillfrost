import React from "react";
import { Link } from "wouter";
import { ShieldAlert, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const RestrictedPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
          <ShieldAlert className="text-slate-400" size={32} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-serif text-3xl text-slate-800">Access Restricted</h1>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Clearance Level Insufficient</p>
        </div>

        <p className="text-slate-500 font-light leading-relaxed">
          The requested module is currently operating in stealth mode. 
          Principal authorization is required for visibility.
        </p>

        <div className="pt-8">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-800 hover:text-sky-600 transition-colors uppercase tracking-wider">
              <ChevronLeft size={14} />
              Return to Dashboard
            </a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RestrictedPage;
