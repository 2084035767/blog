---
order: 1
title:  CSS 入门
---



# CSS 笔记（简洁版）

```css
 ______     ______     ______    
/\  ___\   /\  ___\   /\  ___\   
\ \ \____  \ \___  \  \ \___  \  
 \ \_____\  \/\_____\  \/\_____\ 
  \/_____/   \/_____/   \/_____/ 
                                 
```

## 一、CSS3 简介

### 1.1 什么是 CSS3？

CSS 是 Cascading Style Sheet（层叠样式表）的缩写。是用于（增强）控制网页样式并允许将样式信息与网页内容分离的一种标记性语言。CSS 不需要编译,可以直接由浏览器执行(属于浏览器解释型语言)。

### 1.2 CSS3 新特性概述



## 二、CSS3 基础知识

### 2.1 铺垫知识

#### 导入方式

> 优先级：行内样式>内部样式>外部样式（就近原则）

**CSS 语法**

语法格式：（其实就是键值对）

```html
选择器{ 属性名: 属性值; 属性名: 属性值; }
```

**行内样式**

在 HTML5 的标签内使用`style`属性。

```html
<h1 style="color: red;font-size: 12px;">标题</h1>
```



**内嵌样式**

在 HTML5 头部`head`标签内使用`<style>`标签

```html
<!--在HTML头部使用-->
<style>
/* h1是HTML的标签 */
h1{    
        color: red;
        /* CSS代码 */
}
</style>
```

**外链样式**

使用 HTML 的`<link>`标签链接 <Badge text="推荐" type="tip" />

这时，CSS 是写在单独的文件中的，这个文件以 .css 结尾

> 两种引入样式方式的区别：外部样式表中不能写标签，但是可以写 import 语句。

::: tabs#css

@tab link

```html
<!--链接式-->
<link rel="stylesheet" href="style.css" />
```

@tab import

==css2.1 特有==


  ```html
<!--导入式-->
<style>
    @import url("style.css")
</style>
  ```

:::



- `rel`：是说我们引入的是什么样的文件
  - `stylesheet`：定义的样式表
  - `alternate stylesheet`：候选的样式表
- `href`：指定 CSS 文件路径。



#### CSS的单位

html中的单位默认只有像素px，所以单位可以省略，但css没有默认单位。所以 **CSS中的单位是必须要写的**。

**绝对单位**

1 `in`=2.54`cm`=25.4`mm`=72`pt`=6`pc`。

**各种单位的含义**

- `in`：英寸Inches (1 英寸 = 2.54 厘米)
- `cm`：厘米Centimeters
- `mm`：毫米Millimeters
- `pt`：点Points，或者叫英镑 (1点 = 1/72英寸)
- `pc`：皮卡Picas (1 皮卡 = 12 点)

**相对单位**

`px`：像素 `em`：印刷单位相当于12个点 

`%`：百分比，相对周围的文字的大小



**空白**

在样式规则中可以随意使用空白，空白只是看不见但同样占用空间。



**注释**

css的注释是`/*...*/`,请记住css没有`//`注释。



**错误**

样式规则如果存在错误，解析器会选择忽略，并不会影响其他样式规则。



**初始样式**

有些标签默认含有内外边距，且不同浏览器大小也不一样。为了统一我们可以重置标签的 CSS 默认样式。



### 2.2 CSS3 文本

#### 字体属性

| 属性           | 说明             |
| :------------- | :--------------- |
| `color`        | 文本颜色         |
| `font-style`   | 字体样式         |
| `font-weight`  | 字体粗细         |
| `font-size`    | 字体大小         |
| `font-family`  | 字体系列         |
| `font-variant` | 定义小型大写字母 |
| `font`         | 字体简写         |

