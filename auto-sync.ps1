# Auto-Sync Script for Ascension-Codex-app
# This script watches for changes and automatically commits and pushes to GitHub

param(
    [int]$IntervalSeconds = 60,  # How often to check for changes (default: 60 seconds)
    [string]$DefaultMessage = "Auto-sync: Update changes"
)

$RepoPath = $PSScriptRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ascension Codex Auto-Sync Started" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Repo: $RepoPath" -ForegroundColor Gray
Write-Host "Check interval: $IntervalSeconds seconds" -ForegroundColor Gray
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

function Sync-Changes {
    Push-Location $RepoPath
    
    # Check for changes
    $status = git status --porcelain
    
    if ($status) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $changedFiles = ($status | Measure-Object).Count
        
        Write-Host "[$timestamp] Detected $changedFiles changed file(s)" -ForegroundColor Yellow
        
        # Stage all changes
        git add -A
        
        # Create commit message with timestamp
        $commitMessage = "$DefaultMessage [$timestamp]"
        
        # Commit changes
        $commitResult = git commit -m $commitMessage 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$timestamp] Committed: $commitMessage" -ForegroundColor Green
            
            # Push to remote
            Write-Host "[$timestamp] Pushing to origin..." -ForegroundColor Cyan
            $pushResult = git push origin main 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$timestamp] Successfully pushed to GitHub!" -ForegroundColor Green
            } else {
                Write-Host "[$timestamp] Push failed: $pushResult" -ForegroundColor Red
            }
        } else {
            Write-Host "[$timestamp] Commit skipped (no staged changes)" -ForegroundColor Gray
        }
    } else {
        $timestamp = Get-Date -Format "HH:mm:ss"
        Write-Host "[$timestamp] No changes detected" -ForegroundColor Gray
    }
    
    Pop-Location
}

# Main loop
try {
    while ($true) {
        Sync-Changes
        Start-Sleep -Seconds $IntervalSeconds
    }
} catch {
    Write-Host "`nAuto-sync stopped." -ForegroundColor Yellow
}
