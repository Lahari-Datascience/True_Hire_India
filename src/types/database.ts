import { Job, Company } from './job';
import { Application, CandidateProfile } from './candidate';

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: Company;
        Insert: Omit<Company, 'id'>;
        Update: Partial<Company>;
      };
      jobs: {
        Row: Job;
        Insert: Omit<Job, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Job>;
      };
      candidate_profiles: {
        Row: CandidateProfile;
        Insert: Omit<CandidateProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<CandidateProfile>;
      };
      applications: {
        Row: Application;
        Insert: Omit<Application, 'id' | 'applied_at' | 'updated_at'>;
        Update: Partial<Application>;
      };
    };
  };
}
