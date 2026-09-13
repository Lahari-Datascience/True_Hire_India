'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  onSearch?: (query: string, location: string) => void;
  className?: string;
}

export function SearchBar({
  initialQuery = '',
  initialLocation = '',
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, location);
    } else {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (location.trim()) params.set('location', location.trim());
      router.push(`/jobs?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-gray-200/90 p-2 sm:p-2.5 flex flex-col md:flex-row items-center gap-2 ${className || ''}`}
    >
      {/* Title / Skill / Company Input */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 w-full md:flex-1 border-b md:border-b-0 md:border-r border-gray-100">
        <Search className="w-5 h-5 text-indigo-500 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, skills (e.g. React, Python), or company"
          className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </div>

      {/* Location Input */}
      <div className="flex items-center gap-3 px-3.5 py-2.5 w-full md:w-72">
        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Bengaluru, Mumbai, Remote..."
          className="w-full text-sm font-medium text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
        />
      </div>

      {/* Search Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full md:w-auto px-7 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 shrink-0"
      >
        <span>Search Jobs</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </form>
  );
}
