# Quick Sync - Instantly commit and push all changes
# Usage: .\sync-now.ps1 "Your commit message"

param(
    [string]$Message = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$RepoPath = $PSScriptRoot
Push-Location $RepoPath

Write-Host "Syncing changes to GitHub..." -ForegroundColor Cyan

# Check status
$status = git status --porcelain

if (-not $status) {
    Write-Host "No changes to sync." -ForegroundColor Yellow
    Pop-Location
    exit 0
}

# Show what will be committed
Write-Host "`nChanges to be synced:" -ForegroundColor Yellow
git status --short

# Stage, commit, push
git add -A
git commit -m $Message

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nPushing to origin/main..." -ForegroundColor Cyan
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Successfully synced to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "`n✗ Push failed. Try: git pull --rebase origin main" -ForegroundColor Red
    }
} else {
    Write-Host "`n✗ Commit failed" -ForegroundColor Red
}

Pop-Location
