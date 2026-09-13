import { Job, Company } from '@/types/job';
import { Application } from '@/types/candidate';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-razorpay',
    name: 'Razorpay',
    slug: 'razorpay',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80',
    website: 'https://razorpay.com',
    location: 'Bengaluru, Karnataka',
    description: 'India’s premier fintech powerhouse processing digital payments for over 10M businesses.',
    verified: true,
  },
  {
    id: 'comp-swiggy',
    name: 'Swiggy',
    slug: 'swiggy',
    logo_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=128&auto=format&fit=crop&q=80',
    website: 'https://swiggy.com',
    location: 'Bengaluru, Karnataka',
    description: 'Leading consumer-tech delivery ecosystem delivering food, groceries, and essentials in 10 minutes.',
    verified: true,
  },
  {
    id: 'comp-flipkart',
    name: 'Flipkart',
    slug: 'flipkart',
    logo_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80',
    website: 'https://flipkart.com',
    location: 'Bengaluru, Karnataka',
    description: 'India’s homegrown commerce marketplace pioneering supply chain, tech innovation, and value.',
    verified: true,
  },
  {
    id: 'comp-zomato',
    name: 'Zomato',
    slug: 'zomato',
    logo_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&auto=format&fit=crop&q=80',
    website: 'https://zomato.com',
    location: 'Gurugram, Haryana',
    description: 'Connecting foodies with top culinary destinations and powering hyper-fast delivery network.',
    verified: true,
  },
  {
    id: 'comp-freshworks',
    name: 'Freshworks',
    slug: 'freshworks',
    logo_url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80',
    website: 'https://freshworks.com',
    location: 'Chennai, Tamil Nadu',
    description: 'World-class enterprise SaaS suite empowering modern IT, sales, and customer engagement.',
    verified: true,
  },
  {
    id: 'comp-cred',
    name: 'CRED',
    slug: 'cred',
    logo_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&auto=format&fit=crop&q=80',
    website: 'https://cred.club',
    location: 'Bengaluru, Karnataka',
    description: 'High-trust rewards club for India’s top creditworthy cohort building high-elegance fintech tools.',
    verified: true,
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    company_id: 'comp-razorpay',
    company: INITIAL_COMPANIES[0],
    title: 'Senior Full-Stack Engineer (Payments Platform)',
    department: 'Core Fintech & Checkout',
    location: 'Bengaluru, Karnataka',
    work_mode: 'hybrid',
    job_type: 'full-time',
    experience_min: 3,
    experience_max: 6,
    salary_min: 2400000,
    salary_max: 3600000,
    salary_currency: 'INR',
    skills_required: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Redis', 'Docker'],
    description: 'Join our Payments Gateway engineering group to scale critical transaction processing flows. You will architect robust, fault-tolerant checkout web modules handling 50M+ transactions monthly with sub-200ms latency.',
    responsibilities: [
      'Design and ship mission-critical checkout SDKs in React and TypeScript',
      'Architect backend services in Node.js and Go with PostgreSQL and Redis caching',
      'Optimize network round-trips for mobile browser users across Tier 2/3 Indian cities',
      'Collaborate with security engineers on PCI-DSS Level 1 compliance',
    ],
    requirements: [
      '3+ years of production experience with modern React, TypeScript, and Node.js',
      'Deep grasp of SQL query optimization and database concurrency',
      'Proven background in distributed systems and asynchronous event patterns',
      'Strong problem-solving and clean architectural discipline',
    ],
    status: 'active',
    is_flagged: false,
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },
  {
    id: 'job-2',
    company_id: 'comp-swiggy',
    company: INITIAL_COMPANIES[1],
    title: 'Backend Systems Engineer - High Scale Logistics',
    department: 'Delivery Intelligence',
    location: 'Bengaluru, Karnataka',
    work_mode: 'on-site',
    job_type: 'full-time',
    experience_min: 2,
    experience_max: 5,
    salary_min: 2000000,
    salary_max: 3200000,
    salary_currency: 'INR',
    skills_required: ['Go', 'Java', 'Apache Kafka', 'PostgreSQL', 'Microservices', 'Kubernetes', 'Redis'],
    description: 'Power the real-time routing algorithms for 300,000+ delivery executives across 600+ Indian towns. You will write high-concurrency Go services capable of orchestrating sub-second dispatch decisions.',
    responsibilities: [
      'Develop low-latency microservices using Go and Kafka streams',
      'Tune PostgreSQL partitioning and Redis spatial caches for geo-location lookup',
      'Build resilience against traffic spikes during monsoon downpours and IPL matches',
    ],
    requirements: [
      '2+ years backend engineering experience with Go or Java',
      'Hands-on experience with Kafka or RabbitMQ event streaming',
      'Comfortable with Docker, Kubernetes, and telemetry monitoring (Prometheus, Grafana)',
    ],
    status: 'active',
    is_flagged: false,
    created_at: '2026-03-02T11:30:00Z',
    updated_at: '2026-03-02T11:30:00Z',
  },
  {
    id: 'job-3',
    company_id: 'comp-flipkart',
    company: INITIAL_COMPANIES[2],
    title: 'GenAI & Applied NLP Engineer',
    department: 'Search & Catalog Intelligence',
    location: 'Bengaluru, Karnataka',
    work_mode: 'remote',
    job_type: 'full-time',
    experience_min: 2,
    experience_max: 5,
    salary_min: 2600000,
    salary_max: 4200000,
    salary_currency: 'INR',
    skills_required: ['Python', 'PyTorch', 'Gemini API', 'Transformers', 'Vector Databases', 'FastAPI', 'RAG'],
    description: 'Pioneer multi-lingual search, voice commerce, and automated catalog summarization for 400M+ Indian consumers using state-of-the-art LLMs and vector retrieval engines.',
    responsibilities: [
      'Fine-tune embeddings and transformer models for Hinglish and Indian language queries',
      'Build low-latency Retrieval-Augmented Generation (RAG) pipelines using Milvus & FAISS',
      'Deploy inference microservices on GPU clusters with FastAPI and Triton',
    ],
    requirements: [
      'Solid foundations in deep learning, NLP, and Python',
      'Experience with transformer architectures (BERT, LLMs, LangChain/LlamaIndex)',
      'Familiarity with containerization and cloud GPU orchestration',
    ],
    status: 'active',
    is_flagged: false,
    created_at: '2026-03-03T09:15:00Z',
    updated_at: '2026-03-03T09:15:00Z',
  },
  {
    id: 'job-4',
    company_id: 'comp-zomato',
    company: INITIAL_COMPANIES[3],
    title: 'Product Designer (Design Systems & Web UX)',
    department: 'Consumer Experience',
    location: 'Gurugram, Haryana',
    work_mode: 'hybrid',
    job_type: 'full-time',
    experience_min: 2,
    experience_max: 4,
    salary_min: 1500000,
    salary_max: 2400000,
    salary_currency: 'INR',
    skills_required: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping', 'Design Tokens'],
    description: 'Design intuitive, appetizing digital journeys for food ordering, dining out, and rapid grocery fulfillment. You will shape our unified design system across web and mobile platforms.',
    responsibilities: [
      'Maintain and expand Zomato’s component library and interaction patterns in Figma',
      'Conduct user interviews, cognitive walkthroughs, and quantitative A/B design experiments',
      'Collaborate closely with front-end engineers to ensure pixel-perfect fidelity',
    ],
    requirements: [
      'Strong portfolio demonstrating clear product thinking and visual finesse',
      'Deep fluency with Figma variables, auto-layout, and interactive prototyping',
      'Empathetic design mindset tailored for everyday Indian users',
    ],
    status: 'active',
    is_flagged: false,
    created_at: '2026-03-04T14:00:00Z',
    updated_at: '2026-03-04T14:00:00Z',
  },
  {
    id: 'job-5',
    company_id: 'comp-freshworks',
    company: INITIAL_COMPANIES[4],
    title: 'Frontend Engineer (React / Next.js / SaaS)',
    department: 'Freshdesk Core UI',
    location: 'Chennai, Tamil Nadu',
    work_mode: 'hybrid',
    job_type: 'full-time',
    experience_min: 1,
    experience_max: 3,
    salary_min: 1200000,
    salary_max: 1800000,
    salary_currency: 'INR',
    skills_required: ['React', 'Next.js', 'JavaScript', 'CSS/Tailwind', 'HTML5', 'REST APIs'],
    description: 'Build responsive, accessible customer support dashboards used by 60,000+ businesses worldwide. Focus on real-time agent collision detection and intuitive ticketing interfaces.',
    responsibilities: [
      'Write clean, modular React components with TypeScript and modern hooks',
      'Optimize web vitals, bundle size, and rendering performance',
      'Integrate REST and WebSocket endpoints for live ticket notifications',
    ],
    requirements: [
      '1-3 years of frontend web development with React',
      'Solid command of JavaScript/TypeScript, CSS layouts, and DOM APIs',
      'Good eye for accessible and responsive UI across desktop and tablet',
    ],
    status: 'active',
    is_flagged: false,
    created_at: '2026-03-05T08:45:00Z',
    updated_at: '2026-03-05T08:45:00Z',
  },
  {
    id: 'job-6',
    company_id: 'comp-cred',
    company: INITIAL_COMPANIES[5],
    title: 'DevOps & Site Reliability Engineer',
    department: 'Cloud Infrastructure',
    location: 'Bengaluru, Karnataka',
    work_mode: 'on-site',
    job_type: 'full-time',
    experience_min: 3,
    experience_max: 6,
    salary_min: 2500000,
    salary_max: 3800000,
    salary_currency: 'INR',
    skills_required: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Prometheus', 'Linux'],
    description: 'Ensure 99.999% reliability for member financial transactions and rewards processing. You will automate multi-region cloud infrastructure using Terraform and GitOps.',
    responsibilities: [
      'Manage production Kubernetes clusters on AWS with EKS',
      'Build zero-downtime CI/CD deployment pipelines using GitHub Actions and ArgoCD',
      'Implement automated chaos testing and cost-optimization monitoring',
    ],
    requirements: [
      '3+ years maintaining high-availability cloud infrastructure on AWS',
      'Strong proficiency with Terraform (IaC) and Kubernetes orchestration',
      'Solid shell scripting and Linux systems internals knowledge',
    ],
    status: 'active',
    is_flagged: false,
    created_at: '2026-03-06T12:00:00Z',
    updated_at: '2026-03-06T12:00:00Z',
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    job_id: 'job-1',
    job: INITIAL_JOBS[0],
    candidate_name: 'Aarav Sharma',
    candidate_email: 'aarav.sharma@example.com',
    candidate_phone: '+91 98765 43210',
    resume_url: '/resumes/aarav_sharma_resume.pdf',
    candidate_confirmed: true,
    status: 'under_review',
    hr_notes: 'Strong candidate with relevant fintech experience. Plan to schedule technical round.',
    applied_at: '2026-03-08T11:20:00Z',
    updated_at: '2026-03-08T11:20:00Z',
    extracted_profile: {
      full_name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, Karnataka',
      summary: 'Senior Full-Stack Developer with 4 years of experience building scalable payments and web apps using React, Next.js, Node.js, and PostgreSQL.',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      experience: [
        {
          company: 'TechVanguard Solutions',
          role: 'Full-Stack Software Engineer',
          start_date: '2022-06',
          end_date: 'Present',
          description: 'Architected high-throughput checkout modules reducing latency by 38% and integrated payment webhooks.',
        },
        {
          company: 'InnoTech Labs',
          role: 'Frontend Developer',
          start_date: '2020-08',
          end_date: '2022-05',
          description: 'Developed responsive customer portals using React, Redux, and Tailwind CSS.',
        },
      ],
      education: [
        {
          institution: 'RV College of Engineering, Bengaluru',
          degree: 'B.Tech',
          field_of_study: 'Computer Science & Engineering',
          graduation_year: '2020',
          grade_or_gpa: '8.8 CGPA',
        },
      ],
      projects: [
        {
          title: 'InstantPay Gateway UI',
          description: 'Zero-dependency modal checkout widget embedded in merchant sites.',
          technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        },
      ],
      certifications: [
        {
          name: 'AWS Certified Solutions Architect - Associate',
          issuer: 'Amazon Web Services',
          year: '2023',
        },
      ],
    },
    ai_analysis: {
      match_score: 92,
      matching_skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Redis', 'Docker'],
      missing_skills: [
        {
          skill: 'PCI-DSS Compliance',
          importance: 'preferred',
          recommendation: 'Candidate has payments background; quick orientation on PCI-DSS rules will suffice.',
        },
      ],
      match_explanation: 'Outstanding fit (92%). The candidate possesses all 7 required core technical skills with 4 years of hands-on experience building checkout and payments systems in Bengaluru.',
      resume_improvements: [
        'Highlight peak transaction throughput numbers (e.g. TPS handled during flash sales).',
        'Elaborate on specific database indexing strategies used with PostgreSQL.',
      ],
      analyzed_at: '2026-03-08T11:21:00Z',
    },
  },
  {
    id: 'app-2',
    job_id: 'job-1',
    job: INITIAL_JOBS[0],
    candidate_name: 'Priya Patel',
    candidate_email: 'priya.patel@example.com',
    candidate_phone: '+91 97654 32109',
    resume_url: '/resumes/priya_patel_resume.pdf',
    candidate_confirmed: true,
    status: 'shortlisted',
    hr_notes: 'Impressive systems background; shortlisted for Hiring Manager interview.',
    applied_at: '2026-03-09T09:40:00Z',
    updated_at: '2026-03-09T14:10:00Z',
    extracted_profile: {
      full_name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 97654 32109',
      location: 'Bengaluru, Karnataka',
      summary: 'Full-stack developer with 3.5 years of experience specializing in React frontends and Node.js microservices with PostgreSQL.',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL'],
      experience: [
        {
          company: 'PaySmart Systems',
          role: 'Software Development Engineer',
          start_date: '2021-07',
          end_date: 'Present',
          description: 'Developed merchant reconciliation dashboards and real-time ledger sync services.',
        },
      ],
      education: [
        {
          institution: 'PES University, Bengaluru',
          degree: 'B.Tech',
          field_of_study: 'Information Science',
          graduation_year: '2021',
          grade_or_gpa: '8.5 CGPA',
        },
      ],
      projects: [],
      certifications: [],
    },
    ai_analysis: {
      match_score: 84,
      matching_skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      missing_skills: [
        {
          skill: 'Next.js',
          importance: 'preferred',
          recommendation: 'Has solid React & SSR foundations; can ramp up on Next.js within a week.',
        },
        {
          skill: 'Redis',
          importance: 'preferred',
          recommendation: 'Basic caching exposure noted; recommends reviewing distributed Redis locks.',
        },
      ],
      match_explanation: 'Strong fit (84%). Direct domain overlap with merchant reconciliation in fintech and mastery of React, TypeScript, and Node.js.',
      resume_improvements: [
        'Clarify Next.js version experience (App Router vs Pages router).',
        'Add details regarding caching layers implemented in PaySmart projects.',
      ],
      analyzed_at: '2026-03-09T09:41:00Z',
    },
  },
  {
    id: 'app-3',
    job_id: 'job-3',
    job: INITIAL_JOBS[2],
    candidate_name: 'Rohan Verma',
    candidate_email: 'rohan.verma@example.com',
    candidate_phone: '+91 96543 21098',
    resume_url: '/resumes/rohan_verma_resume.pdf',
    candidate_confirmed: true,
    status: 'interview',
    hr_notes: 'Passed initial screening; coding interview scheduled for Thursday 3 PM.',
    applied_at: '2026-03-07T16:15:00Z',
    updated_at: '2026-03-08T18:00:00Z',
    extracted_profile: {
      full_name: 'Rohan Verma',
      email: 'rohan.verma@example.com',
      phone: '+91 96543 21098',
      location: 'Hyderabad, Telangana',
      summary: 'Applied AI researcher and ML engineer with 3 years building search pipelines, RAG systems, and fine-tuning transformer models.',
      skills: ['Python', 'PyTorch', 'Transformers', 'Vector Databases', 'FastAPI', 'Docker', 'NLP', 'Gemini API'],
      experience: [
        {
          company: 'CognitiveData Labs',
          role: 'Machine Learning Engineer',
          start_date: '2022-01',
          end_date: 'Present',
          description: 'Engineered multi-modal retrieval system using vector databases (Pinecone, ChromaDB) and HuggingFace models.',
        },
      ],
      education: [
        {
          institution: 'IIT Hyderabad',
          degree: 'M.Tech',
          field_of_study: 'Artificial Intelligence',
          graduation_year: '2022',
          grade_or_gpa: '9.1 CGPA',
        },
      ],
      projects: [],
      certifications: [],
    },
    ai_analysis: {
      match_score: 95,
      matching_skills: ['Python', 'PyTorch', 'Gemini API', 'Transformers', 'Vector Databases', 'FastAPI', 'RAG'],
      missing_skills: [],
      match_explanation: 'Exceptional match (95%). Complete alignment with all listed required skills, specialized M.Tech in AI, and direct production experience with vector retrieval and transformer fine-tuning.',
      resume_improvements: [
        'Detail quantitative retrieval benchmarks (e.g. NDCG@10 or MRR improvements).',
      ],
      analyzed_at: '2026-03-07T16:16:00Z',
    },
  },
  {
    id: 'app-4',
    job_id: 'job-1',
    job: INITIAL_JOBS[0],
    candidate_name: 'Vikram Malhotra',
    candidate_email: 'vikram.m@example.com',
    candidate_phone: '+91 95432 10987',
    resume_url: '/resumes/vikram_m_resume.pdf',
    candidate_confirmed: true,
    status: 'under_review',
    hr_notes: '',
    applied_at: '2026-03-10T12:05:00Z',
    updated_at: '2026-03-10T12:05:00Z',
    extracted_profile: {
      full_name: 'Vikram Malhotra',
      email: 'vikram.m@example.com',
      phone: '+91 95432 10987',
      location: 'Pune, Maharashtra',
      summary: 'Frontend-heavy web developer with 2 years of experience primarily using Vue.js and Python Django.',
      skills: ['Vue.js', 'JavaScript', 'Python', 'Django', 'MySQL', 'HTML/CSS'],
      experience: [
        {
          company: 'SoftWave Tech',
          role: 'Junior Software Engineer',
          start_date: '2022-09',
          end_date: 'Present',
          description: 'Maintained enterprise web portals using Vue 3 and Django REST.',
        },
      ],
      education: [
        {
          institution: 'Pune Institute of Computer Technology (PICT)',
          degree: 'B.E.',
          field_of_study: 'Computer Engineering',
          graduation_year: '2022',
          grade_or_gpa: '7.9 CGPA',
        },
      ],
      projects: [],
      certifications: [],
    },
    ai_analysis: {
      match_score: 48,
      matching_skills: ['JavaScript'],
      missing_skills: [
        { skill: 'React', importance: 'critical', recommendation: 'Core requirement for this role.' },
        { skill: 'Next.js', importance: 'critical', recommendation: 'Core stack of our checkout apps.' },
        { skill: 'TypeScript', importance: 'critical', recommendation: 'Strict TypeScript codebase.' },
        { skill: 'Node.js', importance: 'preferred', recommendation: 'Backend stack.' },
        { skill: 'PostgreSQL', importance: 'preferred', recommendation: 'Candidate primarily used MySQL.' },
      ],
      match_explanation: 'Low match (48%). The candidate primarily develops in Vue.js and Python Django, missing key requirements in React, Next.js, and TypeScript needed for the Payments Platform role.',
      resume_improvements: [
        'Consider highlighting transferable JavaScript and component-architecture fundamentals.',
        'Build and link a Next.js / TypeScript project in your portfolio.',
      ],
      analyzed_at: '2026-03-10T12:06:00Z',
    },
  },
];

