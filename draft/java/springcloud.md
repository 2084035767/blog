# Spring Cloud 微服务架构实战指南

## 一、Nacos - 注册与配置中心

### 安装部署

采用 Docker 安装 Nacos，命令如下：

```bash
docker run -d -p 8848:8848 -p 9848:9848 -e MODE=standalone --name nacos nacos/nacos-server:v2.4.3
```

### 注册中心集成

#### 依赖引入

在项目中添加 Nacos 注册中心的依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

#### 整合配置

在 `application.properties` 文件中进行如下配置：

```properties
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
# 若暂时不使用配置中心功能，可关闭配置检查
# spring.cloud.nacos.config.import-check.enabled=false
```

#### 开启服务注册与发现

在 Spring Boot 应用的主启动类上添加 `@EnableDiscoveryClient` 注解（可选，但从开发习惯和标识角度仍推荐添加）：

```java
@EnableDiscoveryClient
@SpringBootApplication
public class OrderMainApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderMainApplication.class, args);
    }
}
```

#### 注册更多服务

创建其他微服务（如 service-product），引入 Nacos 依赖并配置 Nacos 地址，确保每个微服务的端口唯一，启动应用后检查是否成功注册到 Nacos。

#### 启动集群

以 service-order 为例，启动多个实例形成集群。在 Idea 的 services 面板中添加 SpringBoot 项目，准备三份 OrderMainApplication，每个启动命令指定不同的端口。

### 服务发现机制

#### 使用 DiscoveryClient

```java
@Autowired
DiscoveryClient discoveryClient;

@Test
void discoveryClientTest() {
    for (String service : discoveryClient.getServices()) {
        System.out.println("service = " + service);
        List<ServiceInstance> instances = discoveryClient.getInstances(service);
        for (ServiceInstance instance : instances) {
            System.out.println("ip：" + instance.getHost() + "；port = " + instance.getPort());
        }
    }
}
```

#### 使用 NacosServiceDiscovery

```java
@Autowired
NacosServiceDiscovery nacosServiceDiscovery;

@Test
void nacosServiceDiscoveryTest() throws NacosException {
    for (String service : nacosServiceDiscovery.getServices()) {
        System.out.println("service = " + service);
        List<ServiceInstance> instances = nacosServiceDiscovery.getInstances(service);
        for (ServiceInstance instance : instances) {
            System.out.println("ip：" + instance.getHost() + "；port = " + instance.getPort());
        }
    }
}
```

### 远程调用实现

#### 配置 RestTemplate

```java
@Configuration
public class UserConfiguration {
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

#### 测试调用

```java
@Autowired
RestTemplate restTemplate;

@Test
void testRestTemplate() {
    String forObject = restTemplate.getForObject("http://localhost:8080/movie", String.class);
    System.out.println(forObject);
    System.out.println("-----------------------------");
}
```

### 负载均衡策略

#### 引入依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
```

#### 使用 LoadBalancerClient

```java
private Product getProductFromRemoteWithLoadBalance(Long productId) {
    ServiceInstance choose = loadBalancerClient.choose("service-product");
    String url = "http://" + choose.getHost() + ":" + choose.getPort() + "/product/" + productId;
    log.info("远程请求：{}", url);
    Product product = restTemplate.getForObject(url, Product.class);
    return product;
}
```

#### 注解式负载均衡

```java
@Configuration
public class UserConfiguration {
    @LoadBalanced
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

private Product getProductFromRemoteWithLoadBalanceAnnotation(Long productId) {
    String url = "http://service-product/product/" + productId;
    Product product = restTemplate.getForObject(url, Product.class);
    return product;
}
```

### 配置中心集成

#### 依赖引入

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

#### 配置文件设置

```properties
spring.cloud.nacos.server-addr=localhost:8848
spring.config.import=nacos:service-order.properties
```

### 动态刷新配置

#### 使用 @RefreshScope

```java
@RefreshScope
@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    @Value("${order.timeout}")
    String orderTimeout;
    @Value("${order.auto-confirm}")
    String orderAutoConfirm;

    @Autowired
    OrderProperties orderProperties;

    @GetMapping("/config")
    public String config() {
        return "order.timeout=" + orderProperties.getTimeout() + "； " +
                "order.auto-confirm=" + orderProperties.getAutoConfirm() + "；" +
                "order.db-url=" + orderProperties.getDbUrl();
    }
}
```

#### 使用 ConfigurationProperties

```java
@Component
@ConfigurationProperties(prefix = "order")
@Data
public class OrderProperties {
    String timeout;
    String autoConfirm;
    String dbUrl;
}
```

#### 使用 NacosConfigManager

```java
@Bean
ApplicationRunner applicationRunner(NacosConfigManager manager) {
    return args -> {
        ConfigService configService = manager.getConfigService();
        configService.addListener("service-order.properties", "DEFAULT_GROUP", new Listener() {
            @Override
            public Executor getExecutor() {
                return Executors.newFixedThreadPool(4);
            }

            @Override
            public void receiveConfigInfo(String configInfo) {
                System.out.println("configInfo = " + configInfo);
            }
        });
    };
}
```

## 二、OpenFeign - 远程调用

### 引入依赖

在父项目中统一引入 OpenFeign 依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### 开启功能

