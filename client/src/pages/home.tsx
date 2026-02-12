import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Clock } from 'lucide-react';
import { NavBar } from '../components/studio/NavBar';
import { ArchitectureDiagram } from '../components/studio/ArchitectureDiagram';
import { Footer } from '../components/studio/Footer';

// --- Data ---

const articles = [
  {
    title: 'Constraint-Guided Decoding in FinTech',
    excerpt: 'Enforcing regulatory compliance at the token generation level using custom logit processors.',
    date: 'Feb 8',
    readTime: '6 min'
  },
  {
    title: 'Vector Search for KYC Documents',
    excerpt: 'Benchmarking retrieval accuracy across 12 embedding models for noisy scanned ID documents.',
    date: 'Jan 24',
    readTime: '8 min'
  },
  {
    title: 'The Agent Orchestration Pattern',
    excerpt: 'Why we moved from LangChain chains to a custom event-driven state machine for reliability.',
    date: 'Jan 12',
    readTime: '5 min'
  }
];

const products = [
  {
    name: 'AskAdam AI Portfolio',
    description: 'Full-stack portfolio with 9-agent AI orchestration, RAG-powered assistant, automated content pipeline, and real-time analytics. The flagship demonstration of StillFrost architecture.',
    tags: ['Multi-Agent', 'RAG', 'Gemini', 'React'],
    metrics: ['9 Agents', '3,072-dim Vectors', 'Live in Production'],
    link: 'https://adamwatkinsportfolio.com',
    linkText: 'Visit site',
    featured: true
  },
  {
    name: 'AssetHunter.io',
    description: 'Micro-PE deal intelligence platform. Tracks acquisition opportunities across 14+ app stores with proprietary scoring and MRR estimates.',
    tags: ['SaaS', 'Market Intel', 'Data Pipelines'],
    metrics: ['1,500+ Subscribers', '$15M+ Deal Flow', '14 App Stores'],
    link: 'https://assethunter.io',
    linkText: 'Visit site'
  },
  {
    name: 'Wrist Reads',
    description: 'Standalone Apple Watch reading app with Digital Crown navigation, glassmorphism UI optimized for OLED, and zero data collection.',
    tags: ['SwiftUI', 'watchOS', 'Native iOS'],
    metrics: ['5.0★ Rating', 'App Store', 'Zero Data'],
    link: '#',
    linkText: 'App Store'
  },
  {
    name: 'StillFrost Content Engine',
    description: 'End-to-end content pipeline: industry trend scanning, AI article generation, social adaptation, and one-click publishing.',
    tags: ['Gemini API', 'Multi-Agent', 'Automation'],
    metrics: ['5-Stage Pipeline', 'Automated', 'Live Output'],
    link: 'https://adamwatkinsportfolio.com/blog',
    linkText: 'View published articles'
  }
];

const approaches = [
  {
    id: '01',
    title: 'Agents Over Monoliths',
    text: 'Every AI task gets its own agent with a defined capability boundary, structured inputs, and typed outputs. The orchestrator handles routing and execution strategy. This isn’t a prompt wrapper. It’s a system.'
  },
  {
    id: '02',
    title: 'Compliance Is Architecture',
    text: 'In regulated industries, compliance isn’t a checkbox — it’s a design constraint. Our systems produce outputs that a compliance team would sign off on because the constraints are embedded in the agent prompts.'
  },
  {
    id: '03',
    title: 'Proof Over Promises',
    text: 'We don’t pitch decks. We ship URLs. Every product listed on this page is live, instrumented, and serving real users. Metrics aren’t projections — they’re database queries.'
  }
];

// --- Components ---

const SectionLabel = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-3 mb-8">
    <span className="text-xs font-mono text-[#58a6ff] tracking-widest">{number}</span>
    <span className="h-px w-8 bg-[#1a1f2e]"></span>
    <span className="text-xs font-mono text-[#8b949e] tracking-widest uppercase">{title}</span>
  </div>
);

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
  <div className="group border-t border-[#1a1f2e] py-6 hover:bg-[#0c1018] transition-colors cursor-pointer">
    <div className="flex justify-between items-baseline mb-2">
      <h3 className="text-lg text-[#e6edf3] font-medium group-hover:text-[#58a6ff] transition-colors">{article.title}</h3>
      <span className="text-xs font-mono text-[#8b949e]">{article.date}</span>
    </div>
    <p className="text-sm text-[#8b949e] leading-relaxed max-w-xl mb-4">{article.excerpt}</p>
    <div className="flex items-center gap-2 text-xs text-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity">
      Read Article <ArrowUpRight size={12} />
    </div>
  </div>
);

