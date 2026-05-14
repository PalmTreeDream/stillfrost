import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: string;
    name: string;
    edition: string;
    year: string;
    description: string;
    coverImage: string;
    url?: string;
    status: "Live" | "Coming Soon";
}

const PROJECTS: Project[] = [
    {
        id: "assethunter",
        name: "AssetHunter.io",
        edition: "Winter",
        year: "2026",
        description: "Micro-PE deal intelligence across 14+ app stores",
        coverImage: "/covers/assethunter_cover_1771269073933.png",
        url: "https://assethunter.io",
        status: "Live"
    },
    {
        id: "wristreads",
        name: "Wrist Reads",
        edition: "Summer",
        year: "2025",
        description: "Standalone reading app for Apple Watch",
        coverImage: "/covers/wristreads_cover_1771269091389.png",
        url: "https://apps.apple.com/app/wrist-reads",
        status: "Live"
    },
    {
        id: "watchstudy",
        name: "Watch Study",
        edition: "Winter",
        year: "2025",
        description: "Flashcard learning on your wrist",
        coverImage: "/covers/watchstudy_cover_1771269105040.png",
        status: "Coming Soon"
    },
    {
        id: "frozenassets",
        name: "Frozen Assets",
        edition: "Summer",
        year: "2024",
        description: "Capital deployment tracker for cold storage",
        coverImage: "/covers/stillfrost_placeholder_1_1771269116567.png",
        status: "Coming Soon"
    }
];

const ProjectCover = ({ project, index }: { project: Project; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.12, duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="scroll-item px-10"
            id={`project-${project.id}`}
        >
            <div
                className="cover-item w-[280px] md:w-[350px] aspect-[4/5] bg-zinc-900 shadow-2xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col items-center text-center px-6">
                        <h3 className="text-white font-serif text-xl mb-1">{project.name}</h3>
                        <p className="text-zinc-400 text-xs font-mono mb-6">{project.description}</p>

                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-white/10 text-white text-[10px] font-mono uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
                                Details
                            </button>
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-sky-300/10 text-sky-300 text-[10px] font-mono uppercase tracking-widest border border-sky-300/30 hover:bg-sky-300 hover:text-black transition-colors duration-300"
                                >
                                    Open
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edition Label */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                    <div className={`text-[10px] font-mono uppercase tracking-widest drop-shadow-md ${project.status === "Live" ? "text-sky-300" : "text-zinc-500"}`}>
                        {project.status === "Live" ? "● Live" : "○ Soon"}
                    </div>
                </div>
            </div>
            <div className="cover-shadow" />
        </motion.div>
    );
};

const Shelf = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="shelf-wrapper mb-32">
            <div className="shelf-surface" />
            <div className="shelf-ledge" />
            <div className="horizontal-scroll px-12 md:px-24">
                {children}
            </div>
        </div>
    );
};

export default function Home() {
    const [activeId, setActiveId] = useState("");

    const scrollToProject = (id: string) => {
        const element = document.getElementById(`project-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            setActiveId(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#080808] pt-12 flex flex-col perspective-container">
            {/* Cinematic overlays */}
            <div className="film-grain" />
            <div className="vignette" />

            {/* Header */}
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="px-6 py-6 border-b border-zinc-900 flex justify-between items-center mb-16"
            >
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-serif font-bold uppercase tracking-[0.6em] text-zinc-100">STILL FROST</h1>
                    <span className="text-[10px] font-mono uppercase text-zinc-600 hidden md:block tracking-widest">Incubation Lab / Product Studio</span>
                </div>
                <nav className="flex gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Search</a>
                    <a href="#" className="hover:text-zinc-100 transition-colors duration-300">Archives</a>
                </nav>
            </motion.header>

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
                className="px-12 md:px-24 mb-20 max-w-3xl"
            >
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-5">A legacy of shipping. Every six months.</p>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed italic text-zinc-300">
                    "Still Frost captures the elegance of software frozen in time, refined to the absolute essential."
                </p>
            </motion.div>

            {/* Shelves */}
            <main className="flex-1 overflow-visible">
                <Shelf>
                    {PROJECTS.slice(0, 4).map((project, i) => (
                        <ProjectCover key={project.id} project={project} index={i} />
                    ))}
                </Shelf>
            </main>

            {/* Timeline Footer */}
            <footer className="fixed bottom-0 left-0 w-full bg-[#080808] border-t border-zinc-900 py-10 px-12 md:px-24 z-50">
                <div className="flex justify-between items-center overflow-x-auto gap-12 pb-2">
                    {PROJECTS.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => scrollToProject(project.id)}
                            className={`timeline-item flex flex-col shrink-0 ${activeId === project.id ? 'active' : ''}`}
                        >
                            <span className="text-[9px] font-mono uppercase text-zinc-600 mb-1">{project.year} {project.edition}</span>
                            <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-zinc-200">{project.name}</span>
                        </div>
                    ))}
                </div>
            </footer>
        </div>
    );
}
