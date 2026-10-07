$appPath = Join-Path $PSScriptRoot '..\..\practice-software-testing'
Push-Location $appPath

docker compose -f docker-compose.prod.yml up -d
docker exec -u root practice-software-testing-laravel-api-1 chown -R www-data:www-data storage bootstrap/cache

Pop-Location
Write-Host 'Toolshop is running: UI http://localhost:4200 | API http://localhost:8091' -ForegroundColor Green