'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Plus, Trash2, Edit2, ShieldAlert } from 'lucide-react';
import { CandidateProfile } from '@/types/candidate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProfileReviewModalProps {
  initialProfile: CandidateProfile;
  onConfirm: (confirmedProfile: CandidateProfile) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function ProfileReviewModal({
  initialProfile,
  onConfirm,
  onCancel,
  isSubmitting = false,
}: ProfileReviewModalProps) {
  const [profile, setProfile] = useState<CandidateProfile>(initialProfile);
  const [newSkill, setNewSkill] = useState('');
  const [userConfirmed, setUserConfirmed] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleConfirm = () => {
    if (!userConfirmed) return;
    onConfirm(profile);
  };

  return (
    <div className="space-y-6 text-gray-800">
      {/* Notice Banner */}
      <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-indigo-950">AI Profile Generation Complete</p>
          <p className="text-indigo-800 mt-0.5">
            GenAI extracted your profile details below from your resume. Please review, edit any field if necessary, and confirm accuracy before submitting.
          </p>
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            Current Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
          Professional Summary
        </label>
        <textarea
          rows={3}
          value={profile.summary}
          onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
          className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Brief overview of your career background..."
        />
      </div>

      {/* Skills Manager */}
      <div>
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
          Extracted Skills ({profile.skills.length})
        </label>
        <div className="flex flex-wrap gap-1.5 p-3 bg-gray-50 border border-gray-200 rounded-xl mb-2 min-h-[48px]">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-gray-300 text-xs font-semibold text-gray-700 shadow-2xs"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-gray-400 hover:text-rose-500 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Add skill input */}
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add another skill (e.g. Next.js, Redis, Docker)..."
            className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <Button type="submit" size="sm" variant="outline" className="text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>
        </form>
      </div>

      {/* Experience Summary Preview */}
      {profile.experience && profile.experience.length > 0 && (
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
            Work Experience ({profile.experience.length})
          </label>
          <div className="space-y-2">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-xl bg-white text-xs">
                <div className="flex items-center justify-between font-bold text-gray-900">
                  <span>{exp.role}</span>
                  <span className="text-gray-400 font-normal">
                    {exp.start_date} - {exp.end_date}
                  </span>
                </div>
                <div className="text-indigo-600 font-semibold mt-0.5">{exp.company}</div>
                {exp.description && (
                  <p className="text-gray-500 mt-1 line-clamp-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Summary Preview */}
      {profile.education && profile.education.length > 0 && (
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
            Education
          </label>
          <div className="space-y-2">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-xl bg-white text-xs">
                <div className="flex items-center justify-between font-bold text-gray-900">
                  <span>{edu.degree} in {edu.field_of_study}</span>
                  <span className="text-gray-400 font-normal">{edu.graduation_year}</span>
                </div>
                <div className="text-gray-600 mt-0.5">{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Human Confirmation (Product/Safety Rule) */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={userConfirmed}
            onChange={(e) => setUserConfirmed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
          />
          <div className="text-xs text-emerald-900">
            <span className="font-bold block">
              I have reviewed the AI-extracted details and confirm their accuracy.
            </span>
            <span className="text-emerald-700 mt-0.5 block">
              TrueHireIndia never auto-submits. You retain full ownership and control over your applicant profile.
            </span>
          </div>
        </label>
      </div>

      {/* Modal Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button
          type="button"
          variant="primary"
          onClick={handleConfirm}
          disabled={!userConfirmed || isSubmitting}
          isLoading={isSubmitting}
          className="px-6 py-2.5 font-bold"
        >
          <CheckCircle2 className="w-4 h-4 mr-1.5" />
          <span>Confirm & Proceed</span>
        </Button>
      </div>
    </div>
  );
}
