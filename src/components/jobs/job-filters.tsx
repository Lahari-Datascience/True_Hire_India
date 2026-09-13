'use client';

import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface FilterState {
  location: string;
  work_mode: string;
  job_type: string;
  experience: string;
  skill: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults?: number;
}

export function JobFilters({ filters, onChange, onReset, totalResults }: JobFiltersProps) {
  const LOCATIONS = ['all', 'Bengaluru', 'Gurugram', 'Hyderabad', 'Pune', 'Chennai', 'Remote'];
  const WORK_MODES = [
    { value: 'all', label: 'All Modes' },
    { value: 'remote', label: 'Remote 🟢' },
    { value: 'hybrid', label: 'Hybrid 🔵' },
    { value: 'on-site', label: 'On-site' },
  ];
  const JOB_TYPES = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];
  const POPULAR_SKILLS = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'Figma', 'AWS', 'PostgreSQL', 'Docker'
  ];

  const hasActiveFilters =
    filters.location !== 'all' ||
    filters.work_mode !== 'all' ||
    filters.job_type !== 'all' ||
    Boolean(filters.skill);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Filter Jobs</h3>
            {totalResults !== undefined && (
              <p className="text-[11px] text-slate-500">{totalResults} roles match</p>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-bold transition-colors bg-blue-50 px-2.5 py-1 rounded-lg"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Work Mode */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span>Work Mode</span>
          {filters.work_mode !== 'all' && (
            <span className="text-[10px] text-blue-600 font-bold lowercase bg-blue-50 px-1.5 py-0.2 rounded">active</span>
          )}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {WORK_MODES.map((mode) => {
            const isSelected = filters.work_mode === mode.value;
            return (
              <button
                key={mode.value}
                onClick={() => onChange({ ...filters, work_mode: mode.value })}
                className={`px-3 py-2 rounded-xl text-xs font-bold text-center border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-slate-50/80 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span>Employment Type</span>
          {filters.job_type !== 'all' && (
            <span className="text-[10px] text-blue-600 font-bold lowercase bg-blue-50 px-1.5 py-0.2 rounded">active</span>
          )}
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {JOB_TYPES.map((type) => {
            const isSelected = filters.job_type === type.value;
            return (
              <button
                key={type.value}
                onClick={() => onChange({ ...filters, job_type: type.value })}
                className={`px-3 py-2 rounded-xl text-xs font-bold text-center border transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-slate-50/80 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
          className="w-full text-xs font-semibold text-slate-800 bg-slate-50/80 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc === 'all' ? 'All Locations (Pan-India)' : loc}
            </option>
          ))}
        </select>
      </div>

      {/* Popular Skills Quick Tags */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span>Key Competencies</span>
          <span className="text-[10px] text-slate-400 font-normal">Click to toggle</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILLS.map((skill) => {
            const isSelected = filters.skill === skill;
            return (
              <button
                key={skill}
                onClick={() =>
                  onChange({
                    ...filters,
                    skill: isSelected ? '' : skill,
                  })
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs shadow-emerald-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                {skill}
                {isSelected && <Check className="w-3 h-3 ml-1 inline-block" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
