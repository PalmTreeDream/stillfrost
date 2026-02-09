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
  Star,
  Building2,
  FileText,
  BarChart3,
  Bot,
  Briefcase,
} from 'lucide-react';
import {
  NavBar,
  Footer,
  PageContainer,
  GlassCard,
} from '../components/studio';

interface Product {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'incubation' | 'acquired';
  featured?: boolean;
  metrics: {
    users?: string;
    revenue?: string;
    growth?: string;
  };
  launched: string;
  description: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    id: '1',
    name: 'CommissionIQ',
    category: 'Real Estate Tech',
    status: 'operational',
    featured: true,
    metrics: { users: '4.2K', revenue: '$28K MRR', growth: '+127%' },
    launched: 'Oct 2023',
    description: 'AI-powered commission tracking and discrepancy detection for real estate brokerages. Automates reconciliation across 50+ MLS systems.',
    icon: <Building2 size={20} />,
  },
  {
    id: '2',
    name: 'LeaseLens',
    category: 'Legal Tech',
    status: 'operational',
    featured: true,
    metrics: { users: '1.8K', revenue: '$14K MRR', growth: '+89%' },
    launched: 'Jan 2024',
    description: 'Commercial lease analysis that extracts 200+ key terms in seconds. Trusted by top CRE firms for due diligence.',
    icon: <FileText size={20} />,
  },
  {
    id: '3',
    name: 'DealFlow Pro',
    category: 'Investment Banking',
    status: 'operational',
    metrics: { users: '890', revenue: '$8.4K MRR', growth: '+45%' },
    launched: 'Nov 2023',
    description: 'Standardized deal sheet generation and CIM formatting. Reduces banker prep time by 6 hours per deal.',
    icon: <Briefcase size={20} />,
  },
  {
    id: '4',
    name: 'MetricsBot',
    category: 'SaaS Analytics',
    status: 'incubation',
    metrics: { users: '340', growth: '+212%' },
    launched: 'Feb 2024',
    description: 'Automated investor reporting for startups. Pulls data from Stripe, Mixpanel, and 20+ sources into beautiful updates.',
    icon: <BarChart3 size={20} />,
  },
  {
    id: '5',
    name: 'ReplyEngine',
    category: 'Sales Automation',
    status: 'incubation',
    metrics: { users: '520', growth: '+156%' },
    launched: 'Feb 2024',
    description: 'AI that drafts personalized cold email replies based on prospect research. 3x response rates for SDR teams.',
    icon: <Bot size={20} />,
  },
  {
    id: '6',
    name: 'PropertyPulse',
    category: 'PropTech',
    status: 'acquired',
    metrics: { users: '12K', revenue: 'Acquired' },
    launched: 'Jun 2023',
    description: 'Real-time property valuation API. Acquired by a leading real estate data company in Q4 2023.',
    icon: <TrendingUp size={20} />,
  },
];

const statusConfig = {
  operational: { label: 'Live', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  incubation: { label: 'Beta', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400 animate-pulse' },
  acquired: { label: 'Exited', bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', dot: 'bg-violet-400' },
};

const ProductCard = ({ product }: { product: Product }) => {
  const config = statusConfig[product.status];

  return (
    <GlassCard className="group h-full">
      {product.featured && (
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-400">
            {product.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {product.featured && (
            <Star size={14} className="text-amber-400 fill-amber-400" />
          )}
          <span className={`px-2 py-1 text-[10px] font-mono uppercase rounded ${config.bg} ${config.text} border ${config.border}`}>
            {config.label}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
        {product.name}
      </h3>

      <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-2">
        {product.description}
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        {product.metrics.users && (
          <div className="flex items-center gap-2">
            <Users size={14} className="text-slate-500" />
            <span className="text-sm font-medium text-white">{product.metrics.users}</span>
            <span className="text-xs text-slate-500">users</span>
          </div>
        )}
        {product.metrics.revenue && (
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-emerald-500" />
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
  const exitedCount = products.filter(p => p.status === 'acquired').length;
  const totalRevenue = '$50K+';

  return (
    <PageContainer>
      <NavBar />

      <div className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe size={28} className="text-emerald-400" />
              <h1
                className="text-3xl md:text-5xl font-semibold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Portfolio
              </h1>
            </div>
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-4">
              Products We Own & Operate
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every product in our portfolio was conceived, built, and launched by Stillfrost.
              We own equity and operate them for the long term.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { value: products.length.toString(), label: 'Portfolio Companies' },
              { value: operationalCount.toString(), label: 'Live Products', color: 'text-emerald-400' },
              { value: totalRevenue, label: 'Combined MRR', color: 'text-emerald-400' },
              { value: exitedCount.toString(), label: 'Successful Exits', color: 'text-violet-400' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className={`text-3xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Featured Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
              <Star size={14} className="text-amber-400" />
              Featured Products
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {products.filter(p => p.featured).map((product, index) => (
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
          </motion.div>

          {/* All Products */}
          <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500 mb-6">
            All Products
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(p => !p.featured).map((product, index) => (
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
