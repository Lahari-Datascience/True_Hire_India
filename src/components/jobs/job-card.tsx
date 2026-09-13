'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Bookmark,
  Building,
  Clock,
} from 'lucide-react';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { AiMatchBadge } from '@/components/shared/ai-badge';
import { formatSalary, formatExperience } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  matchScore?: number;
  onCheckMatch?: (job: Job) => void;
  onSkillClick?: (skill: string) => void;
}

export function JobCard({ job, matchScore, onCheckMatch, onSkillClick }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const workModeConfig = {
    remote: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500',
      label: 'Remote',
    },
    hybrid: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      dot: 'bg-blue-500',
      label: 'Hybrid',
    },
    'on-site': {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      label: 'On-site',
    },
  };

  const mode = workModeConfig[job.work_mode] || workModeConfig.hybrid;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top subtle gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Company & Badges */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-200">
              <img
                src={job.company.logo_url}
                alt={job.company.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">
                  {job.company.name}
                </span>
                {job.company.verified && (
                  <span title="Verified Company">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </span>
                )}
              </div>
              <NextLink href={`/jobs/${job.id}`}>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mt-0.5">
                  {job.title}
                </h3>
              </NextLink>
            </div>
          </div>

          {/* Right Action: Bookmark + Match Badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
              title={isSaved ? 'Saved to bookmarks' : 'Save job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {matchScore !== undefined ? (
              <AiMatchBadge score={matchScore} size="md" />
            ) : (
              onCheckMatch && (
                <button
                  onClick={() => onCheckMatch(job)}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:shadow-xs transition-all shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>AI Match</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Highlight Pills Row: Salary, Work Mode, Exp, Location */}
        <div className="flex flex-wrap items-center gap-2 text-xs mb-4 pt-1">
          {/* Salary Tag */}
          <span className="inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 shadow-2xs">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            <span>{formatSalary(job.salary_min, job.salary_max, job.salary_currency)}</span>
          </span>

          {/* Work Mode */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${mode.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${mode.dot}`} />
            <span>{mode.label}</span>
          </span>

          {/* Experience */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200/70">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatExperience(job.experience_min, job.experience_max)}</span>
          </span>

          {/* Location */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 font-medium border border-slate-200/50">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed font-normal">
          {job.description}
        </p>

        {/* Interactive Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills_required.slice(0, 5).map((skill) => (
            <button
              key={skill}
              onClick={() => onSkillClick && onSkillClick(skill)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-xs font-semibold border border-slate-200 hover:border-blue-300 transition-all cursor-pointer"
              title={`Filter by ${skill}`}
            >
              {skill}
            </button>
          ))}
          {job.skills_required.length > 5 && (
            <span className="px-2.5 py-1 text-xs text-slate-400 font-semibold bg-slate-50 rounded-lg border border-slate-100">
              +{job.skills_required.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <NextLink
          href={`/jobs/${job.id}`}
          className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <span>Role Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </NextLink>

        <div className="flex items-center gap-2">
          {onCheckMatch && matchScore === undefined && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCheckMatch(job)}
              className="text-xs font-bold text-emerald-700 border-emerald-300 hover:bg-emerald-50 gap-1.5 rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Match</span>
            </Button>
          )}

          <NextLink href={`/apply/${job.id}`}>
            <Button
              size="sm"
              className="text-xs font-bold px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/15"
            >
              Apply Now
            </Button>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
