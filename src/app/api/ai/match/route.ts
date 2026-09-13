import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/ai/gemini';
import { JOB_MATCHING_SYSTEM_PROMPT, calculateHeuristicMatch } from '@/lib/ai/prompts';
import { getJobById } from '@/lib/data/mock-data';

export async function POST(req: NextRequest) {
  try {
    const { candidate_profile, job_id, job_data } = await req.json();

    const job = job_data || (job_id ? getJobById(job_id) : null);
    if (!job) {
      return NextResponse.json({ error: 'Job details not found' }, { status: 404 });
    }

    if (!candidate_profile) {
      return NextResponse.json({ error: 'Candidate profile is required' }, { status: 400 });
    }

    const model = getGeminiModel();

    if (model) {
      try {
        const prompt = `
${JOB_MATCHING_SYSTEM_PROMPT}

Target Job:
- Title: ${job.title}
- Company: ${job.company.name}
- Required Skills: ${job.skills_required.join(', ')}
- Description: ${job.description}
- Requirements: ${job.requirements ? job.requirements.join('; ') : ''}

Candidate Profile:
- Name: ${candidate_profile.full_name}
- Summary: ${candidate_profile.summary}
- Skills: ${(candidate_profile.skills || []).join(', ')}
- Experience: ${JSON.stringify(candidate_profile.experience || [])}
- Education: ${JSON.stringify(candidate_profile.education || [])}
`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleaned = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const analysis = JSON.parse(cleaned);

        return NextResponse.json({
          success: true,
          analysis: {
            ...analysis,
            analyzed_at: new Date().toISOString(),
          },
          source: 'gemini-1.5-flash',
        });
      } catch (aiErr: any) {
        console.warn('Gemini match failed, falling back to heuristic matching:', aiErr.message);
      }
    }

    // Heuristic matching calculation
    const analysis = calculateHeuristicMatch(candidate_profile, job);
    return NextResponse.json({
      success: true,
      analysis,
      source: 'heuristic-engine',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Matching failed' }, { status: 500 });
  }
}