```css
p{	color: red;
    font-size: 12px;
    font-family: YaHei,SimHei;
    font-style: italic ; /*斜-italic 正-normal */
    font-weight: bolder; /*更粗-bolder 粗-bold 细-lighter 正-normal */
    font-variant: small-caps;/**/
}

/*字体简写*/
/*font: style weight size family;*/
/*字体大小和字体样式不可省略*/
p{   
    font: italic bolder 12px YaHei;
}
```



#### 文本属性

| 属性              | 说明         |
| ----------------- | ------------ |
| `color`           | 文本颜色     |
| `letter-spacing`  | 字符间距     |
| `word-spacing`    | 单词间距     |
| `text-decoration` | 文本修饰     |
| `text-align`      | 文本对齐方式 |
| `text-transform`  | 单词大小写   |
| `text-indent`     | 文本缩进     |
| `text-shadow`     | 文本阴影     |
| `vertical-align`  | 垂直对齐方式 |
| `line-height`     | 行高         |
| `writing-mode`    | 文本排版     |

> 提示：文本行高和块的高度一致，可上下居中

```css
p{   
    text-indent：2em;
    line-height: 300px;
    text-align: center; /*左-left 中-center 右-right*/
    text-decoration: underline; 
    /*下划线-underline 中划线-line-through 上划线-overline*/
    writing-mode: horizontal-tb;
    /* 水平自上而下-horizontal-tb 垂直自右而左-vertical-rl 
    垂直内容从上到下，水平从左到右-vertical-lr 
    */
}

/*文本阴影*/
span{
    /*text-shadow: 阴影颜色 水平偏移 垂直偏移 阴影半径;*/
    text-shadow: red 5px 5px 5px;
}   

/*文本图片对齐*/
img,span{  
    vertical-align: middle;
    /*中-middle 基线-baseline 下标s-ub 上标-super*/
}
```

#### 列表属性

| 属性                  | 描述                         |
| :-------------------- | :--------------------------- |
| `list-style`          | 简写属性。                   |
| `list-style-image`    | 将图像设置为列表项标志。     |
| `list-style-position` | 设置列表中列表项标志的位置。 |
| `list-style-type`     | 设置列表项标志的类型。       |

```css
ul{
    list-style-image: url('img.png');
    list-style-position: outside;
    /* 文本以内-inside 文本的左侧-outside  */
    list-style-type: disc;
    /*无标记-none 实心圆-disc 空心圆-circle 实心方块-square 数字-decimal*/	。
}

/*简写属性*/
/*list-style: type position image;*/
ul
{
    list-style: disc outside url('img.png');
}
```



### 2.3 CSS3 颜色

css常用的颜色类型有三种。

- 关键词
- RGB（十六进制）
- RGBA（0，255，255，1）[a:代表透明度 0-1]



#### 关键词颜色

CSS 允许使用关键字表示颜色，CSS2.1 设置了 16 个基本的颜色，CSS 3 又增加了 131 个。

以下是常用颜色的关键词

| 序号 | 颜色 | 英文单词 |
| ---- | ---- | -------- |
| 1    | 白色 | white    |
| 2    | 黑色 | black    |
| 3    | 红色 | red      |
| 4    | 蓝色 | blue     |
| 5    | 绿色 | green    |
| 6    | 黄色 | yellow   |
| 7    | 紫色 | purple   |
| 8    | 粉色 | pink     |
| 9    | 橙色 | orange   |
| 10   | 灰色 | gray     |
| 11   | 青色 | cyan     |
| 12   | 银色 | silver   |
| 13   | 金色 | gold     |
| 14   | 棕色 | brown    |



#### RGB颜色

RGB颜色有两种表示形式。

::: tabs#color

@tab RGB

**RGB表示**

RGB表示：`rgb(RGB)`。其中R（红色），G（绿色）、B（蓝色）。每个颜色的数值是 `0-255`。

> 技巧：关键词颜色和RGB表示可以组合使用。

```css
p{
    color: rgb(255,255,255)
}
```

@tab 十六进制

**十六进制表示**

十六进制表示：`＃RRGGBB`。其中RR（红色），GG（绿色）、BB（蓝色）。每个颜色的数值是 `00-FF`。

