'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Check,
  UserCheck,
  UserX,
  Clock,
  Send,
} from 'lucide-react';
import { Application, ApplicationStatus } from '@/types/candidate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AiMatchBadge, AiLabelBadge } from '@/components/shared/ai-badge';
import { getMatchScoreColor } from '@/lib/utils';

interface CandidateDetailDrawerProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (appId: string, newStatus: ApplicationStatus, notes?: string) => Promise<void>;
}

export function CandidateDetailDrawer({
  application,
  isOpen,
  onClose,
  onStatusChange,
}: CandidateDetailDrawerProps) {
  if (!isOpen || !application) return null;

  const [notes, setNotes] = useState(application.hr_notes || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  const profile = application.extracted_profile;
  const analysis = application.ai_analysis;
  const colors = getMatchScoreColor(analysis?.match_score || 70);

  const handleUpdateStatus = async (newStatus: ApplicationStatus) => {
    setIsUpdating(true);
    await onStatusChange(application.id, newStatus, notes);
    setIsUpdating(false);
  };

  const handleSaveNotes = async () => {
    setIsUpdating(true);
    await onStatusChange(application.id, application.status, notes);
    setIsUpdating(false);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: any }> = {
    under_review: { label: 'Under Review', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    shortlisted: { label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    interview: { label: 'Interview Scheduled', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Calendar },
    rejected: { label: 'Rejected', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: UserX },
    selected: { label: 'Selected / Hired', color: 'bg-amber-50 text-amber-800 border-amber-200', icon: UserCheck },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col z-10 animate-slide-left">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              {application.candidate_name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                {application.candidate_name}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Applied for {application.job?.title || 'Job Listing'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* AI Match Overview Box */}
          <div className={`p-5 rounded-xl border ${colors.badgeBorder} ${colors.badgeBg} space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AiLabelBadge text="Explainable AI Match" variant="purple" />
                <span className="text-xs text-gray-400 font-medium">Model: Gemini 1.5</span>
              </div>
              <AiMatchBadge score={analysis.match_score || 75} size="lg" />
            </div>

            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              {analysis.match_explanation}
            </p>

            {/* Skills Badges */}
            <div className="pt-2 border-t border-gray-200/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-emerald-800 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({analysis.matching_skills?.length || 0})
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysis.matching_skills?.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-white text-emerald-800 font-semibold border border-emerald-200 text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-amber-800 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Skill Gaps ({analysis.missing_skills?.length || 0})
                </span>
                <div className="flex flex-wrap gap-1">
                  {analysis.missing_skills?.map((m: any, idx: number) => {
                    const name = typeof m === 'object' ? m.skill : m;
                    return (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white text-amber-800 font-semibold border border-amber-200 text-[11px]">
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>{application.candidate_email}</span>
            </span>
            {application.candidate_phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{application.candidate_phone}</span>
              </span>
            )}
            {profile?.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{profile.location}</span>
              </span>
            )}
          </div>

          {/* Extracted Summary */}
          {profile?.summary && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Candidate Summary
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                {profile.summary}
              </p>
            </div>
          )}

          {/* Experience Timeline */}
          {profile?.experience && profile.experience.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Experience History
              </h4>
              <div className="space-y-2">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-white border border-gray-200 rounded-xl text-xs">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>{exp.role}</span>
                      <span className="text-gray-400 font-normal">
                        {exp.start_date} - {exp.end_date}
                      </span>
                    </div>
                    <div className="text-indigo-600 font-semibold mt-0.5">{exp.company}</div>
                    {exp.description && (
                      <p className="text-gray-500 mt-1 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {profile?.education && profile.education.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Education
              </h4>
              <div className="space-y-2">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="p-3 bg-white border border-gray-200 rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-900">{edu.degree} in {edu.field_of_study}</div>
                      <div className="text-gray-500">{edu.institution}</div>
                    </div>
                    <span className="text-gray-400 font-medium">{edu.graduation_year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Private Recruiter Notes Field */}
          <div className="space-y-2 p-4 bg-indigo-50/40 border border-indigo-100 rounded-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                Recruiter Private Notes
              </label>
              {notesSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Notes Saved!
                </span>
              )}
            </div>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Private notes (e.g., 'Candidate requested ₹30 LPA, passed Round 1 coding')..."
              className="w-full text-xs p-2.5 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={handleSaveNotes} disabled={isUpdating}>
                <Save className="w-3.5 h-3.5 mr-1" />
                <span>Save Notes</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom HR Actions Bar (Human Decides) */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/90 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">
              Current Status: <span className="uppercase text-indigo-600">{application.status.replace('_', ' ')}</span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              Only HR actions update status
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={application.status === 'shortlisted' ? 'primary' : 'outline'}
              onClick={() => handleUpdateStatus('shortlisted')}
              disabled={isUpdating}
              className="flex-1 text-xs font-bold text-emerald-700 hover:bg-emerald-50 border-emerald-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>Shortlist</span>
            </Button>

            <Button
              size="sm"
              variant={application.status === 'interview' ? 'primary' : 'outline'}
              onClick={() => handleUpdateStatus('interview')}
              disabled={isUpdating}
              className="flex-1 text-xs font-bold text-purple-700 hover:bg-purple-50 border-purple-300"
            >
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Interview</span>
            </Button>

            <Button
              size="sm"
              variant={application.status === 'selected' ? 'primary' : 'outline'}
              onClick={() => handleUpdateStatus('selected')}
              disabled={isUpdating}
              className="flex-1 text-xs font-bold text-amber-700 hover:bg-amber-50 border-amber-300"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1" />
              <span>Select</span>
            </Button>

            <Button
              size="sm"
              variant="danger"
              onClick={() => handleUpdateStatus('rejected')}
              disabled={isUpdating}
              className="flex-1 text-xs font-bold"
            >
              <UserX className="w-3.5 h-3.5 mr-1" />
              <span>Reject</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
