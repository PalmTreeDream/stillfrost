import React from 'react';

export const Footer = () => {
    return (
        <footer className="border-t border-[#1a1f2e] bg-[#06080d] py-12">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs font-mono text-[#8b949e] tracking-tight">
                    © 2026 StillFrost Intelligence
                </div>

                <div className="flex items-center gap-8">
                    <a href="#" className="text-xs font-mono text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                        GITHUB
                    </a>
                    <a href="#" className="text-xs font-mono text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                        LINKEDIN
                    </a>
                    <a href="mailto:esteadam@gmail.com" className="text-xs font-mono text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                        EMAIL
                    </a>
                </div>
            </div>
        </footer>
    );
};
