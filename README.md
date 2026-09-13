# TrueHireIndia — GenAI-Powered Intelligent Recruitment Platform

TrueHireIndia is a full-stack, GenAI-powered recruitment platform where AI converts unstructured resumes into structured candidate profiles, provides explainable job matching and skill-gap analysis, and assists recruiters — while HR strictly holds the final hiring decision.

---

## 🌟 Core Product Flow
1. **Resume Upload** (PDF/DOCX via PyMuPDF + python-docx parser)
2. **AI Profile Creation** (LLM structures contact, education, skills, experience, projects, certs)
3. **Candidate Verification** (Candidate MUST review & confirm extracted profile before submission)
4. **AI Job Matching** (Explainable 0-100% score, matched skills, missing skills, rationale)
5. **Application Submission** (Saved with decoupled `ai_analysis` telemetry)
6. **HR Evaluation** (Recruiter reviews applicants, inspects AI analysis, changes status to Shortlist/Interview/Select/Reject, saves private notes)

---

## 🔒 Hard Safety & Ethical Rules (Enforced in Code)
- **AI assists, it never decides**: AI outputs are stored in `ai_analysis` JSONB. The HR-controlled `status` column is only modified by authenticated recruiter actions.
- **No auto-submit**: Candidates must explicitly review and confirm extracted profile details.
- **Guest Apply**: Candidates can browse and apply without creating an account.
- **Transparent AI Labeling**: All AI outputs have distinct badges (`AI Match 92%`, `Explainable AI Match Breakdown`).

---

## 🚀 Tech Stack
- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend & Database**: Next.js API routes, Supabase PostgreSQL with Row Level Security (RLS)
- **GenAI**: Google Gemini 1.5 Flash (`@google/generative-ai`) with resilient heuristic fallbacks
- **Resume Extraction**: Python 3.13, PyMuPDF (`pymupdf`), and `python-docx`

---

## 💻 How to Run the Project Locally

### 1. Run the Next.js Web App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Test Resume Extraction (Isolated Unit Tests)
```bash
python python_service/test_parse.py
```

---

## 🎬 Demo Script

1. **Homepage (`/`)**:
   - Show hero and substantiated metrics.
   - Use the rounded search bar to query "React" or "Bengaluru".
   - Highlight the top categories and featured jobs with green AI match badges.
2. **Job Search & Filters (`/jobs`)**:
   - Filter by Work Mode (Remote/Hybrid) or Location.
   - Click "AI Match" on any card to preview instant explainable AI match and skill gaps.
3. **Candidate AI Flow (`/apply/[id]`)**:
   - Upload any PDF/DOCX resume (or click "Auto-fill sample resume").
   - Watch PyMuPDF extract text in real-time.
   - **Crucial step**: Show the candidate reviewing and editing their extracted skills & summary before confirming!
   - Review the AI Match score breakdown and submit with celebratory confetti.
4. **HR Recruiter Hub (`/hr/dashboard`)**:
   - Use the 1-Click Role Switcher in the top right to switch to **HR / Recruiter View**.
   - Review the candidate pipeline.
   - Open the **Candidate Detail Drawer** on Aarav Sharma or Priya Patel.
   - Highlight: AI match score, matched skills, missing skills.
   - Demonstrate changing status to **"Shortlisted"** or **"Interview"** and saving a recruiter note.
5. **Platform Admin Panel (`/admin/dashboard`)**:
   - Switch role to **Platform Admin**.
   - Show listing moderation, toggle flag on a suspicious listing, and explain the safety guardrail: Admin moderates platform hygiene, but never decides who gets hired.
