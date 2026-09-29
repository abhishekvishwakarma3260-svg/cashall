$token = "vcp_5anknGNMa7RyBhYHUyyCl7dfENDpWS5XZ0A2DjtOQDz6h9Kg7N0GgJ8R"
$projectId = "prj_TwjxxPl7JfESsWNQ1qAVXBawZ0M2"
$teamId = "team_dqUGL0KqFNWEzRNav2uBQmJN"

$headers = @{
    Authorization = "Bearer $token"
    "Content-Type" = "application/json"
}

$envLines = Get-Content ".env"
$envDict = @{}

foreach ($line in $envLines) {
    $trimmed = $line.Trim()
    if ($trimmed -and -not $trimmed.StartsWith("#")) {
        $idx = $trimmed.IndexOf("=")
        if ($idx -gt 0) {
            $key = $trimmed.Substring(0, $idx).Trim()
            $val = $trimmed.Substring($idx + 1).Trim()
            if ($val.StartsWith('"') -and $val.EndsWith('"') -and $val.Length -ge 2) {
                $val = $val.Substring(1, $val.Length - 2)
            }
            if ($key -notmatch "^(VERCEL|TURBO|NX_)") {
                $envDict[$key] = $val
            }
        }
    }
}

Write-Host "Syncing $($envDict.Count) environment variables to Vercel..."

foreach ($key in $envDict.Keys) {
    $val = $envDict[$key]
    $body = @{
        key = $key
        value = $val
        type = "encrypted"
        target = @("production", "preview", "development")
    } | ConvertTo-Json

    try {
        $res = Invoke-RestMethod -Uri "https://api.vercel.com/v10/projects/$projectId/env?teamId=$teamId" -Method Post -Headers $headers -Body $body -ErrorAction Stop
        Write-Host "✓ Added $key"
    } catch {
        Write-Host "! Failed to add $key : $_"
    }
}

Write-Host "All environment variables synced successfully!"
