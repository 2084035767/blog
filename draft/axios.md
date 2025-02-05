---
title: 胡说| Axios的简单使用
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

使用 CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```



# 默认配置

配置

```javascript
let config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: 'https://some-domain.com/api/',

   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // get(默认) | delete | head | options | post | put | patch

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 存放 `get/delete/head/options` 请求的查询字符串对象
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `data` 是仅适用于 `post/put/patch` 请求的主体被发送的数据
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费时间超过 `timeout` 的时间，请求将被中断
  timeout: 1000 * 5,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认为 false


   // `responseType` 表示服务器响应的数据类型，可以是：
   // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认值为 'json'

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default


   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 指定对于响应的状态码是作 resolve() 还是 reject() 处理。
  // `validateStatus` 返回 true (或者设置为 null 或 undefined )，promise 将被 resolve();
  // 否则，promise 将被 reject()
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认：状态码为 2xx 才会被 resolve()
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉 `header` 中设置的 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'tom',
      password: '123456'
    }
  },

}

// 发送请求
axios(config).then(res => {})
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

---

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

    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: 'OK',

    // `headers` 服务器响应头，响应头名称都是小写
    headers: {},

    // `config` 是发送请求的配置
    config: {},

    // `request`是生成此响应的请求。
    // 它是node.js（在重定向中）或 浏览器XMLHttpRequest实例 的最后一个ClientRequest请求实例
    request: {}
}
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

// 错误处理
axios.get('/user/12345')
    .catch(function (error) {
        if (error.response) {
            // 发送请求后，响应状态码不是请求配置中 validateStatus 指定的范围（默认为 2xx）
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // 请求已发出，但未收到响应
            // `error.request` 是浏览器中的 XMLHttpRequest 实例
            // node.js中的实例为：http.ClientRequest
            console.log(error.request);
        } else {
            // 其他错误，比如请求配置错误等
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
    
    在发送请求的配置中，指定不抛出错误的状态码范围，范围之外则抛错。
    axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 只在状态码小于 500 时才不抛出错误，否则，大于 500 则抛错。
  }
})
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



---

### 封装Axios
```
import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: "http://123.207.32.32:8000",
        timeout: 5000
    })
    return instance(config)
}
```

使用:

```
import {request} from "./network/request";

request({
    url: "/home/multidata",
    type: "get"
}).then((res) => {
    console.log(res)
})
```



## 参考三三

- [Axios中文文档 | Axios中文网](https://www.axios-http.cn/)
