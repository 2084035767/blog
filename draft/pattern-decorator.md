```
title: 关于| 初等基本函数
date: 2025-1-1
categories: 
  - 知识了解
```

:::tip 前言



:::

## 装饰器模式

在不改变原有对象的基础之上，将功能附加到对象上，提供了比继承更有弹性的替代方案。



在实际生产中，某个类的行为（它所提供的方法）已经没法满足当前的需要了，但是又需要使用原有的部分功能，因此需要对原有对象进行增强——装饰器设计模式（Decorator Pattern）也叫包装器模式就是为解决此问题而诞生的，它是对原有类的一个包装，属于结构性设计模式。

装饰器模式在不改变现有类方法签名的前提下，对当前的类进行了增强。

>Tips
>
>我们使用继承也可以实现，但是会导致类型结构的膨胀，难以维护。

# 装饰器设计模式的生活场景

我们来看一个现实中的例子，老李头家大儿子去年谈了个朋友，女方要求有车才能领证，所以老李家买了一辆奇瑞eQ1，但是女方嫌车速太慢喜欢开快车的感觉...现在老李家正苦恼中...直到有一天在市里工作的大表哥回来听说该情况后，大表哥说这个好整啊，搞到车行去改装一下，把速度提上去就可以了啊。

于是乎，老李家去车行把车进行了改装，车速上去了，媳妇也领到了，皆大欢喜...

这其实就是一个装饰器的使用案例，原来的eQ1车已经没法满足了，所以进行了速度增强，其他功能并没有改变。


# 装饰器设计模式的特征

- 被增强类、增强类实现同一个接口
- 增强类持有被增强类的引用
- 被增强的方法调用增强类的方法，其他方法保持原有的继续使用被增强类的旧方法




**优点**

- 继承的有力补充，不改变原有对象的情况下给对象拓展功能；
- 通过使用不同的装饰类、不同的组合方式，实现不同的效果。
- 符合开闭原则。

**缺点**

- 增加程序复杂性

**适用场景**

- 拓展一个类的功能；
- 动态给对象添加功能，并且动态撤销。

**UML 图**



### 实现

定义一个抽象的水果沙拉类 `AbstractFruitSalad`

```java
public abstract class AbstractFruitSalad {
    public abstract String remark();
    public abstract int price();
}
```

包含备注和价格抽象方法。

接着创建一个抽象的装饰器 `AbstractDecorator`（关键点，继承抽象水果沙拉类）：

```java
public class AbstractDecorator extends AbstractFruitSalad{
  private AbstractFruitSalad fruitSalad;

  public AbstractDecorator(AbstractFruitSalad fruitSalad){
    this.fruitSalad = fruitSalad;
  }

  @Override
  public String remark() {
    return fruitSalad.remark();
  }

  @Override
  public int price() {
    return fruitSalad.price();
  }
}
```

创建具体的水果沙拉类 `FruitSalad`：

```java
public class FruitSalad extends AbstractFruitSalad{
  @Override
  public String remark() {
    return "水果🥗（标准）\n";
  }
  @Override
  public int price() {
    return 9;
  }
}
public class FruitSalad extends AbstractFruitSalad{
  @Override
  public String remark() {
    return "水果🥗（标准）\n";
  }
}
```
该沙拉是标准的水果沙拉，价格是 9 元。

如果我们的水果沙拉还允许客户添加猕猴桃和西瓜，那么我们可以添加两个新的装饰器。添加猕猴桃装饰器 `KiwiDecorator`：

```java
public class KiwiDecorator extends AbstractDecorator {

    public KiwiDecorator(AbstractFruitSalad fruitSalad) {
        super(fruitSalad);
    }
    
    @Override
    public String remark() {
        return super.remark() + "加份🥝切\n";
    }
    
    @Override
    public int price() {
        return super.price() + 2;
    }
}
```

可以看到，加一份猕猴桃需要在原有基础上加 2 元。

接着继续创建西瓜装饰器 `WaterMelonDecorator`：

```java
public class WaterMelonDecorator extends AbstractDecorator {

    public WaterMelonDecorator(AbstractFruitSalad fruitSalad) {
        super(fruitSalad);
    }
    
    @Override
    public String remark() {
        return super.remark() + "加份🍉切\n";
    }
    
    @Override
    public int price() {
        return super.price() + 3;
    }
}
```

最后创建客户端 Application 测试一下：

```java
public class Application {

    public static void main(String[] args) {
        // 点了份水果沙拉，并加了两份🥝和一份🍉，看看最终价格是多少？
        AbstractFruitSalad fruitSalad = new FruitSalad();
        fruitSalad = new KiwiDecorator(fruitSalad);
        fruitSalad = new KiwiDecorator(fruitSalad);
        fruitSalad = new WaterMelonDecorator(fruitSalad);
    
        System.out.println(fruitSalad.remark() + "价格是：" + fruitSalad.price());
    }
}
```

上面的写法也可以改为：

```java
public class Application {

    public static void main(String[] args) {
        // 点了份水果沙拉，并加了两份🥝和一份🍉，看看最终价格是多少？
        AbstractFruitSalad fruitSalad = new FruitSalad();
        fruitSalad = new WaterMelonDecorator(new KiwiDecorator(new KiwiDecorator(fruitSalad)));
    
        System.out.println(fruitSalad.remark() + "价格是：" + fruitSalad.price());
    }
}
```
