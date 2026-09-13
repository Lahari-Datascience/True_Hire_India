import { NextRequest, NextResponse } from 'next/server';
import { getApplications, addApplication, getJobById } from '@/lib/data/mock-data';
import { Application } from '@/types/candidate';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const candidateEmail = searchParams.get('candidate_email');
    const jobId = searchParams.get('job_id');

    let apps = getApplications();

    if (candidateEmail) {
      apps = apps.filter((a) => a.candidate_email.toLowerCase() === candidateEmail.toLowerCase());
    }

    if (jobId) {
      apps = apps.filter((a) => a.job_id === jobId);
    }

    return NextResponse.json({ success: true, applications: apps });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.job_id || !body.candidate_name || !body.candidate_email) {
      return NextResponse.json({ error: 'Missing required application fields' }, { status: 400 });
    }

    // Safety rule: Candidate must confirm their extracted profile before submission!
    if (body.candidate_confirmed !== true) {
      return NextResponse.json(
        { error: 'Candidate must review and confirm profile details before submitting.' },
        { status: 400 }
      );
    }

    const job = getJobById(body.job_id);

    // Hard rule: AI output strictly stored in ai_analysis column, NOT deciding 'status'
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      job_id: body.job_id,
      job: job,
      candidate_name: body.candidate_name,
      candidate_email: body.candidate_email,
      candidate_phone: body.candidate_phone,
      resume_url: body.resume_url || '/resumes/uploaded_resume.pdf',
      candidate_confirmed: true,
      extracted_profile: body.extracted_profile || {
        full_name: body.candidate_name,
        email: body.candidate_email,
        phone: body.candidate_phone,
        summary: '',
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: [],
      },
      ai_analysis: body.ai_analysis || {
        match_score: 75,
        matching_skills: [],
        missing_skills: [],
        match_explanation: 'Initial submission pending recruiter review.',
        analyzed_at: new Date().toISOString(),
      },
      // Human status starts as under_review; only HR actions can alter this
      status: 'under_review',
      hr_notes: '',
      applied_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addApplication(newApplication);

    return NextResponse.json({
      success: true,
      application: newApplication,
      message: 'Application successfully submitted and confirmed by candidate.',
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
