---
title: 关于| 颜色那些事
date: 2022-8-26
categories:
  - 知识科普
tags:
  - 计算机
---

# 颜色那些事

:::tip



:::

## 颜色简介

### 颜色的本质

颜色是光波被物体反射或发射后，通过人眼视网膜中的视锥细胞感知到的现象。不同波长的光对应不同的颜色，例如，红色光的波长约为620-750纳米，蓝色光则为450-495纳米。

### 颜色的三要素

1. **色相（Hue）**：颜色的基本属性，如红、绿、蓝等。  
2. **饱和度（Saturation）**：颜色的纯度，饱和度越高，颜色越鲜艳；越低则接近灰色。  
3. **明度（Value/Brightness）**：颜色的明暗程度，明度越高越接近白色，越低越接近黑色。

### 人眼如何感知颜色

人眼通过三种视锥细胞（分别对红、绿、蓝光敏感）接收不同波长的光信号，大脑将这些信号综合处理，形成对颜色的判断。这一机制直接影响了计算机颜色模型的设计。



## 计算机的颜色展示

### 显示器的工作原理

计算机通过屏幕上的像素点显示颜色，每个像素由红（R）、绿（G）、蓝（B）三个子像素组成。通过调节子像素的亮度，可以混合出不同的颜色。例如：

- **RGB(255, 0, 0)** 表示纯红色，  
- **RGB(0, 255, 0)** 表示纯绿色，  
- **RGB(0, 0, 255)** 表示纯蓝色。



### 颜色模型：RGB与CMYK

- **RGB（加色模型）**：适用于发光设备（如显示器、手机屏幕），通过叠加红、绿、蓝光生成颜色。  
- **CMYK（减色模型）**：适用于印刷领域，通过青（Cyan）、品红（Magenta）、黄（Yellow）、黑（Key）四色油墨吸收光线来呈现颜色。



### 分辨率与色域

- **分辨率**：屏幕上像素的数量，直接影响图像的清晰度。  
- **色域（Color Gamut）**：设备能显示的颜色范围。常见的标准包括sRGB（通用网络标准）和Adobe RGB（专业摄影印刷标准）。



## 颜色的表示方法

### 1. 十六进制代码

在网页设计中，常用6位十六进制数表示RGB值，例如 `#FF0000` 表示红色。每两位对应红、绿、蓝的强度（00-FF，即0-255）。



### 2. RGB与RGBA

- **RGB**：格式为 `rgb(255, 0, 0)`，三个参数分别控制红、绿、蓝的强度（0-255）。  
- **RGBA**：在RGB基础上增加透明度（Alpha通道），例如 `rgba(255, 0, 0, 0.5)` 表示半透明的红色。



### 3. HSL与HSV

- **HSL（色相、饱和度、亮度）**：更符合人类直觉的模型，适合设计场景。例如，`hsl(0, 100%, 50%)` 为纯红色。  
- **HSV（色相、饱和度、明度）**：常用于图像编辑软件（如Photoshop），便于调整颜色的明暗层次。



### 4. 颜色命名

部分颜色有预定义的英文名称，如 `red`、`blue`、`cyan`，可直接在代码中使用，但可选范围有限。





### 实用工具推荐

- **取色工具**：Adobe Color、Coolors（快速生成配色方案）。  
- **开发工具**：浏览器开发者工具支持直接拾取网页颜色并转换格式。
