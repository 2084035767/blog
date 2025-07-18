---
title: 设计模式| 代理模式
date: 2025-1-1
---



# 代理模式

代理模式是一种设计模式，提供了对目标对象额外的访问方式，即通过代理对象访问目标对象，这样可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能。

## 静态代理

在编译时就已经实现，编译完成后代理类是一个实际的class文件。

**使用方式**

创建一个接口，然后创建被代理的类实现该接口并且实现该接口中的抽象方法。

之后再创建一个代理类，同时使其也实现这个接口。在代理类中持有一个被代理对象的引用，而后在代理类方法中调用该对象的方法。

```java
public interface UserDao {    
  void save();     
}
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("正在保存用户...");
    }
}
public class TransactionHandler implements UserDao {
    //目标代理对象
    private UserDao target;
    //构造代理对象时传入目标对象
    public TransactionHandler(UserDao target) {
        this.target = target;
    }
    @Override
    public void save() {
        //调用目标方法前的处理
        System.out.println("开启事务控制...");
        //调用目标对象的方法
        target.save();
        //调用目标方法后的处理
        System.out.println("关闭事务控制...");
    }
}
public class Main {
    public static void main(String[] args) {
        //新建目标对象
        UserDaoImpl target = new UserDaoImpl();
        //创建代理对象, 并使用接口对其进行引用
        UserDao userDao = new TransactionHandler(target);
        //针对接口进行调用
        userDao.save();
    }
}
```

使用JDK静态代理很容易就完成了对一个类的代理操作。但是`JDK`静态代理的缺点也暴露了出来：由于代理只能为一个类服务，如果需要代理的类很多，那么就需要编写大量的代理类，比较繁琐。

## 动态代理

**JDK动态代理**

> **使用JDK动态代理的五大步骤：**
>
> 1. 通过实现InvocationHandler接口来自定义自己的InvocationHandler；
> 2. 通过`Proxy.getProxyClass`获得动态代理类；
> 3. 通过反射机制获得代理类的构造方法，方法签名为`getConstructor(InvocationHandler.class)`；
> 4. 通过构造函数获得代理对象并将自定义的`InvocationHandler`实例对象传为参数传入；
> 5. 通过代理对象调用目标方法；

```java
public interface IHello {
    void sayHello();
}
java复制代码 public class HelloImpl implements IHello {
    @Override
    public void sayHello() {
        System.out.println("Hello world!");
    }
}
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
 
public class MyInvocationHandler implements InvocationHandler {
 
    /** 目标对象 */
    private Object target;
 
    public MyInvocationHandler(Object target){
        this.target = target;
    }
 
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("------插入前置通知代码-------------");
        // 执行相应的目标方法
        Object rs = method.invoke(target,args);
        System.out.println("------插入后置处理代码-------------");
        return rs;
    }
}
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Proxy;
 
public class MyProxyTest {
    public static void main(String[] args)
            throws NoSuchMethodException, IllegalAccessException, InstantiationException, InvocationTargetException {
        // =========================第一种==========================
        // 1、生成$Proxy0的class文件
        System.getProperties().put("sun.misc.ProxyGenerator.saveGeneratedFiles", "true");
        // 2、获取动态代理类
        Class proxyClazz = Proxy.getProxyClass(IHello.class.getClassLoader(),IHello.class);
        // 3、获得代理类的构造函数，并传入参数类型InvocationHandler.class
        Constructor constructor = proxyClazz.getConstructor(InvocationHandler.class);
        // 4、通过构造函数来创建动态代理对象，将自定义的InvocationHandler实例传入
        IHello iHello1 = (IHello) constructor.newInstance(new MyInvocationHandler(new HelloImpl()));
        // 5、通过代理对象调用目标方法
        iHello1.sayHello();
 
        // ==========================第二种=============================
        /**
         * Proxy类中还有个将2~4步骤封装好的简便方法来创建动态代理对象，
         *其方法签名为：newProxyInstance(ClassLoader loader,Class<?>[] instance, InvocationHandler h)
         */
        IHello  iHello2 = (IHello) Proxy.newProxyInstance(IHello.class.getClassLoader(), // 加载接口的类加载器
                new Class[]{IHello.class}, // 一组接口
                new MyInvocationHandler(new HelloImpl())); // 自定义的InvocationHandler
        iHello2.sayHello();
    }
}
```

> **JDK静态代理与JDK动态代理不同之处：**
>
> 在静态代理中我们需要对哪个接口和哪个被代理类创建代理类，所以我们在编译前就需要代理类实现与被代理类相同的接口，并且直接在实现的方法中调用被代理类相应的方法；
>
> 但是动态代理我们不知道要针对哪个接口、哪个被代理类创建代理类，因为它是在运行时被创建的。

**CGLIB**

CGLIB包的底层是通过使用一个小而快的字节码处理框架`ASM`，来转换字节码并生成新的类。

> **CGLIB代理实现如下：**
>
> 1. 首先实现一个MethodInterceptor，方法调用会被转发到该类的intercept()方法。
> 2. 然后在需要使用的时候，通过CGLIB动态代理获取代理对象。

