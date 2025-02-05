# flex 语法部分



- [一、Flex](#一、flex)

- 二、容器的属性

  - [1. flex-direction 主轴的方向](#_1-flex-direction-主轴的方向)
  - [2. flex-wrap 换行](#_2-flex-wrap-换行)
  - [3. flex-flow 主轴 + 换行 简写](#_3-flex-flow-主轴-换行-简写)
  - [4. justify-content 项目在主轴上的对齐方式](#_4-justify-content-项目在主轴上的对齐方式)
  - [5. align-items 项目在交叉轴上如何对齐](#_5-align-items-项目在交叉轴上如何对齐)
  - [6. align-content 有多根主轴时，各主轴在交叉轴的对齐方式](#_6-align-content-有多根主轴时-各主轴在交叉轴的对齐方式)

- 三、项目的属性

  - [1. order 项目的排列顺序](#_1-order-项目的排列顺序)
  - [2. flex-grow 项目的放大比例](#_2-flex-grow-项目的放大比例)
  - [3. flex-shrink 项目的缩小比例](#_3-flex-shrink-项目的缩小比例)
  - [4. flex-basis 在分配多余空间之前，项目占据的主轴空间](#_4-flex-basis-在分配多余空间之前-项目占据的主轴空间)
  - [5. flex： flex-grow, flex-shrink 和 flex-basis的简写](#_5-flex-flex-grow-flex-shrink-和-flex-basis-的简写)
  - [6. align-self 单个项目在交叉轴的对齐方式](#_6-align-self-单个项目在交叉轴的对齐方式)

- 一、骰子的布局

  - 1. 一个项目

    - [左上 left-top](#左上-left-top)
    - [中上 center-top](#中上-center-top)
    - [右上 right-top](#右上-right-top)
    - [左中 left-middle](#左中-left-middle)
    - [中中 center-middle](#中中-center-middle)
    - [右中 center-middle](#右中-center-middle)
    - [左下 center-middle](#左下-center-middle)
    - [中下 center-middle](#中下-center-middle)
    - [右下 center-middle](#右下-center-middle)

  - 2. 两个项目

    - [水平顶部两端对齐](#水平顶部两端对齐)
    - [垂直左部两端对齐](#垂直左部两端对齐)
    - [垂直居中两端对齐](#垂直居中两端对齐)
    - [垂直右部两端对齐](#垂直右部两端对齐)
    - [上左，中中](#上左-中中)
    - [上左，下右](#上左-下右)

  - 3. 三个项目

    - [左上，中中，右下](#左上-中中-右下)

  - 4. 四个项目

    - [上部三个两端对齐，底部一个左对齐](#上部三个两端对齐-底部一个左对齐)
    - [上部三个两端对齐，底部一个右对齐](#上部三个两端对齐-底部一个右对齐)
    - [顶部两个两端对齐，底部两个两端对齐](#顶部两个两端对齐-底部两个两端对齐)

  - 5. 六个项目

    - [顶部三个两端对齐，底部三个两端对齐](#顶部三个两端对齐-底部三个两端对齐)
    - [左边三个垂直两端对齐，右边三个垂直两端对齐](#左边三个垂直两端对齐-右边三个垂直两端对齐)
    - [顶部三个两端对齐，中部一个居中对齐，底部两个两端对齐](#顶部三个两端对齐-中部一个居中对齐-底部两个两端对齐)

  - 6. 九个项目

    - [三行均为三个项目两端对齐](#三行均为三个项目两端对齐)

- 二、网格布局

  - [1. 基本网格布局](#_1-基本网格布局)

  - [2. 百分比布局](#_2-百分比布局)

  - [3. 圣杯布局](#_3-圣杯布局)

  - 4. 流式布局

    - [情况一 flex-start ：每一行项目均分主轴空间，项目之间没有外边距](#情况一-flex-start-每一行项目均分主轴空间-项目之间没有外边距)
    - [情况二 flex-between：项目两端对齐，项目之间需要相等外边距的情况](#情况二-flex-between-项目两端对齐-项目之间需要相等外边距的情况)

  - [5. 其他布局](#_5-其他布局)



## 一、Flex

将元素设置为 Flex 布局

```css
.flex {
  display: flex;
  display: flexbox;
  display: inline-flex; /* 行内元素也可以使用 Flex 布局。 */
  display: inline-flexbox;
}
```

设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。 ![Flex布局](data:image/png;base64,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)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 二、容器的属性

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### 1. `flex-direction` 主轴的方向

```css
flex-direction: row(默认) | row-reverse | column | column-reverse;
```

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

### 2. `flex-wrap` 换行

```css
flex-wrap: nowrap(默认) | wrap | wrap-reverse;
```

- nowrap（默认）：不换行。
- wrap：换行，第一行在上方。
- wrap-reverse：换行，第一行在下方。

### 3. `flex-flow` 主轴 + 换行 简写

```
flex-flow` 是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap
flex-flow: <flex-direction> | <flex-wrap>;
```

```css
.div1 {
  flex-flow: row nowrap;
}
```

### 4. `justify-content` 项目在主轴上的对齐方式

```css
.box {
  display: flex;
  justify-content: flex-start(默认) | flex-end | center | space-between | space-around;
}
```

具体对齐方式与轴的方向有关，假设主轴为从左到右:

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 5. `align-items` 项目在交叉轴上如何对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch(默认);
}
```

假设交叉轴从上到下:

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 6. `align-content` 有多根主轴时，各主轴在交叉轴的对齐方式

> 如果项目只有一根轴线，该属性不起作用。

```css
.box {
  display: flex;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch (默认);
}
```

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

## 三、项目的属性

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### 1. `order` 项目的排列顺序

数值越小，排列越靠前，默认为 `0` 。

```css
.item {
  order: <integer>; /* default 0 */
}
```

```css
.item1 {
  order: 3;
}
.item2 {
  order: 2;
}
.item3 {
  order: 1;
}
```

### 2. `flex-grow` 项目的放大比例

默认为 `0` ，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的 `flex-grow` 属性都为 `1` ，则它们将等分剩余空间（如果有的话）。

如果一个项目的 `flex-grow` 属性为 `2` ，其他项目都为 `1` ，则前者占据的剩余空间将比其他项多一倍。

### 3. `flex-shrink` 项目的缩小比例

默认为 `1` ，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的 `flex-shrink` 属性都为 `1` ，当空间不足时，都将等比例缩小。

如果一个项目的 `flex-shrink` 属性为 `0` ，其他项目都为 `1` ，则空间不足时，前者不缩小。

负值对该属性无效。

### 4. `flex-basis` 在分配多余空间之前，项目占据的主轴空间

浏览器根据这个属性，计算主轴是否有多余空间。

默认值为 `auto` ，即项目的本来大小。手动指定后：`剩余空间 = 总长度 - 此属性值`

```css
.item {
  flex-basis: <length> | auto(默认);
}
```

设为跟 `width` 或 `height` 属性一样的值（比如 `350px` ），则项目将占据固定空间。

### 5. `flex`： `flex-grow`, `flex-shrink` 和 `flex-basis`的简写

默认值为 `0 1 auto`。后两个属性可以不写。

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。

```css
.item {
  flex: <flex-grow> <flex-shrink> <flex-basis>; /* 默认：0 1 auto */
}
```

```css
.item1 {
  flex: auto; /* 相当于 1 1 auto */
}
.item2 {
  flex: none; /* 相当于 0 0 auto */
}

/* 当 flex 值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0% */
.item3 {
  flex: 1; /* 相当于 1 1 0% */
}

/* 当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1 */
.item4 {
  flex: 0%; /* 相当于 1 1 0% */
}
.item5 {
  flex: 24px; /* 相当于 1 1 24px */
}

/* 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0% */
.item6 {
  flex: 2 3; /* 相当于 2 3 0% */
}

/* 当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1 */
.item7 {
  flex: 2 24px; /* 相当于 2 1 24px */
}
```

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 6. `align-self` 单个项目在交叉轴的对齐方式

会覆盖容器设置的 `align-items` 属性。默认值为 `auto` ，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。

```css
.item {
  align-self: auto(默认) | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了 `auto`，其他都与 `align-items` 属性完全一致。