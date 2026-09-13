import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/ai/gemini';
import { getJobById } from '@/lib/data/mock-data';

export async function POST(req: NextRequest) {
  try {
    const { resume_text, candidate_profile, job_id } = await req.json();

    const job = getJobById(job_id);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const model = getGeminiModel();

    if (model) {
      try {
        const prompt = `
You are an expert AI Resume Coach and Technical Recruiter for TrueHireIndia.
Analyze this candidate's resume/profile specifically for the role of "${job.title}" at "${job.company.name}".

Job Details:
- Required Skills: ${job.skills_required.join(', ')}
- Description: ${job.description}

Candidate Data:
${resume_text || JSON.stringify(candidate_profile)}

Provide 4 concrete, actionable improvement recommendations tailored to this job:
1. Keyword & Skills alignment
2. Quantifiable achievement suggestion (metrics, impact)
3. Experience bullet point rewording suggestion
4. Project or portfolio enhancement

Format output as JSON:
{
  "suggestions": [
    {
      "category": "Keywords & Skills",
      "action": "Add specific keywords...",
      "example": "Before: 'Worked on backend' -> After: 'Architected Node.js microservices with PostgreSQL...'"
    },
    ...
  ]
}
Return only JSON.
`;
        const result = await model.generateContent(prompt);
        const cleaned = result.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
        const data = JSON.parse(cleaned);

        return NextResponse.json({
          success: true,
          suggestions: data.suggestions,
        });
      } catch (err: any) {
        console.warn('Gemini resume improvement fallback:', err.message);
      }
    }

    // Heuristic fallback
    const suggestions = [
      {
        category: 'Keywords & Core Stack',
        action: `Explicitly highlight hands-on exposure to ${job.skills_required.slice(0, 3).join(', ')} in your summary.`,
        example: `E.g., "Full-stack engineer proficient in ${job.skills_required[0] || 'React'} and high-throughput systems."`,
      },
      {
        category: 'Quantify Engineering Impact',
        action: 'Add numerical metrics to your experience bullet points (latency reduced, TPS handled, users served).',
        example: 'Before: "Improved database performance." -> After: "Optimized PostgreSQL indexes, decreasing p99 response times by 42%."',
      },
      {
        category: 'Domain & Context Alignment',
        action: `Tailor past projects to reflect requirements of ${job.department || 'the engineering department'}.`,
        example: `Highlight architectural decisions relevant to ${job.company.name}'s scale.`,
      },
      {
        category: 'Action Verbs & Brevity',
        action: 'Begin every achievement bullet with strong impact verbs: "Architected", "Engineered", "Streamlined".',
        example: 'Avoid passive phrases like "Was responsible for" or "Assisted with".',
      },
    ];

    return NextResponse.json({
      success: true,
      suggestions,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate suggestions' }, { status: 500 });
  }
}
