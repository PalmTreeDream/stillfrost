import React from "react";

interface Project {
  name: string;
  description: string;
  status: "Live" | "In Development" | "Coming Soon";
  tags: string[];
  url?: string;
}

const PROJECTS: Project[] = [
  {
    name: "AssetHunter.io",
    description: "Micro-PE deal intelligence across 14+ app stores",
    status: "Live",
    tags: ["Web", "SaaS"],
    url: "https://assethunter.io",
  },
  {
    name: "Wrist Reads",
    description: "Standalone reading app for Apple Watch",
    status: "Live",
    tags: ["watchOS", "iOS"],
    url: "https://apps.apple.com/app/wrist-reads",
  },
  {
    name: "Watch Study",
    description: "Flashcard learning on your wrist",
    status: "Coming Soon",
    tags: ["watchOS", "iOS"],
  },
];

const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const dotColor = {
    Live: "bg-green-500",
    "In Development": "bg-amber-500",
    "Coming Soon": "bg-zinc-500",
  }[status];

  return (
    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
      <div className={`h-1.5 w-1.5 ${dotColor}`} />
      {status}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-24 md:py-24 flex flex-col gap-24 max-w-6xl mx-auto">
      {/* Header */}
      <header className="fade-in">
        <h1 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-[0.2em]">
          STILLFROST
        </h1>
      </header>

      {/* Hero */}
      <section className="fade-in" style={{ animationDelay: "0.1s" }}>
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-2">
          PRODUCT STUDIO
        </p>
        <p className="text-zinc-200 text-lg md:text-xl max-w-xl leading-relaxed">
          We build tools for finance, productivity, and consumer markets.
        </p>
      </section>

      {/* Projects */}
      <section className="fade-in flex flex-col gap-12" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
          PROJECTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border-zinc-800">
          {PROJECTS.map((project, index) => {
            const CardContent = (
              <div className="bg-black p-8 flex flex-col gap-6 h-full transition-all duration-300 hover:bg-zinc-950 group relative">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-serif">{project.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-4">
                  <StatusBadge status={project.status} />

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono border border-zinc-800 px-2 py-0.5 text-zinc-500 whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );

            if (project.url) {
              return (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {CardContent}
                </a>
              );
            }

            return <div key={project.name}>{CardContent}</div>;
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="fade-in mt-auto py-12 border-t border-zinc-900 flex justify-center" style={{ animationDelay: "0.3s" }}>
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          StillFrost &copy; 2026
        </p>
      </footer>
    </div>
  );
}
