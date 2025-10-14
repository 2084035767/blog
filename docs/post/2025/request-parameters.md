---
title: 胡说| 前后端联调
date: 2025-10-10
categories:
  - 编程知识
order: 10
---

# 前后端联调

::: tip 前言

前后端联调的时候，总有一种麻烦事就是传参，让我们看看🤗

:::

## 一、引言

在前后端分离架构里，前端必须按后端提供的接口“拿数据”，这一磨合过程即联调，而接口调用又是联调的核心。不同接口对参数的要求各异，因此“如何传参”成了决定联调效率与成败的关键一环。



## 二、URL 参数

### 查询参数

查询参数是附加在URL末尾的**键值对**，以问号 `?` 开始，多个参数间用 `&` 连接。

例如：页面跳转时携带少量简单信息

```java
// Spring Boot 接口定义
@RestController
@RequestMapping("/demo")
public class DemoController {
    @GetMapping
    public String hello(@RequestParam String name, @RequestParam int age) {
        return "Hello, " + age +"岁的"+ name;
    }
}
```

```js
// JS 接口调用
fetch('http://localhost:8080/demo?name=小明&age=18')
  .then(res => res.text())
  .then(console.log);   // → Hello, 18 岁的小明

// axios，显式传参
axios.get('http://localhost:8080/demo', {
  params: { name: '小明', age: 18 }   // 这里写参数
}).then(res => console.log(res.data));   // → Hello, 18 岁的小明
```



### 路径参数

路径参数是直接嵌入在URL路径中的变量部分，成为URL路径结构的一部分。

例如：获取特定信息的 API

```java
// Spring Boot 接口定义
@RestController
@RequestMapping("/demo")
public class DemoController {
    @GetMapping("/{name}")
    public String hello(@PathVariable String name) {
        return "Hello, " + name;
    }
}
```

```js
// JS 接口调用
fetch('http://localhost:8080/demo/小明')
  .then(res => res.text())
  .then(console.log);   // → Hello, 小明

// axios，把路径参数抽成变量，动态拼接
const name = '小明';                    // 这里传参
axios.get(`http://localhost:8080/demo/${name}`)
  .then(res => console.log(res.data));   // → Hello, 小明
```

::: details **params** 和 **query** 的区别

**注意**：
在一些请求包中会把 params 叫做 query ，但其实都是查询传参。而在一些前端路由中，会把 params 方式叫做路径传参，query方式 叫做查询传参。详情可查看这篇博文《[Vue Router 中 params 和 query 的区别](https://juejin.cn/post/7493783786708484134)》

:::



## 三、请求体参数

适用于传递大量或敏感数据，数据位于 HTTP 请求体中

> 请求体参数不只有 POST 请求可以有，其他请求也可以，但建议最好使用 POST😀

常见格式：
- **Form - Data** ：模拟表单提交（举例：文件上传与普通文本数据混合的场景，前端使用 FormData 对象）

- **x - www - form - urlencoded** ：传统的表单数据格式化方式（举例：登录时用户名密码传递，前后端处理方式）

- **Raw（JSON）**<Badge text="常用"/> ：以 JSON 格式组织数据（前后端编写与解析 JSON 数据）

```java
// Spring Boot 接口定义
@RestController
@RequestMapping("/demo")
public class DemoController {
  // Map 参数
  @PostMapping("/map")
  public String helloMap(@RequestBody Map<String,String> body) {
    return "Hello, " + body.get("name");
  }
  
  // Person.java  实体类参数
  public class Person {
    public String name;
    public int age;

    public String getName() {
      return name;
    }
  }
  @PostMapping
  public String hello(@RequestBody Person person) {
    return "Hello, " + person.getName();
  }
}
```

```js
// JS 接口调用
fetch('http://localhost:8080/demo',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name:"小明"})
}).then(r=>r.text()).then(console.log); // → Hello, 小明