```css
p{	/* # 号不可省略*/
    color: #3355FF;/*简写 #35F*/
}
```

:::

#### RGBA颜色

RGBA颜色：`rgba(r, g, b, a)`（红，绿，蓝，alpha）。 Alpha参数是一个介于0.0（完全透明）和1.0（完全不透明）之间的参数。

用法与RGB表示一致。（RGBA颜色也有十六进制类似的表示方法，但不常用）



### 2.4 CSS3 背景

#### 背景属性

| 属性                    | 说明                             |
| ----------------------- | -------------------------------- |
| `background-color`      | 背景颜色                         |
| `background-image`      | 背景图像                         |
| `background-repeat`     | 背景图像是否及如何重复。         |
| `background-attachment` | 背景图片是否跟着滚动条一起移动。 |
| `background-position`   | 背景图像的起始位置。             |
| `background-origin  `   | 控制背景的显示位置               |
| `background-clip`       | 背景裁切                         |
| `background-size`       | 调整背景尺寸                     |
| `background`            | 背景简写                         |

```css
body{
    background-color: red;
    background-image: url(img.jpg);
    background-repeat: no-repeat;
    /*不平铺-no-repeat 横向平铺-repeat-x 纵向平铺-repeat-y*/
    background-attachment: scroll; /*滚动-scroll 固定-fixed*/
    background-position: center;
    background-size: cover;
    /*图片始终填充满容器-cover 图片完整地显示在容器中-contain*/
    background-origin: padding-box;
    /*内边距-padding-box 边框-border-box 内容区域-content-box*/
    background-clip: content-box;
    /*内边距-padding-box 边框-border-box 内容区域-content-box*/
}

/*背景简写*/
/*background: colorimage repeat position attachment ;*/
body{
    background: red url(img.jpg) no-repeat center scroll;
}
```



#### 颜色渐变

渐变一般用在背景颜色中使用。

**线性渐变**

沿着某条直线朝一个方向产生渐变效果。

```css
body{
    /*linear-gradient(方向, 起始颜色, 终止颜色);*/
    background-image: linear-gradient(to right, yellow, green);
    /*方向: to left、to right、to top、to bottom、角度30deg（顺时针）*/
}

/*多个颜色渐变*/
body{
    background: linear-gradient(red, rgb(0, 0, 200), green, rgba(122, 211, 100, 0));
}
```



**径向渐变**

从一个**中心点**开始沿着**四周**产生渐变效果。

```css
body{
    /*radial-gradient(辐射的半径大小, 中心的位置, 起始颜色, 终止颜色);*/
    background-image: radial-gradient(100px at center,yellow ,green);
    /*中心点的位置: at left 、right、 center 、bottom 、top*/
}
```



#### CSS Sprite

`CSS Sprites`也叫`CSS精灵`、`CSS雪碧图`，是一种网页图片应用处理方式。 

CSS Sprites(图片整合技术) 的目的就是通过整合图片，减少对服务器的请求数量，从而加快页面加载速度。



**CSS Sprite原理**

其实就是把网页中的一些背景图片整合到一张图片文件中，再利用背景属性，对这张大图进行定位。



**CSS Sprite优点**

1. 很好地减少了网页的`http`请求，从而大大的提高了页面的性能，其被广泛传播和应用的主要原因。
2. 能减少图片的字节，(网络传输以字节为单位 ，`1MB=1024千字节`)，三张图片大小的总合大于拼成一张图片的大小。
3. 解决了命名困扰，只需要对一张图片命名，而非数十个小图片命名。



## 三、CSS3 选择器

选择器决定了样式规则对哪些元素有效。

**优先级**

- 选择器都有一个权值，权值越大越优先；
- 当权值相等时，后出现的样式表设置要优于先出现的样式表设置；
- 创作者的规则高于浏览者：即网页编写者设置的 CSS 样式的优先权高于浏览器所设置的样式；
- 继承的 CSS 样式不如后来指定的 CSS 样式；
- 在同一组属性设置中标有`!important`标识的优先级最大



