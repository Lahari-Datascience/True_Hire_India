'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRole } from '@/lib/context/role-context';

export default function SignupPage() {
  const router = useRouter();
  const { setRole } = useRole();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleType, setRoleType] = useState<'candidate' | 'hr'>('candidate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(roleType);
    if (roleType === 'candidate') {
      router.push('/candidate/dashboard');
    } else {
      router.push('/hr/dashboard');
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
            Create an Account
          </h1>
          <p className="text-xs text-gray-500">
            Join TrueHireIndia for AI-assisted intelligent hiring
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Role selector */}
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-gray-700 block mb-1">
              I want to join as:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRoleType('candidate')}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                  roleType === 'candidate'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Job Seeker / Candidate
              </button>
              <button
                type="button"
                onClick={() => setRoleType('hr')}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-colors ${
                  roleType === 'hr'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                HR Recruiter / Employer
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold uppercase tracking-wider text-gray-700 block mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

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
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="lg" variant="primary" className="w-full font-bold">
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <NextLink href="/login" className="text-indigo-600 font-bold hover:underline">
            Sign In
          </NextLink>
        </div>
      </div>
    </div>
  );
}
