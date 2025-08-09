#!/usr/bin/env nu

# 目标目录
let targetDir = "F:..\\docs\\weekly"

# 如目录不存在则自动创建
if not ($targetDir | path exists) {
  mkdir $targetDir
}

# 文件名：2025-08-01.md
let today = (date now | format date "%Y-%m-%d")
let filePath = ($targetDir | path join $"($today).md")

# 文件内容
let header = $"---
title: 《诗与周刊》 No.00
date: ($today)
description: \"从博客《为自由献诗》延伸的技术碎思 | 代码·分享·娱乐 | 创刊号\"
poem:
---

# 天边云霞 <Badge type=\"tip\" text=\" \" />

## 胡言乱语

## 值得分享

-

## 编程手札

-

## 清闲半日

-
"

# 写入并提示
$header | save --raw $filePath
print $"✅ 已创建：($filePath)"