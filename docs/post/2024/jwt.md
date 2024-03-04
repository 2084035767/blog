---
title: 胡说| JWT 基础认识
date: 2024-3-3
categories:
  - 编程知识
tags:
  - 认证
---



::: tip 前言

最近做项目要用，看看是啥吧🤔

:::

## 一、简介

### 1.1 JWT 是什么

JSON Web Tokens(JWT)是一种开放的、行业标准(RFC 7519)，用于网络应用环境间安全传递声明。JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的业务逻辑所须的声明信息。

### 1.2 JWT 的作用

- 某种程度的用户身份验证
- 使用密钥签名
- 客户端每个请求都带有JWT
- 服务器使用密钥分析和检查claims

JWT 最常见的场景就是授权认证，一旦用户登录，后续每个请求都将包含I 系统在每次处理用户请求的之前，都要先进行M安全校验，通过之后再进行处理。



### 1.3 JWT 特点

- 跨语言:支持Python、Node.js、Java、Go、c、JavaScript等主流语言
- 自包含：包含了必要的所有信息，如用户信息和签名等
- 易传递：很方便通过HTTP头部传递



### 1.4 优缺点

优点：

- json具有通用性，所以可以跨语言
- 组成简单，字节占用小，便于传输
- 服务端无需保存会话信息，很容易进行水平扩展
- 一处生成，多处使用，可以在分布式系统中，解决单点登录问题
- 可防护CSRF攻击

缺点：

- payload部分仅仅是进行简单编码，所以只能用于存储逻辑必需的非敏感信息
- 需要保护好加密密钥，一旦泄露后果不堪设想
- 为避免token被劫持，最好使用https协议

## 二、JWT 组成

> 有点头绪了😮

JSON Web Token由三部分组成，它们之间用圆点(.)连接。这三部分分别是：

- Header
- Payload
- Signature

```
xxxxx.yyyyy.zzzzz
```

### 2.1 头部信息

header典型的由两部分组成：token的类型（“JWT”）和算法名称（比如：HMAC SHA256或者RSA等等）。

```json
{
    'alg': "HS256",
    'typ': "JWT"
}
```



### 2.2 载荷

::: warning 注意

载荷中的这3个声明并不是都要同时设置

:::

JWT的第二部分是payload，它包含声明（要求）。声明是关于实体(通常是用户)和其他数据的声明。也称为JWT claims，放置需要传输的信息，有三类：保留claims、公共claims、私有claims。声明有三种类型: registered, public 和 private。
- Registered claims : 标准中注册的声明（建议但不强制使用）

```
  iss: jwt签发者
  sub: jwt所面向的用户
  aud: 接收jwt的一方
  exp: jwt的过期时间，这个过期时间必须要大于签发时间
  nbf: 定义在什么时间之前，该jwt都是不可用的.
  iat: jwt的签发时间
  jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
```

- Public claims : 公共的声明，可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息，但不建议添加敏感信息，因为该部分在客户端可解密。

- Private claims : 私有的声明，用于在同意使用它们的各方之间共享信息，并且不是注册的或公开的声明。



::: waring 注意

不要在JWT的payload或header中放置敏感信息，除非它们是加密的。

:::

```json
{
    "sub": '1234567890',
    "name": 'john',
    "admin":true
}
```



### 2.3 签名

Signature是用于验证消息在传递过程中有没有被更改，并且，对于使用私钥签名的token，它还可以验证JWT的发送方是否为它所称的发送方。

::: info

为了得到签名部分，你必须有编码过的header、编码过的payload、一个秘钥，签名算法是header中指定的那个，然对它们签名即可。

:::

```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```





## 三、工作原理

### 3.1 JWT 工作原理



图1



当用户成功登录以后，会返回一个token，这就是用户凭证。

当用户想要访问受保护的路由或者资源的时候，都应该带上JWT。token 通常放在Authorization请求头中，用Bearer schema。

服务器上的受保护的路由将会检查Authorization中的JWT是否有效，如果有效，则用户可以访问受保护的资源。

如果JWT包含足够多的必需的数据，还可以减轻数据库查询压力。



### 3.2 基于 JWT 进行身份验证

在基于 Token 进行身份验证的的应用程序中，服务器通过 Payload、Header 和 Secret(密钥)创建Token（令牌）并将 Token 发送给客户端。客户端接收到 Token 之后，会将其保存在 Cookie 或者 localStorage 里面，以后客户端发出的所有请求都会携带这个令牌。