```java
java复制代码 public class HelloService {
 
    public HelloService() {
        System.out.println("HelloService构造");
    }
 
    /**
     * 该方法不能被子类覆盖,Cglib是无法代理final修饰的方法的
     */
    final public String sayOthers(String name) {
        System.out.println("HelloService:sayOthers>>"+name);
        return null;
    }
 
    public void sayHello() {
        System.out.println("HelloService:sayHello");
    }
}
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;
 
import java.lang.reflect.Method;
 
/**
 * 自定义MethodInterceptor
 */
public class MyMethodInterceptor implements MethodInterceptor{
 
    /**
     * sub：cglib生成的代理对象
     * method：被代理对象方法
     * objects：方法入参
     * methodProxy: 代理方法
     */
    @Override
    public Object intercept(Object sub, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println("======插入前置通知======");
        Object object = methodProxy.invokeSuper(sub, objects);
        System.out.println("======插入后者通知======");
        return object;
    }
}
import net.sf.cglib.core.DebuggingClassWriter;
import net.sf.cglib.proxy.Enhancer;
 
public class Client {
    public static void main(String[] args) {
        // 代理类class文件存入本地磁盘方便我们反编译查看源码
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "D:\\code");
        // 通过CGLIB动态代理获取代理对象的过程
        Enhancer enhancer = new Enhancer();
        // 设置enhancer对象的父类
        enhancer.setSuperclass(HelloService.class);
        // 设置enhancer的回调对象
        enhancer.setCallback(new MyMethodInterceptor());
        // 创建代理对象
        HelloService proxy= (HelloService)enhancer.create();
        // 通过代理对象调用目标方法
        proxy.sayHello();
    }
}
```

JDK代理要求被代理的类必须实现接口，有很强的局限性。

`CGLIB`会让生成的代理类继承被代理类，并在代理类中对代理方法进行强化处理(前置处理、后置处理等)。

**CGLIB在进行代理的时候都进行了哪些工作**

> 生成的代理类继承被代理类。在这里我们需要注意一点：如果委托类被final修饰，那么它不可被继承，即不可被代理；同样，如果委托类中存在final修饰的方法，那么该方法也不可被代理
>
> 代理类会为委托方法生成两个方法，一个是与委托方法签名相同的方法，它在方法中会通过`super`调用委托方法；另一个是代理类独有的方法
>
> 当执行代理对象的方法时，会首先判断一下是否存在实现了`MethodInterceptor`接口的`CGLIB$CALLBACK_0`，如果存在，则将调用`MethodInterceptor`中的`intercept`方法
>
> 在`intercept`方法中，我们除了会调用委托方法，还会进行一些增强操作。在Spring AOP中，典型的应用场景就是在某些敏感方法执行前后进行操作日志记录

在CGLIB中，方法的调用并不是通过反射来完成的，而是直接对方法进行调用：

> 通过**FastClass机制**对Class对象进行特别的处理，比如将会用数组保存method的引用，每次调用方法的时候都是通过一个index下标来保持对方法的引用

**Fastclass机制**

CGLIB采用了FastClass的机制来实现对被拦截方法的调用。

FastClass机制就是对一个类的方法建立索引，通过索引来直接调用相应的方法。

**三种代理方式之间对比**

| 代理方式      | 实现                                                         | 优点                                                         | 缺点                                                         | 特点                                                       |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| JDK静态代理   | 代理类与委托类实现同一接口，并且在代理类中需要硬编码接口     | 实现简单，容易理解                                           | 代理类需要硬编码接口，在实际应用中可能会导致重复编码，浪费存储空间并且效率很低 | 好像没啥特点                                               |
| JDK动态代理   | 代理类与委托类实现同一接口，主要是通过代理类实现InvocationHandler并重写`invoke`方法来进行动态代理的，在invoke方法中将对方法进行增强处理 | 不需要硬编码接口，代码复用率高                               | 只能够代理实现了接口的委托类                                 | 底层使用反射机制进行方法的调用                             |
| CGLIB动态代理 | 代理类将委托类作为自己的父类并为其中的非final委托方法创建两个方法，一个是与委托方法签名相同的方法，它在方法中会通过`super`调用委托方法；另一个是代理类独有的方法。在代理方法中，它会判断是否存在实现了`MethodInterceptor`接口的对象，若存在则将调用intercept方法对委托方法进行代理 | 可以在运行时对类或者是接口进行增强操作，且委托类无需实现接口 | 不能对`final`类以及final方法进行代理                         | 底层将方法全部存入一个数组中，通过数组索引直接进行方法调用 |



**CGlib比JDK快？**

- 使用CGLiB实现动态代理，CGLib底层采用ASM字节码生成框架，使用字节码技术生成代理类， 在jdk6之前比使用Java反射效率要高。唯一需要注意的是，CGLib不能对声明为final的方法进行代理， 因为CGLib原理是动态生成被代理类的子类。
- 在jdk6、jdk7、jdk8逐步对JDK动态代理优化之后，在调用次数较少的情况下，JDK代理效率高于CGLIB代理效率。只有当进行大量调用的时候，jdk6和jdk7比CGLIB代理效率低一点，但是到jdk8的时候，jdk代理效率高于CGLIB代理，总之，每一次jdk版本升级，jdk代理效率都得到提升。

**Spring如何选择用JDK还是CGLIB？**

- 当Bean实现接口时，Spring就会用JDK的动态代理。
- 当Bean没有实现接口时，Spring使用CGlib实现。
- 可以强制使用CGlib。
