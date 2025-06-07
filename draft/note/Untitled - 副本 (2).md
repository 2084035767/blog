## 配置高级



### 2-1.@ConfigurationProperties

在基础篇学习了配置文件读取，一种是@Value，一种注入Environment 对象。

最常用的一种是**自定义实体类bean读取yml**，使用了@ConfigurationProperties注解，此注解的作用是用来为bean绑定属性的。

**开发者可以在yml配置文件中以对象的格式添加若干属性**

```yml
servers:
  ip-address: 192.168.0.1 
  port: 2345
  timeout: -1
```

然后再在config包下开发一个**用来封装数据的实体配置类ServerConfig**，注意要提供属性对应的setter方法。使用**@ConfigurationProperties注解就可以将配置中的属性值关联到开发的模型类上**

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    private String ipAddress;
    private int port;
    private long timeout;
}
```

在引导类获取实体配置类的bean：

![img](https://i-blog.csdnimg.cn/blog_migrate/64649048e5b88ee1f4952861fad0c7c2.png)



**使用@ConfigurationProperties注解也可以为第三方bean加载属性，格式特殊一点而已：**

**步骤①**：使用@Bean注解定义第三方bean

```java
@Bean
public DruidDataSource datasource(){
    DruidDataSource ds = new DruidDataSource();
    return ds;
}
```

**步骤②**：在yml中定义要绑定的属性，注意datasource此时全小写

```yaml
datasource:
  driverClassName: com.mysql.jdbc.Driver
```

**步骤③**：使用@ConfigurationProperties注解为第三方bean进行属性绑定，注意前缀是全小写的datasource

```java
@Bean
@ConfigurationProperties(prefix = "datasource")
public DruidDataSource datasource(){
    DruidDataSource ds = new DruidDataSource();
    return ds;
}
```

操作方式完全一样，只不过@ConfigurationProperties注解不仅能添加到类上，还可以添加到方法上，添加到类上是为spring容器管理的当前类的对象绑定属性，添加到方法上是为spring容器管理的当前方法的返回值对象绑定属性，其实本质上都一样。

做到这其实就出现了一个新的问题，目前我们定义bean不是通过类注解定义就是通过@Bean定义，使用@ConfigurationProperties注解可以为bean进行属性绑定，那在一个业务系统中，哪些bean通过注解@ConfigurationProperties去绑定属性了呢？因为这个注解不仅可以写在类上，还可以写在方法上，所以找起来就比较麻烦了。为了解决这个问题，**spring给我们提供了一个全新的注解@EnableConfigurationProperties****，专门标注使用@ConfigurationProperties注解绑定属性的bean是哪些。**

**步骤①**：**在引导类上开启@EnableConfigurationProperties注解，并标注要使用@ConfigurationProperties注解绑定属性的类**

```java
@SpringBootApplication
@EnableConfigurationProperties(ServerConfig.class)
public class Springboot13ConfigurationApplication {
}
```

**步骤②**：在对应的类上直接使用@ConfigurationProperties进行属性绑定

```java
@Data
@ConfigurationProperties(prefix = "servers")
//这里不用加@component了
public class ServerConfig {
    private String ipAddress;
    private int port;
    private long timeout;
}
```

> **注意：**
>
> - **开启了@EnableConfigurationProperties注解后**，**绑定属性的ServerConfig类就不能声明@Component注解，否则会被spring检测到两个bean**。
>
> **当使用@EnableConfigurationProperties注解时，spring会默认将其标注的类定义为bean，因此不能再次声明@Component注解了。**

 **@ConfigurationProperties的提示信息：**

使用@ConfigurationProperties注解时，会出现一个提示信息

![img](https://i-blog.csdnimg.cn/blog_migrate/73707453f9a3143ec37c7914b148fd31.png)

**解决办法：**出现这个提示后只需要按照提示添加对应坐标即可，具体原因在元数据里讲。

```XML
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
```

> **总结**
>
> 1. 使用@ConfigurationProperties可以为使用@Bean声明的第三方bean绑定属性
> 2. 当使用@EnableConfigurationProperties声明进行属性绑定的bean后，无需使用@Component注解再次进行bean声明



### 2-2.宽松绑定/松散绑定

**结论： @ConfigurationProperties绑定属性时支持属性名宽松绑定，即不同命名法属性都能绑定。**

**问题演示：** 

在进行属性绑定时，可能会遇到如下情况，为了进行标准命名，开发者会将属性名严格按照驼峰命名法书写，在yml配置文件中将datasource修改为dataSource，如下：

```yaml
dataSource:
  driverClassName: com.mysql.jdbc.Driver
