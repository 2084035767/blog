---
title: 胡说| 常见数据交换格式
date: 2023-11-22
categories:
  - 编程知识
---

:::tip 前言

写前后端分离项目时，常见JSON格式，哪么它是啥子呢？🤔

:::

## 简介

数据交换格式是用于在计算机系统之间传输和存储数据的一种规范或约定。它定义了数据的结构、编码方式和解码方式，以确保数据能够在不同系统之间正确地解释和处理。

以下是几种常见的数据交换格式：

1. JSON（JavaScript Object Notation）：JSON是一种轻量级的数据交换格式，易于阅读和编写。它基于JavaScript的对象表示法，并被广泛用于Web应用程序中的数据交换。JSON使用键值对的形式来表示数据，并支持嵌套和数组。
2. XML（eXtensible Markup Language）：XML是一种可扩展的标记语言，用于描述和交换结构化的数据。XML使用自定义的标记来定义数据的结构和内容，并支持嵌套和属性。XML在许多领域中使用广泛，包括Web服务、配置文件和数据存储。
3. YAML（YAML Ain't Markup Language）：YAML是一种人类友好的数据序列化格式，常用于配置文件和数据交换。YAML使用缩进和冒号来表示数据的层次结构和键值对。它支持列表、字典和复杂对象，并注重可读性和易于编辑。
4. TOML（Tom's Obvious, Minimal Language）是一种简单、易读的配置文件格式，主要在Rust编程语言中常见。TOML的设计目标是提供一种易于编写和阅读的配置文件格式，它的语法受到INI文件和YAML的影响。




## 常见数据交换格式

### 四种数据交换格式的比较

> 是骡子！是马！拉出来溜溜🤪

- XML：
  - 最早的通用信息标记语言，可扩展性好，但繁琐
  - Internet 上的信息交互与传递
- JSON：
  - 信息有类型，适合程序处理(js)，较 XML 简洁
  - 移动应用云端和节点的信息通信，无注释
- YAML：
  - 信息无类型，文本信息比例最高，可读性好
  - 各类系统的配置文件，有注释易读
- TOML：
  - 语法设计简洁明了，易于理解和编写
  - 支持多种基本数据类型和嵌套结构，有注释易读



:::warning 特别注意

此文主要是简单了解和区分这几种格式，不会探究太深的语法格式。

:::

### XML

XML 「eXtensible Markup Language」

- 常见于 Java 项目中
- 标签类型

```xml
注释书写形式
<!--注释-->
标签Tag
<name>皆为自定义标签</name>
自闭合标签Tag
<name/>
带属性Attribute标签
<name data="属性" />

 
 
标签的书写注意事项：
<!--
    1、每一个xml,有且只有一个根标签，所有xml标签必须写在根标签中
    2、标签必须要有合闭
    3、xml格式是否正确，可以通过浏览器打开xml。来校验xml格式是否正确
    4、xml是区别大小写的
    5、xml书写标签名时，不要出现空格等特殊字符
    6、标签命名时不要以数字开头
    7、在书写标签中时不要乱嵌套或相互嵌套  <name><age></name></age>
-->
1、xml中的所有标签必须闭合。
2、xml中的标签名称严格区分大小写。<User>  <user>
3、在xml标签名中间不要书写空格，或者 冒号 逗号 等符号。标签的名字不要有空格一类特殊符号。
4、标签名不要以数字开始。（可以按照标识符的方式给标签去命名）
5、书写xml标签时  ，标签不能互相嵌套。
6、所有的xml文件只能有一个根标签。
7、我们可以通过浏览器来校验xml文件的格式是否正确。
```

**一个小栗子**

```xml
<person>
	<firstName>Tian</firstName>
	<lastName>Song</lastName>
	<address>
		<streetAddr>中关村南大街5号</streetAddr>
		<city>北京市</city>
		<zipcode>100081</zipcode>
	</address>
	<prof>Computer System</prof><prof>Security</prof>
</person>
```



### JSON

JSON 「JavsScript Object Notation」

- 常见于前端或前后端分离项目中
- 有类型的键值对 key:value

```json
![一定要用双引号]
普通键值对
"name" : "北京理工大学"

数组值
"name" : [ "北京理工大学", "延安自然科学院" ]

键值对嵌套
"name" : {
"newName" : "北京理工大学",
"oldName" : "延安自然科学院"
}
```

**一个小栗子**

```json
{
	"firstName" : "Tian" ,
	"lastName" : "Song",
	"address": {
		"streetAddr" : "中关村南大街5号" ,
		"city": "北京市" ,
		"zipcode": 100081
		} ,
	"prof": [ "Computer System", "Security" ]
}
```



### YAML

YAML 「YAML Ain’t Markup Language」

- 常见于python项目中
- 无类型键值对 key:value

yaml 仅支持单行注释

```yaml
![值前一定要有一个空格]
普通键值对
name : 北京理工大学

数组值
‐ 表达并列关系
name :
‐北京理工大学
‐延安自然科学院

key : value
key : # Comment
‐value1
‐value2
key :
	subkey : subvalue



缩进表达所属关系
name :
	newName : 北京理工大学
	oldName : 延安自然科学院



| 表达整块数据  # 表示注释
text: | #学校介绍
北京理工大学创立于1940年


一个文件可以包含多个文件的内容#
用 ---，三个破折号表示一份内容的开始。
用 ...，三个小数点表示一份内容的结束，但并不是必需的。
---
# 第一份内容
name: devcursor
...

---
# 第二份内容
name: Devcursor
...


复杂对象
用 问号 ? 声明一个复杂对象，允许使用多个词汇（数组）来组成键。

?
  - name1
  - name2
:
  - value1
  - value2
```

**一个小栗子**

```yaml
firstName : Tian
lastName: Song
address:
	streetAddr : 中关村南大街5号
	city: 北京市
	zipcode: 100081
prof:
‐Computer System
‐Security
```



### TOML

TOML 「Tom's Obvious, Minimal Language」

- 常见于rust项目
- 有类型的键值对 key:value

```toml
key = "value"
key :: "value"

title = "Example"

[author]
name = "John Doe"
email = "johndoe@example.com"

[database]
server = "localhost"
port = 1234
enabled = true
```
