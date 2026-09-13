-- TrueHireIndia Demo Seed Data
-- 1. Insert Companies
insert into public.companies (id, name, slug, logo_url, website, location, description, verified)
values
  ('11111111-1111-1111-1111-111111111111', 'Razorpay', 'razorpay', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80', 'https://razorpay.com', 'Bengaluru, Karnataka', 'India’s first full-stack financial solutions company revolutionizing digital payments for millions of businesses.', true),
  ('22222222-2222-2222-2222-222222222222', 'Swiggy', 'swiggy', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=128&auto=format&fit=crop&q=80', 'https://swiggy.com', 'Bengaluru, Karnataka', 'India’s leading on-demand convenience platform connecting consumers with restaurants and quick commerce.', true),
  ('33333333-3333-3333-3333-333333333333', 'Flipkart', 'flipkart', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&auto=format&fit=crop&q=80', 'https://flipkart.com', 'Bengaluru, Karnataka', 'India’s homegrown e-commerce ecosystem bringing value, choice, and digital access across India.', true),
  ('44444444-4444-4444-4444-444444444444', 'Zomato', 'zomato', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&auto=format&fit=crop&q=80', 'https://zomato.com', 'Gurugram, Haryana', 'Global food tech aggregator and hyper-local delivery service committed to better food for more people.', true),
  ('55555555-5555-5555-5555-555555555555', 'Freshworks', 'freshworks', 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80', 'https://freshworks.com', 'Chennai, Tamil Nadu', 'Modern SaaS software designed for IT, customer support, and sales teams worldwide.', true),
  ('66666666-6666-6666-6666-666666666666', 'CRED', 'cred', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=128&auto=format&fit=crop&q=80', 'https://cred.club', 'Bengaluru, Karnataka', 'Members-only club rewarding creditworthy individuals with exclusive financial privileges and curated lifestyle experiences.', true)
on conflict (id) do nothing;

-- 2. Insert Seed Jobs
insert into public.jobs (id, company_id, title, department, location, work_mode, job_type, experience_min, experience_max, salary_min, salary_max, salary_currency, skills_required, description, responsibilities, requirements, status)
values
  (
    'a1111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'Senior Full-Stack Engineer (Payments)',
    'Engineering',
    'Bengaluru, Karnataka',
    'hybrid',
    'full-time',
    3, 6,
    2400000, 3600000,
    'INR',
    array['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Redis', 'Docker'],
    'Join our core Payments Checkout team to architect high-throughput payment gateways processing millions of transactions per day with 99.999% uptime.',
    array['Design resilient checkout UI widgets using React and TypeScript', 'Build scalable distributed backend services in Node.js and Go', 'Collaborate with product and security teams to maintain PCI-DSS compliance'],
    array['3+ years of production experience in full-stack web engineering', 'Strong grasp of relational databases (PostgreSQL) and caching (Redis)', 'Demonstrated passion for performance optimization and clean code'],
    'active'
  ),
  (
    'b2222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '22222222-2222-2222-2222-222222222222',
    'Backend Engineer - Distributed Systems',
    'Engineering',
    'Bengaluru, Karnataka',
    'on-site',
    'full-time',
    2, 5,
    1800000, 2800000,
    'INR',
    array['Go', 'Java', 'Kafka', 'PostgreSQL', 'Microservices', 'Kubernetes'],
    'Build and maintain ultra-low latency routing and logistics services powering instant 10-minute grocery and food delivery across 500+ Indian cities.',
    array['Develop high-concurrency microservices handling real-time GPS tracking', 'Optimize Kafka message streams and database queries for peak dinner surges', 'Participate in blameless on-call post-mortems and chaos engineering'],
    array['B.Tech/M.Tech in Computer Science or related field', 'Strong foundations in data structures, algorithms, and concurrent programming', 'Hands-on experience with Apache Kafka and containerized deployments'],
    'active'
  ),
  (
    'c3333333-cccc-cccc-cccc-cccccccccccc',
    '33333333-3333-3333-3333-333333333333',
    'AI / ML Engineer - Search & Recommendation',
    'Data Science',
    'Bengaluru, Karnataka',
    'remote',
    'full-time',
    2, 6,
    2500000, 4200000,
    'INR',
    array['Python', 'PyTorch', 'NLP', 'Vector Databases', 'Transformers', 'FastAPI', 'Docker'],
    'Revolutionize e-commerce discovery by training deep learning search models, semantic vector search, and hyper-personalized product recommendation pipelines.',
    array['Train and fine-tune transformer models for multi-lingual Indian query intent', 'Implement embedding retrieval pipelines using Milvus and Pinecone', 'Work with frontend engineers to integrate AI recommendations in real time'],
    array['Demonstrated experience deploying deep learning models to production', 'Proficiency with Python, PyTorch/TensorFlow, and vector embeddings', 'Familiarity with LLMs, prompt engineering, and RAG architectures is a plus'],
    'active'
  ),
  (
    'd4444444-dddd-dddd-dddd-dddddddddddd',
    '44444444-4444-4444-4444-444444444444',
    'Product Designer (UI/UX)',
    'Design',
    'Gurugram, Haryana',
    'hybrid',
    'full-time',
    2, 4,
    1400000, 2200000,
    'INR',
    array['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Interaction Design'],
    'Craft delightful, intuitive visual experiences for millions of everyday foodies and delivery partners across India.',
    array['Lead user research interviews and usability testing sessions', 'Create wireframes, high-fidelity prototypes, and motion design specs in Figma', 'Collaborate directly with engineering to maintain design system consistency'],
    array['Outstanding portfolio displaying consumer-facing mobile & web apps', 'Strong understanding of typography, micro-interactions, and accessibility', 'Ability to articulate design decisions with user data and empathy'],
    'active'
  )
on conflict (id) do nothing;
