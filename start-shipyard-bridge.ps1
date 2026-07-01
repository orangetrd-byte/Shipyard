$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent $PSCommandPath
$bridge = Join-Path $repo "shipyard-bridge.mjs"
$logDir = Join-Path $env:LOCALAPPDATA "Shipyard"
$logFile = Join-Path $logDir "shipyard-bridge.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  "[$(Get-Date -Format s)] Node.js was not found in PATH." | Out-File -FilePath $logFile -Append
  exit 1
}

if (-not ($env:SHIPYARD_GITHUB_TOKEN -or $env:GITHUB_TOKEN)) {
  "[$(Get-Date -Format s)] SHIPYARD_GITHUB_TOKEN is not set." | Out-File -FilePath $logFile -Append
  exit 1
}

"[$(Get-Date -Format s)] Starting Shipyard bridge." | Out-File -FilePath $logFile -Append
Set-Location $repo
node $bridge *>> $logFile
