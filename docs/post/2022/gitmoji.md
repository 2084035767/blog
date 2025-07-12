---
title: 胡说| Gitmoji 简明使用
date: 2022-10-24
categories:
  - 知识科普
tags: 
  - Git
order: 10
---

# Gitmoji 简明使用

::: tip 前言

最近查看别人仓库，看见别人的 “commit” 竟然有表情？那我得查查🧐

:::

## 简介

- `Gitmoji` 是一种在 「Git」 提交信息中使用 “emoji” 的约定，旨在通过使用图形符号来传达更多的信息和情感。`Gitmoji` 的目标是使 Git 提交信息更加有趣、易读和可理解，从而帮助团队成员更好地合作和交流。
- 每个 `Gitmoji` 表示一种特定的含义或情感，例如添加新功能、修复错误、优化代码等。它们由一个 “emoji” 表情符号和一个简短的描述组成，用于在提交信息中传达意图。`Gitmoji ` 提供了一种简单而直观的方式来快速了解提交的目的和内容。
- `Gitmoji` 的优点在于它能够提供更丰富的信息，帮助团队成员更好地理解提交的目的和内容。它还可以增加提交信息的可读性，使团队成员更容易浏览和理解提交历史。



## 使用方法

::: tip 说明

因为 `Gitmoji` 作者暂时没有支持 「i18n」 的计划，所以 `Gitmoji` 中文网站都是“fork”项目更新。由于没有中文官网，我随机选取了最近的一个中文站点。

:::

### 简要步骤

1. 在计算机上安装 `Gitmoji` 插件或下载 `Gitmoji` 表情符号集。「vscode」 有相关插件可使用。
2. 写提交消息时，在消息开头使用一个 `Gitmoji 表情符号来描述工作类型。例如，“`:bug:`修复了一个错误”或“`:sparkles:` 添加了新功能”。
4. 编写有意义和易于理解的提交消息，以便任何人都可以轻松地理解你所做的更改。

正确的格式应该是：

```bash
git commit -m ":emoji: 描述"
```

> 想必常用「Git」的同学瞬间明白了，其实就是规范了“commit”😶



## 常用符号表格

::: warning

摘抄自 [Gitmoji 中文网](https://neko.ayaka.moe/gitmoji/) ，该站 66 个，官网 73 个。

:::

| Emoji | 代码                 | 含义                                                         |
| ----- | -------------------- | ------------------------------------------------------------ |
| ✨     | `:sparkles:`         | 引入新功能（Introducing new features）                       |
| 🔥     | `:fire:`             | 删除代码或文件（Removing code or files）                     |
| 🐛     | `:bug:`              | 修复 bug（Fixing a bug）                                     |
| 🚑     | `:ambulance:`        | 解决紧急问题（Fixing a critical issue）                      |
| 📝     | `:memo:`             | 添加或更新文档（Add or update documentation）                |
| ⚡     | `:zap:`              | 提升性能（Improve performance）                              |
| 🎨     | `:art:`              | 改进代码结构或代码风格（Improving structure / format of the code） |
| 🚀     | `:rocket:`           | 部署应用、发布版本（Deploying stuff）                        |
| 🎉     | `:tada:`             | 开始一个项目（Begin a project）                              |
| 🙈     | `:see_no_evil:`      | 添加或更新 .gitignore 文件（Adding or updating .gitignore）  |
| 💄     | `:lipstick:`         | 更新 UI 和样式文件（Updating the UI and style files）        |
| 📄     | `:page_facing_up:`   | 添加或更新许可证文件（Adding or updating license）           |
| ✅     | `:white_check_mark:` | 添加、更新、或通过一个测试（Add, update, or pass tests）     |
| 🛠️     | `:tools:`            | 构建过程或 CI 相关更改（Build related changes）              |
| 🎯     | `:dart:`             | 持续集成（CI）相关更改（Continuous Integration related changes） |
| 🛠️     | `:tools:`            | 持续交付（CD）相关更改（Continuous Delivery related changes） |



## 写在最后

`Gitmoji`只是规范“commit”的一个工具，只要你遵循“commit”规范，可以不用。

> `Gitmoji`算是一个很有意思的项目，大家可以尝试一下。下期见😉



## 参考三三

- https://neko.ayaka.moe/gitmoji/
