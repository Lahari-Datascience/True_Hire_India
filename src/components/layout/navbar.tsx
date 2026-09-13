'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Briefcase,
  Users,
  ShieldCheck,
  ChevronDown,
  PlusCircle,
  Search,
  Compass,
} from 'lucide-react';
import { useRole, UserRole } from '@/lib/context/role-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { role, setRole, user } = useRole();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string; desc: string; badge: string }> = {
    candidate: {
      label: 'Candidate View',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'bg-emerald-500',
      desc: 'Browse, Upload Resume, AI Match & Apply',
    },
    hr: {
      label: 'Recruiter Hub (HR)',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'bg-blue-600',
      desc: 'Post Jobs, Review Applicants & Match Scores',
    },
    admin: {
      label: 'Platform Admin',
      icon: ShieldCheck,
      color: 'bg-slate-50 text-slate-700 border-slate-200',
      badge: 'bg-slate-800',
      desc: 'Job Moderation, Safety & Analytics',
    },
  };

  const CurrentIcon = roleLabels[role].icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Brand Logo with exact uploaded imagery */}
          <NextLink href="/" className="flex items-center gap-3 group py-2">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-xs border border-slate-100 bg-white flex items-center justify-center p-1 group-hover:shadow-md group-hover:scale-105 transition-all">
              <img
                src="/logo-shield.png"
                alt="TrueHire India Shield Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to full logo if shield is missing
                  (e.target as HTMLImageElement).src = '/logo.jpg';
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center leading-none">
                <span className="font-black text-2xl tracking-tight text-[#0066CC]">True</span>
                <span className="font-black text-2xl tracking-tight text-[#16a34a]">Hire</span>
                <span className="font-black text-2xl tracking-tight text-slate-800 ml-1">India</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5 hidden sm:block">
                Connecting Talent with Genuine Employers
              </span>
            </div>
          </NextLink>

          {/* Navigation Links with elegant active styling */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <NextLink
              href="/jobs"
              className={cn(
                'px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5',
                pathname === '/jobs'
                  ? 'text-blue-700 bg-blue-50/90 shadow-2xs font-bold'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              )}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Jobs</span>
            </NextLink>

            {role === 'candidate' && (
              <NextLink
                href="/candidate/dashboard"
                className={cn(
                  'px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5',
                  pathname.startsWith('/candidate')
                    ? 'text-emerald-700 bg-emerald-50/90 shadow-2xs font-bold'
                    : 'hover:text-emerald-600 hover:bg-slate-50'
                )}
              >
                <Users className="w-4 h-4" />
                <span>Candidate Dashboard</span>
              </NextLink>
            )}

            {role === 'hr' && (
              <NextLink
                href="/hr/dashboard"
                className={cn(
                  'px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5',
                  pathname.startsWith('/hr')
                    ? 'text-blue-700 bg-blue-50/90 shadow-2xs font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-50'
                )}
              >
                <Briefcase className="w-4 h-4" />
                <span>HR Applicant Hub</span>
              </NextLink>
            )}

            {role === 'admin' && (
              <NextLink
                href="/admin/dashboard"
                className={cn(
                  'px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5',
                  pathname.startsWith('/admin')
                    ? 'text-slate-900 bg-slate-100 shadow-2xs font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Safety Panel</span>
              </NextLink>
            )}
          </nav>

          {/* Right Actions & 1-Click Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Interactive Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-all shadow-2xs"
                title="Switch role view for demo evaluation"
              >
                <div className={cn('w-2 h-2 rounded-full', roleLabels[role].badge)} />
                <CurrentIcon className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">{roleLabels[role].label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setRoleDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-40 animate-fade-in">
                    <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Switch Demo Perspective</span>
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    {(Object.keys(roleLabels) as UserRole[]).map((r) => {
                      const Icon = roleLabels[r].icon;
                      const isCurrent = role === r;
                      return (
                        <button
                          key={r}
                          onClick={() => {
                            setRole(r);
                            setRoleDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors text-xs my-1',
                            isCurrent
                              ? 'bg-blue-50/80 text-blue-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700'
                          )}
                        >
                          <div
                            className={cn(
                              'p-2 rounded-lg mt-0.5 shadow-2xs',
                              isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              {roleLabels[r].label}
                              {isCurrent && (
                                <span className="text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded-full font-bold">
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="text-slate-500 font-normal text-[11px] mt-0.5 leading-tight">
                              {roleLabels[r].desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Role specific CTA button */}
            {role === 'hr' ? (
              <NextLink href="/hr/jobs/new">
                <Button
                  size="sm"
                  className="gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/20 rounded-xl"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post Job</span>
                </Button>
              </NextLink>
            ) : (
              <NextLink href="/jobs">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:opacity-95 text-white font-bold shadow-md shadow-blue-500/20 rounded-xl"
                >
                  <Search className="w-3.5 h-3.5 mr-1" />
                  <span>Browse Jobs</span>
                </Button>
              </NextLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
