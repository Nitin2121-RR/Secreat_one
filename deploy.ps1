# Vercel Deployment Script
# This script checks your files and deploys to Vercel

Write-Host "🚀 Starting Deployment Process..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
$requiredFiles = @("index.html", "style.css", "script.js", "1.jpg", "2.jpg", "vercel.json")
$missingFiles = @()

Write-Host "📋 Checking required files..." -ForegroundColor Yellow
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file found" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file MISSING!" -ForegroundColor Red
        $missingFiles += $file
    }
}
Write-Host ""

if ($missingFiles.Count -gt 0) {
    Write-Host "⚠️  Cannot deploy! Missing files:" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please make sure all files are in the current directory." -ForegroundColor Yellow
    exit 1
}

# Check if Vercel CLI is installed
Write-Host "🔍 Checking for Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "  ❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Vercel CLI first:" -ForegroundColor Yellow
    Write-Host "  npm i -g vercel" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or deploy manually at: https://vercel.com/new" -ForegroundColor Yellow
    exit 1
}

Write-Host "  ✅ Vercel CLI found" -ForegroundColor Green
Write-Host ""

# Ask user which type of deployment
Write-Host "📦 Deployment Options:" -ForegroundColor Cyan
Write-Host "  1. Preview deployment (for testing)"
Write-Host "  2. Production deployment (live site)"
Write-Host "  3. Force production deployment (overwrite existing)"
Write-Host ""
$choice = Read-Host "Enter your choice (1-3)"

Write-Host ""
Write-Host "🚀 Starting deployment..." -ForegroundColor Cyan
Write-Host ""

switch ($choice) {
    "1" {
        Write-Host "Deploying to PREVIEW..." -ForegroundColor Yellow
        vercel
    }
    "2" {
        Write-Host "Deploying to PRODUCTION..." -ForegroundColor Yellow
        vercel --prod
    }
    "3" {
        Write-Host "Force deploying to PRODUCTION..." -ForegroundColor Yellow
        vercel --prod --force
    }
    default {
        Write-Host "Invalid choice. Deploying to preview..." -ForegroundColor Yellow
        vercel
    }
}

Write-Host ""
Write-Host "✨ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Open the URL shown above in your browser"
Write-Host "  2. Check if everything works (animations, images, etc.)"
Write-Host "  3. Test on mobile device"
Write-Host "  4. Share your link! 💕"
Write-Host ""
