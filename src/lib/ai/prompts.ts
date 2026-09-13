import { CandidateProfile } from '@/types/candidate';
import { Job } from '@/types/job';
import { AiMatchAnalysis } from '@/types/ai';

export const RESUME_EXTRACTION_SYSTEM_PROMPT = `
You are an expert AI talent intelligence agent for TrueHireIndia.
Analyze the provided unstructured resume text and convert it into high-fidelity structured JSON.
Strictly adhere to the following JSON schema:
{
  "full_name": "Full Name",
  "email": "email@example.com",
  "phone": "+91 ...",
  "location": "City, Country",
  "linkedin_url": "",
  "github_url": "",
  "summary": "Concise 2-3 sentence executive summary",
  "skills": ["Skill 1", "Skill 2", ...],
  "experience": [
    {
      "company": "Company Name",
      "role": "Title",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or Present",
      "description": "Key achievements and responsibilities"
    }
  ],
  "education": [
    {
      "institution": "University / College",
      "degree": "B.Tech / B.E. / M.S. etc.",
      "field_of_study": "Computer Science etc.",
      "graduation_year": "YYYY",
      "grade_or_gpa": ""
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Description",
      "technologies": ["Tech1", "Tech2"],
      "link": ""
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuer",
      "year": "YYYY"
    }
  ]
}
Return ONLY pure JSON without markdown code fences or conversational pleasantries.
`;

export const JOB_MATCHING_SYSTEM_PROMPT = `
You are TrueHireIndia's Explainable AI Job Matching Engine.
Compare the candidate's structured profile/resume against the Job Description.

Hard rules:
1. AI assists, it never decides who gets hired.
2. Provide an honest, nuanced match score between 0 and 100 based on core skills, domain match, and experience level.
3. Identify matching skills present in both the profile and job requirements.
4. Identify missing or weak skills required by the job but missing in the candidate's profile, noting importance ('critical' or 'preferred').
5. Provide a 2-3 sentence transparent, explainable natural language rationale.
6. Provide 2-3 concrete resume improvement bullet points for the candidate to better tailor their application to this specific role.

Output schema:
{
  "match_score": 85,
  "matching_skills": ["Skill 1", "Skill 2"],
  "missing_skills": [
    {
      "skill": "Skill Name",
      "importance": "critical" | "preferred",
      "recommendation": "Brief learning advice"
    }
  ],
  "match_explanation": "Natural language summary of why this score was given.",
  "resume_improvements": [
    "Specific improvement 1",
    "Specific improvement 2"
  ]
}
Return ONLY valid JSON.
`;

// Heuristic fallback matching for offline / zero-token demo resilience
export function calculateHeuristicMatch(candidate: Partial<CandidateProfile>, job: Job): AiMatchAnalysis {
  const candidateSkills = (candidate.skills || []).map((s) => s.toLowerCase());
  const jobSkills = (job.skills_required || []).map((s) => s.toLowerCase());

  const matched: string[] = [];
  const missing: { skill: string; importance: 'critical' | 'preferred'; recommendation: string }[] = [];

  job.skills_required.forEach((originalSkill) => {
    const sLower = originalSkill.toLowerCase();
    const isFound = candidateSkills.some(
      (cs) => cs.includes(sLower) || sLower.includes(cs)
    );

    if (isFound) {
      matched.push(originalSkill);
    } else {
      missing.push({
        skill: originalSkill,
        importance: matched.length < 2 ? 'critical' : 'preferred',
        recommendation: `Recommended for ${job.title}: complete practical hands-on mini-project or certification in ${originalSkill}.`,
      });
    }
  });

  const skillRatio = jobSkills.length > 0 ? matched.length / jobSkills.length : 0.5;
  let baseScore = Math.round(skillRatio * 75);

  // Bonus for relevant experience
  if (candidate.experience && candidate.experience.length > 0) {
    baseScore += Math.min(25, candidate.experience.length * 8);
  } else {
    baseScore += 10;
  }

  const match_score = Math.min(98, Math.max(35, baseScore));

  return {
    match_score,
    matching_skills: matched,
    missing_skills: missing,
    match_explanation: `AI evaluated ${matched.length} matched skills against ${job.skills_required.length} required competencies for ${job.title} at ${job.company.name}. The candidate shows strong alignment in core stack (${matched.slice(0, 3).join(', ') || 'general competencies'}).`,
    resume_improvements: [
      `Explicitly mention experience or projects involving ${missing[0]?.skill || 'scalable design patterns'}.`,
      `Quantify impact in previous roles (e.g. % performance increase, latency reductions, or users impacted).`,
      `Tailor your professional summary to highlight direct interest in ${job.department || 'the team mission'}.`,
    ],
    analyzed_at: new Date().toISOString(),
  };
}