// axios，通过 data 字段显式传 JSON 体
axios.post('http://localhost:8080/demo',
  { name: '小明' }           // 这里写请求体参数
).then(res => console.log(res.data)); // → Hello, 小明
```



## 四、HTTP 头

利用 HTTP 请求头传递一些控制信息或元数据

常见应用
- **认证信息** ：如 Token 放在 Authorization 头中用于身份验证，展示不同认证方式（Basic Auth、Bearer Token 等）对应的头设置

- **自定义头信息** ：前后端约定的用于传递业务逻辑相关标识或参数

```java
// Spring Boot 接口定义
@RestController
@RequestMapping("/demo")
public class DemoController {
    @GetMapping
    public String hello(@RequestHeader("X-Name") String name) {
        return "Hello, " + name;
    }
}
```



```js
// JS 接口调用
// 请求头默认只支持 ISO-8859-1 编码，传递中文需要特殊处理
fetch('http://localhost:8080/demo',{
    headers:{'X-Name':'World'}
}).then(r=>r.text()).then(console.log); // → Hello, World


// axios，通过 headers 字段显式传自定义头
axios.get('http://localhost:8080/demo', {
  headers: { 'X-Name': 'World' }   // 这里写头参数
}).then(res => console.log(res.data)); // → Hello, World
```



## 五、二进制文件

二进制文件传递的场景（如文件上传下载功能）

上传二进制文件
- 前端实现（使用 HTML 的 **input[type="file"]** 元素和 **FormData** 对象发送文件）

- 后端接收（以常见的后端框架 Spring Boot 为例 ，展示如何获取上传的文件并保存）



```java
// Spring Boot 接口定义 
@RestController
@RequestMapping("/file")
public class FileController {
    @PostMapping("/up")
    public String up(@RequestPart("f") MultipartFile f) {
        return "收到 " + f.getOriginalFilename() + " " + f.getSize() + " 字节";
    }
}
```



```js
const fileInput = document.querySelector('input[type=file]');
const file = fileInput.files[0]
const form = new FormData();
form.append('f', file);
// JS 接口调用
fetch('http://localhost:8080/file/up', {method:'POST', body: form})
  .then(r => r.text())
  .then(console.log);   // 收到 xxx.png 12345 字节

// axios 上传
axios.post('/file/up', form)
  .then(r => console.log(r.data)); // 收到 xxx.png 12345 字节
```



下载二进制文件

- 前端请求下载（通过创建 a 标签或使用 fetch API 触发下载）

- 后端设置响应头（如 Content-Type、Content-Disposition 等，确保浏览器正确处理下载的文件）

```java
// Spring Boot 接口定义 
@RestController
@RequestMapping("/file")
public class FileController {

    // 下载
    @GetMapping("/down")
    public ResponseEntity<byte[]> down() throws IOException {
        byte[] bytes = Files.readAllBytes(Paths.get("demo.jpg"));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=demo.jpg")
                // MIME 类型
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }
}
```

```js
// JS 接口调用（这里只考虑JS调用）
fetch('http://localhost:8080/file/down', {method: 'GET'})
  .then(res => {
    if (!res.ok) throw new Error('下载失败');
    return res.blob();          // 继续传递 blob
  })
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demo.jpg';
    a.click();
    URL.revokeObjectURL(url);
  })
  .catch(err => alert(err.message));

// axios 下载
axios
  .get('/file/down', { responseType: 'blob' })
  .then(res => {
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demo.jpg';
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch(err => alert(err.message || '下载失败'));
```

## 七、其他传递方式

**Cookie** ：

1. 服务器通过 `Set-Cookie` 响应头种下。
2. 浏览器自动保存，并在**同域**后续请求里自动附加 `Cookie: name=value`。
3. 大小 ≤4 KB，可设过期时间、路径、域名、HttpOnly、Secure 等属性。
4. 前端**无需读写**，只要 `fetch(url, {credentials:'include'})` 就能随请求一起带到后端，实现“无代码感知”的会话、追踪或偏好设置。



## 写在最后

传递参数是联调过程中不可或缺的一步，因此了解不同的传参方式是很有必要的。

> 好了，现在我承认你是联调高手了😀。



## 参考三三

- AI
- https://juejin.cn/post/7488596151995269183
- https://juejin.cn/post/7493783786708484134