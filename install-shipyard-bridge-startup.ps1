$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent $PSCommandPath
$starter = Join-Path $repo "start-shipyard-bridge.ps1"
$startup = [Environment]::GetFolderPath("Startup")
$shortcutPath = Join-Path $startup "Shipyard Codi Bridge.lnk"
$pwsh = (Get-Command pwsh -ErrorAction SilentlyContinue).Source

if (-not $pwsh) {
  $pwsh = (Get-Command powershell -ErrorAction Stop).Source
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $pwsh
$shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$starter`""
$shortcut.WorkingDirectory = $repo
$shortcut.Description = "Start the Shipyard local Codi bridge at login"
$shortcut.Save()

Write-Host "Installed Shipyard bridge startup shortcut:"
Write-Host $shortcutPath
