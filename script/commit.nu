#!/usr/bin/env nu

# 常用提交类型
let types = [
    "feat: 新增功能",
    "fix: 修复缺陷",
    "docs: 文档更新",
    "style: 代码格式/样式调整",
    "refactor: 重构代码"
]

# 打印菜单
print "\n请选择本次提交类型（输入 1-6）：\n"
for $i in 0..<($types | length) {
    print $"($i + 1). ($types | get $i)"
}
print "6. 自定义提交信息\n"

# 读取并校验选择
mut $choice = ""
while $choice not-in ["1" "2" "3" "4" "5" "6"] {
    $choice = (input "输入选项：")
}

# 生成提交信息
let commitMessage = if $choice == "6" {
    input "请输入自定义提交信息："
} else {
    $types | get ((($choice | into int) - 1))
}

# 执行 Git 操作
git add .
git commit -m $commitMessage
git push

print $"已提交到仓库：($commitMessage)"