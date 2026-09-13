import { NextRequest, NextResponse } from 'next/server';
import { getJobs, addJob } from '@/lib/data/mock-data';
import { Job } from '@/types/job';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || undefined;
    const location = searchParams.get('location') || undefined;
    const work_mode = searchParams.get('work_mode') || undefined;
    const job_type = searchParams.get('job_type') || undefined;

    const jobs = getJobs({ query, location, work_mode, job_type });
    return NextResponse.json({ success: true, jobs, count: jobs.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.company_name || !body.location || !body.description) {
      return NextResponse.json({ error: 'Missing required job fields' }, { status: 400 });
    }

    const newJob: Job = {
      id: `job-${Date.now()}`,
      company_id: `comp-${Date.now()}`,
      company: {
        id: `comp-${Date.now()}`,
        name: body.company_name,
        slug: body.company_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        logo_url: body.logo_url || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
        website: body.website || 'https://company.example.com',
        location: body.location,
        description: body.company_description || 'Innovative technology company.',
        verified: true,
      },
      title: body.title,
      department: body.department || 'Engineering',
      location: body.location,
      work_mode: body.work_mode || 'hybrid',
      job_type: body.job_type || 'full-time',
      experience_min: Number(body.experience_min) || 0,
      experience_max: body.experience_max ? Number(body.experience_max) : undefined,
      salary_min: body.salary_min ? Number(body.salary_min) : undefined,
      salary_max: body.salary_max ? Number(body.salary_max) : undefined,
      salary_currency: 'INR',
      skills_required: Array.isArray(body.skills_required)
        ? body.skills_required
        : (body.skills_required || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      description: body.description,
      responsibilities: Array.isArray(body.responsibilities)
        ? body.responsibilities
        : (body.responsibilities || '').split('\n').filter(Boolean),
      requirements: Array.isArray(body.requirements)
        ? body.requirements
        : (body.requirements || '').split('\n').filter(Boolean),
      status: 'active',
      is_flagged: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addJob(newJob);
    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create job' }, { status: 500 });
  }
}