**选择器权重**

权重主要分为 4 个等级：

- 第一等：代表内联样式，如: `style=""`，权值为1000
- 第二等：代表ID选择器，如：`#content`，权值为100
- 第三等：代表类，伪类和属性选择器，如`.content`，权值为10
- 第四等：代表类型选择器和伪元素选择器，如`div p`，权值为1

#### 3.1 基本选择器

**标签选择器**

标签选择器用于选择个特定的 HTML 元素标签。

一般适合编写一些通用的样式，或者默认的样式，在它基础上，再使用其它的选择器设置更特殊的样式。

> 注意：
>
> - 所有的标签，都可以是选择器。
> - 无论这个标签藏的多深，一定能够被选择上。
> - 选择所有标签，而不是一个。

```css
/* HTML标签 <h1>标题</h1> */

h1{    
    color: red;  
}
```



**类选择器**

类选择器的格式，`.类名称{}`

优点：可以被多种标签使用，同一个 class，可以复用

同一个标签可以使用多个类选择器。用**空格**隔开

选择所有 class 属性一致标签，跨标签

```css
/* HTML标签 <h1 class="jt a">标题</h1> */

.jt{
    color: red;
}
```



**id 选择器**

id 选择器的格式：`#id名称{}`

针对特定的标签(一个)，ID 是此标签在此页面上的唯一标识。

> 注意：id 必须保证全局唯一

```css
/* HTML标签 <h1 id="jt">标题</h1> */

#jt{
    color: red;
}
```

> 建议：`class`属性交给 css 使用，`id`属性交给 js 使用。



#### 3.2 层次选择器

**后代选择器**

HTML 中元素是以父子级、兄弟关系存在的。后代选择器指元素后的元素（不只是子元素，是后代元素）。

```css
/* 后代选择器 */

/*<h2>
<p>hell,world</p>
</h2>*/

h2 p{
    background: red;
}
```



**子选择器**

子元素选择器中选择子元素，不包括孙级及以下元素。

```css
/* 子选择器 */

/*<h2>
<p>hell,world</p>
</h2>*/

body>p{
    background: red;
}
```



**相邻兄弟选择器**

用于选择紧挨着的同级兄弟元素。只有一个：相邻（向下）

```css
/* 相邻兄弟选择器 */

/*<h2>hell,world</h2>
<h2>hell,world</h2>*/

h2 + p{
    background: red;
}
```



**通用兄弟选择器**

当前选中元素的所有向下兄弟元素

```css
/* 通用兄弟选择器 */
.active ~ p{
    background: red;
}
```



#### 3.3 属性选择器

通过元素的属性选择。

==规则：标签[属性名 = 属性值（正则）]==

| 正则 | 含义                      |
| ---- | ------------------------- |
| `=`  | 绝对等于                  |
| `*=` | 包含字符等于              |
| `~=` | 包含单词等于              |
| `^=` | 以开头                    |
| `$=` | 以结尾                    |
| `|=` | 包含单词或以`-`连接的单词 |

```css
/*存在 id 属性的 a 标签*/
a[id]{
    background: red;
}

/*存在 class 属性为 first 的 a 标签元素*/
a[class=first]{
    background: red;
}
```



#### 3.4 伪类选择器

为元素的不同状态或不确定存在的元素设置样式规则。它的功能和class有些类似，但它是基于文档之外的抽象，所以叫伪类。

**静态伪类选择器、动态伪类选择器**

伪类选择器分为两种。

1. **静态伪类**：只能用于**超链接**的样式。如：`:link`和`:visited`只能用于超链接。

2. **动态伪类**：针对**所有标签**都适用的样式。

