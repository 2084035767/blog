---
title: 胡说| 包管理简明使用
date: 2024-1-8
categories: 
  - 编程知识
tags: 
  - npm
order: 1
---

# 包管理简明使用

::: tip 前言

上次胡说了 “package.json”文件，其实它就是包管理的“产物“，所以这次说说**包管理**

:::

## 包管理器简介

> 这次主要注重操作，就不详细讲含义了😉

**包管理器(package manager)**（或“软件包管理器”）是一种工具，它允许用户在操作系统上安装、删除、升级、配置和管理软件包。软件包管理器可以是像“软件中心”这样的图形化应用，也可以是命令行工具。



## JS的常用包管理器

#### npm<Badge type="tip" text="node"/>

npm 是 Node.js 的官方包管理器，也是 JavaScript 生态系统中最受欢迎的包管理器之一。npm 具有许多强大的功能，例如自动依赖项解析和版本控制。但是，由于它是单线程解析依赖项，因此安装速度可能相对较慢。

#### yarn<Badge type="tip" text="react"/>

yarn 是 Facebook 开发的包管理器，旨在解决 npm 的一些问题。yarn 通过并行下载和缓存来加快安装速度，并通过锁定文件确保安装过程中使用相同的依赖项版本。此外，yarn 还提供了一些其他功能，例如离线模式和更好的脚本执行。

#### pnpm<Badge type="tip" text="我常用的"/>

pnpm 是另一个 JavaScript 包管理器，它与 npm 和 yarn 相比有一些不同之处。pnpm 具有类似于 yarn 的速度和稳定性，但与 yarn 不同的是，它采用了一种不同的依赖项解析方法，即将依赖项安装在单个位置，并使用符号链接将它们链接到每个项目中。

| 特点       | npm              | yarn             | pnpm             |
| ---------- | ---------------- | ---------------- | ---------------- |
| 安装速度   | 相对较慢         | 快               | 最快             |
| 版本控制   | 有               | 有               | 有               |
| 离线模式   | 不支持           | 支持             | 支持             |
| 并行下载   | 不支持           | 支持             | 支持             |
| 内存管理   | 一般             | 一般             | 更好             |
| 依赖项缓存 | 占用较多磁盘空间 | 占用较多磁盘空间 | 占用较少磁盘空间 |
| 兼容性     | 良好             | 良好             | 可能存在问题     |
| 社区支持   | 广泛支持         | 广泛支持         | 较新，支持较少   |

## 基础命令

> pnpm 用法类似 npm，以下省略😶

### 初始化项目

::: code-group

```sh [npm]
# 初始化项目
npm init

# 快速生成的package.json默认配置
npm init -y
```

```sh [yarn]
# 初始化项目
yarn init

# 快速生成的package.json默认配置
yarn init -y
```

:::

### 安装依赖

::: code-group

```sh [npm]
# 安装全部依赖
npm install
npm i # 简写

# 安装依赖
npm install <package>
npm i <package>

# 安装指定版本
npm i <package>@<version>
npm i <package>@<tag>

# 全局安装依赖
npm i -g <package>
```



```sh [yarn]
# 安装全部依赖
yarn
yarn install

# 安装依赖
yarn add <package>

# 安装指定版本
yarn add <package>@<version>
yarn add <package>@<tag>

# 全局安装依赖
yarn global add <package>
```

:::

::: details 知识扩展

#### 安装失败

安装依赖时卡断，或者中断安装依赖，后面再重新安装，会提示报错这是因为有缓存的原因

```sh [yarn]
# 1.删除 node_modules 包重新安装

# 2.删除缓存
npm cache clean --force
```



#### 额外参数

`--no-save`：项目临时依赖

`--save`：项目生产依赖，简写 -S

```sh
npm install <package> -S
```

`--save-dev`：项目开发依赖，简写 -D

```sh
npm install <package> -D
```



:::

### 管理依赖

> 全局依赖添加 `-g` 或 `global` 参数，以下省略全局依赖😶

::: code-group

```sh [npm]
# 查看项目依赖
npm list

# 更新全部依赖
npm update

# 更新指定依赖
npm update <package>
```



```sh [yarn]
# 查看项目依赖
yarn list

# 更新全部依赖
yarn upgrade

# 更新指定依赖
yarn upgrade <package>
```

:::

### 卸载依赖

> 全局依赖添加 `-g` 或 `global` 参数，以下省略全局依赖😶

::: code-group

```sh [npm]
# 卸载依赖
npm uninstall <package>
```



```sh [yarn]
# 卸载依赖
yarn remove <package>
```

:::

### 运行脚本

> 就是 “package.json”文件里的 “scripts” 字段，你不会忘了吧🤔

::: code-group

```sh [npm]
# 运行脚本
npm run [script]
```



```sh [yarn]
# 运行脚本
yarn run [script]
```



```sh [pnpm]
# 运行脚本
pnpm run [script]
```

:::



### 管理镜像源

> 此处不推荐国内源，请自寻查找

```sh
# 查看当前镜像源
npm config get registry

yarn config get registry

# 设置镜像源
# 全局使用
npm config set registry https://registry.npmmirror.com

# 临时使用
npm i --registry https://registry.npmmirror.com

# 还原镜像源
npm config set registry https://registry.npmjs.org
```



#### 管理镜像源工具

```sh
npm install -g yrm

npm install -g nrm

# 列出当前镜像源
nrm ls

# 测试镜像源
nrm test taobao

# 使用镜像源
nrm use taobao
```

## 写在最后

> 恭喜你学会了包管理基础命令🎉。想要深度学习，请查询相关资料。

这些命令是最基础的同时也是最常用的，只要学会这些你就会80%的操作（**80%**，我说的😉）



## 参考三三

- https://juejin.cn/post/7226661422021754936

- https://juejin.cn/post/7009674584211324964
