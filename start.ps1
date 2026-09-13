$nodeDir = "C:\Users\HP\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.19.0-win-x64"
$env:Path = "$nodeDir;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Starting TrueHireIndia GenAI Platform   " -ForegroundColor Green
Write-Host " Web App URL: http://localhost:3000      " -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Cyan

npm run dev