| 伪类       | 说明                                       |
| ---------- | ------------------------------------------ |
| `E:link`    | 选择所有未被访问的链接。                   |
| `E:visited` | 选择所有已被访问的链接。                   |
| `E:hover`   | 鼠标移动到元素上时。                       |
| `E:active`  | 点击正在发生时。                           |
| `E:focus`   | 选择获得焦点的元素。                       |
| `E:target`  | 选择具有锚点的目标元素。                   |
| `:root`    | 选择文档的根元素即 html。                  |
| `E:empty`   | 选择没有子元素的每个元素（包括文本节点）。 |



```css
/*移动到 a 元素变红*/
a:hover{
    color: red;
}

/*选择获得焦点的 input 元素变红*/
input:focus{
    color: red;
}
```



**结构伪类选择器**

通过结构伪类选择器选择树状结构中的标签元素。

| 结构伪类               | 说明                                       |
| ---------------------- | ------------------------------------------ |
| `E:first-child`         | 选择属于父元素的第一个子元素的每个元素     |
| `E:last-child`          | 选择属于其父元素最后一个子元素每个元素。   |
| `E:first-of-type`       | 选择属于其父元素的首个元素的每个元素       |
| `E:last-of-type`        | 选择属于其父元素的最后元素的每个元素。     |
| `E:only-of-type`        | 选择属于其父元素唯一的元素的每个元素。     |
| `E:only-child`          | 选择属于其父元素的唯一子元素的每个元素。   |
| `E:nth-child(1)`        | 选择属于其父元素的第一个子元素的每个元素。 |
| `E:nth-child(odd)`      | 选择属于其父元素的奇数元素。               |
| `E:nth-child(even)`     | 选择属于其父元素的偶数元素。               |
| `E:nth-of-type(1)`      | 选择属于其父元素第一个元素的每个元素。     |
| `E:nth-last-child(1)`   | 同上，从最后一个子元素开始计数。           |
| `E:nth-last-of-type(1)` | 同上，但是从最后一个子元素开始计数。       |
| `:not(p)`              | 选择非 p 元素的每个元素                    |



```css
/*选择当前 p 元素的父级元素，选中父级元素的第一个元素，并且是当前元素才生效*/
p:nth-child(1){
    background: red;
}

/*选中父元素下的 p 元素的第二个类型*/
p:nth-of-type(1){
    background: red;
}

/*ul 的第一个元素*/
ul li:first-child{
    background: red;
}

/*ul 的最后一个元素*/
ul li:last-child{
    background: red;
}
```



**表单伪类**

| 表单伪类    | 说明                         |
| ----------- | ---------------------------- |
| `E:enabled` | 选择每个启用的元素。         |
| `E:disabled` | 选择每个禁用的元素。         |
| `E:checked`  | 选择每个被选中的元素。       |
| `E:required` | 包含`required`属性的元素。   |
| `E:optional` | 不包含`required`属性的元素。 |
| `E:valid`    | 验证通过的表单元素。         |
| `E:invalid`  | 验证不通过的表单。           |



#### 3.5 伪元素

对元素中的特定内容进行操作，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。

| 伪元素            | 说明                     |
| ----------------- | ------------------------ |
| `E::before`       | 在元素的内容之前插入内容 |
| `E::after`        | 在元素的内容之后插入内容 |
| `E::first-letter` | 选择元素的第首字母或字   |
| `E::first-line`   | 选择元素的第一行         |
| `E::selection`    | 被选中的文本             |



## 三、CSS3 盒模型

### 3.1 CSS3 盒模型

#### 盒子模型

盒子模型，英文即box model。

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。

**盒子中的区域**

一个盒子中主要有5个属性

- width和height：**内容**的宽度、高度（不是盒子的宽度、高度）。
- padding：内边距。
- border：边框。
- margin：外边距。



**真实占有计算公式**

元素的真实占有宽度计算公式

==总元素的宽度=宽度+左填充+右填充+左边框+右边框+左边距+右边距==

元素的真实占有高度计算公式

