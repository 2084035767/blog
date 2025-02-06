---
title: 关于| 伪类与伪元素
date: 2025-1-1
categories: 
  - 知识了解
---

# 伪类与伪元素

:::tip 前言



:::



 ## 简介

 在 CSS 中，伪类和伪元素是两个强大的工具，它们允许我们为页面元素添加特殊的效果和样式，而无需修改 HTML 结构。伪类用于根据元素的状态或位置选择元素，而伪元素则用于选择元素的特定部分。本文将详细介绍伪类和伪元素的概念、用法和实际应用。



 ## 为元素添加特殊状态

 ### 1. 什么是伪类？

 伪类是添加到选择器的关键字，用于选择具有特定状态或位置的元素。伪类以单个冒号 `:` 开头，通常与基础选择器搭配使用。

 ### 2. 常见的伪类关键字

 #### `:hover`

 `:hover` 伪类用于选择鼠标悬停在元素上时的状态。例如，可以将鼠标悬停在按钮上时的颜色变为蓝色：

 css复制

 ```css
 button:hover {
   color: blue;
 }
 ```

 **注意**：在触摸屏设备上，`:hover` 伪类通常不可用。因此，不要依赖悬停效果来显示重要信息。

 #### `:not`

 `:not` 伪类用于选择不符合一组选择器的元素。例如，将所有不是 `<p` 的元素的颜色改为蓝色：

 css复制

 ```css
 body:not(p) {
   color: blue;
 }
 ```

 #### `:first-child`

 `:first-child` 伪类用于选择父元素的第一个子元素。例如，给所有 `<ul` 下的第一个 `<li` 应用不同的样式：

 css复制

 ```css
 ul li:first-child {
   color: red;
   font-weight: bold;
 }
 ```

 #### `:active`

 `:active` 伪类用于选择被激活的元素（例如，鼠标按下时的状态）。例如，定义链接在不同状态下的样式：

 css复制

 ```css
 a:link { color: blue; }          /* 未访问链接 */
 a:visited { color: purple; }     /* 已访问链接 */
 a:hover { background: yellow; }  /* 鼠标悬停 */
 a:active { color: red; }         /* 激活链接 */
 ```

 **注意**：伪类的顺序很重要，推荐使用 LVHA 顺序：`:link`  `:visited`  `:hover`  `:active`。

 ### 3. 单独使用的伪类关键字

 伪类也可以单独使用，例如 `:focus` 伪类可以让任何获得焦点的元素的颜色变为红色：

 css复制

 ```css
 :focus {
   color: red;
 }
 ```



 ## 伪元素：为元素的特定部分添加样式

 ### 1. 什么是伪元素？

 伪元素是附加到选择器末尾的关键字，用于选择元素的特定部分。伪元素以双冒号 `::` 开头，必须紧跟在基础选择器之后。

 ### 2. 常见的伪元素

 #### `::before`

 `::before` 伪元素用于在元素的内容之前插入内容。例如，给每个 `<a` 标签前添加一个 😃 表情：

 css复制

 ```css
 a::before {
   content: "😃";
 }
 ```

 #### `::after`

 `::after` 伪元素用于在元素的内容之后插入内容。例如，给每个段落后面添加一个页脚：

 css复制

 ```css
 p::after {
   content: " - The End";
 }
 ```

 ### 3. 伪元素的基本语法

 伪元素的基本语法如下：

 css复制

 ```css
 selector::pseudo-element {
   property: value;
 }
 ```

 **注意**：伪元素通常需要使用 `content` 属性来指定插入的内容。



 ## 伪类与伪元素的共同使用

 伪类和伪元素可以结合使用，以实现更复杂的效果。例如，可以使用 `:hover` 伪类和 `::before` 伪元素来实现一个带有悬停效果的开关样式。

 ### 示例：带有动画效果的开关

 以下是一个使用 CSS 伪类和伪元素实现的开关样式，带有动画效果：

 ```html
 <!DOCTYPE html
 <html lang="en"
 <head
   <meta charset="UTF-8"
   <meta name="viewport" content="width=device-width, initial-scale=1.0"
   <titleCSS Switch</title
   <style
     .switch {
       position: relative;
       display: inline-block;
       width: 100%;
       height: 40px;
       background-color: #ccc;
       border-radius: 20px;
       transition: background-color 0.3s;
     }
 
     .switch::before {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 40px;
       height: 40px;
       background-color: white;
       border-radius: 50%;
       transition: left 0.3s;
     }
 
     .switch:hover {
       background-color: #666;
     }
 
     .switch:hover::before {
       left: calc(100% - 40px);
     }
   </style
 </head
 <body
   <div class="switch"</div
 </body
 </html
 ```



 ### 代码解释

 1. **`.switch` 样式**：
    - 定义开关的宽度为父元素的 100%，高度为 40px。
    - 设置背景颜色为灰色，圆角为 20px。
    - 添加背景颜色的过渡效果。
 2. **`.switch::before` 伪元素**：
    - 创建一个圆形的滑块，宽度和高度均为 40px。
    - 设置滑块的初始位置为左上角。
    - 添加滑块位置的过渡效果。
 3. **`:hover` 伪类**：
    - 当鼠标悬停在开关上时，改变开关的背景颜色。
    - 同时改变滑块的位置，使其移动到右侧。
