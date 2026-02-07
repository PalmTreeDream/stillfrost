import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  Globe,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import {
  NavBar,
  Footer,
  PageContainer,
  GlassCard,
  SectionHeader,
} from '../components/studio';

interface Product {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'incubation';
  metrics: {
    users?: string;
    revenue?: string;
    growth?: string;
  };
  launched: string;
  description: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Commission Auditor',
    category: 'Real Estate',
    status: 'operational',
    metrics: { users: '2.4K', revenue: '$12K/mo', growth: '+24%' },
    launched: 'Jan 2024',
    description: 'Automated commission tracking and discrepancy detection for real estate brokerages.',
  },
  {
    id: '2',
    name: 'Lease Summarizer',
    category: 'Legal Tech',
    status: 'incubation',
    metrics: { users: '340', growth: '+89%' },
    launched: 'Mar 2024',
    description: 'AI-powered commercial lease analysis that extracts key terms in seconds.',
  },
  {
    id: '3',
    name: 'Deal Sheet Pro',
    category: 'Finance',
    status: 'operational',
    metrics: { users: '890', revenue: '$4.2K/mo', growth: '+45%' },
    launched: 'Feb 2024',
    description: 'Standardized deal sheet generation for investment banking workflows.',
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const isOperational = product.status === 'operational';

  return (
    <GlassCard className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isOperational ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <span className={`px-2 py-1 text-[10px] font-mono uppercase rounded ${isOperational
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
          {product.status}
        </span>
      </div>

      <h3 className="text-xl font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
        {product.name}
      </h3>

      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
        {product.description}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        {product.metrics.users && (
          <div className="flex items-center gap-2">
            <Users size={14} className="text-slate-500" />
            <span className="text-sm font-medium text-white">{product.metrics.users}</span>
          </div>
        )}
        {product.metrics.revenue && (
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-slate-500" />
            <span className="text-sm font-medium text-emerald-400">{product.metrics.revenue}</span>
          </div>
        )}
        {product.metrics.growth && (
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="text-sm font-medium text-emerald-400">{product.metrics.growth}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={12} />
          <span className="text-xs font-mono">{product.launched}</span>
        </div>
        <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
      </div>
    </GlassCard>
  );
};

export default function Registry() {
  const operationalCount = products.filter(p => p.status === 'operational').length;
  const incubationCount = products.filter(p => p.status === 'incubation').length;

  return (
    <PageContainer>
      <NavBar />

      <div className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe size={24} className="text-emerald-400" />
              <h1
                className="text-3xl md:text-4xl font-medium text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                The Registry
              </h1>
            </div>
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-4">
              Products We Own & Operate
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every product in our registry was conceived, built, and launched by Stillfrost.
              We own them outright and operate them indefinitely.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl font-semibold text-white">{products.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Total Products</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-semibold text-emerald-400">{operationalCount}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Operational</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-semibold text-amber-400">{incubationCount}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Incubation</div>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </PageContainer>
  );
}
