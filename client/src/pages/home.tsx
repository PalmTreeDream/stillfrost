import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  ArrowRight,
  Building2,
  FileText,
  Briefcase,
  BarChart3,
  Bot,
  TrendingUp,
  Zap,
  Users,
  Star,
  ChevronRight,
} from 'lucide-react';
import {
  NavBar,
  Footer,
  PageContainer,
  GlassCard,
} from '../components/studio';

// Featured products for home page
const featuredProducts = [
  {
    name: 'CommissionIQ',
    category: 'Real Estate Tech',
    metrics: { users: '4.2K', mrr: '$28K' },
    icon: <Building2 size={20} />,
  },
  {
    name: 'LeaseLens',
    category: 'Legal Tech',
    metrics: { users: '1.8K', mrr: '$14K' },
    icon: <FileText size={20} />,
  },
  {
    name: 'DealFlow Pro',
    category: 'Investment Banking',
    metrics: { users: '890', mrr: '$8.4K' },
    icon: <Briefcase size={20} />,
  },
];

const stats = [
  { value: '6', label: 'Portfolio Companies' },
  { value: '$50K+', label: 'Combined MRR' },
  { value: '18K+', label: 'Active Users' },
  { value: '1', label: 'Successful Exit' },
];

export default function Home() {
  return (
    <PageContainer>
      <NavBar transparent />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.05] rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-6">
              Autonomous Venture Studio
            </p>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We build software<br />
              <span className="text-gradient">that runs itself</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Stillfrost is an AI-native venture studio. We conceive, build, and operate
              B2B software products—powered by autonomous agents that work around the clock.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/registry">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                >
                  View Portfolio
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 text-slate-300 font-medium border border-white/20 rounded-lg hover:bg-white/5 hover:text-white transition-all"
                >
                  How It Works
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
                Portfolio Highlights
              </p>
              <h2
                className="text-3xl md:text-4xl font-semibold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Products generating revenue
              </h2>
            </div>
            <Link href="/registry">
              <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                View all products
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <GlassCard className="group cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-emerald-400">
                      {product.icon}
                    </div>
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-6">
                    {product.category}
                  </p>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-500" />
                      <span className="text-sm font-medium text-white">{product.metrics.users}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-400">{product.metrics.mrr}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3">
              The Model
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              AI agents do the heavy lifting
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Five specialized agents work in coordination to identify opportunities,
              build products, and grow revenue—autonomously.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Identify',
                description: 'Intelligence agents scan markets for high-friction B2B workflows ripe for automation.',
              },
              {
                step: '02',
                title: 'Build',
                description: 'Systems agents scaffold MVPs in days, not months. From idea to deployed product.',
              },
              {
                step: '03',
                title: 'Operate',
                description: 'All agents collaborate to acquire customers, iterate on feedback, and scale revenue.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                <div className="text-6xl font-bold text-slate-800/50 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Interested in how we work?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              Learn more about our autonomous approach to building and scaling software products.
            </p>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              >
                About the Studio
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </PageContainer>
  );
}
