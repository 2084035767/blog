---
title: 胡说| JS 模块化
date: 2023-10-11
categories:
  - 编程知识
tags:
  - JS
---

:::tip

:::

## JS 模块化简介

引入问题：为什么要进行模块化？
JS模块化大致发展过程
模块化规范的种类
模块化规范的发展趋势
CommonJS规范
模块定义与使用
AMD规范
CMD规范ES6中的Module模块
CommonJS、AMD、CMD、ES6 Module的区别
AMD与CMD区别
ES6模块与CommonJS模块加载的区别

## 1. ES6模块化（大一统的模块化规范）

在`ES6`模块化规范诞生之前，`Javascript`社区已经尝试并提出了`AMD`、`CMD`、`CommonJS`等模块化规范。

但是，这些社区提出的模块化标准，还是存在一定的差异性与局限性、并不是浏览器与服务器通用的模块化标准，例如：

- `AMD`和`CMD`适用于浏览器端的`Javascript`模块化
- `CommonJS`适用于服务器端的`Javascript`模块化

因此，`ES6`语法规范中，在语言层面上定义了`ES6`模块化规范，是**浏览器端**与**服务器端**通用的模块化开发规范。

`ES6`模块化规范中定义：

- 每个`js`文件都是一个**独立的模块**
- **导入模块成员**使用`import`关键字
- **暴露模块成员**使用`export`关键字

## 2. ES6模块化的基本语法

### 1. 默认导出、默认导入

- 默认导出语法：`export default 默认导出的成员`
- 默认导入语法：`import 接收名称 from 模块标识符`

```javascript
// 当前文件模块为 m1.js

// 定义私有成员 a 和 c
let a = 10;
let c = 20;
// 外界访问不到变量 d ,因为它没有被暴露出去
let d = 30;

function show() {}
// 将本模块中的私有成员暴露出去，供其它模块使用
export default {
    a,
    c,
    show,
};
// 导入模块成员
import m1 from './m1.js';

console.log(m1);
// 打印输出的结果为：
// { a: 10, c: 20, show: [Function: show] }
```

**注意**：每个模块中，只允许使用唯一的一次`export default`，否则会报错！

### 2. 按需导出、按需导入

- **按需导出**语法： `export let s1 = 10`
- **按需导入**语法： `import { s1 } from '模块标识符'`

```javascript
// 当前文件模块为 m1.js

// 向外按需导出变量 s1
export let s1 = 'aaa';
// 向外按需导出变量 s2
export let s2 = 'ccc';
// 向外按需导出方法 say
export function say = function() {};
// 导入模块成员
import { s1, s2 as ss2, say } from './m1.js';

console.log(s1); // 打印输出 aaa
console.log(ss2); // 打印输出 ccc
console.log(say); // 打印输出 [Function: say]
```

**注意**：每个模块中，可以使用**多次**按需导出

### 3. 直接导入并执行模块代码

有时候，我们只想**单纯执行某个模块中的代码**，并不需要得到模块中向外暴露的成员，此时，可以**直接导入并执行模块代码**

```javascript
// 当前文件模块为 m2.js

// 在当前模块中执行一个 for 循环操作
for (let i = 0; i < 3; i++) {
    console.log(i);
}
// 直接导入并执行模块代码
import './m2.js';
```

模块化



前端模块化相关规范

https://lzxjack.top/post?title=module



本站所有文章除特别声明外，均采用[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)许可协议，转载请注明来自[飞鸟小站](https://lzxjack.top/)。

邮箱

密码

取消

登录



昵称

邮箱

网址