在应用主类上添加 `@EnableFeignClients` 注解：

```java
@SpringBootApplication
@EnableFeignClients
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 远程调用示例

```java
@FeignClient("stores")
public interface StoreClient {
    @RequestMapping(method = RequestMethod.GET, value = "/stores")
    List<Store> getStores();

    @GetMapping("/stores")
    Page<Store> getStores(Pageable pageable);

    @PostMapping(value = "/stores/{storeId}", consumes = "application/json", params = "mode=upsert")
    Store update(@PathVariable("storeId") Long storeId, Store store);

    @DeleteMapping("/stores/{storeId:\\d+}")
    void delete(@PathVariable Long storeId);
}
```

## 三、Sentinel - 流量保护

### 资源与规则定义

#### 资源定义

- 主流框架自动适配（Web Servlet、Dubbo、Spring Cloud、gRPC、Spring WebFlux、Reactor），所有 Web 接口均为资源。
- 编程式：使用 SphU API。
- 声明式：使用 `@SentinelResource` 注解。

#### 规则定义

- 流量控制规则
- 熔断降级规则
- 系统保护规则
- 来源访问控制规则
- 热点参数规则

### 依赖配置

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

### 配置连接

```yaml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
```

## 四、Gateway - 网关

### 基础入门与功能

引入依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>

<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

配置网关：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: order
          uri: lb://service-order
          predicates:
            - Path=/api/order/**
        - id: product
          uri: lb://service-product
          predicates:
            - Path=/api/product/**
```

处理跨域（CORS）：

全局跨域配置：

```yaml
spring:
  cloud:
    gateway:
      globalcors:
        cors-configurations:
          '[/**]':
            allowedOrigins: "https://docs.spring.io"
            allowedMethods:
              - GET
```

局部跨域配置：

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: cors_route
          uri: https://example.org
          predicates:
            - Path=/service/**
          metadata:
            cors:
              allowedOrigins: '*'
              allowedMethods:
                - GET
                - POST
              allowedHeaders: '*'
              maxAge: 30
```

## 五、Seata - 分布式事务

### 环境搭建与配置

下载 Seata 工程文件并导入项目，在 services 中添加 module 聚合。

创建数据库并运行 SQL 文件：

```sql
-- storage_db
CREATE DATABASE IF NOT EXISTS `storage_db`;
USE `storage_db`;
CREATE TABLE `storage_tbl` (...);
CREATE TABLE `undo_log` (...);

-- order_db
CREATE DATABASE IF NOT EXISTS `order_db`;
USE `order_db`;
CREATE TABLE `order_tbl` (...);
CREATE TABLE `undo_log` (...);

-- account_db
CREATE DATABASE IF NOT EXISTS `account_db`;
USE `account_db`;
CREATE TABLE `account_tbl` (...);
CREATE TABLE `undo_log` (...);
```

### Seata Server 配置

在每个微服务中创建 file.conf 文件，配置服务块：

```conf
transport {
    type = "TCP"
    server = "NIO"
    heartbeat = true
    threadFactory {
        bossThreadPrefix = "NettyBoss"
        workerThreadPrefix = "NettyServerNIOWorker"
        serverExecutorThread-prefix = "NettyServerBizHandler"
        shareBossWorker = false
        clientSelectorThreadPrefix = "NettyClientSelector"
        clientSelectorThreadSize = 1
        clientWorkerThreadPrefix = "NettyClientWorkerThread"
        bossThreadSize = 1
        workerThreadSize = "default"
    }
    shutdown {
        wait = 3
    }
    serialization = "seata"
    compressor = "none"
}
service {
    vgroupMapping.default_tx_group = "default"
    default.grouplist = "127.0.0.1:8091"
    enableDegrade = false
    disableGlobalTransaction = false
}
client {
    rm {
        asyncCommitBufferLimit = 10000
        lock {
            retryInterval = 10
            retryTimes = 30
            retryPolicyBranchRollbackOnConflict = true
        }
        reportRetryCount = 5
        tableMetaCheckEnable = false
        tableMetaCheckerInterval = 60000
        reportSuccessEnable = false
        sagaBranchRegisterEnable = false
        sagaJsonParser = "fastjson"
        sagaRetryPersistModeUpdate = false
        sagaCompensatePersistModeUpdate = false
        tccActionInterceptorOrder = -2147482648
        sqlParserType = "druid"
        branchExecutionTimeoutXA = 60000
        connectionTwoPhaseHoldTimeoutXA = 10000
    }
    tm {
        commitRetryCount = 5
        rollbackRetryCount = 5
        defaultGlobalTransactionTimeout = 60000
        degradeCheck = false
        degradeCheckPeriod = 2000
        degradeCheckAllowTimes = 10
        interceptorOrder = -2147482648
    }
    undo {
        dataValidation = true
        onlyCareUpdateColumns = true
        logSerialization = "jackson"
        logTable = "undo_log"
        compress {
            enable = true
            type = zip
            threshold = 64k
        }
    }
    loadBalance {
        type = "XID"
        virtualNodes = 10
    }
}
log {
    exceptionRate = 100
}
tcc {
    fence {
        logTableName = tcc_fence_log
        cleanPeriod = 1h
    }
}
```
