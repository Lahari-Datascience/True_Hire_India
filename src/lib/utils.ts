import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min?: number, max?: number, currency = 'INR'): string {
  if (!min && !max) return 'Competitive / Undisclosed';
  
  const toLacs = (val: number) => {
    const lpa = val / 100000;
    return Number.isInteger(lpa) ? `${lpa}` : lpa.toFixed(1);
  };

  if (currency === 'INR') {
    if (min && max) {
      return `₹${toLacs(min)} - ₹${toLacs(max)} LPA`;
    }
    if (min) return `From ₹${toLacs(min)} LPA`;
    if (max) return `Up to ₹${toLacs(max)} LPA`;
  }
  return `${min || 0} - ${max || 0} ${currency}`;
}

export function formatExperience(min: number, max?: number): string {
  if (min === 0 && (!max || max <= 1)) return 'Fresher / 0-1 yr';
  if (min && max) return `${min} - ${max} yrs`;
  if (min) return `${min}+ yrs`;
  return 'Flexible';
}

export function getMatchScoreColor(score: number): {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  progressColor: string;
} {
  if (score >= 80) {
    return {
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      badgeBorder: 'border-emerald-200',
      progressColor: 'bg-emerald-500',
    };
  }
  if (score >= 60) {
    return {
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      badgeBorder: 'border-amber-200',
      progressColor: 'bg-amber-500',
    };
  }
  return {
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200',
    progressColor: 'bg-rose-500',
  };
}