简化后的步骤如下：

1. 用户向服务器发送用户名、密码以及验证码用于登陆系统。
2. 如果用户用户名、密码以及验证码校验正确的话，服务端会返回已经签名的 Token。
3. 用户以后每次向后端发请求都在 Header 中带上这个 Token。
4. 服务端检查 Token 并从中获取用户相关信息。

两点建议：

1. 建议将 Token 存放在 localStorage 中，放在 Cookie 中会有 CSRF 风险。
2. 请求服务端并携带 Token 的常见做法是将 Token 放在 HTTP Header 的 Authorization 字段中（Authorization: Bearer Token）。

### 3.3 防止 JWT 被篡改的

> 有了签名之后，即使 Token 被泄露或者解惑，黑客也没办法同时篡改 Signature 、Header 、Payload。

原因：服务端拿到 Token 之后，会解析出其中包含的 **Header**、**Payload** 以及 **Signature** 。服务端会根据 Header、Payload、密钥再次生成一个 Signature。拿新生成的 **Signature** 和 **Token** 中的 **Signature** 作对比，如果一样就说明 Header 和 Payload 没有被修改。

但是，如果服务端的秘钥也被泄露的话，黑客就可以同时篡改 Signature 、Header 、Payload 了。黑客直接修改了 Header 和 Payload 之后，再重新生成一个 Signature 就可以了。



::: danger 重要

密钥一定保管好，一定不要泄露出去。JWT 安全的核心在于签名，签名安全的核心在密钥。

:::



## 四、JWT 操作

因为JWT的实现有很多这里我们用`jjwt`

### 4.1 引入依赖

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.12.3</version>
</dependency>
```



### 4.2 生成token

```java
/**
     * 过期时间(单位:秒)
     */
public static final int ACCESS_EXPIRE = 60;
/**
     * 加密算法
     */
private final static SecureDigestAlgorithm<SecretKey, SecretKey> ALGORITHM = Jwts.SIG.HS256;
/**
     * 私钥 / 生成签名的时候使用的秘钥secret，一般可以从本地配置文件中读取，切记这个秘钥不能外露，只在服务端使用，在任何场景都不应该流露出去。
     * 一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了。
     * 应该大于等于 256位(长度32及以上的字符串)，并且是随机的字符串
     */
private final static String SECRET = "secretKey";
/**
     * 秘钥实例
     */
public static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
/**
     * jwt签发者
     */
private final static String JWT_ISS = "Tiam";
/**
     * jwt主题
     */
private final static String SUBJECT = "Peripherals";

/*
    这些是一组预定义的声明，它们 不是强制性的，而是推荐的 ，以 提供一组有用的、可互操作的声明 。
    iss: jwt签发者
    sub: jwt所面向的用户
    aud: 接收jwt的一方
    exp: jwt的过期时间，这个过期时间必须要大于签发时间
    nbf: 定义在什么时间之前，该jwt都是不可用的.
    iat: jwt的签发时间
    jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击
     */
public static String genAccessToken(String username) {
    // 令牌id
    String uuid = UUID.randomUUID().toString();
    Date exprireDate = Date.from(Instant.now().plusSeconds(ACCESS_EXPIRE));

    return Jwts.builder()
        // 设置头部信息header
        .header()
        .add("typ", "JWT")
        .add("alg", "HS256")
        .and()
        // 设置自定义负载信息payload
        .claim("username", username)
        // 令牌ID
        .id(uuid)
        // 过期日期
        .expiration(exprireDate)
        // 签发时间
        .issuedAt(new Date())
        // 主题
        .subject(SUBJECT)
        // 签发者
        .issuer(JWT_ISS)
        // 签名
        .signWith(KEY, ALGORITHM)
        .compact();
}
```



### 4.2 解析token

> 注意：解密 JWT 时，必须要抓取 JwtException 异常，只要抓取到该异常说明该 JWT 不可用了

```java
/**
     * 解析token
     * @param token token
     * @return Jws<Claims>
     */
public static Jws<Claims> parseClaim(String token) {
    return Jwts.parser()
        .verifyWith(KEY)
        .build()
        .parseSignedClaims(token);
}

public static JwsHeader parseHeader(String token) {
    return parseClaim(token).getHeader();
}

public static Claims parsePayload(String token) {
    return parseClaim(token).getPayload();
}
```



## 写在最后

> cv 工程师上线！！！🤪

JWT 在认证授权方面还挺常用的，最好是了解一下，会用就行。
