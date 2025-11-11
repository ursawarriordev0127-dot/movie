# PostgreSQL Connection Check Script for Windows
Write-Host "Checking PostgreSQL connection..." -ForegroundColor Cyan

$host = $env:DB_HOST
if (-not $host) { $host = "localhost" }

$port = $env:DB_PORT
if (-not $port) { $port = 5432 }

$database = $env:DB_NAME
if (-not $database) { $database = "movie_app" }

Write-Host "`nConnection Details:" -ForegroundColor Yellow
Write-Host "  Host: $host"
Write-Host "  Port: $port"
Write-Host "  Database: $database"

# Check if PostgreSQL service is running
Write-Host "`nChecking PostgreSQL service..." -ForegroundColor Cyan
$service = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue

if ($service) {
    $running = $service | Where-Object { $_.Status -eq "Running" }
    if ($running) {
        Write-Host "  ✓ PostgreSQL service is running" -ForegroundColor Green
        Write-Host "    Service: $($running.Name)" -ForegroundColor Gray
    } else {
        Write-Host "  ✗ PostgreSQL service is not running" -ForegroundColor Red
        Write-Host "`nTo start PostgreSQL, run:" -ForegroundColor Yellow
        Write-Host "  Start-Service -Name `"$($service[0].Name)`"" -ForegroundColor White
    }
} else {
    Write-Host "  ✗ PostgreSQL service not found" -ForegroundColor Red
    Write-Host "`nPlease ensure PostgreSQL is installed and the service is configured." -ForegroundColor Yellow
}

# Check if port is accessible
Write-Host "`nChecking port $port..." -ForegroundColor Cyan
try {
    $connection = Test-NetConnection -ComputerName $host -Port $port -WarningAction SilentlyContinue -ErrorAction Stop
    if ($connection.TcpTestSucceeded) {
        Write-Host "  ✓ Port $port is accessible" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Port $port is not accessible" -ForegroundColor Red
    }
} catch {
    Write-Host "  ✗ Cannot connect to $host`:$port" -ForegroundColor Red
    Write-Host "    Error: $_" -ForegroundColor Gray
}

Write-Host "`nTroubleshooting Steps:" -ForegroundColor Yellow
Write-Host "1. Ensure PostgreSQL is installed" -ForegroundColor White
Write-Host "2. Start PostgreSQL service: Start-Service -Name `"postgresql-x64-*`"" -ForegroundColor White
Write-Host "3. Create database: createdb -U postgres movie_app" -ForegroundColor White
Write-Host "4. Check your .env file for correct DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME" -ForegroundColor White

