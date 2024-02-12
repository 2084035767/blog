

## Axios

### 选择什么网络模块？

#### Ajax

选择一: `传统的Ajax是基于XMLHttpRequest(XHR)`

为什么不用它呢？

- 非常好解释，配置和调用方式等非常混乱.
- 编码起来看起来就非常蛋疼.
- 所以真实开发中很少直接使用，而是使用 jQuery-Ajax

#### jQuery-Ajax

选择二: `在前面的学习中, 我们经常会使用jQuery-Ajax`

- 相对于传统的 Ajax 非常好用.

为什么不选择它呢？

- 首先，我们先明确一点：在 Vue 的整个开发中都是不需要使用 jQuery 了.
- 那么，就意味着为了方便我们进行一个网络请求，特意引用一个 jQuery, 你觉得合理吗？
- jQuery 的代码 1w + 行.
- Vue 的代码才 1w + 行.
- 完全没有必要为了用网络请求就引用这个重量级的框架.

#### Vue-resource

选择三: `官方在Vue1.x的时候, 推出了Vue-resource.`

- Vue-resource 的体积相对于 jQuery 小很多.
- 另外 Vue-resource 是官方推出的.

为什么不选择它呢？

- 在 Vue2.0 退出后，Vue 作者就在 GitHub 的 Issues 中说明了去掉 vue-resource, 并且以后也不会再更新.
- 那么意味着以后 vue-reource 不再支持新的版本时，也不会再继续更新和维护.
- 对以后的项目开发和维护都存在很大的隐患.

#### Axios

Vue 作者推荐，axios 有非常多的优点，并且用起来也非常方便.

特性

- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Refenetce/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### axiox 请求方式

- `axios(config)`
- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

### axios 的基本使用

- 安装

  ```bash
  npm install axios --save
  ```

- 使用

  向 `axios()` 方法传递相关配置来创建请求
  
  只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。
  
- ```js
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
  
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    }],
  
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
      // 对 data 进行任意转换处理
      return data;
    }],
  
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: function(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
  
    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    adapter: function (config) {
      /* ... */
    },
  
   // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
    // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    auth: {
      username: 'janedoe',
      password: 's00pers3cret'
    },
  
     // `responseType` 表示服务器响应的数据类型，可以是：
     // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // 默认值为 'json'
  
    // `responseEncoding` indicates encoding to use for decoding responses
    // Note: Ignored for `responseType` of 'stream' or client-side requests
    responseEncoding: 'utf8', // default
  
     // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    xsrfCookieName: 'XSRF-TOKEN', // default
  
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
  
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
  
    // `socketPath` defines a UNIX Socket to be used in node.js.
    // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
    // Only either `socketPath` or `proxy` can be specified.
    // If both are specified, `socketPath` is used.
    socketPath: null, // default
  
    // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
    // `keepAlive` 默认为 false
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
  
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
  
    // `cancelToken` 指定用于取消请求的 cancel token
    // （查看后面的 Cancellation 这节了解更多）
    cancelToken: new CancelToken(function (cancel) {
    })
  }
  
  // 发送请求
  axios(config).then(res => {})
  ```

  

  ```js
  JAVASCRIPT//导入 axios
  import axios from "axios"
  
  axios({
      // url 是用于请求的服务器 URL
      url: "http://123.207.32.32:8000/home/multidata",
      // method 是创建请求时使用的方法
      //不写type默认为get请求
      type: "get"
  }).then((res) => {
      console.log(res)
  })
  ```

- get 请求参数拼接 `params` 是即将与请求一起发送的 URL 参数

  ```
  JAVASCRIPT//导入 axios
  import axios from "axios"
  
  axios({
      //不使用 params 可以直接拼接 http://123.207.32.32:8000/home/data?type=pop&page=3
      url: "http://123.207.32.32:8000/home/data",
      type: "get",
      params:{
          type: 'pop',
          page :1
      }
  }).then((res) => {
      console.log(res)
  })
  ```

### 常见请求的参数

- Get 请求

  `axios.get(url, params).then(res => { do something })`

  例子:

  ```
  JAVASCRIPTaxios.get("xxx", {
    params :{
        id: 1
   }
  }).then(res => { consloe.log(res.data) })
  ```

