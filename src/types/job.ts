export type WorkMode = 'remote' | 'hybrid' | 'on-site';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobStatus = 'draft' | 'active' | 'closed' | 'flagged';

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  website: string;
  location: string;
  description: string;
  verified: boolean;
}

export interface Job {
  id: string;
  company_id: string;
  company: Company;
  title: string;
  department: string;
  location: string;
  work_mode: WorkMode;
  job_type: JobType;
  experience_min: number;
  experience_max?: number;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  skills_required: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: JobStatus;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobFilters {
  query?: string;
  location?: string;
  work_mode?: string;
  job_type?: string;
  experience?: string;
  skill?: string;
}