// Helper in-memory data store for live demo interaction
let memoryJobs: Job[] = [...INITIAL_JOBS];
let memoryApplications: Application[] = [...INITIAL_APPLICATIONS];

export function getJobs(filters?: { query?: string; location?: string; work_mode?: string; job_type?: string }): Job[] {
  let result = [...memoryJobs];
  if (!filters) return result;

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.name.toLowerCase().includes(q) ||
        j.skills_required.some((s) => s.toLowerCase().includes(q)) ||
        j.description.toLowerCase().includes(q)
    );
  }

  if (filters.location && filters.location !== 'all') {
    const loc = filters.location.toLowerCase();
    result = result.filter((j) => j.location.toLowerCase().includes(loc));
  }

  if (filters.work_mode && filters.work_mode !== 'all') {
    result = result.filter((j) => j.work_mode === filters.work_mode);
  }

  if (filters.job_type && filters.job_type !== 'all') {
    result = result.filter((j) => j.job_type === filters.job_type);
  }

  return result;
}

export function getJobById(id: string): Job | undefined {
  return memoryJobs.find((j) => j.id === id);
}

export function addJob(job: Job): Job {
  memoryJobs.unshift(job);
  return job;
}

export function updateJobStatus(id: string, status: Job['status'], is_flagged?: boolean): Job | undefined {
  const job = memoryJobs.find((j) => j.id === id);
  if (job) {
    job.status = status;
    if (is_flagged !== undefined) job.is_flagged = is_flagged;
  }
  return job;
}

export function getApplications(): Application[] {
  return [...memoryApplications];
}

export function getApplicationById(id: string): Application | undefined {
  return memoryApplications.find((a) => a.id === id);
}

export function addApplication(app: Application): Application {
  memoryApplications.unshift(app);
  return app;
}

export function updateApplicationStatus(id: string, status: Application['status'], hr_notes?: string): Application | undefined {
  const app = memoryApplications.find((a) => a.id === id);
  if (app) {
    app.status = status;
    if (hr_notes !== undefined) app.hr_notes = hr_notes;
    app.updated_at = new Date().toISOString();
  }
  return app;
}
