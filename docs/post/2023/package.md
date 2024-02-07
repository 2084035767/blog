---
title: 胡说| packageJson 基础认识
date: 2023-1-24
categories: 
  - 编程知识
tags: 
  - npm
  - Node.js
---



::: tip 前言

在几乎所有前端项目都会见到 `package.json` 文件，这是啥啊？🤔

:::

## 概述

`package.json`必须是一个严格的json文件，而不仅仅是js里边的一个对象。其中很多属性可以通过`npm-config`来生成

## 重要字段

> 如果你不打算发布，那它们就可有可无了😮

`package.json` 中最重要的两个字段是 `name` 和 `version`，这两个属性是必须要有的，否则模块就无法被安装。这两个属性一起形成了一个npm模块的唯一标识符。模块中内容变更的同时，模块版本也应该一起变化。 

### `name`

`name`属性就是你的模块名称

```json
{
  "name": "my-awesome-package"
}
```

**命名规则**

> npm 规定 name 必须唯一，所以 npm 中有的你就不能使用了😮。

- 必须小于或等于214个字符（包括 `@scope/` for 范围包）。
- 不能以点（`.`）或下划线（`_`）开头。
- 名称中不得包含大写字母。
- 必须仅使用URL安全字符。

- 不要使用和 `Node.js` 核心模块相同的名字。
- 不要在名字里包含 `js` 或者 `node` 单词。
- 取个简短而语义化的值。它也许会被用在 `require()` 参数中。
- 保证名字在 [npm registry](https://www.npmjs.com/) 里是唯一的。

### `version`

> 语义化版本规范也非常有讲头，挖个坑吧🤪

模块的版本，严格遵循[语义化版本规范](https://semver.org/lang/zh-CN/)。使用`x.y.z`形式，对应`主版本.次版本.修订版本` ，版本号递增规则如下：

- 主版本（major）：当你做了不兼容的 API 修改，一般改动很大，不兼容低版本
- 次版本（minor）：当你做了向下兼容的功能性新增，兼容同一个大版本的 API 和用法
- 修订版本（patch）：当你做了向下兼容的问题修正，一般用来修复 bug

```json
{
  "version": "1.0.0"
}
```

## 信息字段

### `description`

`description` 是帮助使用者了解包的功能的字符串，包管理器也会把这个字符串作为搜索关键词。

```json
{
  "description": "我的包的概要简短描述"
}
```

### `keywords`

关键字是一个字符串数组，当在包管理器里搜索包时很有用。

```json
{
  "keywords": ["short", "relevant", "keywords", "for", "searching"]
}
```

### `license`

> 推荐大家使用开源许可证，保证自己的权益。 

可以为你的包指定一个许可证，让别人知道使用该包是否有许可限制。

```json
{
  "license": "MIT",
  "license": "(MIT or GPL-3.0)",
  "license": "SEE LICENSE IN LICENSE_FILENAME.txt",
  "license": "UNLICENSED"
}
```

**规定**

- 如果你使用标准的许可证，需要一个有效地 [SPDX 许可证标识](https://spdx.org/licenses/)。
- 如果你用多种标准许可证，需要有效的 [SPDX 许可证表达式2.0语法表达式](https://www.npmjs.com/package/spdx)。
- 如果你使用非标准的许可证，一个 `SEE LICENSE IN <文件名>` 字符串指向你的包里顶级目录的一个 <文件名>。
- 如果你不想在任何条款下授权其他人使用你的私有或未公开的包，一个 `UNLICENSED` 字符串。

## 链接字段

### `homepage`

包的项目主页 URL 或者文档首页。

```json
{
  "homepage": "https://your-package.org"
}
```

### `bugs`

问题反馈系统的 URL，或者是 email 地址之类的链接。用户通过该途径向你反馈问题。

```json
{
  "bugs": "https://github.com/user/repo/issues"
}
```

### `repository`

代码托管的仓库，使用 `npm docs` 命令，可以跳转到仓库页面。

```json
{
  "repository": { "type": "git", "url": "https://github.com/user/repo.git" },
  "repository": "github:user/repo",
  "repository": "gitlab:user/repo",
  "repository": "bitbucket:user/repo",
  "repository": "gist:a1b2c3d4e5f"
}
```

## 人员字段

### `author`

作者的信息，一个人

```json
{
  "author": { "name": "Your Name", "email": "you@example.com", "url": "http://your-website.com" },
  "author": "Your Name <you@example.com> (http://your-website.com)"
}
```

### `contributors`

贡献者的信息，一个数组

```json
{
  "contributors": [
    { "name": "Your Friend", "email": "friend@example.com", "url": "http://friends-website.com" }
    { "name": "Other Friend", "email": "other@example.com", "url": "http://other-website.com" }
  ],
  "contributors": [
    "Your Friend <friend@example.com> (http://friends-website.com)",
    "Other Friend <other@example.com> (http://other-website.com)"
  ]
}
```

## 文件信息

### `files`

项目包含的文件，可以是单独的文件、整个文件夹，或者通配符匹配到的文件。当你的包被安装为一个项目依赖时，被 `files` 字段指定的文件将会被包含。

```json
{
  "files": [
    "filename.js",
    "directory/",
    "glob/*.{js,json}"
  ]
}
```



### `main`

`main` 字段是一个模块 ID，是程序的入口点。用户安装并使用导入的包，然后程序的 `package.json` 文件的 `main` 字段指定的文件导出的对象将会被返回。

```json
{
  "main": "filename.js"
}
```

### `bin`

很多包拥有一个或者多个可执行文件，并且可以安装在 PATH 中。

```json
{
  "bin": "bin.js",
  "bin": {
    "命令名称": "bin/命令路径/命令名称.js",
    "other-command": "bin/other-command"
  }
}
```



### `directories`

当包安装时，你可以指定确切的位置来放二进制文件、man pages、文档、例子等。很少使用。

```json
{
  "directories": {
    "lib": "path/to/lib/",
    "bin": "path/to/bin/",
    "man": "path/to/man/",
    "doc": "path/to/doc/",
    "example": "path/to/example/"
  }
}
```



## 打包字段

### `module`

`pkg.module` 将指向具有 `ES2015` 模块语法的模块，但仅指向目标环境支持的语法功能。 

### `browser`

字段由模块作者提供，作为 `JavaScript` 包或组件工具的提示，用于打包模块以供客户端使用。 

## 任务字段

包里可以包含一些可执行脚本或者其他配置信息。

### `scripts`

> 一般前端项目都会有“dev”，“build”两个脚本。

脚本是定义自动化开发相关任务的方法，比如使用一些简单的构建过程或开发工具。 在 `scripts` 字段里定义的脚本，可以通过 `npm run <script>` 命令来执行。 

```json
{
  "scripts": {
    "build-project": "node build-project.js"
  }
}
```

有一些特殊的命令名称。这些命令在包的生命周期的不同时间运行。 如果定义了 `preinstall` 脚本，它会在包安装前被调用。`install`、`postinstall` 和 `prepublish` 脚本会在包完成安装后被调用。

### `config`

可以用来配置 scripts 脚本的选项或参数。用户也可以通过 `npm config set bag:port 8001` 覆盖配置。

```json
{
  "config": {
    "port": "8080"
  }
}
```



## 依赖字段

你的包很可能依赖其他包。你可以在 `package.json` 文件里指定那些依赖。

### `dependencies`

指定项目开发版和发布版都需要的依赖。

```json
{
  "dependencies": {
    "package-1": "^3.1.4",
    "package-2": "file:./path/to/dir"
  }
}
```



### `devDependencies`

指定于开发环境的依赖，但是生产环境不会被安装的包。

```json
{
  "devDependencies": {
    "package-2": "^0.4.2"
  }
}
```

### `peerDependencies`

有时候模块需要与宿主模块共享依赖，也就是有可能会用到某个模块，但自己不安装，希望宿主环境安装的时候使用 peerDependencies 声明。

```json
{
  "peerDependencies": {
    "package-3": "^2.7.18"
  }
}
```

### `peerDependenciesMeta`

添加可选设置以消除丢失的对等依赖性警告

```json
{
  "peerDependenciesMeta": {
    "node-sass": {
      "optional": true
    },
    "sass": {
      "optional": true
    },
    "fibers": {
      "optional": true
    }
  }
}
```

### `optionalDependencies`

可以用于包的可选依赖，但不是必需的。如果可选包没有找到，安装还可以继续。

```json
{
  "optionalDependencies": {
    "package-5": "^1.6.1"
  }
}
```

### `bundledDependencies`

打包依赖，在发布时会将这个对象指定的包，一起打包到最终要发布的包里。

```json
{
  "bundledDependencies": [
    "package-4"
  ]
}
```

### `overrides`

如果您需要对依赖项的依赖项进行特定更改，例如用已知的安全问题替换依赖项的版本，用 fork 替换现有的依赖项，或者确保在所有地方都使用相同版本的包，那么 您可以添加 `override`。

## 系统字段

你可以提供和你的包关联的系统级的信息，比如操作系统兼容性之类。

### `engines`

指定使用你的包客户必须使用的版本，这将检查 `process.versions` 以及当前 `yarn` 版本。

```json
{
  "engines": {
    "node": "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0",
    "node": ">=4.4.7 <7.0.0",
    "zlib": "^1.2.8",
    "yarn": "^0.14.0"
  }
}
```

### `os`

此选项指定你的包的操作系统兼容性，它会检查 `process.platform`。

```json
{
  "os": ["darwin", "linux"],
  "os": ["!win32"]
}
```

### `cpu`

使用这个选项指定你的包将只能在某些 CPU 体系架构上运行，这会检查 `process.arch`。

```json
{
  "cpu": ["x64", "ia32"],
  "cpu": ["!arm", "!mips"]
}
```

## 发布字段

### `private`

```json
{
  "private": true
}
```

如果你不想你的包发布到包管理器(npm 或者 私有包管理)，设置为 `true`。

### `publishConfig`

这些配置值将在你的包发布时使用。比如，你可以给包打标签。

```json
{
  "publishConfig": {
    "registry": "https://registry.npm.taobao.org"
  }
}
```

## 写在最后

> 如果你不发布包，其实能用到的字段很少。😇

在前端项目中 `package.json` 算是很重要的了，基础认识也很有必要。

## 参考

- https://www.cnblogs.com/tzyy/p/5193811.html
- https://docs.npmjs.com/cli/v6/configuring-npm/package-json
- https://classic.yarnpkg.com/en/docs/package-json