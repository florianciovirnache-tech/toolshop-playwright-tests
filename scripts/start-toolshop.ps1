$appPath = Join-Path $PSScriptRoot '..\..\practice-software-testing'
Push-Location $appPath

docker compose -f docker-compose.prod.yml up -d

for ($i = 1; $i -le 30; $i++) {
    docker compose -f docker-compose.prod.yml exec -T laravel-api php artisan migrate:fresh --seed --force
    if ($LASTEXITCODE -eq 0) { break }
    Write-Host 'Database not ready yet, retrying in 5s...' -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

docker compose -f docker-compose.prod.yml exec -T --user root laravel-api chown -R www-data:www-data storage bootstrap/cache

Pop-Location
Write-Host 'Toolshop is running: UI http://localhost:4200 | API http://localhost:8091' -ForegroundColor Green