==总元素的高度=高度+顶部填充+底部填充+上边框+下边框+上边距+下边距==



**CSS3盒子模型(怪异盒子模型)**

CSS3中可以通过`box-sizing`来指定盒模型，即可指定为`content-box`、`border-box`，这样我们计算盒子大小的方式就发生了改变。

- `content-box`: 元素的实际宽度等于设置的 width 值和 border、padding 之和 (默认方式)。

- `border-box`： 元素的实际宽度就等于设置的 width 值，即使定义有 border 和 padding 也不会改变对象的实际宽度。我们把这种方式叫做 css3 盒模型。



#### 边框

**边框属性**

| 属性          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| border        | 边框简写(常用)                                               |
| border-style  | 设置元素所有边框的样式，或单独地为各边设置边框样式。         |
| border-radius | 设置元素所有边框的弧度，或单独地为各边设置边框弧度。（顺时针方向） |
| border-width  | 设置元素所有边框设置宽度，或单独地为各边框设置宽度。         |
| border-color  | 设置元素所有边框中可见部分的颜色，或单独地为各边框设置颜色。 |
| border-bottom | 边框的下边框                                                 |
| border-left   | 边框的左边框                                                 |
| border-right  | 边框的右边框                                                 |
| border-top    | 边框的上边框                                                 |

```css
/*两种简写*/
/* border: width，style，color;*/
/* border: top，right, bottom, left;*/

div{
	border: 1px solid red;
}
```



**内边距**

> 规则：
>
> - 如果是一个数值：代表上下左右。
> - 如果是两个数值：一个代表上下 一个代表左右。
> - 如果是四个数值：代表上右下左（顺时针）。

```css
div{
    padding: 20px 50px 100px 150px;     /* 上  右  下  左 */
}
```



**外边距**

规则同样适用

> 技巧：元素居中
>
> 要求：块元素且有固定宽度
>
> `margin: 0 auto;`

```css
div{
    margin: 20px 50px 100px 150px;     /* 上  右  下  左 */
}
```



### 3.2 轮廓线

- 轮廓线显示在边框外面
- 轮廓线不影响页面布局



**轮廓属性**

|               |                |
| ------------- | -------------- |
| outline-style | 轮廓线样式     |
| outline-color | 轮廓线颜色     |
| outline-width | 轮廓线粗细     |
| outline       | 轮廓简写(常用) |

```css
/* 轮廓简写 */
/* outline: width style color */
div{
    outline: 20px solid pink;
}    
```



**盒子阴影**

```css
/*box-shadow: h-shadow(x) v-shadow(y) blur(模糊半径) spread(扩展半径) color(颜色) inset(是否内嵌,可省略);*/
div{
    box-shadow: 20px 50px 100px red;     /* 上  右  下  左 */
}
```



### 3.3 CSS 显示与可见性

#### DISPLAY（显示）

使用 `display` 控制元素的显示机制。

| 选项         | 说明                                     |
| ------------ | ---------------------------------------- |
| none         | 隐藏元素，且隐藏的元素不会占用任何空间。 |
| block        | 显示为块元素                             |
| inline       | 显示为行元素，不能设置宽/高。            |
| inline-block | 显示为行级块元素，允许设置宽/高。        |
| flex         | 以弹性盒形式显示                         |
| grid         | 以网格形式显示                           |



#### Visibility（可见性）

`visibility`指定一个元素是否是可见的。

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| visible  | 默认值。元素是可见的。                                       |
| hidden   | 隐藏元素，且隐藏的元素会占用任何空间。                       |
| collapse | 在表格元素中删除一行或一列，被行或列占据的空间会留给其他内容使用。 |



## 四、CSS3 布局

### 4.1 浮动布局

#### 标准文档流

自上而下，自左向右的一种元素默认排列方式。

行内元素：

- 与其他行内元素并排；
- 不能设置宽、高。默认的宽度，就是文字的宽度。

块级元素：

