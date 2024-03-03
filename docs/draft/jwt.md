---
title: 胡说| JWT 认证
date: 2022-8-26
categories:
  - 编程知识
tags:
  - 认证
---



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

## 二、JWT 组成

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

> 注意：载荷中的这3个声明并不是都要同时设置。

JWT的第二部分是payload，它包含声明（要求）。声明是关于实体(通常是用户)和其他数据的声明。也称为JWT claims，放置需要传输的信息，有三类：保留claims、公共claims、私有claims。声明有三种类型: registered, public 和 private。
- Registered claims : 标准中注册的声明（建议但不强制使用）

- ```
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



> 注意，不要在JWT的payload或header中放置敏感信息，除非它们是加密的。

```json
{
    "sub": '1234567890',
    "name": 'john',
    "admin":true
}
```



### 2.3 签名

Signature是用于验证消息在传递过程中有没有被更改，并且，对于使用私钥签名的token，它还可以验证JWT的发送方是否为它所称的发送方。

> 为了得到签名部分，你必须有编码过的header、编码过的payload、一个秘钥，签名算法是header中指定的那个，然对它们签名即可。

```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```



## 三、JWT 操作

### 3.1 生成token

```java
// 设置密钥
private static final String SECRET_KEY = "admin";
// 设置过期时间
private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24小时

public String generateToken(User user) {
    // 装载载荷信息
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getId());
    claims.put("username", user.getUsername());
    claims.put("password", user.getPassword());

    // 有效时间 = 当前时间 + 过期时间
    Date now = new Date();
    Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

    return Jwts.builder()
        // 设置头部信息
        .setHeaderParam("typ", "JWT")
        .setHeaderParam("alg", "HS256")
        // 设置角色
        .setSubject(user.getUsername())
        // 设置载荷信息
        .setClaims(claims)
        .setIssuedAt(now)
        // 设置有效时间
        .setExpiration(expiration)
        // 设置签名
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        // 拼接
        .compact();
}
```



### 3.2 解析token

> 注意：解密 JWT 时，必须要抓取 JwtException 异常，只要抓取到该异常说明该 JWT 不可用了

```java
public Claims parseToken(String token) {
    // 解析JWT令牌的逻辑
    return Jwts.parser()
        // 传入密钥
        .setSigningKey(SECRET_KEY)
        // 解析令牌
        .parseClaimsJws(token)
        // 获取载荷信息
        .getBody();
}
```



