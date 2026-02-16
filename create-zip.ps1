# =====================================
# WinRAR Smart ZIP (KEEP FOLDERS)
# =====================================

$ProjectPath = Get-Location
$ProjectName = Split-Path $ProjectPath -Leaf
$Rar = "C:\Program Files\WinRAR\rar.exe"

if (!(Test-Path $Rar)) {
    Write-Host "RAR.exe not found" -ForegroundColor Red
    exit
}

# ---- zip name ----
$Date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$ZipName = "$ProjectName`_$Date.zip"
$ZipPath = Join-Path $ProjectPath $ZipName
$ListFile = Join-Path $ProjectPath "__ziplist.txt"

Write-Host "Preparing file list..." -ForegroundColor Yellow

Push-Location $ProjectPath

Get-ChildItem -Recurse -Force | Where-Object {
    $_.FullName -notmatch '\\node_modules\\' -and
    $_.FullName -notmatch '\\\.git\\' -and
    $_.FullName -notmatch '\\build\\' -and
    -not $_.PSIsContainer
} | ForEach-Object {
    Resolve-Path -Relative $_.FullName
} | Set-Content $ListFile -Encoding ASCII

Write-Host "Creating ZIP -> $ZipName" -ForegroundColor Cyan

& "$Rar" a -m1 -idq "$ZipPath" "@$ListFile"

Pop-Location
Remove-Item $ListFile -Force -ErrorAction SilentlyContinue

if (Test-Path $ZipPath) {
    Write-Host "ZIP created successfully with folders!" -ForegroundColor Green
} else {
    Write-Host "ZIP failed!" -ForegroundColor Red
}
