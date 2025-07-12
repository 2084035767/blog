---
title: 关于| Java MVC架构
date: 2022-8-9
categories: 
  - 编程知识
tags: 
  - Java
order: 8
---

# Java MVC架构

::: tip 前言

最近写「JavaWeb」项目的时候，发现MVC分层架构往往不只三层，还有其他层。秘书给我查查🧐

TODO 待修改

:::



## MVC架构

> 如果你写过 JavaWeb项目，你可能见过这种“约定”😶

一般 Java 后端会有这几种层结构

| **Dao**层 | **Entity**层 | **Service**层 | **Controller**层 | **view**层（前后端一体） |
| --------- | ------------ | ------------- | ---------------- | ------------------------ |



### Entity（domain）层：实体类层

`Entity`层（实体类层）主要用于表示业务对象和数据表之间的映射关系。每个数据库表都对应着一个实体对象，而实体对象就是一个属性与表中的字段一一对应的普通 `Java` 类。

- 在 `Entity` 层中，我们通常使用 `ORM` 框架来完成对象关系映射的工作，使得应用程序中的 `Java` 对象可以与数据库中的数据互相转换。

- `Entity` 层还可以定义一些业务逻辑相关的方法，例如计算属性、获取或修改数据、验证数据等等。

-  `Entity` 类，需要遵循 「SOLID 原则」，确保其单一职责、高内聚、低耦合、易扩展和易维护。

```java
@Data
public class User {
    private Long id;
    private String username;
    private String email;
    // Constructors, getters, setters, and other methods
}
```



### Dao（mapper）层：数据访问层

`Dao（Data Access Object）`层（通常也称为数据访问层或`Mapper`层）负责封装底层数据访问技术的细节，为上层的服务层提供统一的接口，以便进行数据存储、读取和更新等操作。Dao层的主要职责包括：封装数据源，对象关系映射（`ORM`），增删改查（`CRUD`）操作，事务处理，缓存管理等等。

```java
public interface UserDao {
    User findById(Long id);
    User findByUsername(String username);
    void save(User user);
    void update(User user);
    void delete(User user);
}
```



### Service层：服务层

`Service`层（也称为业务层）通常位于控制器层和数据访问层之间，它负责处理业务逻辑、调用 `Dao` 层完成数据操作，并将结果返回给控制器层。

- 在 `Service` 层中，通常包含着应用程序的核心业务逻辑，例如用户认证、权限管理、订单处理等。
- `Service`层为控制器层提供了高层次的 API 接口，以暴露应用程序的功能，并封装了底层 `Dao` 层的细节实现。
- `Service`层还可以承担其他重要的职责，如数据校验、事务管理、缓存管理、异步处理等等

```java
public interface UserService {
    User getUserById(Long id);
    User getUserByUsername(String username);
    void createUser(User user);
    void updateUser(User user);
    void deleteUser(User user);
}
// 业务实现类
public class UserServiceImpl implements UserService {
    private UserDao userDao;
    
    // Constructor or dependency injection for UserDao
    
    @Override
    public User getUserById(Long id) {
        return userDao.findById(id);
    }
    
    @Override
    public User getUserByUsername(String username) {
        return userDao.findByUsername(username);
    }
    
    @Override
    public void createUser(User user) {
        // Perform any necessary business logic or validation
        userDao.save(user);
    }
    
    @Override
    public void updateUser(User user) {
        // Perform any necessary business logic or validation
        userDao.update(user);
    }
    
    @Override
    public void deleteUser(User user) {
        // Perform any necessary business logic or validation
        userDao.delete(user);
    }
}
```



###  Controller（action）层：控制层

`Controller`层（控制器层）通常位于 业务层和视图层之间，它负责接收用户请求、调度相应的业务层完成业务逻辑处理，并将结果返回给视图层进行展示。

- 在 `Controller` 层中，每个请求通常对应着一个 `Action` 方法，用于处理用户提交的数据、获取需要的信息或者调用相应的服务。
- `Action` 方法通常会根据不同的请求类型（如 `GET`、`POST` 等）进行分类，也可以使用注解来处理请求映射、参数绑定、数据验证等工作。
- `Controller` 层还承担了其他一些任务，如异常处理、日志记录、安全性过滤等。它是整个应用程序与用户交互的入口。

