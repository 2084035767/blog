---
title: "第230期 - 蓝色夜晚"
date: 2025-07-21
desc: "本期聊聊工程师如何投资、蓝色夜空的治愈瞬间，外加 8 个实用工具/文章推荐"
cover: "https://pic3.zhimg.com/v2-8e2e2c6e3f2f4b4f8f6b7d2c9b1f0f72_r.jpg"
tags: ["投资", "效率工具", "前端"]
---

## 🌃 封面故事
封面拍于周一晚 22:15，躺在小区躺椅上，头顶大树，天空是刚刚好的普鲁士蓝。风把白日的燥热吹散，耳机里放的是《Pale Blue Dot》，突然觉得写周刊的这一刻就是「程序员的不枯燥生活」。

## 📝 本周主题
> 工程师如何更好投资  
> 原文：/money.html  
> 上周给团队做了一次快闪分享，周末整理成文。核心结论：  
> 1. 工资现金流是基本盘，先保值后增值；  
> 2. 美股 70% 仓位建议通过指数化 + 期权对冲；  
> 3. 永远不要 All in，留 6 个月生活费的子弹。  
> （⚠️ 非投资建议，仅个人记录）

## 🔧 潮流工具
- [Raycast 1.80](https://raycast.com) – 新增「AI Quick Reply」，一键生成邮件回复；  
- [Figma Slides](https://figma.com/slides) – 体验完爆 Google Slides，支持实时变量；  
- [NoTab](https://notab.app) – 当前页悬浮预览外链，看论文省 30% 时间。

## 📚 文章/资源
1. [《Designing for Friction》](https://example.com/friction) – 为什么刻意加一点阻力反而提升 UX；  
2. 电子书《Rust Atomics & Locks》开放下载，[repo 地址](https://github.com/example)；  
3. 交互式正则可视化 [regex-vis](https://regex-vis.com)。

## 👀 一行代码
```js
// 一行获取 macOS 当前 Wi-Fi 名
console.log(await $`networksetup -getairportnetwork en0`.stdout.split(': ')[1]);