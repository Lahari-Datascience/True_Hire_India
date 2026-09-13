'use client';

import React from 'react';
import { Application, ApplicationStatus } from '@/types/candidate';
import { AiMatchBadge } from '@/components/shared/ai-badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Clock, CheckCircle2, Calendar, UserX, UserCheck } from 'lucide-react';

interface ApplicantTableProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}

export function ApplicantTable({ applications, onSelectApplication }: ApplicantTableProps) {
  const statusStyles: Record<ApplicationStatus, { label: string; bg: string; text: string; icon: any }> = {
    under_review: { label: 'Under Review', bg: 'bg-blue-50', text: 'text-blue-700', icon: Clock },
    shortlisted: { label: 'Shortlisted', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle2 },
    interview: { label: 'Interview', bg: 'bg-purple-50', text: 'text-purple-700', icon: Calendar },
    rejected: { label: 'Rejected', bg: 'bg-rose-50', text: 'text-rose-700', icon: UserX },
    selected: { label: 'Selected', bg: 'bg-amber-50', text: 'text-amber-800', icon: UserCheck },
  };

  if (applications.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
        <p className="text-sm font-semibold text-gray-500">No applicants found matching this criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/75 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <th className="py-3.5 px-5">Candidate</th>
              <th className="py-3.5 px-4">Applied Job</th>
              <th className="py-3.5 px-4">AI Match Score</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Applied Date</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {applications.map((app) => {
              const statusInfo = statusStyles[app.status] || statusStyles.under_review;
              const StatusIcon = statusInfo.icon;
              const score = app.ai_analysis?.match_score ?? 70;

              return (
                <tr
                  key={app.id}
                  className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                  onClick={() => onSelectApplication(app)}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
                        {app.candidate_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {app.candidate_name}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {app.candidate_email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-800">
                      {app.job?.title || 'Engineering Role'}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {app.job?.company?.name || 'Company'}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <AiMatchBadge score={score} size="sm" />
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[11px] border border-gray-200/60 ${statusInfo.bg} ${statusInfo.text}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusInfo.label}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 text-gray-400 font-medium">
                    {new Date(app.applied_at).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApplication(app);
                      }}
                      className="text-xs font-semibold hover:border-indigo-500 hover:text-indigo-600 gap-1"
                    >
                      <span>Review</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
