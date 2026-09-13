'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Briefcase,
  Users,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Flag,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';
import { INITIAL_JOBS, INITIAL_APPLICATIONS } from '@/lib/data/mock-data';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [flagFilter, setFlagFilter] = useState<'all' | 'flagged'>('all');

  const handleToggleFlag = (jobId: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          const isNowFlagged = !job.is_flagged;
          return {
            ...job,
            is_flagged: isNowFlagged,
            status: isNowFlagged ? 'flagged' : 'active',
          };
        }
        return job;
      })
    );
  };

  const handleRemoveJob = (jobId: string) => {
    if (confirm('Are you sure you want to remove this job listing from the platform?')) {
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    }
  };

  const flaggedCount = jobs.filter((j) => j.is_flagged).length;
  const activeCount = jobs.filter((j) => j.status === 'active').length;

  const filteredJobs = jobs.filter((j) => {
    if (flagFilter === 'flagged' && !j.is_flagged) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.name.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Governance & Moderation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Admin Safety & Moderation Hub
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Maintain high listing standards, flag fraudulent openings, and oversee recruitment telemetry.
          </p>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-sm">
          <strong>Safety Rule:</strong> Admin enforces platform hygiene and removes fraud. Admin never decides who gets hired for any role.
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Listings</span>
            <Briefcase className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-gray-900">{activeCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">Verified company jobs</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Flagged / Suspicious</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-600">{flaggedCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">Needs admin review</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">AI Match Evaluations</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-indigo-600">1,248</div>
          <div className="text-xs text-gray-500 mt-0.5">Assisted match executions</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">System Health</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-700 mt-1">99.9% Uptime</div>
          <div className="text-xs text-gray-500 mt-0.5">PyMuPDF & Gemini Healthy</div>
        </div>
      </div>

      {/* Moderation Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Job Listings Moderation</h2>
            <p className="text-xs text-gray-500">Flag suspicious jobs or take down inappropriate posts</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter listings..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={() => setFlagFilter(flagFilter === 'all' ? 'flagged' : 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                flagFilter === 'flagged'
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Flagged Only ({flaggedCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/75 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4">Job Title & Company</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Moderation State</th>
                <th className="py-3.5 px-4 text-right">Moderator Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900">{job.title}</div>
                    <div className="text-[11px] text-gray-400">{job.company.name}</div>
                  </td>

                  <td className="py-4 px-4 text-gray-600">
                    {job.location} ({job.work_mode})
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                        job.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    {job.is_flagged ? (
                      <span className="inline-flex items-center gap-1 text-rose-600 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <Flag className="w-3 h-3" /> Flagged Suspicious
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant={job.is_flagged ? 'outline' : 'danger'}
                      onClick={() => handleToggleFlag(job.id)}
                      className="text-xs font-semibold py-1 px-2.5"
                    >
                      <Flag className="w-3 h-3 mr-1" />
                      <span>{job.is_flagged ? 'Unflag Job' : 'Flag Job'}</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveJob(job.id)}
                      className="text-xs font-semibold text-rose-600 hover:bg-rose-50 py-1 px-2.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
