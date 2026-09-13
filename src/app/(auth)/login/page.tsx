'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRole } from '@/lib/context/role-context';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = (roleType: 'candidate' | 'hr' | 'admin') => {
    setRole(roleType);
    if (roleType === 'candidate') router.push('/candidate/dashboard');
    else if (roleType === 'hr') router.push('/hr/dashboard');
    else router.push('/admin/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to candidate or route based on email
    if (email.includes('hr') || email.includes('recruiter')) {
      setRole('hr');
      router.push('/hr/dashboard');
    } else if (email.includes('admin')) {
      setRole('admin');
      router.push('/admin/dashboard');
    } else {
      setRole('candidate');
      router.push('/candidate/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/80 p-8 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-100">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Sign In to TrueHireIndia
          </h1>
          <p className="text-xs text-gray-500">
            Access intelligent recruitment and explainable matching
          </p>
        </div>

        {/* 1-Click Demo Evaluation Profiles */}
        <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">
            College Demo 1-Click Fast Sign-In:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('candidate')}
              className="p-2 rounded-xl bg-white border border-indigo-200 hover:border-indigo-500 text-xs font-bold text-gray-800 hover:text-indigo-600 transition-colors shadow-2xs text-center"
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('hr')}
              className="p-2 rounded-xl bg-white border border-indigo-200 hover:border-indigo-500 text-xs font-bold text-gray-800 hover:text-indigo-600 transition-colors shadow-2xs text-center"
            >
              Recruiter (HR)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="p-2 rounded-xl bg-white border border-indigo-200 hover:border-indigo-500 text-xs font-bold text-gray-800 hover:text-indigo-600 transition-colors shadow-2xs text-center"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold uppercase tracking-wider text-gray-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="lg" variant="primary" className="w-full font-bold">
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <NextLink href="/signup" className="text-indigo-600 font-bold hover:underline">
            Sign Up
          </NextLink>
        </div>
      </div>
    </div>
  );
}
