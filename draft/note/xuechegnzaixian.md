---
title: 笔记| 《苍穹外卖》
date: 2025-1-22
categories: 
  - 项目笔记
---

::: tip 前言



:::

## 简介



 **分组校验**

基础模块创建分组类

```java
public class ValidationGroups {
public interface Inster{};
public interface Update{};
public interface Delete{};
}
```

实体类分组校验

```java
@NotEmpty(groups = {ValidationGroups.Inster.class},message = "添加课程名称不能为空")
@NotEmpty(groups = {ValidationGroups.Update.class},message = "修改课程名称不能为空")
// @NotEmpty(message = "课程名称不能为空")
@ApiModelProperty(value = "课程名称", required = true)
private String name;
```

Controller指定分组，@Validated

```java
@ApiOperation("新增课程基础信息")
@PostMapping("/course")
public CourseBaseInfoDto createCourseBase(@RequestBody @Validated({ValidationGroups.Inster.class}) AddCourseDto addCourseDto){
//机构id，由于认证系统没有上线暂时硬编码
Long companyId = 1L;
return courseBaseInfoService.createCourseBase(companyId,addCourseDto);
```

### **OAuth2认证协议**

#### 微信扫码认证登录流程

微信扫码认证是一种第三方认证的方式，基于OAuth2协议实现.

OAUTH协议为用户资源的授权提供了一个安全的、开放而又简易的**标准**。同时，**任何第三方都可以使用OAUTH认证服务**，任何服务提供商都可以实现自身的OAUTH认证服务，因而OAUTH是开放的。

**微信认证扫码登录的过程：** 

下边分析一个Oauth2认证的例子，黑马程序员网站使用微信认证扫码登录的过程：