- Post 请求

  `axios.post(url, data).then(res => { do something })`

  ```
  JAVASCRIPTaxios.get("xxx", this.form).then(res => { consloe.log(res.data) })
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

1

### axios 的并发请求

当想同时请求多个地址时、就需要使用 `axios.all(iterable)` 类似: `axios.all([axios({}),axios({}),...]).then()`

```
JAVASCRIPT//导入 axios
import axios from "axios"

axios.all([axios({
    url: "http://123.207.32.32:8000/home/multidata",
    type: "get"
}), axios({
    url: "http://123.207.32.32:8000/home/data",
    type: "get",
    params: {
        type: 'pop',
        page: 1
    }
})]).then((results) => {
    //打印的是一个数组对象
    console.log(results)
})
```



使用 `axios.spread` 可将数组 [res1,res2] 展开为 res1, res2

```
JAVASCRIPTaxios.all([axios({
    url: "http://123.207.32.32:8000/home/multidata",
    type: "get"
}), axios({
    url: "http://123.207.32.32:8000/home/data",
    type: "get",
    params: {
        type: 'pop',
        page: 1
    }
})]).then(axios.spread((data1, data2) => {
    console.log(data1, data2)
}))
```

[![20200711203625.png](data:image/png;base64,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)](https://cdn.jsdelivr.net/gh/zykjofficial/zykjimg/img/20200711203625.png)

### axios 的全局配置

事实上，在开发中可能很多参数都是固定的、这个时候我们可以进行一些抽取，也可以利用 axios 的全局配置

```
axios.defaults.baseURL = '123.207.32.32:8000'`
`axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
JAVASCRIPT//导入 axios
import axios from "axios"

//全局配置
axios.defaults.baseURL = "http://123.207.32.32:8000"
axios.defaults.timeout = 5000 //单位: 毫秒

axios.all([axios({
    url: "/home/multidata",
    type: "get"
}), axios({
    url: "/home/data",
    type: "get",
    params: {
        type: 'pop',
        page: 1
    }
})]).then(axios.spread((data1, data2) => {
    console.log(data1, data2)
}))
```

通过配置全局的 baseURL 可以省略掉这前面固定的部分，发送请求只需要填写后面的部分即可组合起来请求地址，发送请求。

#### 请求配置

```
JAVASCRIPT
{
   // url 是用于请求的服务器 URL
  url: '/user',

  // method 是创建请求时使用的方法
  method: 'get', // default

  // baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL。
  // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // transformRequest 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // transformResponse 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // headers 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // params 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // paramsSerializer 是一个负责 params 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // data 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 transformRequest 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // timeout 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // withCredentials 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // adapter 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // auth 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // responseType 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // responseEncoding indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // xsrfCookieName 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // xsrfHeaderName is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // onUploadProgress 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // onDownloadProgress 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // maxContentLength 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // validateStatus 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // maxRedirects 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // socketPath defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // httpAgent 和 httpsAgent 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // keepAlive 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // auth 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // cancelToken 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

### axios 的实例

为什么要创建 axios 的实例呢？`可以设置默认配置、规定配置`

可以使用自定义配置新建一个 axios 实例 `axios.create([config])`

```
JAVASCRIPTconst instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
})

instance({
    url: "/home/multidata",
    type: "get"
}).then((res)=>{
    console.log(res)
})
```



### axios 的封装

为了保证代码的后期维护、我们需要对 axios 进行封装

在 src 下创建 `network/request.js`

操作Promise 形式

```
JAVASCRIPTimport axios from 'axios'

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
JAVASCRIPTimport {request} from "./network/request";

request({
    url: "/home/multidata",
    type: "get"
}).then((res) => {
    console.log(res)
})
```

### axios 的拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```
JAVASCRIPT// 添加请求拦截器
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

取消请求

可以通过 `cancel token` 来取消一个请求。

Axios 的 `cancel token` API 基于 `cancelable promises proposal`，它还处于ES提案的第一阶段。

可以使用 `CancelToken.source` 工厂方法创建 `cancel token`，像这样：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```



- https://zykj.js.org/posts/5650a45b/

