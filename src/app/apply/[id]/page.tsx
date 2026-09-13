'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  FileText,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { getJobById, INITIAL_JOBS } from '@/lib/data/mock-data';
import { ResumeUploader } from '@/components/candidate/resume-uploader';
import { ProfileReviewModal } from '@/components/candidate/profile-review-modal';
import { AiMatchModalContent } from '@/components/candidate/ai-match-modal';
import { CandidateProfile } from '@/types/candidate';
import { AiMatchAnalysis } from '@/types/ai';
import { calculateHeuristicMatch } from '@/lib/ai/prompts';
import { Button } from '@/components/ui/button';

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const job = getJobById(params.id) || INITIAL_JOBS.find((j) => j.id === params.id);

  if (!job) {
    return notFound();
  }

  // Application flow steps: 1: Upload, 2: Review/Edit Profile, 3: AI Match & Confirmation, 4: Success
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [rawResumeText, setRawResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [aiMatchAnalysis, setAiMatchAnalysis] = useState<AiMatchAnalysis | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // Step 1: Handle uploaded & extracted resume
  const handleResumeParsed = (data: { rawText: string; fileName: string; profile: CandidateProfile }) => {
    setRawResumeText(data.rawText);
    setResumeFileName(data.fileName);
    setCandidateProfile(data.profile);
    setCurrentStep(2); // Move to Review & Edit stage
  };

  // Step 2: Handle candidate confirmation after reviewing & editing
  const handleProfileConfirmed = async (confirmedProfile: CandidateProfile) => {
    setCandidateProfile(confirmedProfile);
    setIsSubmitting(true);

    try {
      // Trigger AI Match against this specific job
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_profile: confirmedProfile,
          job_id: job.id,
        }),
      });
      const matchData = await res.json();
      const analysis = matchData.analysis || calculateHeuristicMatch(confirmedProfile, job);
      setAiMatchAnalysis(analysis);
      setCurrentStep(3); // Move to AI Match & Final Submit
    } catch (err) {
      const fallbackAnalysis = calculateHeuristicMatch(confirmedProfile, job);
      setAiMatchAnalysis(fallbackAnalysis);
      setCurrentStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Final application submission
  const handleFinalSubmit = async () => {
    if (!candidateProfile || !aiMatchAnalysis) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: job.id,
          candidate_name: candidateProfile.full_name,
          candidate_email: candidateProfile.email,
          candidate_phone: candidateProfile.phone,
          resume_url: `/resumes/${resumeFileName || 'resume.pdf'}`,
          candidate_confirmed: true,
          extracted_profile: candidateProfile,
          ai_analysis: aiMatchAnalysis,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionId(data.application.id);
        setCurrentStep(4);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas-confetti doesn't render in test
        }
      } else {
        alert(data.error || 'Submission failed');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb & Job Summary */}
      <div className="space-y-4">
        <NextLink
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {job.title}</span>
        </NextLink>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Applying For
            </span>
            <h1 className="text-xl font-black text-gray-900 mt-0.5">
              {job.title}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {job.company.name} • {job.location} • {job.work_mode}
            </p>
          </div>

          {/* Step Progress Indicators */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              1
            </span>
            <div className="w-6 h-0.5 bg-gray-200" />
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              2
            </span>
            <div className="w-6 h-0.5 bg-gray-200" />
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              3
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: RESUME UPLOAD */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1: Intelligent Resume Extraction</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Upload Your Resume
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Upload your PDF or DOCX resume. Our PyMuPDF extractor and Gemini AI will construct your candidate profile in seconds. You will review everything before submission.
            </p>
          </div>

          <ResumeUploader onParsed={handleResumeParsed} />

          {/* Demo fast-track option */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>No mandatory account registration required to apply.</span>
            </span>
            <button
              onClick={() => {
                handleResumeParsed({
                  rawText: 'Aarav Sharma - Senior Full-Stack Engineer...',
                  fileName: 'demo_resume.pdf',
                  profile: {
                    full_name: 'Aarav Sharma',
                    email: 'aarav.sharma@example.com',
                    phone: '+91 98765 43210',
                    location: 'Bengaluru, Karnataka',
                    summary: 'Senior Full-Stack Engineer with 4+ years building high-scale fintech systems.',
                    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
                    experience: [
                      {
                        company: 'TechVanguard Solutions',
                        role: 'Full-Stack Developer',
                        start_date: '2022-06',
                        end_date: 'Present',
                        description: 'Architected high-throughput checkout modules and integrated payment webhooks.',
                      },
                    ],
                    education: [
                      {
                        institution: 'RV College of Engineering',
                        degree: 'B.Tech',
                        field_of_study: 'Computer Science',
                        graduation_year: '2020',
                        grade_or_gpa: '8.8 CGPA',
                      },
                    ],
                    projects: [],
                    certifications: [],
                  },
                });
              }}
              className="text-indigo-600 font-bold hover:underline"
            >
              (Demo: Auto-fill sample resume)
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CANDIDATE REVIEW & EDIT */}
      {currentStep === 2 && candidateProfile && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Step 2: Candidate Verification</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Review & Confirm Your AI-Extracted Profile
              </h2>
            </div>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-gray-400 hover:text-indigo-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Change Resume</span>
            </button>
          </div>

          <ProfileReviewModal
            initialProfile={candidateProfile}
            onConfirm={handleProfileConfirmed}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {/* STEP 3: AI MATCH PREVIEW & FINAL SUBMIT */}
      {currentStep === 3 && aiMatchAnalysis && candidateProfile && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step 3: AI Job Match Breakdown</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Your AI Match Assessment for {job.company.name}
              </h2>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs font-semibold text-gray-400 hover:text-indigo-600"
            >
              Edit Profile
            </button>
          </div>

          <AiMatchModalContent
            analysis={aiMatchAnalysis}
            job={job}
            candidateName={candidateProfile.full_name}
            showApplyButton={false}
          />

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between gap-4">
            <div className="text-xs text-indigo-950">
              <span className="font-bold block">Ready to submit your application?</span>
              <span className="text-indigo-800">
                The hiring team at {job.company.name} will receive your application with this explainable AI match report.
              </span>
            </div>

            <Button
              size="lg"
              variant="primary"
              onClick={handleFinalSubmit}
              isLoading={isSubmitting}
              className="px-8 font-bold text-sm shrink-0"
            >
              <span>Submit Application</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS CONFIRMATION */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-14 text-center shadow-lg space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Application Submitted!
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Your verified candidate profile and AI Match evaluation have been securely submitted to the hiring team at{' '}
              <strong className="text-gray-900">{job.company.name}</strong>.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Tracking ID:</span>
              <span className="font-mono font-bold text-gray-800">{submissionId || 'app-sample-id'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Initial Status:</span>
              <span className="font-bold text-blue-600">Under Review</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">AI Match Score:</span>
              <span className="font-bold text-emerald-600">{aiMatchAnalysis?.match_score || 85}%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <NextLink href="/candidate/dashboard">
              <Button size="md" variant="primary" className="w-full sm:w-auto font-bold">
                Track on Candidate Dashboard
              </Button>
            </NextLink>
            <NextLink href="/jobs">
              <Button size="md" variant="outline" className="w-full sm:w-auto font-bold">
                Browse More Tech Jobs
              </Button>
            </NextLink>
          </div>
        </div>
      )}
    </div>
  );
}
