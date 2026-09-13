'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ArrowUpRight,
  UserCheck,
  FileText,
  User,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_APPLICATIONS, INITIAL_JOBS } from '@/lib/data/mock-data';
import { ApplicationStatus } from '@/types/candidate';
import { Button } from '@/components/ui/button';
import { AiMatchBadge, AiLabelBadge } from '@/components/shared/ai-badge';
import { useRole } from '@/lib/context/role-context';

export default function CandidateDashboardPage() {
  const { user } = useRole();
  const [activeTab, setActiveTab] = useState<'applications' | 'recommendations' | 'profile'>('applications');

  // Applications for candidate (Aarav Sharma)
  const myApplications = INITIAL_APPLICATIONS.filter(
    (a) => a.candidate_email.toLowerCase() === (user?.email || 'aarav.sharma@example.com').toLowerCase()
  );

  // Recommended jobs sorted by match score
  const recommendedJobs = INITIAL_JOBS.slice(0, 3).map((job, idx) => ({
    job,
    matchScore: idx === 0 ? 92 : idx === 1 ? 84 : 78,
  }));

  const statusMap: Record<ApplicationStatus, { label: string; color: string; desc: string }> = {
    under_review: {
      label: 'Under Review',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      desc: 'Application received. Hiring team is evaluating candidate profile & AI report.',
    },
    shortlisted: {
      label: 'Shortlisted',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Congratulations! Your profile was shortlisted by HR for the next evaluation stage.',
    },
    interview: {
      label: 'Interview Round',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      desc: 'Technical / Cultural interview round scheduled with the engineering leadership.',
    },
    rejected: {
      label: 'Application Closed',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      desc: 'HR has decided not to proceed for this specific opening at this time.',
    },
    selected: {
      label: 'Offer Extended',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      desc: 'You have been selected! Recruitment team will reach out with the offer letter.',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Profile Banner */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-indigo-100">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                {user?.name || 'Aarav Sharma'}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Candidate
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {user?.email || 'aarav.sharma@example.com'} • Bengaluru, Karnataka
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NextLink href="/jobs">
            <Button size="sm" variant="primary" className="font-bold">
              Find More Jobs
            </Button>
          </NextLink>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'applications'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          My Applications ({myApplications.length})
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'recommendations'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          AI Job Recommendations
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          My AI Profile
        </button>
      </div>

      {/* TAB 1: APPLICATIONS TRACKER */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {myApplications.length > 0 ? (
            myApplications.map((app) => {
              const statusInfo = statusMap[app.status] || statusMap.under_review;
              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                        {app.job?.company?.name || 'Company'}
                      </span>
                      <h3 className="text-lg font-extrabold text-gray-900 mt-0.5">
                        {app.job?.title || 'Engineering Role'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Applied on{' '}
                        {new Date(app.applied_at).toLocaleDateString('en-IN', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <AiMatchBadge score={app.ai_analysis.match_score || 85} size="md" />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/70 text-xs space-y-2">
                    <div className="font-bold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>Current Status Details</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{statusInfo.desc}</p>
                    {app.hr_notes && (
                      <div className="p-2.5 bg-indigo-50/70 rounded-lg border border-indigo-200 text-indigo-900">
                        <span className="font-bold">Note from Recruiter:</span> {app.hr_notes}
                      </div>
                    )}
                  </div>

                  {/* Skills Snapshot */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-400 font-semibold self-center">Matching Skills:</span>
                    {app.ai_analysis.matching_skills?.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
              <Briefcase className="w-8 h-8 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-800 text-base">No active applications yet</h3>
              <p className="text-xs text-gray-500">
                Explore tech jobs and upload your resume to generate your first AI match!
              </p>
              <NextLink href="/jobs">
                <Button size="sm" variant="primary">
                  Browse Open Roles
                </Button>
              </NextLink>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AI RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <div className="text-xs text-indigo-950">
              <span className="font-bold block">AI Semantic Job Matching</span>
              <span>
                These jobs are ranked based on the match between your extracted profile skills and active company requirements.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedJobs.map(({ job, matchScore }) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-gray-500">{job.company.name}</span>
                    <h3 className="font-bold text-gray-900 text-base">{job.title}</h3>
                  </div>
                  <AiMatchBadge score={matchScore} size="sm" />
                </div>

                <p className="text-xs text-gray-500 line-clamp-2">{job.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs font-bold text-gray-700">{job.location}</span>
                  <NextLink href={`/jobs/${job.id}`}>
                    <Button size="sm" variant="outline" className="text-xs font-semibold">
                      View Role
                    </Button>
                  </NextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAVED AI PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Extracted AI Candidate Profile</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Structured representation parsed from your uploaded resume.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Executive Summary
              </span>
              <p className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 leading-relaxed">
                Senior Full-Stack Developer with 4 years of experience building scalable payments and web apps using React, Next.js, Node.js, and PostgreSQL. Experienced in high-concurrency microservices.
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Verified Skills
              </span>
              <div className="flex flex-wrap gap-1.5 p-3 bg-gray-50 rounded-xl border border-gray-200">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Tailwind CSS'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-md bg-white border border-gray-300 font-semibold text-gray-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