```java
public class UserController {
    private UserService userService;
    
    // Constructor or dependency injection for UserService
    
    public void createUser(String username, String email) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        userService.createUser(user);
        // Perform any necessary view-related operations or redirect to another page
    }
    
    public void updateUser(Long id, String newUsername) {
        User user = userService.getUserById(id);
        
        if (user != null) {
            user.changeUsername(newUsername);
            userService.updateUser(user);
            
            // Perform any necessary view-related operations or redirect to another page
        } else {
            // Handle the case where the user is not found
        }
    }
    
    // Other controller methods for handling user-related operations
}
```



### View层：视图层

> 在前后端分离的项目中一般没有视图层😶

`View`层（视图层）负责将服务端生成的数据呈现给用户，并与用户进行交互。

- `View` 层采用 `HTML`、`CSS` 和 `JavaScript` 等前端技术来实现页面的展示和用户响应。
- 在 `View` 层，开发人员通常使用模板引擎或前端框架来进行开发，以便快速构建用户友好的页面，并将数据渲染到页面上。
- `View` 层还可以处理用户输入、响应用户事件，并与后台进行异步交互等。

```java
public class UserView {
    private UserController userController;
    
    // Constructor or dependency injection for UserController
    
    public void createUser(String username, String email) {
        userController.createUser(username, email);
        
        // Update the view accordingly, e.g., display a success message
    }
    
    public void updateUser(Long id, String newUsername) {
        userController.updateUser(id, newUsername);
        
        // Update the view accordingly, e.g., display a success message
    }
    
    // Other view methods for displaying and interacting with user-related data
}
```



## 各层对象含义

> Java不仅有各种层，还有各种对象，怎么样？汗流浃背了吧🙃

在 Java 编程中，通常会使用以下几种对象

| **Entity**对象 | **VO**对象 | **DAO**对象 | **POJO**对象 | **DTO**对象 |
| -------------- | ---------- | ----------- | ------------ | ----------- |

### Entity：实体对象

实体对象代表了系统中的实际业务实体，通常与数据库中的表相映射。实体对象封装了实体的属性和行为，并提供对数据的访问方法。它们在应用程序中用于表示和操作业务数据。

```java
public class User {
    private Long id;
    private String username;
    private String email;
    
    // Constructors, getters, setters, and other methods
    
    // Example of a behavior method
    public void changeUsername(String newUsername) {
        // Validate the new username
        // Update the username in the database
        this.username = newUsername;
    }
}
```



### VO (Value Object) ：值对象

值对象，是为了在不同层之间传递数据而设计的对象。用于封装一组相关的数据，通常用于数据传输。值对象是一种轻量级的对象，它们通常是不可变的，只包含数据，没有业务逻辑，通常也不涉及到数据库操作。

```java
public class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;
    
    // Constructors, getters, and setters
}
```



### DAO (Data Access Object)：数据访问对象

数据访问对象封装了针对数据库的CRUD操作，提供给业务层进行调用。DAO提供了一组接口或抽象类，定义了对数据的增删改查等操作。它们负责与数据库进行交互，并提供数据的持久化和检索功能。

```java
public interface UserDao {
    User findById(Long id);
    void save(User user);
    void update(User user);
    void delete(User user);
}
```



### DTO (Data Transfer Object ) ：数据传输对象

数据传输对象一般会包含多个属性，并且这些属性可以来自不同的实体类或数据库表。通过使用数据传输对象，我们可以避免在不同层之间频繁地传递大量数据，从而提升系统的性能和可扩展性。还可以起到数据过滤和隐藏敏感信息等作用。

```java
public class UserDTO {
    private String username;
    private String email;
    
    // Constructors, getters, and setters
}
```



### POJO (Plain Old Java Object) ：简单 Java 对象

普通的 `Java` 对象，没有继承特定类或实现特定接口，也没有被框架注解标记。是一种轻量级的 `Java` 类型，通常用于表示各种对象，包括实体对象、数据传输对象、值对象等。

```java
public class Product {
    private String name;
    private double price;
    
    // Constructors, getters, and setters
}
```



::: tip 提示

其实还有 PO，BO 等对象，因为不常用，所以这里不作说明了，有兴趣可以自行搜索。

:::



## 写在最后

其实Java MVC架构不过是遵循了“高内聚，低耦合”原则，”单一职责“原则等等，实现各种层的层层抽象。每层有各自的职责，使 JavaWeb开发更加效率和容易。

> 反正都是抽象，”面向抽象编程“🤪



## 参考三三


- https://zhuanlan.zhihu.com/p/95059739

- https://www.cnblogs.com/mmzs/p/8185096.html#_label0_0