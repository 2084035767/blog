# 常用提交类型
$types = @(
    "feat: 新增功能",
    "fix: 修复缺陷",
    "docs: 文档更新",
    "style: 代码格式/样式调整",
    "refactor: 重构代码"
)

# 打印菜单
Write-Host "`n请选择本次提交类型（输入 1-5）：`n"
for ($i = 0; $i -lt $types.Count; $i++) {
    Write-Host ("{0}. {1}" -f ($i + 1), $types[$i])
}

# 读取并校验选择
do {
    $choice = Read-Host "`n输入选项"
} while ($choice -notmatch '^[1-5]$')

# 生成提交信息
$commitMessage = $types[[int]$choice - 1]

# 执行 Git 操作
git add .
git commit -m $commitMessage
git push

Write-Host "`n已提交到仓库：$commitMessage"