- 独占一行，不能与其他任何元素并列；
- 能接受宽、高。如果不设置宽度，那么宽度将默认变为父亲的100%。

行内元素可以被包含在块元素中，反之不行。

> 由于标准文档流的限制太多，我们的做法就是**脱离文档流**。



#### 浮动

使用`float`可以控制相邻元素间的排列关系。

> 缺点：浮动会脱离标准文档流，出现父级边框塌陷问题。

```css
/*左-left 右-right*/
div{
    float:left;
}
```



**浮动的四大性质**

1. 浮动的元素脱标

2. 浮动的元素互相贴靠

3. 浮动的元素有“字围”效果

4. 动收缩为内容的宽度



#### 清除浮动

浮动元素无法撑起父元素高度,会导致父元素高度计算时出现问题,对后续元素位置产生影响。（解决塌陷）

```css
/*左-left 右-right 左右-both*/
div{
    clear: both;
}
```



**清除浮动的四大方法**

1. 加高法：指定父元素高度。
2. 溢出法：给父元素添加`overflow:hidden;`属性。
3. 隔墙法：在所有浮动元素末尾追加一个空的块元素(借助伪元素),对其设置`clear:both`;
4. 伪类法：使用 `:after` 伪类为父元素添加后标签。<Badge text="推荐" type="tip" />



**margin塌陷**

标准文档流中，竖直方向的margin不叠加，取较大的值作为margin(水平方向的margin是可以叠加的，即水平方向没有塌陷现象)。

> 建议：margin本质上描述的是兄弟和兄弟之间的距离；最好不要用这个marign表达父子之间的距离。
>
> 善于使用父亲的padding，而不是儿子的margin。



### 4.2 定位布局

使用`position`属性用来指定一个元素在网页上的位置。

> 注意：定位以左上角为起点，向下为 y 为轴，向右为 x 轴。

**定位属性**

|            |                                            |
| ---------- | ------------------------------------------ |
| `static`   | 按照正常的文档流位置摆放元素。(默认值)     |
| `relative` | 相对定位，参照物是元素的默认位置。         |
| `fixed`    | 固定定位，参照物是浏览器窗口。             |
| `absolute` | 绝对定位，参照物是离他最近的祖先定位元素。 |



#### 相对定位

让元素相对于自己原来的位置，进行位置调整（可用于盒子的位置微调）。

它仍然在标准文档流中，原来的位置会被保留。

```css
div{
    position: relative;
}
/*top: 距离顶边
bottom: 距离下边
left: 距离左部
right: 距离右边
*/
```



#### 绝对定位

相对于父级元素或浏览器定位，进行指定的偏移。

它不在标准文档流中，原来的位置不会被保留。

> 注意：
>
> 1. 没有父级元素定位的前提下，相对于浏览器定位。
> 2. 假设父级元素存在定位，我们通常会相对于父级元素偏移。
> 3. 在父级元素内移动。

```css
div{
    position: absolute;
}
/*top: 距离顶边
bottom: 距离下边
left: 距离左部
right: 距离右边
*/
```



#### 固定定位

相对浏览器窗口进行定位。无论页面如何滚动，这个盒子显示的位置不变。

```css
div{
    position: fixed;
}
/*top: 距离顶边
bottom: 距离下边
left: 距离左部
right: 距离右边
*/
```



#### z-index

使用 `z-index` 控制元素的上下层级，数值越大越在上面。

*特性*

- 属性值大的位于上层，属性值小的位于下层。
- `z-index`没有单位，是一个正整数。默认值是 0。
- 元素没有使用`z-index`。后来者居上。
- 定位的元素永远在没有定位的元素的上层。子元素永远在父元素上面。
- 只有定位的元素，才能有z-index值。而浮动的元素不能用。

```css
div{
    z-index:0;
}
/*默认是0，最高无限*/
```



**层级**

- 必须有定位（除去static）。

- 用`z-index`来控制层级数。









**下面的区域以后再来“探索”吧**

----
