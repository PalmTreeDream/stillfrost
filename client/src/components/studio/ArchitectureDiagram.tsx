import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    Cpu,
    Search,
    FileText,
    Users,
    BarChart,
    Globe,
    Zap,
    Share2
} from 'lucide-react';

interface NodeProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    description: string;
    x: number;
    y: number;
    active?: boolean;
}

const nodes: NodeProps[] = [
    // Center
    {
        id: 'orchestrator',
        label: 'Orchestrator',
        icon: <Cpu size={24} />,
        description: 'Intent classification → Routing → Monitoring',
        x: 50, y: 40
    },

    // Left Cluster - Knowledge
    {
        id: 'recruiter',
        label: 'Recruiter',
        icon: <Users size={20} />,
        description: 'Resume analysis & profiling',
        x: 20, y: 20
    },
    {
        id: 'extractor',
        label: 'Extractor',
        icon: <FileText size={20} />,
        description: 'Document parsing',
        x: 15, y: 40
    },
    {
        id: 'stats',
        label: 'Stats Finder',
        icon: <BarChart size={20} />,
        description: 'Quantitative evidence',
        x: 20, y: 60
    },

    // Right Cluster - Content
    {
        id: 'scanner',
        label: 'Trend Scanner',
        icon: <Search size={20} />,
        description: 'Signal detection',
        x: 80, y: 20
    },
    {
        id: 'writer',
        label: 'Writer',
        icon: <FileText size={20} />,
        description: 'Long-form generation',
        x: 85, y: 40
    },
    {
        id: 'social',
        label: 'Social',
        icon: <Share2 size={20} />,
        description: 'Platform adaptation',
        x: 80, y: 60
    },

    // Bottom
    {
        id: 'architect',
        label: 'Case Study Architect',
        icon: <Database size={20} />,
        description: 'Proof-point synthesis',
        x: 50, y: 70
    }
];

const connections = [
    { from: 'orchestrator', to: 'recruiter' },
    { from: 'orchestrator', to: 'extractor' },
    { from: 'orchestrator', to: 'stats' },
    { from: 'orchestrator', to: 'scanner' },
    { from: 'orchestrator', to: 'writer' },
    { from: 'orchestrator', to: 'social' },
    { from: 'orchestrator', to: 'architect' },
    { from: 'stats', to: 'architect' },
    { from: 'extractor', to: 'architect' },
    { from: 'scanner', to: 'writer' }
];

export const ArchitectureDiagram = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-[16/9] bg-[#0c1018]/50 border border-[#1a1f2e] rounded-xl overflow-hidden backdrop-blur-sm">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#58a6ff 1px, transparent 1px), linear-gradient(90deg, #58a6ff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Connections (SVG Layer) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map((conn, i) => {
                    const fromNode = nodes.find(n => n.id === conn.from)!;
                    const toNode = nodes.find(n => n.id === conn.to)!;
                    const isConnected = hoveredNode && (hoveredNode === conn.from || hoveredNode === conn.to);

                    return (
                        <g key={`${conn.from}-${conn.to}`}>
                            {/* Base Line */}
                            <line
                                x1={`${fromNode.x}%`}
                                y1={`${fromNode.y}%`}
                                x2={`${toNode.x}%`}
                                y2={`${toNode.y}%`}
                                stroke="#58a6ff"
                                strokeWidth="1"
                                className={`transition-opacity duration-300 ${isConnected ? 'opacity-60' : 'opacity-20'}`}
                            />

                            {/* Animated Pulse */}
                            <circle r="2" fill="#58a6ff" className="opacity-0">
                                <animateMotion
                                    dur={`${3 + (i % 2)}s`}
                                    repeatCount="indefinite"
                                    path={`M${fromNode.x * 10},${fromNode.y * 10} L${toNode.x * 10},${toNode.y * 10}`} // Scaling for SVG coordinate system roughly
                                // Note: SVG percentages in path are tricky, defaulting to simplified CSS animation for reliability below
                                />
                            </circle>
                            {/* Simple CSS Dot animation alternative since SVG paths are complex with % */}
                        </g>
                    );
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
                const isCenter = node.id === 'orchestrator';
                const isHovered = hoveredNode === node.id;

                return (
                    <motion.div
                        key={node.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-10`}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: Math.random() * 0.5 }}
                    >
                        {/* Node Circle */}
                        <div
                            className={`
                relative flex items-center justify-center rounded-full border transition-all duration-300
                ${isCenter ? 'w-20 h-20' : 'w-14 h-14'}
                ${isHovered || isCenter ? 'bg-[#58a6ff]/10 border-[#58a6ff] shadow-[0_0_30px_rgba(88,166,255,0.2)]' : 'bg-[#0c1018] border-[#1a1f2e]'}
              `}
                        >
                            <div className={`${isHovered || isCenter ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`}>
                                {node.icon}
                            </div>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute top-full mt-4 bg-[#0c1018] border border-[#1a1f2e] p-3 rounded-lg shadow-xl w-48 z-50 pointer-events-none"
                                    >
                                        <div className="text-xs font-semibold text-[#e6edf3] mb-1">{node.label}</div>
                                        <div className="text-[10px] text-[#8b949e] leading-relaxed">{node.description}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Label */}
                        <div
                            className={`
                mt-3 text-xs font-mono tracking-wider transition-colors duration-300 uppercase
                ${isHovered || isCenter ? 'text-[#58a6ff]' : 'text-[#8b949e]'}
              `}
                        >
                            {node.label}
                        </div>
                    </motion.div>
                );
            })}

            {/* Infrastructure Strip */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-[#06080d]/80 border-t border-[#1a1f2e] flex items-center justify-center gap-8 text-[10px] font-mono text-[#8b949e] uppercase tracking-wider backdrop-blur-md">
                <span className="flex items-center gap-2">
                    <Zap size={10} className="text-[#58a6ff]" />
                    RAG Pipeline
                </span>
                <span className="w-px h-3 bg-[#1a1f2e]" />
                <span className="flex items-center gap-2">
                    <Database size={10} className="text-[#58a6ff]" />
                    pgvector
                </span>
                <span className="w-px h-3 bg-[#1a1f2e]" />
                <span className="flex items-center gap-2">
                    <Cpu size={10} className="text-[#58a6ff]" />
                    Execution Engine
                </span>
            </div>
        </div>
    );
};
