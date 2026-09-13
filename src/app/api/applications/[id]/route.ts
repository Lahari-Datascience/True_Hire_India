import { NextRequest, NextResponse } from 'next/server';
import { getApplicationById, updateApplicationStatus } from '@/lib/data/mock-data';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const app = getApplicationById(params.id);
    if (!app) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, application: app });
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

    const allowedStatuses = ['under_review', 'shortlisted', 'interview', 'rejected', 'selected'];
    if (body.status && !allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = updateApplicationStatus(params.id, body.status, body.hr_notes);

    if (!updated) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      application: updated,
      message: `Application status updated to ${updated.status} by HR recruiter.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
