-- TrueHireIndia Schema - Production & Supabase Compatible
create extension if not exists "uuid-ossp";

-- 1. ENUMS
do $$ begin
  create type user_role as enum ('candidate', 'hr', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type work_mode as enum ('remote', 'hybrid', 'on-site');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type job_type as enum ('full-time', 'part-time', 'contract', 'internship');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type job_status as enum ('draft', 'active', 'closed', 'flagged');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type application_status as enum ('under_review', 'shortlisted', 'interview', 'rejected', 'selected');
exception
  when duplicate_object then null;
end $$;

-- 2. USER PROFILES
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  full_name text not null,
  role user_role not null default 'candidate',
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. COMPANIES
create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  logo_url text,
  website text,
  location text not null,
  description text,
  verified boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- 4. COMPANY MEMBERS (Links HR recruiters to company)
create table if not exists public.company_members (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text default 'Talent Acquisition Lead',
  created_at timestamptz not null default now(),
  unique(company_id, user_id)
);

-- 5. JOBS
create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  department text,
  location text not null,
  work_mode work_mode not null default 'on-site',
  job_type job_type not null default 'full-time',
  experience_min integer not null default 0,
  experience_max integer,
  salary_min numeric,
  salary_max numeric,
  salary_currency text default 'INR',
  skills_required text[] not null default '{}',
  description text not null,
  responsibilities text[] default '{}',
  requirements text[] default '{}',
  status job_status not null default 'active',
  is_flagged boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. CANDIDATE PROFILES
create table if not exists public.candidate_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  guest_email text,
  full_name text not null,
  phone text,
  summary text,
  skills text[] default '{}',
  experience jsonb default '[]'::jsonb,
  education jsonb default '[]'::jsonb,
  projects jsonb default '[]'::jsonb,
  certifications jsonb default '[]'::jsonb,
  raw_resume_text text,
  resume_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7. APPLICATIONS
-- Hard architectural rule: AI analysis is stored in ai_analysis JSONB.
-- Only HR actions update the 'status' column!
create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid references public.candidate_profiles(id) on delete set null,
  candidate_name text not null,
  candidate_email text not null,
  candidate_phone text,
  resume_url text not null,
  extracted_profile jsonb not null default '{}'::jsonb,
  
  -- AI Output Column
  ai_analysis jsonb default '{
    "match_score": null,
    "matching_skills": [],
    "missing_skills": [],
    "match_explanation": null,
    "resume_improvements": [],
    "analyzed_at": null
  }'::jsonb,
  
  -- Human HR Status Column
  status application_status not null default 'under_review',
  hr_notes text,
  candidate_confirmed boolean not null default true,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. ADMIN AUDIT & SAFETY LOGS
create table if not exists public.admin_audit_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Indexes for lightning fast queries
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_jobs_location on public.jobs(location);
create index if not exists idx_jobs_work_mode on public.jobs(work_mode);
create index if not exists idx_jobs_company_id on public.jobs(company_id);
create index if not exists idx_applications_job_id on public.applications(job_id);
create index if not exists idx_applications_candidate_email on public.applications(candidate_email);
create index if not exists idx_applications_status on public.applications(status);

-- RLS
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.jobs enable row level security;
alter table public.candidate_profiles enable row level security;
alter table public.applications enable row level security;

-- Public read for active jobs
create policy "Anyone can view active jobs" on public.jobs
  for select using (status = 'active');

-- Applications policies
create policy "Anyone can submit an application" on public.applications
  for insert with check (true);

create policy "Candidates view their own applications by email or id" on public.applications
  for select using (
    candidate_email = current_setting('request.jwt.claim.email', true)
    or candidate_id in (select id from public.candidate_profiles where user_id = auth.uid())
  );
