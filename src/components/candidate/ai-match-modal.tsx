'use client';

import React from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, Lightbulb, ShieldAlert, ArrowRight } from 'lucide-react';
import { AiMatchAnalysis } from '@/types/ai';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { AiMatchBadge, AiLabelBadge } from '@/components/shared/ai-badge';
import { getMatchScoreColor } from '@/lib/utils';
import NextLink from 'next/link';

interface AiMatchModalProps {
  analysis: AiMatchAnalysis;
  job: Job;
  candidateName?: string;
  onApplyClick?: () => void;
  showApplyButton?: boolean;
}

export function AiMatchModalContent({
  analysis,
  job,
  candidateName,
  onApplyClick,
  showApplyButton = true,
}: AiMatchModalProps) {
  const colors = getMatchScoreColor(analysis.match_score);

  return (
    <div className="space-y-6 text-gray-800">
      {/* Header Match Score Banner */}
      <div className={`p-6 rounded-2xl border ${colors.badgeBorder} ${colors.badgeBg} flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs`}>
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <AiLabelBadge text="AI Match Assessment" variant="purple" />
            <span className="text-xs text-gray-400 font-medium">Explainable AI</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 mt-1">
            {job.title}
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            {job.company.name} • {job.location} • {job.work_mode}
          </p>
        </div>

        {/* Big Score Gauge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-white">
            <div className="text-center">
              <div className={`text-3xl font-black ${colors.badgeText}`}>
                {analysis.match_score}%
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Fit Score
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Natural Language Explanation */}
      <div className="p-4 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Explainable Match Rationale</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {analysis.match_explanation}
        </p>
      </div>

      {/* Skills Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matching Skills */}
        <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Matching Skills ({analysis.matching_skills.length})
            </span>
            <span className="text-[11px] font-semibold text-emerald-700">Verified Fit</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {analysis.matching_skills.length > 0 ? (
              analysis.matching_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold shadow-2xs"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No direct keyword overlap identified.</p>
            )}
          </div>
        </div>

        {/* Skill Gaps */}
        <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Skill Gaps & Growth Areas ({analysis.missing_skills.length})
            </span>
            <span className="text-[11px] font-semibold text-amber-700">Opportunities</span>
          </div>

          <div className="space-y-2">
            {analysis.missing_skills.length > 0 ? (
              analysis.missing_skills.map((item, idx) => {
                const isObj = typeof item === 'object';
                const skillName = isObj ? (item as any).skill : item;
                const rec = isObj ? (item as any).recommendation : null;
                const importance = isObj ? (item as any).importance : 'preferred';

                return (
                  <div key={idx} className="p-2 bg-white rounded-lg border border-amber-200/80 text-xs">
                    <div className="flex items-center justify-between font-bold text-gray-800">
                      <span>{skillName}</span>
                      <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                        importance === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {importance}
                      </span>
                    </div>
                    {rec && <p className="text-gray-500 text-[11px] mt-1">{rec}</p>}
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-emerald-700 font-medium">
                No significant skill gaps found! Candidate meets all primary criteria.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Resume Improvement Suggestions */}
      {analysis.resume_improvements && analysis.resume_improvements.length > 0 && (
        <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-950">
            <Lightbulb className="w-4 h-4 text-indigo-600" />
            <span>AI Resume Improvement Recommendations</span>
          </div>
          <ul className="space-y-1.5 text-xs text-indigo-900">
            {analysis.resume_improvements.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety Guardrail Disclaimer */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
        <ShieldAlert className="w-4 h-4 text-indigo-500 shrink-0" />
        <span>
          <strong>Ethical AI Guardrail:</strong> This match assessment is assistive intelligence for candidates and recruiters. TrueHireIndia never automates hiring decisions or rejections.
        </span>
      </div>

      {/* Action footer */}
      {showApplyButton && (
        <div className="pt-2 flex items-center justify-end gap-3">
          {onApplyClick ? (
            <Button size="lg" variant="primary" onClick={onApplyClick} className="font-bold px-7">
              <span>Apply for this Job</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <NextLink href={`/apply/${job.id}`}>
              <Button size="lg" variant="primary" className="font-bold px-7">
                <span>Apply for this Job</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </NextLink>
          )}
        </div>
      )}
    </div>
  );
}