```

此时程序可以正常运行，然后又将代码中的前缀datasource修改为dataSource，如下：

```java
@Bean
@ConfigurationProperties(prefix = "dataSource")
public DruidDataSource datasource(){
    DruidDataSource ds = new DruidDataSource();
    return ds;
}
```

此时就发生了编译错误，而且并不是idea工具导致的，运行后依然会出现问题，配置属性名dataSource是无效的

```cmd
Configuration property name 'dataSource' is not valid: Invalid characters: 'S' Bean: datasource Reason: Canonical names should be kebab-case ('-' separated), lowercase alpha-numeric characters and must start with a letter Action: Modify 'dataSource' so that it conforms to the canonical names requirements.
```

为什么会出现这种问题，这就要来说一说springboot进行属性绑定时的一个重要知识点了，有关属性名称的**宽松绑定**，也可以称为宽松绑定。

**报错原因：** 前缀只支持烤肉串命名，而前缀的属性支持各种命名方法。

 **宽松绑定：**

什么是宽松绑定？实际上是springboot进行编程时人性化设计的一种体现，即**配置文件中的命名格式与变量名的命名格式可以进行格式上的最大化兼容。**兼容到什么程度呢？几乎主流的命名格式都支持，例如：

在ServerConfig中的ipAddress属性名

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    private String ipAddress;
}
```

可以与下面的配置属性名规则全兼容

```yml
servers:
  ipAddress: 192.168.0.2        驼峰模式
  ip_address: 192.168.0.2       下划线模式
  ip-address: 192.168.0.2       烤肉串模式
  IP_ADDRESS: 192.168.0.2       常量模式
```

也可以说，以上4种模式最终都可以匹配到ipAddress这个属性名。为什么这样呢？原因就是**在进行匹配时，配置中的名称要去掉中划线和下划线后，忽略大小写的情况下去与java代码中的属性名进行忽略大小写的等值匹配**，以上4种命名去掉下划线中划线忽略大小写后都是一个词ipaddress，java代码中的属性名忽略大小写后也是ipaddress，这样就可以进行等值匹配了，这就是为什么这4种格式都能匹配成功的原因。不过springboot官方推荐使用烤肉串模式，也就是中划线模式。

到这里我们掌握了一个知识点，就是命名的规范问题。再来看开始出现的编程错误信息

```cmd
Configuration property name 'dataSource' is not valid:
Invalid characters: 'S'
Bean: datasource
Reason: Canonical names should be kebab-case ('-' separated), lowercase alpha-numeric characters and must start with a letter
Action:
Modify 'dataSource' so that it conforms to the canonical names requirements.
```

其中Reason描述了报错的原因，规范的名称应该是烤肉串(kebab)模式(case)，即使用-分隔，使用小写字母数字作为标准字符，且必须以字母开头。然后再看我们写的名称dataSource，就不满足上述要求。闹了半天，在书写前缀时，这个词不是随意支持的，必须使用上述标准。编程写了这么久，基本上编程习惯都养成了，到这里又被springboot教育了，没辙，谁让人家东西好用呢，按照人家的要求写吧。

最后说一句，以上规则仅针对springboot中@ConfigurationProperties注解进行属性绑定时有效，对@Value注解进行属性映射无效。有人就说，那我不用你不就行了？不用，你小看springboot的推广能力了，到原理篇我们看源码时，你会发现内部全是这玩意儿，算了，拿人手短吃人嘴短，认怂吧。

> **总结**
>
> 1. @ConfigurationProperties绑定属性时支持属性名宽松绑定，这个**宽松体现在属性名**的命名规则上
> 2. @Value注解不支持松散绑定规则
> 3. 绑定前缀名**推荐采用烤肉串命名规则**，即使用中划线做分隔符



### 2-3.常用计量单位绑定

在前面的配置中，我们书写了如下配置值，其中第三项超时时间timeout描述了服务器操作超时时间，当前值    是-1表示永不超时。

```yml
servers:
  ip-address: 192.168.0.1
  port: 2345
  timeout: -1
```

但是每个人都这个值的理解会产生不同，比如线上服务器完成一次主从备份，配置超时时间240，这个240如果单位是秒就是超时时间4分钟，如果单位是分钟就是超时时间4小时。面对一次线上服务器的主从备份，设置4分钟，简直是开玩笑，别说拷贝过程，备份之前的压缩过程4分钟也搞不定，这个时候问题就来了，怎么解决这个误会？

除了加强约定之外，springboot充分利用了JDK8中提供的全新的用来表示计量单位的新数据类型，从根本上解决这个问题。以下模型类中添加了两个JDK8中新增的类，分别是Duration和DataSize

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    @DurationUnit(ChronoUnit.HOURS)
    private Duration serverTimeOut;
    @DataSizeUnit(DataUnit.MEGABYTES)
    private DataSize dataSize;
}
```

**Duration**：表示时间间隔，可以通过@DurationUnit注解描述时间单位，例如上例中描述的单位为小时（ChronoUnit.HOURS）

**DataSize**：表示存储空间，可以通过@DataSizeUnit注解描述存储空间单位，例如上例中描述的单位为MB（DataUnit.MEGABYTES）

使用上述两个单位就可以有效避免因沟通不同步或文档不健全导致的信息不对称问题，从根本上解决了问题，避免产生误读。