const ProductRow = ({ product }: { product: typeof products[0] }) => (
  <div className={`
    relative group border border-[#1a1f2e] bg-[#0c1018]/50 p-8 rounded-lg mb-6 hover:border-[#58a6ff]/30 transition-colors
    ${product.featured ? 'border-l-4 border-l-[#58a6ff]' : ''}
  `}>
    <div className="flex flex-col lg:flex-row gap-8 lg:items-start lg:justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl text-[#e6edf3] font-semibold">{product.name}</h3>
          {product.featured && <span className="px-2 py-0.5 text-[10px] font-mono text-[#06080d] bg-[#58a6ff] rounded">FLAGSHIP</span>}
        </div>
        <p className="text-[#8b949e] leading-relaxed mb-6 max-w-2xl">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-mono text-[#58a6ff] bg-[#58a6ff]/10 rounded border border-[#58a6ff]/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 min-w-[200px]">
        {product.metrics.map(metric => (
          <div key={metric} className="flex items-center gap-2 text-sm font-mono text-[#e6edf3]">
            <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full"></span>
            {metric}
          </div>
        ))}
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#58a6ff] mt-2 hover:underline">
          {product.linkText} <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06080d] text-[#8b949e] selection:bg-[#58a6ff]/20 selection:text-[#58a6ff]">
      <NavBar />

      <main className="max-w-[1200px] mx-auto px-6">

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-xs font-mono text-[#58a6ff] mb-6 tracking-widest">AI INFRASTRUCTURE LAB</div>
            <h1 className="text-5xl md:text-7xl font-semibold text-[#e6edf3] leading-[1.1] mb-8 max-w-4xl">
              Production AI for<br />regulated industries.
            </h1>
            <p className="text-xl text-[#8b949e] max-w-2xl leading-relaxed mb-12">
              We build multi-agent systems, compliance-aware pipelines, and knowledge infrastructure that ships to production — not slide decks.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#58a6ff]/80 border-t border-[#1a1f2e] pt-8 max-w-3xl">
              <span>9 PRODUCTION AGENTS</span>
              <span className="text-[#1a1f2e]">|</span>
              <span>3,072-DIM VECTOR SEARCH</span>
              <span className="text-[#1a1f2e]">|</span>
              <span>4 SHIPPED PRODUCTS</span>
              <span className="text-[#1a1f2e]">|</span>
              <span>$40M+ OUTCOMES INFLUENCED</span>
            </div>
          </motion.div>
        </section>

        {/* SYSTEMS */}
        <section id="systems" className="py-24 md:py-32">
          <SectionLabel number="01" title="SYSTEMS" />
          <h2 className="text-3xl md:text-4xl text-[#e6edf3] mb-4">Multi-Agent Orchestration</h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mb-16">
            Nine specialized agents. Three execution strategies. One orchestrator that routes, chains, and monitors everything.
          </p>

          <ArchitectureDiagram />

          <div className="mt-8 flex items-center justify-between text-xs font-mono text-[#58a6ff]/60 border-t border-[#1a1f2e] pt-4">
            <span>gemini-2.0-pro-exp</span>
            <span>gemini-2.0-flash</span>
            <span>text-embedding-004</span>
            <span>pgvector</span>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="py-24 md:py-32 border-t border-[#1a1f2e]">
          <SectionLabel number="02" title="RESEARCH" />
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl text-[#e6edf3] mb-4">Published Thinking</h2>
              <p className="text-lg text-[#8b949e] max-w-xl">
                Our content engine doesn't just generate articles — it produces analysis on the topics we're actively building around.
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            {articles.map((article, i) => (
              <ArticleCard key={i} article={article} />
            ))}
          </div>

          <p className="mt-8 text-sm text-[#58a6ff]/60">
            * These articles are researched, drafted, and adapted by our multi-agent content pipeline.
          </p>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="py-24 md:py-32 border-t border-[#1a1f2e]">
          <SectionLabel number="03" title="PRODUCTS" />
          <h2 className="text-3xl md:text-4xl text-[#e6edf3] mb-4">What We've Shipped</h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mb-16">
            Every product is live, serving real users, with real metrics.
          </p>

          <div className="space-y-4">
            {products.map((product, i) => (
              <ProductRow key={i} product={product} />
            ))}
          </div>
        </section>

        {/* APPROACH */}
        <section className="py-24 md:py-32 border-t border-[#1a1f2e]">
          <SectionLabel number="04" title="PRINCIPLES" />
          <h2 className="text-3xl md:text-4xl text-[#e6edf3] mb-16">How We Build</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {approaches.map((approach) => (
              <div key={approach.id}>
                <div className="text-sm font-mono text-[#58a6ff] mb-4">{approach.id}</div>
                <h3 className="text-xl text-[#e6edf3] mb-4">{approach.title}</h3>
                <p className="text-[#8b949e] leading-relaxed text-sm">
                  {approach.text.split('agents').map((part, i) =>
                    i === 1 ? <><span className="text-[#e6edf3]">agents</span>{part}</> : part
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 md:py-32 border-t border-[#1a1f2e]">
          <SectionLabel number="05" title="ABOUT" />

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-8 text-lg leading-relaxed">
              <h2 className="text-3xl md:text-4xl text-[#e6edf3] mb-8">About StillFrost</h2>
              <p>
                StillFrost Intelligence is an AI research and product lab focused on building production systems for regulated industries. We specialize in multi-agent orchestration, compliance-aware content pipelines, and knowledge infrastructure that enterprises can actually deploy.
              </p>
              <p>
                Founded by Adam Watkins — a CSC-certified Product Owner with 7+ years at the intersection of fintech, wealth management, and AI. Previously at Questrade Financial Group leading initiatives that drove $40M+ in asset inflows.
              </p>
              <p>
                StillFrost exists because the best way to prove you can build AI products for regulated industries is to build them, ship them, and show the receipts.
              </p>

              <div className="flex gap-8 pt-8">
                <a href="https://adamwatkinsportfolio.com" className="text-[#58a6ff] hover:text-[#e6edf3] transition-colors flex items-center gap-2">
                  View Full Portfolio <ArrowUpRight size={16} />
                </a>
                <a href="#" className="text-[#58a6ff] hover:text-[#e6edf3] transition-colors flex items-center gap-2">
                  LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="md:col-span-4 border-l border-[#1a1f2e] pl-8 flex flex-col justify-center gap-6">
              {[
                { label: 'FOUNDED', value: '2024' },
                { label: 'FOCUS', value: 'Regulated AI Infra' },
                { label: 'STACK', value: 'TS · React · Py · Gemini' },
                { label: 'AGENTS', value: '9 Production' },
                { label: 'PRODUCTS', value: '4 Shipped' }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-[10px] font-mono text-[#58a6ff] tracking-widest mb-1">{stat.label}</div>
                  <div className="text-[#e6edf3] font-medium">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
