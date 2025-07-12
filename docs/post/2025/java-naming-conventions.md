---
title: 转载| Java 命名规范
date: 2022-8-26
categories:
  - 编程知识
tags:
  - Java
order: 9
---

# Java 命名规范

:::tip

既然学了Java，可不能“随心所欲，不逾矩”啊🤣

:::

## 包命名规范

包(Package) 的作用是将功能相似或相关的类或者接口进行分组管理，便于类的定位和查找，同时也可以使用包来避免类名的冲突和访问控制，使代码更容易维护。通常，包名使用小写英文字母进行命名，并使用 `“.”` 进行分割，每个被分割的单元只能包含一个 `名词`。

一般地，包命名常采用顶级域名作为前缀，例如 com，net，org，edu，gov，cn，io 等，随后紧跟公司/组织/个人名称以及功能模块名称。下面是一些包命名示例：

```java
package org.springframework.boot.autoconfigure.cloud
package org.springframework.boot.util

package org.hibernate.action
package org.hibernate.cfg

package com.alibaba.druid
package com.alibaba.druid.filter
package com.alibaba.nacos.client.config

package com.ramostear.blog.web
```

下面是 Oracle Java 的一些常见包命名例子：

```java
package java.beans
package java.io
package java.lang
package java.net
package java.util

package javax.annotation
```



## 类命名规范

类(Class) 通常采用 `名词` 进行命名，且 `首字母大写`，如果一个类名包含两个以上名词，建议使用 `驼峰命名`(Camel-Case) 法书写类名, 每个名词 `首字母也应该大写`。一般地，类名的书写尽量使其保持简单和描述的完整性，因此在书写类名时不建议使用缩写(一些约定俗成的命名除外)。

例如 Internationalization and Localization 缩写成 i18n, Uniform Resource Identifier 缩写成 URI，Data Access Object 缩写成 DAO，JSON Web Token 缩写成 JWT，HyperText Markup Language 缩写成 HTML 等等。下列是一些常见的类命名示例：

```java
class EmployeeService {}
class StudentDAO {}
class OrderItemEntity {}
public class UserDTO {}
public class UserServiceImpl {}
public class OrderItemController {}
```

下面是 Oracle Java 中的一些标准命名示例：

```java
public class HTMLEditorKit {}
public class ArrayIndexOutOfBoundsException {}
public class enum Thread.State {}
public abstract class HttpContext {}
public interface ImageObserver {}
```



## 接口命名规范

首先，接口(Interface) 是一种表述某一类型对象 `动作` 的特殊类；简单来说，接口也是类(不太严谨)，所以，接口的名称的书写也应该符合类名书写规范，`首字母应该大写`，与普通类名不同的是，接口命名时通常采用 `形容词` 或 `动词` 来描述接口的 `动作行为`。下列是 Oracle Java 中一些标准库的接口使用 `形容词` 命名示例：

```java
public interface Closeable {}
public interface Cloneable {}
public interface Runnable {}
public interface Comparable<T> {}
public interface CompletionService<V> {}
public interface Iterable<T> {}
public interface EventListener {}
```

在 Spring Framework 标准库中，通常采用 `名词 + 动词/形容词` 的组合方式来命名接口，下列是 Spring Framework 中一些接口命名示例：

```java
public interface AfterAdvice {}
public interface TargetClassAware {}
public interface ApplicationContextAware {}
public interface MessageSourceResolvable {   }
```

## 抽象类命名规范

抽象类(Abstract Class) 是一种特殊的类，其命名与普通类的命名规范相当。一般地，为了将抽象类与普通类和接口做出区别，提高抽象类的可读性，在命名抽象类时，会以 `“Abstract” / “Base”` 作为类名的前缀。下面是编程中一些常规的命名示例：

```java
public abstract class AbstractRepository<T> {}
public abstract class AbstractController {}
public abstract class BaseDao<T, ID> {}
public abstract class AbstractCommonService<T> {}
```

以下是 Spring Framework 中常见的抽象类示例：

```java
public abstract class AbstractAspectJAdvice {}
public abstract class AbstractSingletonProxyFactoryBean {}
public abstract class AbstractBeanFactoryPointcutAdvisor {}
public abstract class AbstractCachingConfiguration {}
public abstract class AbstractContextLoaderInitializer {}
```

## 异常类命名规范

异常类(Exception Class) 也是类的一种，但与普通类命名不同的是，异常类在命名时需要使用 `“Exception”` 作为其 `后缀`。下面是常见的异常类命名示例：

```java
public class FileNotFoundException {}
public class UserAlreadyExistException {}
public class TransactionException {}
public class ClassNotFoundException {}
public class IllegalArgumentException {}
public class IndexOutOfBoundsException {}
```

