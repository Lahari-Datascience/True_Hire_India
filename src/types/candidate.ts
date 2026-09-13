export interface ExperienceItem {
  id?: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  current?: boolean;
  description: string;
}

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  field_of_study: string;
  graduation_year: string;
  grade_or_gpa?: string;
}

export interface ProjectItem {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface CertificationItem {
  id?: string;
  name: string;
  issuer: string;
  year?: string;
}

export interface CandidateProfile {
  id?: string;
  user_id?: string;
  guest_email?: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  raw_resume_text?: string;
  resume_url?: string;
}

export type ApplicationStatus = 'under_review' | 'shortlisted' | 'interview' | 'rejected' | 'selected';

export interface Application {
  id: string;
  job_id: string;
  job?: import('./job').Job;
  candidate_id?: string;
  candidate_name: string;
  candidate_email: string;
  candidate_phone?: string;
  resume_url: string;
  extracted_profile: CandidateProfile;
  ai_analysis: import('./ai').AiMatchAnalysis;
  status: ApplicationStatus;
  hr_notes?: string;
  candidate_confirmed: boolean;
  applied_at: string;
  updated_at: string;
}
