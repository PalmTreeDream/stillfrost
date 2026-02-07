import React from 'react';
import {
  NavBar,
  HeroSection,
  LogoCloud,
  StatsGrid,
  CaseStudyCard,
  CTASection,
  Footer,
  PageContainer,
} from '../components/studio';
import { Zap, Building2, Layers, TrendingUp, Bot, Workflow } from 'lucide-react';

export default function Home() {
  const logos = [
    { name: 'Startups', icon: <Zap size={16} /> },
    { name: 'Enterprise', icon: <Building2 size={16} /> },
    { name: 'Agencies', icon: <Layers size={16} /> },
    { name: 'Investors', icon: <TrendingUp size={16} /> },
    { name: 'Operators', icon: <Bot size={16} /> },
    { name: 'Builders', icon: <Workflow size={16} /> },
  ];

  const stats = [
    { value: '$4,200/mo', label: 'Avg. cost savings per team', sublabel: 'from manual work' },
    { value: '82', label: 'Hours saved', sublabel: 'per month average' },
    { value: '4x', label: 'Efficiency boost', sublabel: 'vs traditional teams' },
    { value: '24/7', label: 'Uptime', sublabel: 'autonomous operation' },
  ];

  const caseStudies = [
    {
      category: 'Finance Ops',
      title: 'Monthly Report Automation',
      description: 'Automated financial reporting that runs on schedule, synthesizes data from multiple sources, and delivers insights directly to stakeholders.',
      metrics: [
        { label: 'Time saved', value: '40hrs/mo' },
        { label: 'Accuracy', value: '99.9%' },
      ],
    },
    {
      category: 'Growth',
      title: 'Lead Intelligence Pipeline',
      description: 'AI-powered lead scoring and enrichment that identifies high-intent prospects and prioritizes outreach automatically.',
      metrics: [
        { label: 'Qualified leads', value: '+340%' },
        { label: 'Response time', value: '<5min' },
      ],
    },
    {
      category: 'Operations',
      title: 'Workflow Orchestration',
      description: 'End-to-end process automation that connects your tools, monitors for exceptions, and escalates intelligently.',
      metrics: [
        { label: 'Processes automated', value: '47' },
        { label: 'Error reduction', value: '92%' },
      ],
    },
  ];

  return (
    <PageContainer>
      <NavBar transparent />

      <HeroSection
        label="Introducing Stillfrost"
        title="Reimagine work with autonomous AI agents"
        subtitle="Your on-demand AI workforce. Automate routine tasks, streamline decision-making, and free your team to focus on what matters most."
        primaryCta={{ label: 'Get started', href: '/dashboard' }}
        secondaryCta={{ label: 'View use cases', href: '/registry' }}
      />

      <LogoCloud label="Trusted by forward-thinking teams" logos={logos} />

      <StatsGrid
        label="Real numbers"
        title="Automation that pays for itself, fast"
        stats={stats}
        dark
      />

      {/* Case Studies Section */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
                Use Cases
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Real workflows.<br />Real impact.
              </h2>
            </div>
            <p className="text-lg text-slate-400 max-w-md">
              See how teams use Stillfrost to automate complex workflows and focus on high-value work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        label="We're hiring"
        title="Come build with us"
        description="At Stillfrost, we're not building just another tool. We're building an entirely new way to get done at the mid-market—powered by intelligent, autonomous agents."
        primaryCta={{ label: 'View open roles', href: '/about' }}
        dark={false}
      />

      <Footer />
    </PageContainer>
  );
}