另外，在 Java 中还有另外一类异常类，它们属于系统异常，这一类异常类的命名使用 `“Error”` 作为其 `后缀`，以区分 Exception(编码，环境，操作等异常)。下面是系统异常(非检查异常) 的命名示例：

```java
public abstract class VirtualMachineError {}
public class StackOverflowError {}
public class OutOfMemoryError {}
public class IllegalAccessError {}
public class NoClassDefFoundError {}
public class NoSuchFieldError {}
public class NoSuchMethodError {}
```

## 方法命名规范

方法(Method) 命名时, 其 `首字母应该小写`，如果方法签名由多个单词组成，则从第二个单词起，使用驼峰命名法进行书写。一般地，在对方法进行命名时，通常采用 `动词 + 名词` 的组合，下面是方法命名的一些常见示例。

### 表述获取

如果一个方法用于获取某个值，通常使用 `“get”` 作为其 `前缀`，例如：

```java
public String getUserName() {}
public List<Integer> getUserIds() {}
public User getOne() {}
```

### 表述查询

如果方法需要通过查询或筛选的方式获取某个数据，通常使用 `“find” / “query”` 作为其 `前缀`，例如：

```java
public List<User> findOne(Integer id) {}
public List<Integer> findAll() {}
public List<String> queryOrders() {}
```

### 表述条件

如果一个方法需要一些条件参数，则可以使用 `“by” / “with”` 等字符作为方法名中条件的连接符，例如：

```java
public User findByUsername(String username) {}
public List<Integer> getUserIdsWithState(boolean state) {}
public List<User> findAllByUsernameOrderByIdDesc(String username) {}
```

### 表述设置

如果一个方法是要设置，插入，修改，删除等操作，应该将对应的 `动词`(set, insert, update, delete)作为其名词的 `前缀`，例如：

```java
public void setName(String name) {}
public User insert(User user) {}
public void update(User user) {}
public void clearAll() {}
```

### 其它规范

如果一个方法用于获取某组数据的长度或数量，则该方法应该使用 `length` 或 `size` 命名；如果方法的返回值为布尔类型(Boolean)，则该方法应该使用 `“is”` 或 `“has”` 作为 `前缀`;

如果方法用于将一种类型的数据转换为另一种数据数类型，则可以使用 `“to”` 作为 `前缀`。

下面是综合示例：

```java
public long length() {}
public int size() {}
public boolean isOpen() {}
public boolean isNotEmpty() {}
public boolean hasLength() {}
public Set<Integer> mapToSet(Map map) { }
public UserDto convertTo(User user) {}
public String toString(Object obj) {}
```

## 变量命名规范

变量(Variable) 命名包括参数名称，成员变量和局部变量。变量命名通常以 `小写字母开头`，如果变量名由多个单词构成，则从 `第二个单词起` `首字母需要大写`，在变量命名过程中，不建议使用 `“_”` 作为 `前缀` 或者 `单词之间的分割符号`。下面是一些常见的变量命名示例：

```java
private String nickName;
private String mobileNumber;
private Long id;
private String username;
private Long orderId;
private Long orderItemId;
```

## 常量命名规范

一般地，常量名称采用全部大写的英文单词书写，如果常量名称由多个单词组成，则单词之间统一使用 `“_”` 进行分割，下面是常量命名示例：

```java
public static final String LOGIN_USER_SESSION_KEY = "current_login_user";
public static final int MAX_AGE_VALUE = 120;
public static final int DEFAULT_PAGE_NO = 1;
public static final long MAX_PAGE_SIZE = 1000;
public static final boolean HAS_LICENSE = false;
public static final boolean IS_CHECKED = false;
```

## 枚举命名规范

枚举(Enum) 类是一种特殊的类，其命名规范遵循普通类的命名约束条件，首字母大写，采用驼峰命名法；枚举类中定义的值的名称遵循常量的命名规范，且枚举值的名称需要与类名有一定的关联性，下面是枚举的一些示例：

```java
public enum Color {
    RED,
    YELLOW,
    BLUE,
    GREEN,
    WHITE;
}
public enum PhysicalSize {
    TINY,
    SMALL,
    MEDIUM,
    LARGE,
    HUGE,
    GIGANTIC;
}
```

下面是 Oracle Java 标准库中的一个示例：

```java
public enum ElementType {
    TYPE,
    FIELD,
    METHOD,
    PARAMETER,
    CONSTRUCTOR,
    LOCAL_VARIABLE,
    ANNOTATION_TYPE,
    PACKAGE,
    TYPE_PARAMETER,
    TYPE_USE;
}
```

