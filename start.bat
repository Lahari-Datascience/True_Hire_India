@echo off
title TrueHireIndia Dev Server
cd /d "%~dp0"
set "PATH=C:\Users\HP\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.19.0-win-x64;%PATH%"
echo Starting TrueHireIndia...
echo Open http://localhost:3000 in your browser.
npm run dev
pause
