# JSON 简介

JSON 全称 (`J` ava `S` cript `O` bject `N` otation )，中文名 JavaScript 对象表示方法。

JSON 是存储和交换文本信息的语法，类似 XML，但比 XML 更流行。

因为 JSON 比 XML 更小、更快，更易解析。

JSON 文件的后缀名是 `.json`。

## 什么是 JSON ？

1. JSON 指的是 JavaScript 对象表示法
2. JSON 是轻量级的文本数据交换格式。
3. JSON 独立于语言：JSON 使用 JavaScript 语法来描述数据对象，但是 JSON 仍然独立于语言和平台，JSON 解析器和 JSON 库支持许多不同的编程语言。
4. JSON 具有自我描述性，更易理解。
5. 目前主流的编程语言都支持 JSON。

## 一个 JSON 范例



```
{
    "sites": [
        { "name":"devcursor" , "url":"www.devcursor.com" }, 
        { "name":"github" , "url":"www.github.com"}, 
        { "name":"腾讯" ,     "url":"www.qq.com" }
    ]
}
```

1
2
3
4
5
6
7

## 和 XML 的区别

与 XML 相同之处

1. JSON 是纯文本。
2. JSON 具有 "自我描述性"，具有可读性。
3. JSON 具有层级结构：值中存在值。
4. JSON 可通过 JavaScript 进行解析。
5. JSON 数据可使用 AJAX 进行传输。

与 XML 不同之处

1. 没有结束标签。
2. 更短，意味着传输更快。
3. 读写的速度更快。
4. 能够使用内建的 JavaScript eval() 方法进行解析。
5. 使用数组。
6. 没有保留字。

## 为什么使用 JSON？

JSON 在语法格式上和 JavaScript 调度对象代码相同，因此，JSON 非常适合在开发中用来描述数据。

信息

