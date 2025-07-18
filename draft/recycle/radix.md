---
title: 计组| 数字与进制
date: 2025-1-1
categories: 
  - 知识了解
---
# 数字与进制

在计算机科学中，理解数字和进制是理解计算机运算规则的基础。本文将带你深入了解数字的产生、数字系统、标准数字系统、数字的其他含义，以及十进制、八进制、二进制和十六进制的转换方法



## 标准数字系统

阿拉伯数字在全球范围内被广泛使用，成为了一种标准。这种标准的好处在于，全世界的人都能理解，不用担心引起误解。例如，罗马数字中的Ⅹ代表数字10，但如果不事先说明，人们可能会误认为它是英文字母X。



## 十进制介绍

十进制（Decimal System）是我们日常生活中最常用的进制系统。在十进制中，不同位置的数字代表的值是不一样的。例如，12 = 1×10 + 2，这里的1代表10。每个数字的权重是10的幂次方，越高位的数字，权重越大。



## 八进制介绍

八进制（Octal）是一种逢八进一的进制系统。在八进制中，数字的权重是8的幂次方。例如，[12]八进制 = 1×8 + 2，这里的1代表8。八进制在计算机科学中也有一定的应用。



## 二进制介绍

二进制（Binary）是计算机内部采用的标准数字系统。在二进制中，逢二进一。例如，1+1=10，11+1=100。二进制的每个数字的权重是2的幂次方。例如，[111]二进制 = 1×4 + 1×2 + 1×1 = 7。



## 十六进制介绍

十六进制（Hexadecimal）是一种逢十六进一的进制系统。在十六进制中，数字的权重是16的幂次方。为了表示10到15之间的数，使用字母A到F。例如，[A]十六进制 = 10，[10]十六进制 = 16。



## 不同进制的对照表

| 十进制 | 二进制 | 八进制 | 十六进制 |
| ------ | ------ | ------ | -------- |
| 0      | 0      | 0      | 0        |
| 1      | 1      | 1      | 1        |
| 2      | 10     | 2      | 2        |
| 3      | 11     | 3      | 3        |
| 4      | 100    | 4      | 4        |
| 5      | 101    | 5      | 5        |
| 6      | 110    | 6      | 6        |
| 7      | 111    | 7      | 7        |
| 8      | 1000   | 10     | 8        |
| 9      | 1001   | 11     | 9        |
| 10     | 1010   | 12     | A        |
| 11     | 1011   | 13     | B        |
| 12     | 1100   | 14     | C        |
| 13     | 1101   | 15     | D        |
| 14     | 1110   | 16     | E        |
| 15     | 1111   | 17     | F        |



## 各个进制的表示前缀

为了区分不同的进制，我们通常使用前缀来表示。例如，二进制用0b或0B表示，八进制用0o或0O表示，十进制没有前缀，十六进制用0x或0X表示。

| 进制基数 | 前缀   | 示例      |
| -------- | ------ | --------- |
| 二进制   | 0b 0B  | 0b11 = 3  |
| 八进制   | 0o 0O  | 0o11 = 9  |
| 十进制   | 无前缀 | 11 = 11   |
| 十六进制 | 0x 0X  | 0x11 = 17 |

## 进制转换

###  二进制与十进制

**二进制转十进制**：将每位数乘以对应的权重，再将结果相加。例如，(1011.01)₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁻¹ + 1×2⁻² = 11.25。

**十进制转二进制**：采用“除2取余，逆序排列”法。例如，将173转换为二进制：

173 ÷ 2 = 86 余 1
86 ÷ 2 = 43 余 0
43 ÷ 2 = 21 余 1
21 ÷ 2 = 10 余 1
10 ÷ 2 = 5 余 0
5 ÷ 2 = 2 余 1
2 ÷ 2 = 1 余 0
1 ÷ 2 = 0 余 1

逆序排列得到：10101101。

### 二进制与十六进制

**二进制转十六进制**：将二进制数每4位分为一组，从低位到高位，不足4位时用0补足。例如，将01011110.10110010转换为十六进制：

0101 1110 . 1011 0010 = 5E.B2

**十六进制转二进制**：将每位十六进制数用等值的4位二进制数代替。例如，将8FA.C6转换为二进制：

8 = 1000
F = 1111
A = 1010
. = .
C = 1100
6 = 0110

得到：100011111010.11000110

###  二进制与八进制

**二进制转八进制**：将二进制数每3位分为一组，从低位到高位，不足3位时用0补足。例如，将011110.010111转换为八进制：

011 110 . 010 111 = 36.27

**八进制转二进制**：将每位八进制数用等值的3位二进制数代替。例如，将52.43转换为二进制：

5 = 101
2 = 010
. = .
4 = 100
3 = 011

得到：101010.100011

## 总结

理解数字和进制是理解计算机运算规则的基础。通过本文的介绍，你已经了解了数字的产生、数字系统、标准数字系统、数字的其他含义，以及十进制、八进制、二进制和十六进制的转换方法。希望这些知识能帮助你更好地理解计算机科学中的数字系统。
