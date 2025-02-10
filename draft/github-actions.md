---
title: 关于| GitHub Actions
date: 2023-10-11
categories:
  - 知识科普
tags:
  - GitHub
---

# GitHub Actions 

::: tip





:::



## 一、核心组件

### 1. Workflow（工作流）
- **定义**：一个可配置的自动化流程，由 YAML 文件描述。  
- **触发方式**：支持代码事件（如 `push`、`pull_request`）、定时任务或手动触发。  
- **作用**：一个仓库可包含多个工作流，例如一个用于构建测试，另一个用于部署。

### 2. Event（事件）
- **作用**：触发工作流的条件，如代码推送（`push`）、新建 Issue（`issues`）等。  
- **扩展配置**：可指定触发分支、标签或文件路径。例如：  
  ```yaml
  on:
    push:
      branches: [main]
      paths: ['src/**']
  ```

### 3. Job（任务）
- **定义**：工作流中的独立任务组，可并行或串行执行。  
- **依赖关系**：通过 `needs` 字段定义任务顺序。例如：  
  ```yaml
  jobs:
    job1: ...
    job2:
      needs: job1  # 等待 job1 完成后执行
  ```

### 4. Step（步骤）
- **组成**：每个任务由多个步骤构成，步骤可以是脚本命令或预定义的 Action。  
- **数据传递**：同一任务中的步骤共享运行环境，支持数据传递。

### 5. Action（动作）
- **作用**：封装重复操作的独立单元，如拉取代码、安装依赖等。  
- **复用性**：可直接使用 GitHub 市场的 Action，或自定义实现。

### 6. Runner（运行器）
- **定义**：执行工作流的虚拟机环境，支持 Ubuntu、Windows 和 macOS。  
- **自定义**：如需特殊环境，可[自行托管运行器](https://docs.github.com/actions/hosting-your-own-runners)。

---

## 二、创建第一个工作流

### 1. 文件结构
工作流文件需存储在 `.github/workflows` 目录下，扩展名为 `.yml`。  

### 2. 示例：自动测试 Node.js 项目
以下工作流会在代码推送时，安装依赖并运行测试：  
```yaml
name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2      # 检出代码
      - uses: actions/setup-node@v2    # 安装 Node.js
        with:
          node-version: 16
      - run: npm install               # 安装依赖
      - run: npm test                  # 运行测试
```

### 3. 关键配置解析
- **`name`**：工作流名称（显示在 GitHub Actions 面板）。  
- **`on`**：触发事件，支持数组（如 `[push, pull_request]`）。  
- **`jobs.<job_id>.runs-on`**：指定运行环境（如 `ubuntu-latest`）。  
- **`steps`**：步骤顺序执行，`uses` 调用 Action，`run` 执行脚本。

---

## 三、进阶用法

### 1. 环境变量与密钥管理
- **环境变量**：通过 `env` 字段定义，或在步骤中注入：  
  ```yaml
  steps:
    - name: Print env
      run: echo $MY_VAR
      env:
        MY_VAR: Hello World
  ```
- **密钥管理**：敏感信息（如 API Key）通过仓库的 `Settings > Secrets` 存储，工作流中引用：  
  ```yaml
  with:
    token: ${{ secrets.API_KEY }}
  ```

### 2. 跨仓库同步示例
以下工作流将 GitHub 代码同步至 Gitee：  
```yaml
name: Sync to Gitee
on:
  push:
    branches: [main]
jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: Yikun/hub-mirror-action@master
        with:
          src: github/your-username
          dst: gitee/your-username
          dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}
          dst_token: ${{ secrets.GITEE_TOKEN }}
```



## 四、实用技巧与资源

### 1. 调试与日志
- 使用 `debug: true` 开启详细日志。  
- 通过 GitHub 仓库的 **Actions** 标签页查看执行记录。

### 2. 常用 Action 推荐
- [`actions/checkout`](https://github.com/actions/checkout)：检出代码。  
- [`actions/setup-node`](https://github.com/actions/setup-node)：配置 Node.js 环境。  
- [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages)：自动部署到 GitHub Pages。

### 3. 学习资源
- [官方文档](https://docs.github.com/actions)：全面了解工作流语法与最佳实践。  
- [GitHub 市场](https://github.com/marketplace?type=actions)：探索现成 Action。  



## 参考三三

- https://juejin.cn/post/7042619884643024903
- http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html
