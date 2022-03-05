function Get-GitStatus { & git status $args }
New-Alias -Name gstatus -Value Get-GitStatus
function Get-GitPullMain { & git pull origin main }
New-Alias -Name gplmain -Value Get-GitPullMain
function Get-GitPullMaster { & git pull origin master }
New-Alias -Name gplmaster -Value Get-GitPullMaster
function Get-GitPushMain { & git push origin main }
New-Alias -Name gphmain -Value Get-GitPushMain
function Get-GitPushMaster { & git push origin master }
New-Alias -Name gphmaster -Value Get-GitPushMaster
function Get-GitAdd { & git add $args }
New-Alias -Name ga -Value Get-GitAdd
function Get-GitCommit { & git commit -m $args }
New-Alias -Name gct -Value Get-GitCommit



