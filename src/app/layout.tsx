import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/lib/context/role-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'TrueHireIndia - GenAI-Powered Intelligent Recruitment Platform',
  description:
    'Intelligent talent platform where GenAI converts unstructured resumes into structured candidate profiles, provides explainable job matching and skill-gap analysis, and assists recruiters — while HR keeps the final hiring decision.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-gray-50/50 text-gray-900">
        <RoleProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </RoleProvider>
      </body>
    </html>
  );
}
