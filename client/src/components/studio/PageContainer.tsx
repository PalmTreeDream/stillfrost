import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
    children,
    className = '',
    dark = true,
}) => {
    return (
        <div className={`min-h-screen ${dark ? 'bg-slate-950' : 'bg-white'} ${className}`}>
            {/* Gradient background */}
            {dark && (
                <div className="fixed inset-0 pointer-events-none">
                    {/* Radial gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                            backgroundSize: '64px 64px',
                        }}
                    />

                    {/* Top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/[0.03] rounded-full blur-3xl" />
                </div>
            )}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