另外一个常用的描述数据的语言是 [YAML](http://konnga.cn/data-format/yaml/introduction.html)

# JSON 语法

JSON 语法是 JavaScript 语法的子集。

## JSON 基础语法

JSON 语法是 JavaScript 对象表示法语法的子集。

1. 数据在键/值对中。
2. 数据由逗号分隔。
3. 大括号保存对象。
4. 中括号保存数组。
5. 用 `//` 或 `/**/` 表示注释。
6. 通常将数据包裹在 `{}` 中使用。

## JSON 键/值对

JSON 数据的书写格式是：key(键): value(值)。

键/值对包括字段名称（在双引号中），后面写一个冒号，然后是值



```
"name" : "devcursor"
```

对应的 JavaScript 语句：



```
let name = 'devcursor'
```

在 JavaScript 中，键的双引号可以省略，但在 JSON 中是不可以的。

## JSON 数据类型

JSON 的值可以是以下几种：

1. 数字（整数或浮点数）。
2. 字符串（在双引号中）。
3. 布尔值（true 或 false）。
4. 数组（在中括号中）。
5. 对象（在大括号中）。
6. null。

## JSON 数字

数字可以是整数或者浮点数。



```
{
  "age": 30,
  "height": 175.5
}
```

提示

数字类型的值可以不带双引号。

最佳实践

每个键值对单独一行。

值前面带一个空格。

## JSON 字符串



```
{
  "name": "devcursor",
}
```



## JSON null

JSON 可以设置值为 `null`。



```
{ "name": null, }
```

## JSON 布尔值

JSON 布尔值可以是 `true` 或者 `false`

```
{ "flag": true, }
```

## JSON 对象

JSON 对象和 JavaScript 对象一样，在大括号 `{}` 中书写。

JSON 对象可以包含多个键/值对。

```
{
  "name": "devcursor",
  "url": "www.devcursor.com"
}
```

对象的值可以是任意的 JSON 数据类型，也可以在对象中嵌套多个对象。



```
{
  "name": "devcursor", // 字符串
  "count": 100 /*数字*/,
  "url": "www.devcursor.com",
  "good": true, // 布尔值
  "yachts": null, // null，空值
  "docs": ["json", "yaml"], // 数组
  "object": {
    // 对象
    "sex": "girl",
    "features": ["漂亮", "善良"]
  }
}
```

## JSON 数组

数组的值可以是任意的 JSON 数据类型，也可以在数组中嵌套多个数组。

```
{
  "name": ["devcursor", "good"], // 字符串数组
  "count": [100, 99, 98] /*数字数组*/,
  "good": [true, false], // 布尔值数组
  "yachts": [null, 100, "devcursor"], // 复合数据类型的数组
  "docs": [
    // 对象数组
    { "name": "json" },
    { "name": "yaml" }
  ],
  "object": [ // 嵌套数组
    [
      {
        "sex": "girl",
        "features": ["漂亮", "善良"]
      }
    ],
    [
      {
        "sex": "girl",
        "features": ["漂亮", "可爱"]
      }
    ]
  ]
}
```



# JSON 使用

上文提到过，JSON 语法是 Javascript 语法的子集，所以我们能直接在 Javascript 中操作 JSON。

那具体又该如何使用呢？

## 对象访问

使用`属性访问器`。

属性访问器提供了2种方式来访问一个对象的属性，它们分别是`点号（.）`和`方括号([])`。

- 语法

```
object.property
object['property']
```

- 使用点号

```
const people = {
  "name": "devcursor",
  "cat": null,
  "site": "http://www.devcursor.com"
}
let name = people.name
```

- 使用方括号

```
const people = {
  "name": "devcursor",
  "cat": null,
  "site": "http://www.devcursor.com"
}
let name = people["name"]
```

- 修改对象值

通过属性访问器，可以修改 JSON 对象的值。

```
people.cat = 'xiaohui'
people["name"] = "xiaobai"
```

- 删除对象属性

可以使用 `delete` 关键字来删除 JSON 对象的属性。

```
delete people.cat
// 或者
delete people["cat"]
```

注意

谨慎使用 `delete` 来删除对象属性。

- 循环对象

有多种方式来循环访问对象属性。

使用 `for-in`。

```
const people = {
  "name": "devcursor",
  "cat": null,
  "site": "http://www.devcursor.com"
}
for (key in people) {
  console.log('key:', key)
  console.log('value:', people[key])
}
```

提示

使用方括号访问对象属性时，支持变量。上面的例子中，key 就是一个变量。

使用 `Object.keys()`、`Object.values()`、`Object.entries()`。

```
var obj = { "foo": 'bar', "baz": 42 };
Object.keys(obj)
// ["foo", "baz"]
const obj = { "foo": 'bar', "baz": 42 };
Object.values(obj)
// ["bar", 42]
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]

// 因为这3个方法返回的都是数组，也可以使用 for-of 来遍历数组
for (let key of Object.keys(obj)) {
  console.log(key); // foo, baz
}
```

## 数组访问

```
{
  "name": ["devcursor", "good"]
}
```

可以通过数组索引值来访问数组元素。

```
const x = people.name[0]
```

- 修改数组值

可以使用索引值来访问并且修改数组元素值。

```
people.name[1] = 'very good'
```

- 删除数组元素

对于数组的删除操作方式有很多，这里仅列举其中一种，更多的使用方法请查阅 Javascript 数组 API。

```
const people = {
  "name": ["devcursor", "good"]
}
people.name.splice(1, 1)
console.log(people)
// { name: ['devcursor'] }
```

- 循环数组

循环访问数组除了有 `for-in`、`for-of` 等语句外，还有很多数组本身的 API 可以实现。

```
const people = {
  "name": ["devcursor", "good"]
}
for (let item of people.name) {
  console.log(item); // devcursor, good
}
```

# JSON Javascript API

JSON 常用于客户端与服务器进行数据交换，而客户端接收到服务器传送过来的 JSON 数据一般是字符串。

字符串的数据无法直接操作，这时候我们需要将数据转换为 Javascript 对象。

## JSON.parse()

使用 `JSON.parse()` 方法将 JSON 字符串转换为 JavaScript 对象。

### 语法

```
JSON.parse(text[, reviver])
```

#### 参数说明

- **text**：必需参数。要被解析成 JavaScript 值的字符串。
- **reviver**：可选参数。一个转换结果的函数， 将为对象的每个成员调用此函数。

### 使用示例

- 解析服务端接口返回的响应数据

```
{
  "data": "生产测试",
  "code": "200",
  "msg": "OK"
}
```

使用 JSON.parse() 解析上面的数据。

```
const obj = JSON.parse('{ "data": "生成测试", "code": "200", "msg": "OK" }');
// 解析完成后就可以使用 JSON 数据了
console.log(obj.data) // 输出 生成测试
```

- 解析浏览器缓存

localStorage/sessionStorage 中是以 JSON 字符串存储的，在使用前需要解析。



```
const data = JSON.parse(localStorage.getItem('data'))
const session = JSON.parse(sessionStorage.getItem('session'))
```

- 其他类型的解析

```
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');              // null
```

JSON.parse() 不允许用逗号作为结尾，否则会抛出 SyntaxError 异常。

```
// 抛出 SyntaxError 异常
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
```

解析前要确保数据是标准的 JSON 格式，否则也会解析出错。

## JSON.stringify()

使用 JSON.stringify() 方法将 JavaScript 对象转换为 JSON 字符串。

### 语法

```
JSON.stringify(value[, replacer[, space]])
```

#### 参数说明

- **value**：必需参数。将要序列化成 一个 JSON 字符串的值。
- **replacer**：可选参数。用于转换结果的函数或数组。 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
- **space**：可选参数。指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为 10。该值若小于 1，则意味着没有空格；如果该参数为字符串（当字符串长度超过 10 个字母，取其前 10 个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

### 使用示例

- 浏览器缓存存储

当我们要将下面的数据存入浏览器缓存（localStorage/sessionStorage）中时，需要使用 JSON.stringify() 。

```
const data = { name: 'devcursor', feature: ['good'] }
localStorage.setItem('data', JSON.stringify(data))
// 或者
sessionStorage.setItem('data', JSON.stringify(data))
```

- 其他类型的序列化

```
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

JSON.stringify({x: 5, y: 6});
// "{"x":5,"y":6}"
```

- space 参数使用

```
JSON.stringify({ a: 2 }, null, " ");   // '{\n "a": 2\n}'
JSON.stringify({ uno: 1, dos : 2 }, null, '\t')
// '{            \
//     "uno": 1, \
//     "dos": 2  \
// }'
```