![img](https://i-blog.csdnimg.cn/blog_migrate/28283ea5572152d3e01f95bdf2402628.png)



**1、用户点击微信扫码**

用户进入黑马程序的登录页面，点击微信的图标开打微信扫码界面。

微信扫码的目的是通过微信认证登录黑马程序员官网，黑马程序员网站需要从微信获取当前用户的身份信息才会让当前用户在黑马网站登录成功。

> 现在搞清楚几个概念：
>
> **资源：**用户信息，在微信中存储。
>
> **资源拥有者：**用户是用户信息资源的拥有者。
>
> **认证服务：**微信负责认证当前用户的身份，负责为客户端颁发令牌。
>
> **客户端：**客户端会携带令牌请求微信获取用户信息，黑马程序员网站即客户端，黑马网站需要在浏览器打开。

**2、用户授权黑马网站访问用户信息**

资源拥有者扫描二维码表示资源拥有者请求微信进行认证，微信认证通过向用户手机返回授权页面，如下图：

询问用户是否授权黑马程序员访问自己在微信的用户信息，用户点击“确认登录”表示同意授权，微信认证服务器会颁发一个授权码给黑马程序员的网站。

只有资源拥有者同意微信才允许黑马网站访问资源。

**3、黑马程序员的网站获取到授权码**

4、携带授权码请求微信认证服务器申请令牌

此交互过程用户看不到。

5、微信认证服务器向黑马程序员的网站响应令牌

此交互过程用户看不到。

6、黑马程序员网站携带令牌请求微信资源服务器获取资源即用户信息。

7、资源服务器返回受保护资源即用户信息

8、黑马网站接收到用户信息，此时用户在黑马网站登录成功。

理解了微信扫码登录黑马网站的流程，接下来认识Oauth2.0的认证流程，如下：

**Oauth2包括以下角色：**

1、客户端

本身不存储资源，需要通过资源拥有者的授权去请求资源服务器的资源，比如：手机客户端、浏览器等。

上边示例中黑马网站即为客户端，它需要通过浏览器打开。

**2、资源拥有者**

> 资源：用户信息

通常为用户，也可以是应用程序，即该资源的拥有者。

A表示 客户端请求资源拥有者授权。

B表示 资源拥有者授权客户端即黑马网站访问自己的用户信息。

**3、授权服务器**（也称认证服务器）

例如微信服务端。认证服务器对资源拥有者进行认证，还会对客户端进行认证并颁发令牌。

C 客户端即黑马网站携带授权码请求认证。

D认证通过颁发令牌。

**4、资源服务器**

如数据库。存储资源的服务器。

E表示客户端即黑马网站携带令牌请求资源服务器获取资源。

F表示资源服务器校验令牌通过后提供受保护资源。



#### OAuth2在本项目的应用

Oauth2是一个标准的**开放的授权协议**，应用程序可以根据自己的要求去使用Oauth2，本项目使用Oauth2实现如下目标：

1、学成在线访问第三方系统（如微信）的资源。

本项目要接入微信扫码登录所以本项目要使用OAuth2协议**访问微信中的用户信息**。

2、外部系统访问学成在线的资源 。

同样当第三方系统想要访问学成在线网站的资源也可以基于OAuth2协议。

3、学成在线前端（客户端） 访问学成在线微服务的资源。

本项目是前后端分离架构，**前端访问微服务资源**也可以基于OAuth2协议进行认证。



#### OAuth2的四种授权模式

Spring Security支持OAuth2认证，OAuth2提供**授权码模式、密码模式、简化模式、客户端模式**等四种授权模式，前边举的微信扫码登录的例子就是基于授权码模式，这四种模式中授权码模式和密码模式应用较多。

本节使用Spring Security演示授权码模式、密码模式，其余两种请自行查阅相关资料。

#### 授权码模式

> 前边举的微信扫码登录的例子就是基于授权码模式。 

OAuth2的几个授权模式是根据不同的应用场景以不同的方式去**获取令牌**，最终目的是要获取认证服务颁发的令牌，最终**通过令牌去获取资源**。

授权码模式简单理解是**使用授权码去获取令牌**，要想获取令牌先要获取授权码，授权码的获取需要资源拥有者亲自授权同意才可以获取。

下图是授权码模式的交互图：

![img](https://i-blog.csdnimg.cn/blog_migrate/d589e6323fbe579726fe3472b987ee3e.png)

还以黑马网站微信扫码登录为例进行说明：

1、用户打开浏览器。

2、通过浏览器访问客户端即黑马网站。

3、用户通过浏览器向认证服务请求授权，请求授权时会携带客户端的URL，此URL为下发授权码的重定向地址。

4、认证服务向资源拥有者返回授权页面。

5、资源拥有者亲自授权同意。

6、通过浏览器向认证服务发送授权同意。

7、认证服务向客户端地址重定向并携带授权码。

8、客户端即黑马网站收到授权码。

9、客户端携带授权码向认证服务申请令牌。

10、认证服务向客户端颁发令牌。



#### 授权码模式测试

要想测试授权模式首先要配置授权服务器即上图中的认证服务器，需要配置授权服务及令牌策略。

1、从课程资料中拷贝 **授权服务配置类AuthorizationServer.java、****令牌策略配置类****TokenConfig.java**到认证服务的config包下。

> **说明**：AuthorizationServer用 @EnableAuthorizationServer 注解标识并继承AuthorizationServerConfigurerAdapter来配置OAuth2.0 授权服务器。

```java
package com.xuecheng.auth.config;



*/



 @Configuration



 @EnableAuthorizationServer



 public class AuthorizationServer extends AuthorizationServerConfigurerAdapter {



 ...
```

> 父类AuthorizationServerConfigurerAdapter要求配置以下几个类：
>
> ```java
> public class AuthorizationServerConfigurerAdapter implements AuthorizationServerConfigurer {
> 
> 
> 
>     public AuthorizationServerConfigurerAdapter() {}
> 
> 
> 
>     public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {}
> 
> 
> 
>     public void configure(ClientDetailsServiceConfigurer clients) throws Exception {}
> 
> 
> 
>     public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {}
> 
> 
> 
> }
> ```
>
> 
>
> **1****）****ClientDetailsServiceConfigurer**：用来配置客户端详情服务（ClientDetailsService），
>
> 随便一个客户端都可以随便接入到它的认证服务吗？答案是否定的，服务提供商会给批准接入的客户端一个身份，用于接入时的凭据，有客户端标识和客户端秘钥，在这里配置批准接入的客户端的详细信息。
>
> **2****）****AuthorizationServerEndpointsConfigurer**：用来配置令牌（token）的访问端点和令牌服务(token services)。
>
> **3****）****AuthorizationServerSecurityConfigurer**：用来配置令牌端点的安全约束.





**2、TokenConfig为令牌策略配置类**

暂时先使用InMemoryTokenStore在内存存储令牌，令牌的有效期等信息配置如下：

```java
    //令牌管理服务



    @Bean(name="authorizationServerTokenServicesCustom")



    public AuthorizationServerTokenServices tokenService() {



        DefaultTokenServices service=new DefaultTokenServices();



        service.setSupportRefreshToken(true);//支持刷新令牌



        service.setTokenStore(tokenStore);//令牌存储策略



        service.setAccessTokenValiditySeconds(7200); // 令牌默认有效期2小时



        service.setRefreshTokenValiditySeconds(259200); // 刷新令牌默认有效期3天



        return service;



    }
```

3、配置认证管理bean

```java
@EnableWebSecurity



@EnableGlobalMethodSecurity(securedEnabled = true,prePostEnabled = true)



public class WebSecurityConfig extends WebSecurityConfigurerAdapter {



 



    @Bean



    public AuthenticationManager authenticationManagerBean() throws Exception {



        return super.authenticationManagerBean();



    }



    ....
```



重启认证服务

**1、get请求获取授权码**

地址: http://localhost:63070/auth/oauth/authorize?client_id=XcWebApp&response_type=code&scope=all&redirect_uri=http://www.51xuecheng.cn

参数列表如下：

- client_id：客户端准入标识。

- response_type：授权码模式固定为code。

- scope：客户端权限。

- redirect_uri：跳转uri，当授权码申请成功后会跳转到此地址，并在后边带上code参数（授权码）。

输入账号zhangsan、密码123登录成功，输入/oauth/authorize?client_id=XcWebApp&response_type=code&scope=all&redirect_uri=http://www.51xuecheng.cn

显示授权页面

![img](https://i-blog.csdnimg.cn/blog_migrate/90849d8d1b83f471cb4fdbab968dcb68.png)



授权“XcWebApp”访问自己的受保护资源?

选择同意。

**2、请求成功**，重定向至http://www.51xuecheng.cn/?code=授权码，比如：http://www.51xuecheng.cn/?code=Wqjb5H

![img](https://i-blog.csdnimg.cn/blog_migrate/71bf4a14bafdd8059dd89b9d032f12ea.png)



**3、使用httpclient工具，发post请求申请令牌**

```bash
### 授权码模式



### 第一步申请授权码(浏览器请求)/oauth/authorize?client_id=c1&response_type=code&scope=all&redirect_uri=http://www.51xuecheng.cn



### 第二步申请令牌



POST {{auth_host}}/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=authorization_code&code=CTvCrB&redirect_uri=http://www.51xuecheng.cn
```



> **参数列表如下**
>
> - client_id：客户端准入标识。
>
> - client_secret：客户端秘钥。
>
> - grant_type：授权类型，填写authorization_code，表示授权码模式
>
> - code：授权码，就是刚刚获取的授权码，注意：授权码只使用一次就无效了，需要重新申请。
>
> - redirect_uri：申请授权码时的跳转url，一定和申请授权码时用的redirect_uri一致。





申请令牌成功如下所示：

```bash
{



  "access_改成自己的token": "368b1ee7-a9ee-4e9a-aae6-0fcab243aad2",



  "token_type": "bearer",



  "refresh_token": "3d56e139-0ee6-4ace-8cbe-1311dfaa991f",



  "expires_in": 7199,



  "scope": "all"



}
```

> **说明：**
>
> 1、**access_token，访问令牌**，用于访问资源使用。
>
> 2、token_type，bearer是在RFC6750中定义的一种token类型，在携带令牌访问资源时需要在head中加入bearer 空格 令牌内容
>
> 3、refresh_token，当令牌快过期时使用刷新令牌可以再次生成令牌。
>
> 4、expires_in：过期时间（秒）
>
> 5、scope，令牌的权限范围，服务端可以根据令牌的权限范围去对令牌授权。



#### 密码模式

密码模式相对授权码模式简单，授权码模式需要借助浏览器供用户亲自授权，密码模式不用借助浏览器，如下图：

![img](https://i-blog.csdnimg.cn/blog_migrate/d66c62f900108ff3996760fd188dfa65.png)

1、资源拥有者提供账号和密码

2、客户端向认证服务**申请令牌**，**请求中携带账号和密码**

3、认证服务校验账号和密码正确**颁发令牌**。

开始测试：

1、POST请求获取令牌

/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password&username=shangsan&password=123

> **参数列表如下：**
>
> - client_id：客户端准入标识。
>
> - client_secret：客户端秘钥。
>
> - grant_type：授权类型，填写password表示密码模式
>
> - username：资源拥有者用户名。
>
> - password：资源拥有者密码。

2、授权服务器将令牌（access_token）发送给client

使用httpclient进行测试

```bash
### 密码模式



POST {{auth_host}}/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password&username=zhangsan&password=123
```

返回示例：

```bash
{



  "access_t改成自己的oken": "368b1ee7-a9ee-4e9a-aae6-0fcab243aad2",



  "token_type": "bearer",



  "refresh_token": "3d56e139-0ee6-4ace-8cbe-1311dfaa991f",



  "expires_in": 6806,



  "scope": "all"



}
```

​    这种模式十分简单，但是却意味着**直接将用户敏感信息泄漏给了client**，因此这就说明这种模式只能用于client是我们自己开发的情况下。





### 断点续传技术

#### 什么是断点续传

如果一个大文件快上传完了**网断了**没有上传完成，需要客户**重新上传**，用户体验非常差。

**断点续传：**

在下载或上传时，将**下载或上传任务**（一个文件或一个压缩包）人为的**划分为几个部分**，**每一个部分采用一个线程进行上传或下载**，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载，断点续传可以**节省操作时间**。

**流程如下：**

1、前端上传前先把文件分成块

2、**一块一块的上传**，上传中断后重新上传，已上传的分块则不用再上传

3、各分块上传完成最后在服务端**合并文件**

#### **5.2.2 测试分块与合并，RandomAccessFile随机流**

**文件分块的流程如下：**

- 1、获取源文件**长度**
- 2、根据设定的分块文件的大小计算出块数
- 3、从源文件读数据依次向每一个块文件写数据。

测试代码如下：

> **随机流****RandomAccessFile：**
>
> 是Java 输入/输出流体系中功能最丰富的文件内容访问类，它提供了众多的方法来访问文件内容，它既可以读取文件内容，也可以向文件输出数据。与普通的输入/输出流不同的是，**RandomAccessFile支持"随机访问"的方式**，程序可以直接跳转到文件的任意地方来**读写**数据。

```java
/**
 * @description 大文件处理测试
 */
public class BigFileTest {
    //分块测试，将视频按每块5m进行分块
    @Test
    public void testChunk() throws IOException {
        //源文件
        File sourceFile = new File("D:\\develop\\upload\\1.项目背景.mp4");
        //分块文件存储路径。这个路径得是真实存在的，否则会报错找不到路径
        String chunkFilePath = "D:\\develop\\upload\\chunk\\";
        //分块文件大小。这里设置成5M
        int chunkSize = 1024 * 1024 * 5;
        //分块文件个数。Math.ceil是向上取整
        int chunkNum = (int) Math.ceil(sourceFile.length() * 1.0 / chunkSize);
        //使用随机流从源文件读数据，向分块文件中写数据
        RandomAccessFile raf_r = new RandomAccessFile(sourceFile, "r");
        //缓存区
        byte[] bytes = new byte[1024];
        //遍历所有块
        for (int i = 0; i < chunkNum; i++) {
            //“D:\develop\upload\chunk\1”、“D:\develop\upload\chunk\2”...
            File chunkFile = new File(chunkFilePath + i);
            //分块文件写入流
            RandomAccessFile raf_rw = new RandomAccessFile(chunkFile, "rw");
            int len = -1;
            //每次写满一个字节数组
            while ((len=raf_r.read(bytes))!=-1){
                raf_rw.write(bytes,0,len);
                //当分块大小超过5m时停止在这一块写数据。不加这句的话会出现第一块大小和源文件一样，其余块大小都为0
                if(chunkFile.length()>=chunkSize){
                    break;
                }
            }
            raf_rw.close();
        }
        raf_r.close();
    }
}
```

**文件合并流程：**

1、找到要合并的文件并按文件合并的先后进行排序。

2、创建合并文件

3、依次从合并的文件中读取数据向合并文件写入数

文件合并的测试代码 ：

```java
//将分块进行合并
@Test
public void testMerge() throws IOException {
  //块文件目录
  File chunkFolder = new File("D:\\develop\\upload\\chunk");
  //源文件
  File sourceFile = new File("D:\\develop\\upload\\1.项目背景.mp4");
  //合并后的文件
  File mergeFile = new File("D:\\develop\\upload\\1.项目背景_2.mp4");
  //1.取出所有分块文件
  File[] files = chunkFolder.listFiles();
  //2.将数组转成list，以便于排序
  List<File> filesList = Arrays.asList(files);
  //3.对分块文件排序
  Collections.sort(filesList, new Comparator<File>() {
    @Override
    public int compare(File o1, File o2) {
      return Integer.parseInt(o1.getName())-Integer.parseInt(o2.getName());
    }
  });
  //向合并文件写的流
  RandomAccessFile raf_rw = new RandomAccessFile(mergeFile, "rw");
  //缓存区
  byte[] bytes = new byte[1024];
  //4.遍历每个分块，向合并的目标文件写
  for (File file : filesList) {
    //读分块的流
    RandomAccessFile raf_r = new RandomAccessFile(file, "r");
    int len = -1;
    while ((len=raf_r.read(bytes))!=-1){
      raf_rw.write(bytes,0,len);
    }
    raf_r.close();
  }
  raf_rw.close();
  //合并文件完成后对合并的文件md5校验
  FileInputStream fileInputStream_merge = new FileInputStream(mergeFile);
  FileInputStream fileInputStream_source = new FileInputStream(sourceFile);
  String md5_merge = DigestUtils.md5Hex(fileInputStream_merge);
  String md5_source = DigestUtils.md5Hex(fileInputStream_source);
  if(md5_merge.equals(md5_source)){
    System.out.println("文件合并成功");
  }
}
```

#### **5.2.3** **视频上传流程**

下图是上传视频的整体流程：

![img](https://i-blog.csdnimg.cn/blog_migrate/49b1a22300ad705a94dce4f30e685b44.png)

1、**前端**对文件进行**分块**。

2、前端上传分块文件前请求媒资服务**检查原文件和分块文件是否存在**，如果已经存在则不需要再上传。

> **检查文件存在依据：**是媒资主键为文件的md5值，两个文件**md5值**相等，则是一个文件。

3、如果分块文件不存在则前端开始上传

4、前端请求媒资服务上传分块。

5、媒资服务**将分块上传至MinIO**。

> **注意：**minio文件和文件的分块存储路径都应该尽量**避免存在根目录**下，这里将文件名前两位设成路径。
>
> ![img](https://i-blog.csdnimg.cn/blog_migrate/b2569745c5a15b75ab8616a8be70958e.png)

6、前端将分块上传完毕请求媒资服务合并分块。

7、媒资服务判断分块上传完成则**请求MinIO合并文件**。

8、合并完成**校验合并后的文件是否完整**，如果完整则**上传完成并删除分块**，否则删除文件。



#### **5.2.4 测试minio合并文件**

**1、将分块文件上传至minio**

```java
//将分块文件上传至minio
@Test
public void uploadChunk(){
  String chunkFolderPath = "D:\\develop\\upload\\chunk\\";
 File chunkFolder = new File(chunkFolderPath);
  //获取所有分块文件。listFiles()方法返回该文件路径下所有文件数组
   File[] files = chunkFolder.listFiles();
  //将分块文件上传至minio
  for (int i = 0; i < files.length; i++) {
      try {
      UploadObjectArgs uploadObjectArgs = UploadObjectArgs.builder().bucket("testbucket").object("chunk/" + i).filename(files[i].getAbsolutePath()).build();
     minioClient.uploadObject(uploadObjectArgs);
    System.out.println("上传分块成功"+i);
   } catch (Exception e) {
   e.printStackTrace();
   }
  }
}
```



**2、通过minio的合并文件**

```java
//合并文件，要求分块文件最小5M
@Test
public void test_merge() throws Exception {
  List<ComposeSource> sources = Stream.iterate(0, i -> ++i)
    .limit(6)
    .map(i -> ComposeSource.builder()
         .bucket("testbucket")
         .object("chunk/".concat(Integer.toString(i)))
         .build())
    .collect(Collectors.toList());
  ComposeObjectArgs composeObjectArgs = ComposeObjectArgs.builder()
    .bucket("testbucket").object("merge01.mp4")
    .sources(sources).build();
  minioClient.composeObject(composeObjectArgs);
}
//清除分块文件
@Test
public void test_removeObjects(){
  //合并分块完成将分块文件清除
  List<DeleteObject> deleteObjects = Stream.iterate(0, i -> ++i)
    .limit(6)
    .map(i -> new DeleteObject("chunk/".concat(Integer.toString(i))))
    .collect(Collectors.toList());
  RemoveObjectsArgs removeObjectsArgs = RemoveObjectsArgs.builder().bucket("testbucket").objects(deleteObjects).build();
  Iterable<Result<DeleteError>> results = minioClient.removeObjects(removeObjectsArgs);
  results.forEach(r->{
    DeleteError deleteError = null;
    try {
      deleteError = r.get();
    } catch (Exception e) {
      e.printStackTrace();
    }
  });
}
```

使用minio合并文件报错：java.lang.IllegalArgumentException: source testbucket/chunk/0: size 1048576 must be greater than 5242880

minio合并文件默认分块最小5M，我们将分块改为5M再次测试。



### 接口定义，检查文件/分块、上传分块、合并分块

与前端的约定是操作成功返回{code:0}否则返回{code:-1}

定义接口如下：

```java
package com.xuecheng.media.api;
/**
 * @description 大文件上传接口
 */
@Api(value = "大文件上传接口", tags = "大文件上传接口")
@RestController
public class BigFilesController {
  @ApiOperation(value = "文件上传前检查文件")
  @PostMapping("/upload/checkfile")
  public RestResponse<Boolean> checkfile(
    @RequestParam("fileMd5") String fileMd5
  ) throws Exception {
    return null;
  }

  //chunk是分块序号
  @ApiOperation(value = "分块文件上传前的检测")
  @PostMapping("/upload/checkchunk")
  public RestResponse<Boolean> checkchunk(@RequestParam("fileMd5") String fileMd5,
                                          @RequestParam("chunk") int chunk) throws Exception {
    return null;
  }

  @ApiOperation(value = "上传分块文件")
  @PostMapping("/upload/uploadchunk")
  public RestResponse uploadchunk(@RequestParam("file") MultipartFile file,
                                  @RequestParam("fileMd5") String fileMd5,
                                  @RequestParam("chunk") int chunk) throws Exception {
    return null;
  }

  @ApiOperation(value = "合并文件")
  @PostMapping("/upload/mergechunks")
  public RestResponse mergechunks(@RequestParam("fileMd5") String fileMd5,
                                  @RequestParam("fileName") String fileName,
                                  @RequestParam("chunkTotal") int chunkTotal) throws Exception {
    return null;
  }
}
```

### 上传分块Service

#### 检查文件和分块

接口完成进行接口实现，首先实现检查文件方法和检查分块方法。

```java
@Override
public RestResponse<Boolean> checkFile(String fileMd5) {
    //查询文件信息
    MediaFiles mediaFiles = mediaFilesMapper.selectById(fileMd5);
    if (mediaFiles != null) {
        //桶
        String bucket = mediaFiles.getBucket();
        //存储目录
        String filePath = mediaFiles.getFilePath();
        //文件流
        InputStream stream = null;
        try {
            stream = minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucket)
                            .object(filePath)
                            .build());
            if (stream != null) {
                //文件已存在
                return RestResponse.success(true);
            }
        } catch (Exception e) {
        } finally {
            if (stream != null) {
                try {
                    stream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    //文件不存在
    return RestResponse.success(false);
}

@Override
public RestResponse<Boolean> checkChunk(String fileMd5, int chunkIndex) {
    //得到分块文件目录
    String chunkFileFolderPath = getChunkFileFolderPath(fileMd5);
    //得到分块文件的路径
    String chunkFilePath = chunkFileFolderPath + chunkIndex;
    //文件流
    InputStream fileInputStream = null;
    try {
        fileInputStream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucket_videoFiles)
                        .object(chunkFilePath)
                        .build());
        if (fileInputStream != null) {
            //分块已存在
            return RestResponse.success(true);
        }
    } catch (Exception e) {
    } finally {
        if (fileInputStream != null) {
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    //分块未存在
    return RestResponse.success(false);
}

//得到分块文件的目录
private String getChunkFileFolderPath(String fileMd5) {
    return fileMd5.substring(0, 1) + "/" + fileMd5.substring(1, 2) + "/" + fileMd5 + "/" + "chunk" + "/";
}
```



#### 上传分块

```java
@Override
public RestResponse uploadChunk(String fileMd5, int chunk, String localChunkFilePath) {
    //得到分块文件的目录路径。“abcde”->“a/b/abcde”
    String chunkFileFolderPath = getChunkFileFolderPath(fileMd5);
    //得到分块文件的路径
    String chunkFilePath = chunkFileFolderPath + chunk;
    //获取文件类型mimeType
    String mimeType = getMimeType(null);
    //将文件存储至minIO
    boolean b = addMediaFilesToMinIO(localChunkFilePath, mimeType, bucket_videoFiles, chunkFilePath);
    if (!b) {
        log.debug("上传分块文件失败:{}", chunkFilePath);
        return RestResponse.validfail(false, "上传分块失败");
    }
    log.debug("上传分块文件成功:{}", chunkFilePath);
    return RestResponse.success(true);
}
```

> ```java
> //根据扩展名获取mimeType
> private String getMimeType(String extension) {
>     if (extension == null) {
>         extension = "";
>     }
>     //根据扩展名取出mimeType
>     ContentInfo extensionMatch = ContentInfoUtil.findExtensionMatch(extension);
>     String mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; //通用mimeType，字节流
>     if (extensionMatch != null) {
>         mimeType = extensionMatch.getMimeType();
>     }
>     return mimeType;
> }
> ```

#### 完善接口层

```java
@ApiOperation(value = "文件上传前检查文件")
@PostMapping("/upload/checkfile")
public RestResponse<Boolean> checkfile(@RequestParam("fileMd5") String fileMd5) throws Exception {
    return mediaFileService.checkFile(fileMd5);
}

@ApiOperation(value = "分块文件上传前的检测")
@PostMapping("/upload/checkchunk")
public RestResponse<Boolean> checkchunk(@RequestParam("fileMd5") String fileMd5, @RequestParam("chunk") int chunk) throws Exception {
    return mediaFileService.checkChunk(fileMd5, chunk);
}

@ApiOperation(value = "上传分块文件")
@PostMapping("/upload/uploadchunk")
public RestResponse uploadchunk(@RequestParam("file") MultipartFile file, @RequestParam("fileMd5") String fileMd5, @RequestParam("chunk") int chunk) throws Exception {
    //创建临时文件
    File tempFile = File.createTempFile("minio", "temp");
    //上传的文件拷贝到临时文件
    file.transferTo(tempFile);
    //文件路径
    String absolutePath = tempFile.getAbsolutePath();
    return mediaFileService.uploadChunk(fileMd5, chunk, absolutePath);
}
```

启动前端工程，进入上传视频界面进行前后端联调测试。 

#### 报错、Tomcat默认上传文件大小限制为1M，yml配置文件上传限制 

**minio合并的分块小于5M时会报错：**

**解决：**

前端对文件分块的大小为5MB，SpringBoot web默认上传文件的大小限制为1MB，这里需要在nacos里**media-api工程yml**配置如下：

```yml
spring:
  servlet:
    multipart:
      max-file-size: 50MB
      max-request-size: 50MB
```

max-file-size：单个文件的大小限制

Max-request-size: 单次请求的大小限制



### 合并分块开发

#### service开发

**业务流程 ：**

1.获取分块文件路径
2.合并
3.验证md5合并后的文件和源文件是否一致，从而判断是否上传成功
4.文件信息入数据库
5.清除分块文件

**代码实现：** 

```java
@Override
public RestResponse mergechunks(Long companyId, String fileMd5, int chunkTotal, UploadFileParamsDto uploadFileParamsDto) {
    //=====1.获取分块文件路径=====
    String chunkFileFolderPath = getChunkFileFolderPath(fileMd5);
    //组成将分块文件路径组成 List<ComposeSource>
    List<ComposeSource> sourceObjectList = Stream.iterate(0, i -> ++i)
            .limit(chunkTotal)
            .map(i -> ComposeSource.builder()
                    .bucket(bucket_videoFiles)
                    .object(chunkFileFolderPath.concat(Integer.toString(i)))
                    .build())
            .collect(Collectors.toList());

    //=====2.合并=====
    //文件名称
    String fileName = uploadFileParamsDto.getFilename();
    //文件扩展名
    String extName = fileName.substring(fileName.lastIndexOf("."));
    //合并文件路径
    String mergeFilePath = getFilePathByMd5(fileMd5, extName);
    try {
        //合并文件
        ObjectWriteResponse response = minioClient.composeObject(
                ComposeObjectArgs.builder()
                        .bucket(bucket_videoFiles)
                        .object(mergeFilePath)
                        .sources(sourceObjectList)
                        .build());
        log.debug("合并文件成功:{}", mergeFilePath);
    } catch (Exception e) {
        log.debug("合并文件失败,fileMd5:{},异常:{}", fileMd5, e.getMessage(), e);
        return RestResponse.validfail(false, "合并文件失败。");
    }

    // ====3.验证md5合并后的文件和源文件是否一致，从而判断是否上传成功====
    //下载合并后的文件
    File minioFile = downloadFileFromMinIO(bucket_videoFiles, mergeFilePath);
    if (minioFile == null) {
        log.debug("下载合并后文件失败,mergeFilePath:{}", mergeFilePath);
        return RestResponse.validfail(false, "下载合并后文件失败。");
    }
    try (InputStream newFileInputStream = new FileInputStream(minioFile)) {
        //minio上文件的md5值
        String md5Hex = DigestUtils.md5Hex(newFileInputStream);
        //比较md5值，不一致则说明文件不完整
        if (!fileMd5.equals(md5Hex)) {
            return RestResponse.validfail(false, "文件合并校验失败，最终上传失败。");
        }
        //文件大小
        uploadFileParamsDto.setFileSize(minioFile.length());
    } catch (Exception e) {
        log.debug("校验文件失败,fileMd5:{},异常:{}", fileMd5, e.getMessage(), e);
        return RestResponse.validfail(false, "文件合并校验失败，最终上传失败。");
    } finally {
        if (minioFile != null) {
            minioFile.delete();
        }
    }

    //====4.文件信息入数据库。注入自己这个bean，加“currentProxy.”主要为了让组成事务。非事务方法调用事务方法必须用代理对象调用=====
    //    @Autowired
    //    MediaFileService currentProxy;

    currentProxy.addMediaFilesToDb(companyId, fileMd5, uploadFileParamsDto, bucket_videoFiles, mergeFilePath);

    //=====5.清除分块文件=====
    clearChunkFiles(chunkFileFolderPath, chunkTotal);
    return RestResponse.success(true);
}

/**
 * 从minio下载文件
 * @param bucket 桶
 * @param objectName 对象名称
 * @return 下载后的文件
 */
public File downloadFileFromMinIO(String bucket, String objectName) {
    //临时文件
    File minioFile = null;
    FileOutputStream outputStream = null;
    try {
        InputStream stream = minioClient.getObject(GetObjectArgs.builder()
                .bucket(bucket)
                .object(objectName)
                .build());
        //创建临时文件
        minioFile = File.createTempFile("minio", ".merge");
        outputStream = new FileOutputStream(minioFile);
        IOUtils.copy(stream, outputStream);
        return minioFile;
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        if (outputStream != null) {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    return null;
}

/**
 * 得到合并后的文件的地址
 * @param fileMd5 文件id即md5值
 * @param fileExt 文件扩展名
 * @return
 */
private String getFilePathByMd5(String fileMd5, String fileExt) {
    return fileMd5.substring(0, 1) + "/" + fileMd5.substring(1, 2) + "/" + fileMd5 + "/" + fileMd5 + fileExt;
}

/**
 * 清除分块文件
 * @param chunkFileFolderPath 分块文件路径
 * @param chunkTotal 分块文件总数
 */
private void clearChunkFiles(String chunkFileFolderPath, int chunkTotal) {
    try {
        List<DeleteObject> deleteObjects = Stream.iterate(0, i -> ++i)
                .limit(chunkTotal)
                .map(i -> new DeleteObject(chunkFileFolderPath.concat(Integer.toString(i))))
                .collect(Collectors.toList());
        RemoveObjectsArgs removeObjectsArgs = RemoveObjectsArgs.builder().bucket("video").objects(deleteObjects).build();
        Iterable<Result<DeleteError>> results = minioClient.removeObjects(removeObjectsArgs);
        results.forEach(r -> {
            DeleteError deleteError = null;
            try {
                deleteError = r.get();
            } catch (Exception e) {
                e.printStackTrace();
                log.error("清楚分块文件失败,objectname:{}", deleteError.objectName(), e);
            }
        });
    } catch (Exception e) {
        e.printStackTrace();
        log.error("清楚分块文件失败,chunkFileFolderPath:{}", chunkFileFolderPath, e);
    }
}
```

> **注意：**
>
> **非事务方法调用事务方法必须用代理对象调用。**
>
> 所以文件信息入数据库时，要注入自己这个bean，加**“currentProxy.”**，而不能加“this.”，主要为了让组成事务。

#### 接口层完善

```java
@ApiOperation(value = "合并文件")
@PostMapping("/upload/mergechunks")
public RestResponse mergechunks(@RequestParam("fileMd5") String fileMd5,
                                @RequestParam("fileName") String fileName,
                                @RequestParam("chunkTotal") int chunkTotal) throws Exception {

    Long companyId = 1232141425L;

    UploadFileParamsDto uploadFileParamsDto = new UploadFileParamsDto();
    uploadFileParamsDto.setFileType("001002");
    uploadFileParamsDto.setTags("课程视频");
    uploadFileParamsDto.setRemark("");
    uploadFileParamsDto.setFilename(fileName);

    return mediaFileService.mergechunks(companyId, fileMd5, chunkTotal, uploadFileParamsDto);
}
```

#### **5.5.2** **合并分块测试**

下边进行前后端联调：

1、上传一个视频测试合并分块的执行逻辑

进入service方法逐行跟踪。

2、断点续传测试

上传一部分后，停止刷新浏览器再重新上传，通过浏览器日志发现已经上传过的分块不再重新上传

![img](https://i-blog.csdnimg.cn/blog_migrate/a6219ddac28ace210f518d874b8ee81e.png)



### 5.6 进度条卡在80%缺陷解决

应评论区同学的指正，用文章以上分快上传可能出现BUG，需要按照以下思路解决：

如果在chunkFile里面找到了，就不走下面了，直接100%

> 后端有四种可能：
>
> minio存在，数据不存在
>
> minio不存在，数据库存在
>
> minio不存在。数据库不存在
>
> minio存在，数据库存在

如果判断minio存在，就直接更新数据库

如果minio不存在，就直接走分块上传和合并



`ProcessBuilder` 是 Java 中的一个类，用于创建和管理外部进程（即运行在 Java 虚拟机外部的程序）。它提供了一种灵活的方式来启动和控制外部程序的执行，例如运行系统命令、脚本或其他可执行文件。

### 主要功能
1. **启动外部进程**：可以指定要运行的命令及其参数。
2. **设置运行环境**：可以设置工作目录、环境变量等。
3. **获取进程信息**：可以获取进程的输入流、输出流和错误流，从而与进程进行交互。
4. **控制进程**：可以等待进程结束、销毁进程等。

### 常用方法
- **构造函数**：
  ```java
  ProcessBuilder pb = new ProcessBuilder(String... command);
  ```
  或
  ```java
  ProcessBuilder pb = new ProcessBuilder(List<String> command);
  ```
  用于指定要运行的命令及其参数。

- **设置工作目录**：
  ```java
  pb.directory(File directory);
  ```
  指定进程的工作目录。

- **设置环境变量**：
  ```java
  Map<String, String> environment = pb.environment();
  environment.put("VARIABLE_NAME", "value");
  ```
  获取和修改进程的环境变量。

- **启动进程**：
  ```java
  Process process = pb.start();
  ```
  启动进程并返回一个 `Process` 对象，用于控制和监控进程。

- **获取输入/输出/错误流**：
  ```java
  InputStream inputStream = process.getInputStream();
  OutputStream outputStream = process.getOutputStream();
  InputStream errorStream = process.getErrorStream();
  ```
  用于与进程进行交互。

- **等待进程结束**：
  ```java
  int exitCode = process.waitFor();
  ```
  等待进程结束并返回退出码。

- **销毁进程**：
  ```java
  process.destroy();
  ```
  强制结束进程。

### 示例代码
以下是一个使用 `ProcessBuilder` 运行外部命令的示例，假设我们要运行一个简单的 `ffmpeg` 命令来转换视频格式：

```java
import java.io.*;

public class ProcessBuilderExample {
    public static void main(String[] args) {
        // 命令和参数
        String ffmpegPath = "D:\\soft\\ffmpeg\\ffmpeg.exe";
        String inputVideoPath = "D:\\develop\\bigfile_test\\nacos01.avi";
        String outputVideoPath = "D:\\develop\\bigfile_test\\nacos01.mp4";

        // 构造命令
        ProcessBuilder pb = new ProcessBuilder(
                ffmpegPath, "-i", inputVideoPath, outputVideoPath
        );

        // 设置工作目录
        pb.directory(new File("D:\\develop\\bigfile_test"));

        try {
            // 启动进程
            Process process = pb.start();

            // 获取输出流
            InputStream inputStream = process.getInputStream();
            InputStream errorStream = process.getErrorStream();

            // 打印输出
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            // 打印错误信息
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(errorStream));
            while ((line = errorReader.readLine()) != null) {
                System.err.println(line);
            }

            // 等待进程结束
            int exitCode = process.waitFor();
            System.out.println("Process exited with code: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### 优点
- **灵活性高**：可以轻松配置命令、工作目录、环境变量等。
- **交互性强**：可以通过输入流和输出流与外部进程进行交互。
- **跨平台**：可以在不同操作系统上使用（尽管命令和路径可能需要调整）。

### 注意事项
- **资源管理**：使用完 `ProcessBuilder` 和 `Process` 后，需要确保关闭所有流，避免资源泄漏。
- **错误处理**：需要处理 `IOException` 和 `InterruptedException`，并注意检查进程的退出码。
- **安全性**：如果命令或参数来自用户输入，需要进行适当的清理和验证，避免注入攻击。

`ProcessBuilder` 是 Java 中处理外部进程的强大工具，适用于需要调用外部程序或脚本的场景。

#### **Mp4VideoUtil工具类，将视频转为mp4格式**

用于**将视频转为mp4格式**，是我们项目要使用的工具类。

> 我们要通过ffmpeg对视频转码，Mp4VideoUtil工具类调用ffmpeg，使用java.lang.ProcessBuilder去完成，具体在Mp4VideoUtil类的63行。
>
> 下边的代码运行本机安装的QQ软件：
>
> ```java
> ProcessBuilder builder = new ProcessBuilder();
> builder.command("C:\\Program Files (x86)\\Tencent\\QQ\\Bin\\QQScLauncher.exe");
> //将标准输入流和错误输入流合并，通过标准输入流程读取信息
> builder.redirectErrorStream(true);
> Process p = builder.start();
> ```

使用Mp4VideoUtil工具类，将avi视频转为mp4视频：

```java
public static void main(String[] args) throws IOException {
    // ffmpeg的路径
    String ffmpeg_path = "D:\\soft\\ffmpeg\\ffmpeg.exe"; // ffmpeg的安装位置
    // 源avi视频的路径
    String video_path = "D:\\develop\\bigfile_test\\nacos01.avi";
    // 转换后mp4文件的名称
    String mp4_name = "nacos01.mp4";
    // 转换后mp4文件的路径
    String mp4_path = "D:\\develop\\bigfile_test\\nacos01.mp4";
    // 创建工具类对象
    Mp4VideoUtil videoUtil = new Mp4VideoUtil(ffmpeg_path, video_path, mp4_name, mp4_path);
    // 开始视频转换，成功将返回success
    String s = videoUtil.generateMp4();
    System.out.println(s);
}
```

执行main方法，最终在控制台输出 success 表示执行成功。
