'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  UserCheck,
  PlusCircle,
  Filter,
  Search,
  Sparkles,
  Building2,
} from 'lucide-react';
import { INITIAL_APPLICATIONS, INITIAL_JOBS } from '@/lib/data/mock-data';
import { Application, ApplicationStatus } from '@/types/candidate';
import { ApplicantTable } from '@/components/hr/applicant-table';
import { CandidateDetailDrawer } from '@/components/hr/candidate-detail-drawer';
import { Button } from '@/components/ui/button';
import { AiLabelBadge } from '@/components/shared/ai-badge';

export default function HrDashboardPage() {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterJobId, setFilterJobId] = useState<string>('all');
  const [statusTab, setStatusTab] = useState<string>('all');
  const [searchCandidate, setSearchCandidate] = useState('');

  // Fetch latest applications from backend API
  const refreshApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (data.success && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    }
  };

  useEffect(() => {
    refreshApplications();
  }, []);

  // Compute metrics
  const totalApps = applications.length;
  const underReviewCount = applications.filter((a) => a.status === 'under_review').length;
  const shortlistedCount = applications.filter((a) => a.status === 'shortlisted').length;
  const interviewCount = applications.filter((a) => a.status === 'interview').length;
  const hiredCount = applications.filter((a) => a.status === 'selected').length;

  // Filter applications
  const filteredApps = applications.filter((app) => {
    if (filterJobId !== 'all' && app.job_id !== filterJobId) return false;
    if (statusTab !== 'all' && app.status !== statusTab) return false;
    if (searchCandidate.trim()) {
      const q = searchCandidate.toLowerCase();
      const matchName = app.candidate_name.toLowerCase().includes(q);
      const matchEmail = app.candidate_email.toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    return true;
  });

  const handleSelectCandidate = (app: Application) => {
    setSelectedApplication(app);
    setIsDrawerOpen(true);
  };

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus, notes?: string) => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          hr_notes: notes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Update local state
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? data.application : a))
        );
        setSelectedApplication(data.application);
      } else {
        alert(data.error || 'Failed to update application');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating application status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Razorpay Recruiter Portal
            </span>
            <AiLabelBadge text="AI-Assisted Screening" variant="purple" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Recruiter Applicant Hub
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Review incoming candidate applications ranked by explainable GenAI match scores.
          </p>
        </div>

        <NextLink href="/hr/jobs/new">
          <Button variant="primary" size="md" className="font-bold gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Button>
        </NextLink>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-gray-900">{totalApps}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Applications received</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Under Review</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-600">{underReviewCount}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Pending HR review</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Shortlisted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{shortlistedCount}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">High-fit candidates</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Interview</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-600">{interviewCount}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Rounds scheduled</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Hired</span>
            <UserCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600">{hiredCount}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Offers accepted</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Job Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Filter by Role:
            </span>
            <select
              value={filterJobId}
              onChange={(e) => setFilterJobId(e.target.value)}
              className="text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="all">All Jobs ({INITIAL_JOBS.length})</option>
              {INITIAL_JOBS.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} ({j.company.name})
                </option>
              ))}
            </select>
          </div>

          {/* Candidate Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchCandidate}
              onChange={(e) => setSearchCandidate(e.target.value)}
              placeholder="Search candidate name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
          {[
            { id: 'all', label: 'All Applicants' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'shortlisted', label: 'Shortlisted' },
            { id: 'interview', label: 'Interview' },
            { id: 'selected', label: 'Selected' },
            { id: 'rejected', label: 'Rejected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applicant Table */}
      <ApplicantTable
        applications={filteredApps}
        onSelectApplication={handleSelectCandidate}
      />

      {/* Candidate Detail Drawer */}
      <CandidateDetailDrawer
        application={selectedApplication}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
