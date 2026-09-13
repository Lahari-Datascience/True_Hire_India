export interface SkillGapItem {
  skill: string;
  importance: 'critical' | 'preferred' | 'bonus';
  recommendation?: string;
}

export interface AiMatchAnalysis {
  match_score: number; // 0 - 100
  matching_skills: string[];
  missing_skills: SkillGapItem[] | string[];
  match_explanation: string;
  resume_improvements?: string[];
  analyzed_at: string;
}

export interface AiExtractionResult {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    location: string;
    linkedin_url?: string;
    github_url?: string;
  };
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    start_date: string;
    end_date: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field_of_study: string;
    graduation_year: string;
    grade_or_gpa?: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year?: string;
  }[];
}
