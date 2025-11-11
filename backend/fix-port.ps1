# Script to fix port conflicts
Write-Host "Checking port usage..." -ForegroundColor Cyan

$port = 3000
Write-Host "`nChecking port $port..." -ForegroundColor Yellow
$connections = netstat -ano | findstr ":$port"

if ($connections) {
    Write-Host "Port $port is in use:" -ForegroundColor Red
    $connections | ForEach-Object {
        if ($_ -match '\s+(\d+)$') {
            $pid = $matches[1]
            $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "  PID: $pid - $($process.ProcessName) - $($process.Path)" -ForegroundColor Yellow
            } else {
                Write-Host "  PID: $pid (process not found)" -ForegroundColor Gray
            }
        }
    }
    Write-Host "`nTo kill the process on port $port, run:" -ForegroundColor Yellow
    Write-Host "  Get-Process -Id <PID> | Stop-Process -Force" -ForegroundColor White
} else {
    Write-Host "Port $port is available" -ForegroundColor Green
}

Write-Host "`nBackend Configuration:" -ForegroundColor Cyan
if (Test-Path .env) {
    $portConfig = Get-Content .env | Select-String "PORT="
    if ($portConfig) {
        Write-Host "  $portConfig" -ForegroundColor Green
        Write-Host "`nBackend should use port 3001 (or the port specified in .env)" -ForegroundColor Yellow
    } else {
        Write-Host "  PORT not found in .env, will default to 3001" -ForegroundColor Yellow
    }
} else {
    Write-Host "  .env file not found" -ForegroundColor Red
    Write-Host "  Creating .env with PORT=3001..." -ForegroundColor Yellow
    "PORT=3001`nUSE_SQLITE=true`nNODE_ENV=development" | Out-File -FilePath .env -Encoding utf8
}

Write-Host "`nNote: If you see EADDRINUSE error on port 3000, it means:" -ForegroundColor Cyan
Write-Host "  1. The backend is trying to use port 3000 (should be 3001)" -ForegroundColor White
Write-Host "  2. Restart the backend after creating/updating .env file" -ForegroundColor White
Write-Host "  3. Or kill the process on port 3000 if it's a stuck backend instance" -ForegroundColor White

