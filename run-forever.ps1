$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir
while ($true) {
  Write-Output "[run-forever] Starting Next dev at $(Get-Date)"
  npm run dev
  $exit = $LASTEXITCODE
  Write-Output "[run-forever] Next exited with code $exit. Restarting in 2s..."
  Start-Sleep -Seconds 2
}
