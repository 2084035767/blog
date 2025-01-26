---
title: 胡说| JS 模块化
date: 2023-10-11
categories:
  - 编程知识
tags:
  - JS
---



::: tip 前言

在现代 JavaScript 开发中，模块化是组织代码、提高可维护性和复用性的关键方法。本文将详细介绍 JavaScript 模块化的发展历程、常见模块化规范（CommonJS、AMD、CMD、ES6 Module）以及它们的区别和使用场景。

:::

## JS 模块化简介

### 1. 为什么要进行模块化？

在早期的 JavaScript 开发中，代码通常是通过 `<script>` 标签直接嵌入 HTML 中，或者通过全局变量和函数组织代码。这种方式在小型项目中可行，但在大型项目中会导致代码难以维护、复用性差、命名冲突等问题。模块化的核心目的是：

- **提高代码的可维护性**：将代码分割成独立的模块，每个模块负责一个功能。
- **避免命名冲突**：通过模块作用域隔离变量和函数。
- **增强代码复用性**：模块可以被多个项目复用。

### 2. JS 模块化的发展历程

JavaScript 模块化经历了多个阶段的发展：

1. **早期：全局变量和函数**
   最初，JavaScript 代码通过全局变量和函数组织，这种方式简单但容易导致命名冲突。
2. **CommonJS 规范**
   随着 Node.js 的出现，CommonJS 规范被提出，主要用于服务器端的模块化开发。
3. **AMD 和 CMD 规范**
   在浏览器端，AMD（Asynchronous Module Definition）和 CMD（Common Module Definition）规范被提出，用于前端模块化开发。
4. **ES6 Module**
   ES6 引入了原生的模块化支持，统一了浏览器和服务器端的模块化规范。

### 3. 模块化规范的种类

以下是几种常见的模块化规范：

- **CommonJS**：主要用于 Node.js。
- **AMD**：适用于浏览器端的异步模块加载。
- **CMD**：由 Sea.js 提出，适用于浏览器端。
- **ES6 Module**：现代 JavaScript 的标准模块化规范，支持浏览器和服务器端。

### 4. 模块化规范的发展趋势

随着 ES6 的普及，ES6 Module 成为了主流的模块化规范。现代前端框架（如 Vue、React、Angular）和工具链（如 Webpack、Rollup）都支持 ES6 Module，使得模块化开发更加标准化和便捷。

------

## 1. ES6 模块化（大一统的模块化规范）

在 ES6 模块化规范诞生之前，JavaScript 社区已经提出了 AMD、CMD 和 CommonJS 等模块化规范。然而，这些规范存在一定的差异性和局限性，例如：

- **AMD 和 CMD**：适用于浏览器端的 JavaScript 模块化。
- **CommonJS**：适用于服务器端的 JavaScript 模块化。

因此，ES6 在语言层面上定义了模块化规范，成为浏览器端和服务器端通用的模块化开发标准。

### ES6 模块化的基本语法

#### 1. 默认导出与默认导入

- **默认导出**语法：`export default 默认导出的成员`
- **默认导入**语法：`import 接收名称 from 模块标识符`

JavaScript复制

```javascript
// 当前文件模块为 m1.js

// 定义私有成员 a 和 c
let a = 10;
let c = 20;

// 将本模块中的私有成员暴露出去，供其它模块使用
export default {
    a,
    c,
};

// 导入模块成员
import m1 from './m1.js';

console.log(m1); // 打印输出：{ a: 10, c: 20 }
```

**注意**：每个模块中，只允许使用一次 `export default`，否则会报错！

#### 2. 按需导出与按需导入

- **按需导出**语法：`export let s1 = 10`
- **按需导入**语法：`import { s1 } from '模块标识符'`

JavaScript复制

```javascript
// 当前文件模块为 m1.js

// 向外按需导出变量 s1 和 s2
export let s1 = 'aaa';
export let s2 = 'ccc';

// 向外按需导出方法 say
export function say() {}

// 导入模块成员
import { s1, s2 as ss2, say } from './m1.js';

console.log(s1); // 打印输出 aaa
console.log(ss2); // 打印输出 ccc
console.log(say); // 打印输出 [Function: say]
```

**注意**：每个模块中，可以使用多次按需导出。

#### 3. 直接导入并执行模块代码

有时候，我们只想单纯执行某个模块中的代码，而不关心模块中暴露的成员。此时，可以使用以下方式：

JavaScript复制

```javascript
// 当前文件模块为 m2.js

// 在当前模块中执行一个 for 循环操作
for (let i = 0; i < 3; i++) {
    console.log(i);
}

// 直接导入并执行模块代码
import './m2.js';
```

------

## 2. CommonJS 模块化

CommonJS 是 Node.js 中的模块化规范，主要用于服务器端开发。它通过 `require` 和 `module.exports` 实现模块的导入和导出。

### CommonJS 的基本语法

#### 1. 导出模块

JavaScript复制

```javascript
// 当前文件模块为 m1.js

// 定义私有成员
let a = 10;
let c = 20;

// 导出模块
module.exports = {
    a,
    c
};
```

#### 2. 导入模块

JavaScript复制

```javascript
// 导入模块
const m1 = require('./m1.js');

console.log(m1); // 打印输出：{ a: 10, c: 20 }
```

------

## 3. AMD 模块化

AMD（Asynchronous Module Definition）是一种适用于浏览器端的异步模块加载规范。它通过 `define` 和 `require` 实现模块的定义和加载。

### AMD 的基本语法

#### 1. 定义模块

JavaScript复制

```javascript
// 当前文件模块为 m1.js

define(function () {
    let a = 10;
    let c = 20;

    return {
        a,
        c
    };
});
```

#### 2. 加载模块

JavaScript复制

```javascript
require(['./m1.js'], function (m1) {
    console.log(m1); // 打印输出：{ a: 10, c: 20 }
});
```

------

## 4. CMD 模块化

CMD（Common Module Definition）是由 Sea.js 提出的模块化规范，适用于浏览器端。它通过 `define` 和 `require` 实现模块的定义和加载。

### CMD 的基本语法

#### 1. 定义模块

JavaScript复制

```javascript
// 当前文件模块为 m1.js

define(function (require, exports, module) {
    let a = 10;
    let c = 20;

    exports.a = a;
    exports.c = c;
});
```

#### 2. 加载模块

JavaScript复制

```javascript
require.async('./m1.js', function (m1) {
    console.log(m1); // 打印输出：{ a: 10, c: 20 }
});
```

------

## 5. 模块化规范的对比

### CommonJS vs. AMD vs. CMD vs. ES6 Module

| 特性                 | CommonJS            | AMD                  | CMD                | ES6 Module                  |
| -------------------- | ------------------- | -------------------- | ------------------ | --------------------------- |
| **适用场景**         | 服务器端（Node.js） | 浏览器端（异步加载） | 浏览器端（Sea.js） | 浏览器端和服务器端（通用）  |
| **导出方式**         | `module.exports`    | `return`             | `exports`          | `export`                    |
| **导入方式**         | `require`           | `require`（异步）    | `require`（异步）  | `import`                    |
| **是否支持异步加载** | 不支持              | 支持                 | 支持               | 支持（通过动态 `import()`） |
| **是否支持静态分析** | 不支持              | 不支持               | 不支持             | 支持                        |

### AMD 与 CMD 的区别

- **AMD**：强调依赖前置，适合浏览器端的异步加载。
- **CMD**：强调就近依赖，适合浏览器端的同步加载。

### ES6 模块与 CommonJS 模块加载的区别

- **Common
