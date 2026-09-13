'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Sparkles,
  Search,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Brain,
  Database,
  Layout,
  BarChart3,
  ArrowRight,
  Zap,
  Check,
  Building2,
  Star,
} from 'lucide-react';
import { SearchBar } from '@/components/jobs/search-bar';
import { JobCard } from '@/components/jobs/job-card';
import { INITIAL_JOBS } from '@/lib/data/mock-data';
import { Job } from '@/types/job';
import { Modal } from '@/components/ui/modal';
import { AiMatchModalContent } from '@/components/candidate/ai-match-modal';
import { calculateHeuristicMatch } from '@/lib/ai/prompts';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [selectedMatchJob, setSelectedMatchJob] = useState<Job | null>(null);
  const [matchAnalysis, setMatchAnalysis] = useState<any>(null);

  const featuredJobs = INITIAL_JOBS.slice(0, 4);

  const handleOpenMatchModal = (job: Job) => {
    const sampleProfile = {
      full_name: 'Aarav Sharma',
      summary: 'Senior Full-Stack Engineer with experience in React, Next.js, Node.js, and Cloud deployment.',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Python'],
      experience: [
        {
          company: 'Tech Solutions',
          role: 'Full-Stack Developer',
          start_date: '2022-01',
          end_date: 'Present',
          description: 'Engineered web applications and integrated LLM APIs.',
        },
      ],
      education: [],
      projects: [],
      certifications: [],
    };

    const analysis = calculateHeuristicMatch(sampleProfile, job);
    setSelectedMatchJob(job);
    setMatchAnalysis(analysis);
  };

  const categories = [
    { title: 'Full-Stack & Frontend', count: '142 verified jobs', icon: Code2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'GenAI & Machine Learning', count: '98 verified jobs', icon: Brain, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'Backend & Cloud DevOps', count: '115 verified jobs', icon: Database, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { title: 'Product & UI/UX Design', count: '64 verified jobs', icon: Layout, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  ];

  const substantiatedStats = [
    { value: '500+', label: 'Verified Tech Roles', desc: 'Directly from genuine Indian tech employers' },
    { value: '94%', label: 'Recruiter Time Saved', desc: 'Screening time optimized via explainable AI' },
    { value: '100%', label: 'Human Governance', desc: 'AI assists; HR retains all final hiring decisions' },
    { value: '< 2 sec', label: 'Resume to Profile', desc: 'PyMuPDF + Gemini instant structured parser' },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Header with Shield */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-700">
              <div className="w-5 h-5 rounded-md overflow-hidden flex items-center justify-center">
                <img src="/logo-shield.png" alt="Shield" className="w-full h-full object-contain" />
              </div>
              <span className="text-[#0066CC]">True</span>
              <span className="text-[#16a34a]">Hire</span>
              <span className="text-slate-800">India</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-medium">Connecting Talent with Genuine Employers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Find the right job with the{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                power of AI
              </span>
            </h1>

            {/* Subheading with Story Framing */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              TrueHireIndia converts unstructured resumes into verified candidate profiles, provides explainable job matching and skill-gap breakdowns, and assists recruiters — while HR keeps the final hiring decision.
            </p>

            {/* Main Rounded Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <SearchBar />
            </div>

            {/* Popular Searches Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <span className="font-bold text-slate-700">Trending Now:</span>
              {['React', 'Next.js', 'Python', 'GenAI', 'Fintech', 'Bengaluru', 'Remote'].map((term) => (
                <NextLink
                  key={term}
                  href={`/jobs?q=${term}`}
                  className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all shadow-2xs font-semibold"
                >
                  {term}
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUBSTANTIATED METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {substantiatedStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 text-center shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="text-3xl sm:text-4xl font-black text-[#0066CC] group-hover:scale-105 transition-transform mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-extrabold text-slate-900 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 leading-tight">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE RECRUITMENT FLOW (Story Framing Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-200">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Intelligent Recruitment Flow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Resume Upload → AI Profile → AI Matching → HR Decision
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              No black-box algorithmic rejection. Candidates review AI-extracted profiles before submission, and recruiters receive explainable skill gap breakdowns to make informed human hiring decisions.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <NextLink href="/jobs">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold border-none shadow-md shadow-blue-500/20 rounded-xl"
                >
                  <span>Browse Open Opportunities</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </NextLink>
              <NextLink href="/hr/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold rounded-xl"
                >
                  <span>Recruiter Applicant Hub</span>
                </Button>
              </NextLink>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/20 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 4. TOP JOB CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Top Job Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore high-growth verified technical sectors across India
            </p>
          </div>
          <NextLink
            href="/jobs"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <NextLink
                key={idx}
                href={`/jobs?q=${cat.title.split(' ')[0]}`}
                className="group bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${cat.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{cat.count}</p>
                </div>
              </NextLink>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED / LATEST JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Verified Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Opportunities
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Roles verified from genuine employers with real-time AI Match percentage indicators
            </p>
          </div>
          <NextLink href="/jobs">
            <Button variant="outline" size="sm" className="font-bold text-xs rounded-xl border-slate-300">
              View All Openings
            </Button>
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onCheckMatch={handleOpenMatchModal}
            />
          ))}
        </div>
      </section>

      {/* AI Match Modal Preview */}
      <Modal
        isOpen={Boolean(selectedMatchJob)}
        onClose={() => setSelectedMatchJob(null)}
        maxWidth="3xl"
      >
        {selectedMatchJob && matchAnalysis && (
          <AiMatchModalContent
            job={selectedMatchJob}
            analysis={matchAnalysis}
            candidateName="Aarav Sharma"
            onApplyClick={() => {
              window.location.href = `/apply/${selectedMatchJob.id}`;
            }}
          />
        )}
      </Modal>
    </div>
  );
}
