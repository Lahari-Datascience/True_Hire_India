'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Sparkles,
  CheckCircle2,
  Building2,
  Globe,
  Share2,
  ArrowLeft,
  Lightbulb,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { getJobById, INITIAL_JOBS } from '@/lib/data/mock-data';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { AiMatchModalContent } from '@/components/candidate/ai-match-modal';
import { calculateHeuristicMatch } from '@/lib/ai/prompts';
import { formatSalary, formatExperience } from '@/lib/utils';
import { AiLabelBadge } from '@/components/shared/ai-badge';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id) || INITIAL_JOBS.find((j) => j.id === params.id);

  if (!job) {
    return notFound();
  }

  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [improveModalOpen, setImproveModalOpen] = useState(false);
  const [matchAnalysis, setMatchAnalysis] = useState<any>(null);
  const [improveSuggestions, setImproveSuggestions] = useState<any[]>([]);
  const [isGeneratingTips, setIsGeneratingTips] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const sampleCandidate = {
    full_name: 'Aarav Sharma',
    summary: 'Senior Full-Stack Engineer specializing in React, Next.js, and Node.js microservices with PostgreSQL.',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
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

  const handleOpenAiMatch = () => {
    const analysis = calculateHeuristicMatch(sampleCandidate, job);
    setMatchAnalysis(analysis);
    setMatchModalOpen(true);
  };

  const handleOpenAiImprovements = async () => {
    setIsGeneratingTips(true);
    try {
      const res = await fetch('/api/ai/improve-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_profile: sampleCandidate,
          job_id: job.id,
        }),
      });
      const data = await res.json();
      setImproveSuggestions(data.suggestions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTips(false);
      setImproveModalOpen(true);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <NextLink
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Jobs</span>
      </NextLink>

      {/* Main Header Banner */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
              <img
                src={job.company.logo_url}
                alt={job.company.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-600">
                  {job.company.name}
                </span>
                {job.company.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                    Verified Employer
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  {formatExperience(job.experience_min, job.experience_max)}
                </span>
                <span className="flex items-center gap-1 text-gray-900 font-bold">
                  <IndianRupee className="w-3.5 h-3.5 text-gray-400" />
                  {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-bold uppercase tracking-wider">
                  {job.work_mode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
              title="Share job"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleOpenAiMatch}
              className="text-xs sm:text-sm font-bold text-emerald-700 border-emerald-300 hover:bg-emerald-50 gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Check My AI Match</span>
            </Button>
            <NextLink href={`/apply/${job.id}`}>
              <Button size="lg" variant="primary" className="text-xs sm:text-sm font-bold px-7">
                Apply Now
              </Button>
            </NextLink>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Job Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Role Overview */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900">About the Role</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {job.description}
            </p>

            {/* Skills required */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Required Technical Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills_required.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50/70 border border-indigo-200/70 text-indigo-900 font-semibold text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Key Responsibilities</h2>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications & Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Requirements & Qualifications</h2>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Action Card & Company Profile */}
        <div className="space-y-6">
          {/* AI Assistance Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <AiLabelBadge text="GenAI Assistant" variant="purple" />
              <span className="text-xs text-indigo-900 font-bold">Assistive Intelligence</span>
            </div>

            <h3 className="font-extrabold text-gray-900 text-base">
              Wondering if you qualify?
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Use our explainable AI to compare your profile or resume against this exact job specification.
            </p>

            <div className="space-y-2 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleOpenAiMatch}
                className="w-full font-bold text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700"
              >
                <Sparkles className="w-4 h-4" />
                <span>Evaluate My Match & Skill Gap</span>
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={handleOpenAiImprovements}
                isLoading={isGeneratingTips}
                className="w-full font-bold text-xs gap-1.5 bg-white text-indigo-800 border-indigo-200 hover:bg-indigo-50/50"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>AI Resume Tailoring Tips</span>
              </Button>
            </div>

            <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-1.5 border-t border-indigo-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>AI assists; recruiter makes all final hiring decisions.</span>
            </div>
          </div>

          {/* Company Details Box */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                <img src={job.company.logo_url} alt={job.company.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{job.company.name}</h4>
                <p className="text-xs text-gray-500">{job.company.location}</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {job.company.description}
            </p>

            {job.company.website && (
              <a
                href={job.company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline pt-2"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Company Website</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* AI Match Modal */}
      <Modal
        isOpen={matchModalOpen}
        onClose={() => setMatchModalOpen(false)}
        maxWidth="3xl"
      >
        {matchAnalysis && (
          <AiMatchModalContent
            job={job}
            analysis={matchAnalysis}
            candidateName={sampleCandidate.full_name}
            onApplyClick={() => {
              window.location.href = `/apply/${job.id}`;
            }}
          />
        )}
      </Modal>

      {/* AI Resume Improvement Modal */}
      <Modal
        isOpen={improveModalOpen}
        onClose={() => setImproveModalOpen(false)}
        maxWidth="2xl"
        title="AI Resume Improvement Suggestions"
        subtitle={`Tailoring your application for ${job.title} at ${job.company.name}`}
      >
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950">
            <p className="font-bold">Targeted Recommendations</p>
            <p className="text-indigo-800 mt-0.5">
              These suggestions are generated by AI to optimize your resume’s relevance and quantitative impact specifically for this role.
            </p>
          </div>

          <div className="space-y-3">
            {improveSuggestions.map((item, idx) => (
              <div key={idx} className="p-4 bg-white border border-gray-200 rounded-xl space-y-1.5 text-xs">
                <div className="font-bold text-indigo-600 uppercase tracking-wider text-[11px]">
                  {item.category}
                </div>
                <p className="font-semibold text-gray-900">{item.action}</p>
                {item.example && (
                  <p className="text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100 font-mono text-[11px] leading-relaxed">
                    {item.example}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" onClick={() => setImproveModalOpen(false)}>
              Got it, thanks!
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