## 其它命名规范

### 数组

在定义数组时，为了便于阅读，尽量保持以下的书写规范：

```java
int[] array = new int[10];
int[] idArray = {1, 2, 3, 4, 5};
String[] nameArray = {"First", "Yellow", "Big"}

public List<String> getNameById(Integer[] ids) {   }
public List<String> getNameById(Integer... ids) {}
```

### 表述复数或者集合

如果一个变量用于描述多个数据时，尽量使用 `单词` 的 `复数` 形式进行书写，例如：

```java
Collection<Order> orders;
int[] values;
List<Item> items;
```

另外，如果表述的是一个 Map 数据，则应使用 `“map”` 作为其 `后缀`，例如：

```java
Map<String,User> userMap;
Map<String,List<Object>> listMap;
```

### 泛型类

在书写泛型类时，通常做以下的约定：

- E: 表示 Element，通常用在集合中;
- ID: 用于表示对象的唯一标识符类型;
- T: 表示 Type(类型)，通常指代类;
- K: 表示 Key(键), 通常用于 Map 中;
- V: 表示 Value(值), 通常用于 Map 中，与 K 结对出现;
- N: 表示 Number, 通常用于表示数值类型;
- ?: 表示不确定的 Java 类型;
- X: 用于表示异常;
- U, S: 表示任意的类型;

下面是泛型类的书写示例：

```java
public class HashSet<E> extends AbstractSet<E> {}
public class HashMap<K, V> extends AbstractMap<K, V> {}
public class ThreadLocal<T> {}

public class Container<K,V> {
    private K key;
    private V value;

    Container(K key, V value) {
        this.key = key;
        this.value = value;
    }
}

public interface Functor<T, X extends Throwable> {
    T val() throws X;
}
public interface BaseRepository<T,ID> {
    T findById(ID id);

    void update(T t);

    List<T> findByIds(ID... ids);
}

public static <T> List<T> methodName(Class<T> clz) {
    List<T> dataList = getByClz(clz);
    return dataList;
}
```

### 接口实现类

为了便于阅读，在通常情况下，建议接口实现类使用 `“Impl”` 作为 `后缀`，不建议使用大写的 `“I”` 作为接口 `前缀`，下面是接口和接口实现类的书写示例。

推荐写法：

```java
public interface OrderService {}
public class OrderServiceImpl implements OrderService {}
```

不建议的写法：

```java
public interface IOrderService {}
public class OrderService implements IOrderService {}
```

### 测试类和测试方法

在项目中，测试类采用被测试业务模块 `名/被测试接口/被测试类` + `“Test”` 的方法进行书写，测试类中的测试函数采用 `“test”` + `用例操作_状态` 的组合方式进行书写，例如：

```java
public class UserServiceTest {
  public void testFindByUsernameAndPassword() {}
  public void testUsernameExist_notExist() {}
  public void testDeleteById_isOk() {}
}
```



::: details 扩展 速记 Java 开发中的各种 O

最后，通过一张表和图快速对 Java 中的 BO, DTO, DAO, PO, POJO, VO 之间的含义，区别以及联系进行梳理。

| 名称 | 使用范围                                       | 解释说明                                                     |
| ---- | ---------------------------------------------- | ------------------------------------------------------------ |
| BO   | 用于Service,Manager,Business等业务相关类的命名 | Business Object业务处理对象，主要作用是把业务逻辑封装成一个对象。 |
| DTO  | 经过加工后的PO对象，其内部属性可能增加或减少   | Data Transfer Object数据传输对象，主要用于远程调用等需要大量传输数据的地方，例如，可以将一个或多个PO类的部分或全部属性封装为DTO进行传输 |
| DAO  | 用于对数据库进行读写操作的类进行命名           | Data Access Object数据访问对象，主要用来封装对数据库的访问，通过DAO可以将POJO持久化为PO，也可以利用PO封装出VO和DTO |
| PO   | Bean,Entity等类的命名                          | Persistant Object持久化对象，数据库表中的数据在Java对象中的映射状态，可以简单的理解为一个PO对象即为数据库表中的一条记录 |
| POJO | POJO是DO/DTO/BO/VO的统称                       | Plain Ordinary Java Object 简单Java对象，它是一个简单的普通Java对象，禁止将类命名为XxxxPOJO |
| VO   | 通常是视图控制层和模板引擎之间传递的数据对象   | Value Object 值对象，主要用于视图层，视图控制器将视图层所需的属性封装成一个对象，然后用一个VO对象在视图控制器和视图之间进行数据传输。 |
| AO   | 应用层对象                                     | Application Object，在Web层与Service层之间抽象的复用对象模型，很少用。 |
