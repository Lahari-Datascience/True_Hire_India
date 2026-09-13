import { NextRequest, NextResponse } from 'next/server';
import { getJobById, updateJobStatus } from '@/lib/data/mock-data';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = getJobById(params.id);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = updateJobStatus(params.id, body.status, body.is_flagged);
    if (!updated) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, job: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
