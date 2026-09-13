import React from 'react';
import { Sparkles, Brain, CheckCircle2 } from 'lucide-react';
import { cn, getMatchScoreColor } from '@/lib/utils';

interface AiMatchBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function AiMatchBadge({ score, size = 'md', showLabel = true, className }: AiMatchBadgeProps) {
  const colors = getMatchScoreColor(score);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3.5 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border shadow-sm transition-transform hover:scale-105 select-none',
        colors.badgeBg,
        colors.badgeText,
        colors.badgeBorder,
        sizeClasses[size],
        className
      )}
      title={`AI Match Evaluation: ${score}% fit. (AI assists, HR retains hiring decision)`}
    >
      <Sparkles className={cn(iconSizes[size], 'animate-pulse text-emerald-600')} />
      <span>{showLabel ? `AI Match ${score}%` : `${score}%`}</span>
    </span>
  );
}

interface AiLabelBadgeProps {
  text?: string;
  variant?: 'purple' | 'emerald' | 'amber';
  icon?: 'sparkles' | 'brain' | 'check';
  className?: string;
}

export function AiLabelBadge({
  text = 'AI-Assisted',
  variant = 'purple',
  icon = 'sparkles',
  className,
}: AiLabelBadgeProps) {
  const variantStyles = {
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variantStyles[variant],
        className
      )}
    >
      {icon === 'sparkles' && <Sparkles className="w-3 h-3" />}
      {icon === 'brain' && <Brain className="w-3 h-3" />}
      {icon === 'check' && <CheckCircle2 className="w-3 h-3" />}
      <span>{text}</span>
    </span>
  );
}
