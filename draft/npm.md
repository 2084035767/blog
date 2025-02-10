---
title: 关于| npm 
date: 2025-1-1
categories: 
  - 知识了解
---





# npm

## 一、npm 简介

npm（Node Package Manager）是 Node.js 的包管理器，用于管理 JavaScript 库和框架。通过 npm，开发者可以轻松安装、共享和管理代码，极大地提高了开发效率。本文将详细介绍 npm 的使用方法、包和模块的概念、以及如何发布和管理包。

## 二、开始使用 npm

### 1. 创建用户

首先，需要在 [npm 官网](https://www.npmjs.com/signup) 注册一个账号。注册时，用户名和邮箱将被公开展示，因此请谨慎选择。注册完成后，可以在终端中使用 `npm login` 命令登录。如果账号开启了两步验证，还需要输入一次性密码。使用 `npm whoami` 可以查看当前登录的账号。

### 2. 安装 npm

安装 Node.js 时，npm 会自动安装。但为了使用最新版的 npm，可以运行以下命令进行全局安装：

bash复制

```bash
npm install npm@latest -g
```

查看当前安装的 npm 版本：

bash复制

```bash
npm -v
```

### 3. 故障排除

当包安装或发布失败时，npm 会生成 `npm-debug.log` 文件，帮助诊断问题。可以通过以下命令生成日志文件：

bash复制

```bash
npm install --timing
npm publish --timing
```

日志文件通常位于 `.npm` 目录中，可以通过 `npm config get cache` 查找该目录。

## 三、包和模块

### 1. npm 公共服务器

公共 npm 服务器是一个包含大量 JavaScript 包的数据库，任何人都可以发布和下载这些包。这些包可以是 Node 模块，也可以包含其他类型的文件。

### 2. 包和模块的介绍

#### 包 (Packages)

一个包含 `package.json` 文件的目录称为一个包。包可以是公共的或私有的，具体取决于其作用域和访问级别。

##### 包的格式

包可以是以下形式：

1. 包含 `package.json` 文件的文件夹。
2. gzip 压缩包。
3. 可解析为压缩包的 URL。
4. 发布到 npm 服务器的 `<name>@<version>` 形式。
5. 指向发布包的 `<name>@<tag>`。
6. 拥有 `latest` 标签的包。
7. Git URL，克隆后的目录必须包含 `package.json` 文件。

Git URL 形式的包可以是以下形式：

- `git://github.com/user/project.git#commit-ish`
- `git+ssh://user@hostname:project.git#commit-ish`
- `git+http://user@hostname/project/blah.git#commit-ish`
- `git+https://user@hostname/project/blah.git#commit-ish`

其中 `commit-ish` 可以是 Git 标签、提交校验和或分支，默认为 `master`。

#### 模块 (Modules)

模块是可以被 Node.js 的 `require()` 函数加载的文件或目录。模块可以是包含 `package.json` 文件的文件夹，也可以是 JavaScript 文件。并非每个模块都是一个包，只有包含 `package.json` 文件的模块才能称为包。

### 3. 包的作用域 (scopes)

作用域允许创建与其他用户或组织同名的包，而不会发生冲突。作用域包的格式为 `@<scope>/<package>`，例如 `@types/node`。

##### 作用域和包的可见性

- 非作用域包只能是公共的。
- 作用域包可以是私有的或公共的，默认是私有的。

## 四、向服务器共享包

### 1. 创建 `package.json` 文件

`package.json` 文件是包的配置文件，包含包的元数据和依赖关系。可以通过以下命令创建：

bash复制

```bash
npm init
```

或者使用 `--yes` 参数快速创建：

bash复制

```bash
npm init --yes
```

`package.json` 文件的字段包括：

- `name`：包的名称，必须是小写字母、连字符或下划线。
- `version`：包的版本号，必须遵循语义版本控制规范。
- `author`：包的作者信息。
- `dependencies`：生产环境依赖的包。
- `devDependencies`：开发环境依赖的包。

### 2. 为包添加说明文件 `README.md`

建议在包的根目录添加 `README.md` 文件，说明包的安装、配置和使用方法。

### 3. 创建和发布公开的包

1. 创建一个目录并进入该目录。
2. 初始化包并生成 `package.json` 文件。
3. 添加 `README.md` 文件。
4. 编写包的内容。
5. 检查包中是否有敏感或不必要的信息。
6. 在本地测试包。
7. 发布包到 npm 服务器：

bash复制

```bash
npm publish
```

### 4. 指定依赖包

可以通过命令行或手动编辑 `package.json` 文件来添加依赖包。例如：

bash复制

```bash
npm install <package-name>
npm install <package-name> --save-dev
```

### 5. 语义版本控制

遵循语义版本控制规范，更新包的版本号。例如：

- 修复发布：`1.0.1`
- 小版本发布：`1.1.0`
- 大版本发布：`2.0.0`

### 6. 给包添加 dist-tags

可以使用 `--tag` 参数发布带有特定标签的包：

bash复制

```bash
npm publish --tag beta
```

## 五、更新和管理已发布的包

### 1. 修改包的可见性

可以通过 npm 网站或命令行修改包的可见性。例如，将包设为私有：

bash复制

```bash
npm access restricted <package-name>
```

### 2. 给私有包添加协作者

可以通过 npm 网站或命令行添加协作者：

bash复制

```bash
npm owner add <user> <my-package-name>
```

### 3. 更新包的版本号

更新 `package.json` 文件的版本号，可以使用以下命令：

bash复制

```bash
npm version <patch | minor | major>
```

### 4. 弃用或取消弃用包或包版本

弃用一个包：

bash复制

```bash
npm deprecate <package-name> "<message>"
```

取消弃用：

bash复制

```bash
npm deprecate <package-name> ""
```

### 5. 将弃用的包转移给 npm 归档

将包转移到 npm 官方账户：

bash复制

```bash
npm owner add npm <package-name>
npm owner rm <user> <package-name>
```

### 6. 将包转移给另一个账户

将包转移给另一个用户：

bash复制

```bash
npm owner add <their-username> <package-name>
npm owner rm <user> <package-name>
```

### 7. 取消发布

取消发布一个包：

bash复制

```bash
npm unpublish <package-name> -f
```

## 六、从 npm 服务器获取包

### 1. 搜索 npm 包

在 [npm 网站](https://www.npmjs.com/) 的搜索栏中输入关键词进行搜索。

### 2. 将包安装到本地项目

安装包到本地项目：

bash复制

```bash
npm install <package_name>
```

安装特定版本：

bash复制

```bash
npm install <package_name>@<version>
```

### 3. 全局安装包

全局安装包：

bash复制

```bash
npm install -g <package_name>
```

### 4. 更新本地安装的包

更新项目依赖：

bash复制

```bash
npm update
```

### 5. 在项目中使用 npm 包

使用 `require()` 函数加载已安装的包：

JavaScript复制

```javascript
const lodash = require('lodash');
```

### 6. 卸载包

卸载本地包：

bash复制

```bash
npm uninstall <package_name>
```

卸载全局包：

bash复制

```bash
npm uninstall -g <package_name>
```

## 七、总结

npm 是 Node.js 开发者不可或缺的工具，通过本文的介绍，您应该已经掌握了 npm 的基本使用方法，包括创建用户、安装 npm、发布和管理包、以及从 npm 服务器获取包。合理使用 npm，可以极大地提高开发效率，帮助您更好地管理和共享代码。