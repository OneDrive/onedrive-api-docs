Param(
    [switch]$cleanUp
)
$repoPath = (Get-Location).Path

Write-Host "Repository location: ", $repoPath

# Download nuget.exe from the nuget server if required
$nugetPath = Join-Path $repoPath -ChildPath "nuget.exe"
$nugetExists = Test-Path $nugetPath
if ($nugetExists -eq $false) {
    Write-Host "nuget.exe not found. Downloading from dist.nuget.org"
    Invoke-WebRequest -Uri "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe" -OutFile $nugetPath
}

$packagesPath = Join-Path $repoPath -ChildPath "markdown-scanner"
$result = New-Item -ItemType Directory -Force -Path $packagesPath

# install markdown scanner from nuget
Write-Host "Running nuget.exe from ", $nugetPath
$nugetParams = "install", "MarkdownScanner.BinaryTools", "-OutputDirectory", $packagesPath, "-NonInteractive"
& $nugetPath $nugetParams

if ($LastExitCode -ne 0) { 
    # nuget error, so we can't proceed
    Write-Host "Error installing Markdown Scanner from NuGet. Aborting."
    Remove-Item $nugetPath
    exit $LastExitCode
}

# get the path to the markdown-scanner exe
$pkgfolder = Get-ChildItem -LiteralPath $packagesPath -Directory | Where-Object {$_.name -match "MarkdownScanner.BinaryTools."}
$apidocs = [System.IO.Path]::Combine($packagesPath, $pkgfolder.Name, "tools\apidocs.exe")

$lastResultCode = 0

# check links at the root of the repository
$parms = "check-links", "--path", $repoPath
& $apidocs $parms

if ($LastExitCode -ne 0) { 
    $lastResultCode = $LastExitCode
}

# check documents in each api reference set

$path = Join-Path $repoPath -ChildPath "api-reference"
$reference_paths = [System.IO.Directory]::GetDirectories($path)
ForEach($reference in $reference_paths)
{
    # if ([string]::IsNullOrEmpty($env:APPVEYOR_PULL_REQUEST_NUMBER)) 
    #{
        # Run the checks on all files
        $parms = "check-docs", "--path", $reference
    #}
    #else 
    #{
        # Run the checks only on files changed since the master branch
        # $parms = "check-docs", "--path", $reference, "--changes-since-branch-only", $env:APPVEYOR_REPO_BRANCH
    #}

    & $apidocs $parms    
    if ($LastExitCode -ne 0) { 
        $lastResultCode = $LastExitCode
    }
}

# Clean up the stuff we downloaded
if ($cleanUp -eq $true) {
    Remove-Item $nugetPath 
    Remove-Item $packagesPath -Recurse
}

if ($lastResultCode -ne 0) {
    Write-Host "Errors were detected. This build failed."
    #$host.SetShouldExit($lastResultCode)
    exit $lastResultCode
}