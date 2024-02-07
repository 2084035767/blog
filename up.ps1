$commitMessage = ""
while ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = Read-Host -Prompt "请输入提交信息"
}
# 添加所有更改
git add .
# 提交更改
git commit -m $commitMessage
# 推送仓库
git push
Write-Host "已提交到仓库。"






