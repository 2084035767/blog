---
title: 胡说| Axios 简明使用
date: 2025-1-1
categories: 
  - 知识了解
---

:::tip 前言

todo

:::

## Axios 简介

> 百度一下

**Axios** 是一个基于 **Promise** 的 **HTTP** 客户端，用于在浏览器和 **node.js** 中发送 **HTTP** 请求。它提供了一种易于使用的 API 来发送各种 HTTP 请求，并处理响应。Axios 的设计是同构的，这意味着您可以在浏览器和 Node.js 中使用相同的代码库。

Axios 的主要特点包括：

- **创建 XMLHttpRequests**：在浏览器中可以创建 XMLHttpRequests 来发送请求。
- **创建 HTTP 请求**：在 Node.js 中可以创建 HTTP 请求。
- **支持 Promise API**：Axios 的操作返回 promises，提供了捕获成功和失败情况的能力。
- **请求和响应的拦截**：可以在请求或响应被处理之前拦截它们，进行自定义处理。
- **转换请求和响应数据**：可以在请求发送或响应接收之前对数据进行转换。
- **取消请求**：提供了取消正在进行的请求的能力。
- **自动转换 JSON 数据**：在请求和响应时自动转换 JSON 数据。
- **客户端支持防御 XSRF**：提供了防御 XSRF 的措施。



# 安装

使用 npm:

```bash
npm install axios
```

使用 yarn:

```bash
yarn add axios
```



# 默认配置

> 其他详细配置请查看《》

```javascript
let config = {
  // 自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: 'https://some-domain.com/api/',

   // 用于请求的服务器 URL
  url: '/user',

  // 创建请求时使用的方法
  method: 'get', // get(默认) | delete | head | options | post | put | patch

  // 被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 存放 `get/delete/head/options` 请求的查询字符串对象
  params: {
    ID: 12345
  },

  // 仅适用于 `post/put/patch` 请求的主体被发送的数据（body）
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  timeout: 1000,


   // `responseType` 表示服务器响应的数据类型，可以是：
   // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认值为 'json'


}

// 发送请求
axios(config).then(res => {})
then()回调函数
catch()捕获异常
```



创建自定义实例

```javascript
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

instance({
    url: "/home/multidata",
    type: "get"
}).then((res)=>{
    console.log(res)
})
```

请求的响应包含以下信息

```js
axios(config).then(res => {
    console.log(res)
}).catch(error => {}) // 响应的请求失败信息可以通过 error 对象使用

// res 是一个对象，由以下组成。
{
    // `data` 由服务器提供的响应
    data: {},
    // `status` 来自服务器响应的 HTTP 状态码
    status: 200,
    // `headers` 服务器响应头，响应头名称都是小写
    headers: {},
    // `config` 是发送请求的配置
    config: {},
    // `request`是生成此响应的请求。
    // 它是node.js（在重定向中）或 浏览器XMLHttpRequest实例 的最后一个ClientRequest请求实例
    request: {}
}
```



### 基础用法
GET请求：  
```javascript
axios.get('/user')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

POST请求：  
```javascript
axios.post('/user', { name: 'John', age: 30 });
```

**取消请求**  

```javascript
const source = axios.CancelToken.source();
axios.get('/user', { cancelToken: source.token });
source.cancel('请求已取消！');
```

**并发请求**  

```javascript
axios.all([axios.get('/user'), axios.get('/posts')])
  .then(axios.spread((userRes, postsRes) => {
    console.log(userRes.data, postsRes.data);
  }));
```



### 拦截器

**请求拦截**：添加Token、修改请求头。  

```javascript
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer token';
  return config;
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  
// 移除拦截器
const Axios = axios.create();
const myInterceptor = Axios.interceptors.request.use(function () {/*...*/});
Axios.interceptors.request.eject(myInterceptor);

```

响应拦截：统一处理错误。  
```javascript
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      alert('请重新登录！');
    }
    return Promise.reject(error);
  }
);
```





## 参考三三

- [Axios中文文档 | Axios中文网](https://www.axios-http.cn/)
