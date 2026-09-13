'use client';

import React from 'react';
import NextLink from 'next/link';
import { Sparkles, ShieldCheck, Cpu, CheckCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden shadow-xs border border-slate-100 bg-white flex items-center justify-center p-0.5">
                <img
                  src="/logo-shield.png"
                  alt="TrueHire India Shield"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center leading-none">
                  <span className="font-black text-xl tracking-tight text-[#0066CC]">True</span>
                  <span className="font-black text-xl tracking-tight text-[#16a34a]">Hire</span>
                  <span className="font-black text-xl tracking-tight text-slate-800 ml-1">India</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  Connecting Talent with Genuine Employers
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              India’s intelligent recruitment platform. We leverage Generative AI to transform unstructured resumes into actionable talent profiles and explainable job match scores — while keeping final hiring authority strictly with HR.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4" /> AI Assists, Human Decides
              </span>
              <span className="flex items-center gap-1.5 text-blue-600">
                <Cpu className="w-4 h-4" /> Gemini & PyMuPDF Powered
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <NextLink href="/jobs" className="hover:text-blue-600 transition-colors">
                  Explore Tech Jobs
                </NextLink>
              </li>
              <li>
                <NextLink href="/candidate/dashboard" className="hover:text-emerald-600 transition-colors">
                  Candidate Dashboard
                </NextLink>
              </li>
              <li>
                <NextLink href="/hr/dashboard" className="hover:text-blue-600 transition-colors">
                  HR Recruiter Hub
                </NextLink>
              </li>
              <li>
                <NextLink href="/admin/dashboard" className="hover:text-slate-900 transition-colors">
                  Admin Safety Panel
                </NextLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Safety & Ethics
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Private Resume Storage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Mandatory Profile Confirmation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Explainable AI Match Rationale</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero Automated Rejection</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} TrueHireIndia. Connecting Talent with Genuine Employers.</p>
          <p>Powered by Next.js, Supabase, Google Gemini & PyMuPDF.</p>
        </div>
      </div>
    </footer>
  );
}
