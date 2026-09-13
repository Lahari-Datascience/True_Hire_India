'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Briefcase, Plus, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRole } from '@/lib/context/role-context';

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useRole();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    company_name: user?.company || 'Razorpay',
    department: 'Engineering',
    location: 'Bengaluru, Karnataka',
    work_mode: 'hybrid',
    job_type: 'full-time',
    experience_min: '2',
    experience_max: '5',
    salary_min: '1800000',
    salary_max: '2800000',
    skills_required: 'React, TypeScript, Node.js, PostgreSQL',
    description: '',
    responsibilities: 'Build scalable web components\nCollaborate with product managers\nOptimize system latency',
    requirements: '2+ years of production experience\nProficiency in TypeScript & modern frameworks\nStrong communication skills',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert('Job listing published successfully!');
        router.push(`/jobs/${data.job.id}`);
      } else {
        alert(data.error || 'Failed to post job');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <NextLink
        href="/hr/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Recruiter Hub</span>
      </NextLink>

      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Ready Job Posting</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Post a New Opportunity
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Your posting will be automatically indexed by TrueHireIndia's matching engine.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs text-gray-700">
          {/* Title & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="e.g. Razorpay"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Department & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Engineering / Payments"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Bengaluru, Karnataka"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Work Mode & Job Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Work Mode</label>
              <select
                value={formData.work_mode}
                onChange={(e) => setFormData({ ...formData, work_mode: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-site</option>
              </select>
            </div>
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Job Type</label>
              <select
                value={formData.job_type}
                onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="full-time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Experience Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Min Experience (Yrs)</label>
              <input
                type="number"
                value={formData.experience_min}
                onChange={(e) => setFormData({ ...formData, experience_min: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Max Experience (Yrs)</label>
              <input
                type="number"
                value={formData.experience_max}
                onChange={(e) => setFormData({ ...formData, experience_max: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Salary Range (INR Annual) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Min Salary (INR / yr)</label>
              <input
                type="number"
                value={formData.salary_min}
                onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                placeholder="e.g. 1800000"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1">Max Salary (INR / yr)</label>
              <input
                type="number"
                value={formData.salary_max}
                onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                placeholder="e.g. 2800000"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="font-bold uppercase tracking-wider block mb-1">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              required
              value={formData.skills_required}
              onChange={(e) => setFormData({ ...formData, skills_required: e.target.value })}
              placeholder="e.g. React, Next.js, Node.js, PostgreSQL, Docker"
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-bold uppercase tracking-wider block mb-1">Job Description *</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a detailed overview of the role, team mission, and impact..."
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="font-bold uppercase tracking-wider block mb-1">
              Key Responsibilities (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="font-bold uppercase tracking-wider block mb-1">
              Qualifications & Requirements (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push('/hr/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="font-bold px-8"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              <span>Publish Job Listing</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
