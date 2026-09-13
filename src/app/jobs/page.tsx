'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, Filter, Briefcase, Zap, Compass, CheckCircle2, TrendingUp } from 'lucide-react';
import { Job } from '@/types/job';
import { INITIAL_JOBS } from '@/lib/data/mock-data';
import { JobCard } from '@/components/jobs/job-card';
import { JobFilters, FilterState } from '@/components/jobs/job-filters';
import { Modal } from '@/components/ui/modal';
import { AiMatchModalContent } from '@/components/candidate/ai-match-modal';
import { calculateHeuristicMatch } from '@/lib/ai/prompts';
import { Button } from '@/components/ui/button';

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-sm text-slate-500">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}

function JobsContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<FilterState>({
    location: searchParams.get('location') || 'all',
    work_mode: 'all',
    job_type: 'all',
    experience: 'all',
    skill: '',
  });

  const [selectedMatchJob, setSelectedMatchJob] = useState<Job | null>(null);
  const [matchAnalysis, setMatchAnalysis] = useState<any>(null);

  // Sync with searchParams
  useEffect(() => {
    const q = searchParams.get('q');
    const loc = searchParams.get('location');
    if (q !== null) setSearchQuery(q);
    if (loc !== null) setFilters((prev) => ({ ...prev, location: loc }));
  }, [searchParams]);

  // Filtered jobs memo
  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter((job) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          job.title.toLowerCase().includes(q) ||
          job.company.name.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.skills_required.some((s) => s.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // 2. Location
      if (filters.location !== 'all') {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // 3. Work mode
      if (filters.work_mode !== 'all' && job.work_mode !== filters.work_mode) {
        return false;
      }

      // 4. Job type
      if (filters.job_type !== 'all' && job.job_type !== filters.job_type) {
        return false;
      }

      // 5. Skill
      if (filters.skill) {
        const sLower = filters.skill.toLowerCase();
        const hasSkill = job.skills_required.some((s) => s.toLowerCase().includes(sLower));
        if (!hasSkill) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleReset = () => {
    setSearchQuery('');
    setFilters({
      location: 'all',
      work_mode: 'all',
      job_type: 'all',
      experience: 'all',
      skill: '',
    });
  };

  const handleSkillClick = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skill: prev.skill === skill ? '' : skill,
    }));
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-200 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Match Evaluation Active</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Explore Tech Opportunities
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Connecting high-potential Indian talent with genuine verified tech employers. Check your real-time GenAI skill match score on any opening.
          </p>

          {/* Quick Stats Pill */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{filteredJobs.length} Live Openings</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-blue-300" />
              <span>Instant AI Gap Analysis</span>
            </span>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
      </div>

      {/* Interactive Search Bar & Quick Chips */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-blue-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, technology (React, Python, Go), or company name..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200/90 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400 shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Quick Filter Tag Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Quick Picks:</span>
          {['React', 'Python', 'Go', 'Remote', 'Fintech', 'PostgreSQL'].map((chip) => {
            const isSkill = filters.skill.toLowerCase() === chip.toLowerCase();
            const isQuery = searchQuery.toLowerCase() === chip.toLowerCase();
            const isSelected = isSkill || isQuery;

            return (
              <button
                key={chip}
                onClick={() => {
                  if (chip === 'Remote') {
                    setFilters((prev) => ({
                      ...prev,
                      work_mode: prev.work_mode === 'remote' ? 'all' : 'remote',
                    }));
                  } else {
                    handleSkillClick(chip);
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <JobFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            totalResults={filteredJobs.length}
          />
        </div>

        {/* Job Cards Stream */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Filter Tags */}
          {(searchQuery || filters.location !== 'all' || filters.work_mode !== 'all' || filters.job_type !== 'all' || filters.skill) && (
            <div className="flex flex-wrap items-center gap-2 text-xs p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="font-bold text-slate-500">Filtered by:</span>
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  Search: "{searchQuery}"
                </span>
              )}
              {filters.location !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  📍 {filters.location}
                </span>
              )}
              {filters.work_mode !== 'all' && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Mode: {filters.work_mode}
                </span>
              )}
              {filters.skill && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Skill: {filters.skill}
                </span>
              )}
              <button
                onClick={handleReset}
                className="text-blue-600 font-bold hover:underline ml-auto"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* List or Empty State */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onCheckMatch={handleOpenMatchModal}
                  onSkillClick={handleSkillClick}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="font-black text-slate-800 text-lg">No matching jobs found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                We couldn’t find any roles matching your exact combination. Try clearing your filters to see all open positions.
              </p>
              <Button size="md" variant="outline" onClick={handleReset} className="font-bold text-xs">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>

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
