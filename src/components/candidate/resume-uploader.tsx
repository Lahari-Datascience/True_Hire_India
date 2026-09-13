'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumeUploaderProps {
  onParsed: (data: {
    rawText: string;
    fileName: string;
    profile: any;
  }) => void;
  className?: string;
}

export function ResumeUploader({ onParsed, className }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<'idle' | 'extracting_text' | 'ai_analyzing' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setError('Please upload a PDF or DOCX resume document.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.');
      return;
    }

    setError(null);
    setFileName(file.name);
    setIsLoading(true);
    setStage('extracting_text');

    try {
      // 1. Send file to Python parser backend route
      const formData = new FormData();
      formData.append('file', file);

      const parseRes = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const parseData = await parseRes.json();

      if (!parseRes.ok || !parseData.success) {
        throw new Error(parseData.error || 'Failed to extract text from resume.');
      }

      const extractedText = parseData.text;
      setStage('ai_analyzing');

      // 2. Send extracted text to AI Profile Extraction endpoint
      const aiRes = await fetch('/api/ai/extract-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: extractedText,
          file_name: file.name,
        }),
      });

      const aiData = await aiRes.json();

      if (!aiRes.ok || !aiData.success) {
        throw new Error(aiData.error || 'AI profile extraction failed.');
      }

      setStage('done');
      setIsLoading(false);

      // Pass parsed results up to parent
      onParsed({
        rawText: extractedText,
        fileName: file.name,
        profile: aiData.profile,
      });
    } catch (err: any) {
      console.error('Resume processing error:', err);
      setError(err.message || 'An error occurred during resume processing.');
      setIsLoading(false);
      setStage('idle');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`space-y-3 ${className || ''}`}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/60 scale-[1.01]'
            : isLoading
            ? 'border-indigo-300 bg-indigo-50/20 cursor-wait'
            : 'border-gray-300 hover:border-indigo-400 bg-gray-50/50 hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-3 max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
            {isLoading ? (
              <Loader2 className="w-7 h-7 animate-spin text-indigo-600" />
            ) : fileName ? (
              <FileText className="w-7 h-7 text-emerald-600" />
            ) : (
              <UploadCloud className="w-7 h-7 text-indigo-600" />
            )}
          </div>

          <div>
            {isLoading ? (
              <div>
                <p className="font-bold text-gray-900 text-sm flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                  {stage === 'extracting_text'
                    ? 'PyMuPDF is extracting resume text...'
                    : 'Gemini AI is structuring your profile...'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Converting unstructured document into verified candidate data.</p>
              </div>
            ) : fileName ? (
              <div>
                <p className="font-bold text-gray-900 text-sm flex items-center justify-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  {fileName} Ready
                </p>
                <p className="text-xs text-indigo-600 font-semibold mt-1">Click to upload another file</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  Drop your resume here, or <span className="text-indigo-600 underline">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports PDF or DOCX (up to 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
