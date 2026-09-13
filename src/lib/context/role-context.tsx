'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'candidate' | 'hr' | 'admin';

interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatarUrl?: string;
}

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  candidate: {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'candidate',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
  },
  hr: {
    name: 'Neha Kapoor',
    email: 'neha.kapoor@razorpay.com',
    role: 'hr',
    company: 'Razorpay',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
  },
  admin: {
    name: 'Siddharth Sen',
    email: 'admin@truehireindia.com',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
  },
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('candidate');
  const [user, setUser] = useState<UserProfile>(DEFAULT_USERS.candidate);

  useEffect(() => {
    const saved = localStorage.getItem('truehire_role') as UserRole;
    if (saved && (saved === 'candidate' || saved === 'hr' || saved === 'admin')) {
      setRoleState(saved);
      setUser(DEFAULT_USERS[saved]);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(DEFAULT_USERS[newRole]);
    localStorage.setItem('truehire_role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, user, setUser }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
