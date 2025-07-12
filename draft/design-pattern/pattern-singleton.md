---
title: 设计模式| 单例模式
---



## 单例模式

单例模式（Singleton ）保证一个类仅有一个实例，并提供一个访问它的全局访问点。

单例有如下几个特点：

- 在Java应用中，单例模式能保证在一个JVM中，该对象只有一个实例存在
- 构造器必须是私有的，外部类无法通过调用构造器方法创建该实例
- 没有公开的set方法，外部类无法调用set方法创建该实例
- 提供一个公开的get方法获取唯一的这个实例
- 将默认的构造器设置为private。阻止其他类从应用中直接初始化该类。
- 创建一个public static 的静态方法。该方法用于返回一个单例类实例。

- 还可以选择懒加载初始化更友好

**优点**

- 内存中只有一个实例，减少了内存开销；
- 可以避免对资源的多重占用；
- 设置全局访问点，严格控制访问。

**缺点**

- 没有接口，拓展困难。



**适用场景**

- 项目配置类

>读取项目的配置信息的类可以做成单例的，因为只需要读取一次，且配置信息字段一般比较多节省资源。通过这个单例的类，可以对应用程序中的类进行全局访问。无需多次对配置文件进行多次读取。

- 应用日志类

>日志器Logger在你的应用中是无处不在的。也应该只初始化一次，但是可以到处使用。

- 分析和报告类

>如果你在使用一些数据分析工具例如Google Analytics。你就可以注意到它们被设计成单例的，仅仅初始化一次，然后在用户的每一个行为中都可以使用。

**UML 图**

### 实现

> 单例设计模式总计分两种
>
> - 饿汉式：类加载就会导致该单实例对象被创建	
>
> - 懒汉式：类加载不会导致该单实例对象被创建，而是首次使用该对象时才会创建

#### 饿汉模式（线程安全，推荐）

饿汉模式在类装载的时候进行创建。虽然可能会造成一定资源开销和浪费，但是由于简单、安全，所以还是比较推荐的。

> 在很多电商场景，如果这个数据是经常访问的热点数据，那我就可以在系统启动的时候使用饿汉模式提前加载（类似缓存的预热）这样哪怕是第一个用户调用都不会存在创建开销，而且调用频繁也不存在内存浪费了。

```Java
public class HugryInstance {

    private static HugryInstance hugryInstance = new HugryInstance();

    private HugryInstance() {
    }

    public static HugryInstance getInstance() {
        return hugryInstance;
    }
}
```



#### 懒汉模式（线程不安全，不推荐）

懒汉模式在第一次使用的时候进行创建,这种情况下在多线程下是不安全的，可能会同时存在多个实例的创建。

> 比如那个数据你不确定很长一段时间是不是有人会调用，那就用懒汉，如果你使用了饿汉，但是过了几个月还没人调用，提前加载的类在内存中是有资源浪费的。

```Java
public class LazyInstanceNoSafe {

    private static LazyInstanceNoSafe instance;
    private LazyInstanceNoSafe() {
    }

    public static LazyInstanceNoSafe getInstance() {
        if (instance == null) {
            instance = new LazyInstanceNoSafe();
        }
        return instance;
    }
}
```



#### 懒汉模式（线程安全，不推荐）

懒汉模式的线程安全的，但是在方法上加了锁，在访问的时候需要锁占用，会导致一定的资源开销和性能下降。

```Java
public class LazyInstanceSafe {

    private static LazyInstanceSafe instance;
    private LazyInstanceSafe() {
    }

    public static synchronized LazyInstanceSafe getInstance() {
        if (instance == null) {
            instance = new LazyInstanceSafe();
        }
        return instance;
    }
}
```



#### 双重检查（线程安全，推荐）

属于懒汉模式，同时它是线程安全的，使用同步代码块来保证线程的安全。使用双重检查来判断实例是否初始化，减少同步创建实例的开销。

```Java
public class LazyInstance {

    private static volatile LazyInstance instance;

    private LazyInstance() {
    }

    public static LazyInstance getInstance() {
        if (instance == null) {
            synchronized (LazyInstance.class) {
                if (instance == null) {
                    instance = new LazyInstance();
                }
            }
        }
        return instance;
    }
}
```



#### 使用内部类模式（线程安全，推荐）

属于懒汉模式，线程安全，JVM 在执行类的初始化的时候，会进行加锁初始化，在多线程的情况下，也不会频繁创建对象。

```Java
public class InnerClzSingleton {
    private InnerClzSingleton(){
    }
    public static InnerClzSingleton getSingleton(){
        return Inner.instance;
    }
    private static class Inner {
        private static final InnerClzSingleton instance = new InnerClzSingleton();
    }
}
```



#### 枚举方式（线程安全，推荐）

枚举方式进行实例化,是线程安全的,此种方式也是线程最安全的

```Java
private enum Singleton{
    INSTANCE;
    private SingletonExample singleton;
}
```



### 你知道吗？

- 单例类是很少使用的，如果你要使用这个设计模式，你必须清楚的知道你在做什么。因为全局范围内仅仅创建一个实例，所以在资源受约束的平台是存在风险的。

- 注意对象克隆。  单例模式需要仔细检查并阻止clone方法。

- 多线程访问下，需要注意线程安全问题。

- 小心多重类加载器，也许会破坏你的单例类。

- 如果单例类是可序列化的，需要实现严格类型
