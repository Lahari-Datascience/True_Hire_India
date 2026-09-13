import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique temporary file path with the original extension
    const ext = path.extname(file.name) || '.pdf';
    const tempFilePath = path.join(os.tmpdir(), `resume_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`);
    fs.writeFileSync(tempFilePath, buffer);

    const scriptPath = path.join(process.cwd(), 'python_service', 'parse_resume.py');

    // Run python parse script
    const parsePromise = new Promise<{ success: boolean; text: string; error?: string; file_type?: string }>((resolve) => {
      const pythonProcess = spawn('python', [scriptPath, tempFilePath]);
      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        // Always clean up temp file
        try {
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
        } catch {
          // ignore cleanup error
        }

        if (code !== 0 && !stdout) {
          resolve({
            success: false,
            error: stderr || `Python process exited with code ${code}`,
            text: '',
          });
          return;
        }

        try {
          const parsed = JSON.parse(stdout);
          resolve(parsed);
        } catch (err) {
          resolve({
            success: false,
            error: `Failed to parse Python output: ${stdout}`,
            text: '',
          });
        }
      });

      pythonProcess.on('error', (err) => {
        try {
          if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
        } catch {
          // ignore
        }
        resolve({
          success: false,
          error: `Failed to execute python: ${err.message}`,
          text: '',
        });
      });
    });

    const result = await parsePromise;

    if (!result.success && !result.text) {
      // Fallback: If python fails for whatever reason (e.g. text file), try UTF-8 decoding
      const textFallback = buffer.toString('utf-8').replace(/[^\x20-\x7E\t\r\n]/g, ' ');
      if (textFallback.length > 50) {
        return NextResponse.json({
          success: true,
          file_name: file.name,
          file_type: ext.replace('.', ''),
          text: textFallback,
          char_count: textFallback.length,
          note: 'Extracted via text fallback parser',
        });
      }
      return NextResponse.json({ error: result.error || 'Failed to extract text from resume' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      file_name: file.name,
      file_type: result.file_type || ext.replace('.', ''),
      text: result.text,
      char_count: result.text.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
