---
title: 关于| 设计模式
date: 2023-5-11
categories: 
  - 编程知识
tags: 
  - 设计模式
---

:::tip 前言



:::

## 简介

## 简单工厂模式

简单工厂模式（Simple Factory）由一个工厂对象决定创建出哪一种类型实例。客户端只需传入工厂类的参数，无心关心创建过程。



**优点**

- 具体产品从客户端代码中抽离出来，解耦。
- 构造容易，逻辑简单。

**缺点**

- 工厂类职责过重，违背单一职责原则
- 增加新的类型时，得修改工程类得代码，违背开闭原则。
- 工厂类中集合了所有的类的实例创建逻辑，违反了高内聚的责任分配原则

**适用场景**



**UML 图**

### 实现

```Java
// 新建 Fruit 水果抽象类，包含 eat 抽象方法
public abstract class Fruit {
    public abstract void eat();
}

// 其实现类 Apple
public class Apple extends Fruit{
    @Override
    public void eat() {
        System.out.println("吃苹果");
    }
}
// 其实现类 Banana
public class Banana extends Fruit{
    @Override
    public void eat() {
        System.out.println("吃香蕉");
    }
}

// 新建创建 Fruit 的工厂类：
public class FruitFactory {
   public static Fruit getFruit(String arg) {
    Fruit fruit  = null;
    if (arg.equalsIgnoreCase("Apple")) {
      fruit = new Apple();
      // 初始化设置 product
    } else if (arg.equalsIgnoreCase("Banana")) {
      fruit = new Banana();
      // 初始化设置 product
    return fruit;
  }
}

// 测试类 
public class Application {
    public static void main(String[] args) {
        FruitFactory factory = new FruitFactory();
        Fruit fruit = factory.getFruit("apple");
        fruit.eat();
    }
}
```



## 工厂模式

工厂方法模式（Factory method pattern）定义创建对象的接口，让实现这个接口的类来决定实例化哪个类，工厂方法让类的实例化推迟到了子类进行。



**优点**

- 具体产品从客户端代码中抽离出来，解耦。

- 加入新的类型时，只需添加新的工厂方法（无需修改旧的工厂方法代码），符合开闭原则。

**缺点**

- 类的个数容易过多，增加复杂度。



**适用场景**



**UML 图**

### 实现

```Java
public abstract class Fruit {

    public abstract void eat();
}

// 新建 FruitFactory 抽象工厂，定义 produceFruit 抽象方法
public abstract class FruitFactory {

    public abstract Fruit produceFruit();
}
//新建 Fruit 的实现类，Apple
public class Apple extends Fruit {
    @Override
    public void eat() {
        System.out.println("吃🍎");
    }
}

//新建 FruitFactory 的实现类 AppleFruitFactory，用于生产具体类型的水果 —— 苹果
public class AppleFruitFactory extends FruitFactory{
    @Override
    public Fruit produceFruit() {
        return new Apple();
    }
}

//新建客户端 Application 测试一波
public class Application {

    public static void main(String[] args) {
        FruitFactory factory = new AppleFruitFactory();
        Fruit fruit = factory.produceFruit();
        fruit.eat();
    }
}
```



## 抽象工厂模式

抽象工厂模式（Abstract factory pattern）提供了**一系列**相关或者相互依赖的对象的接口，关键字是“一系列”。

**优点**

- 具体产品从客户端代码中抽离出来，解耦。

- 将一个系列的产品族统一到一起创建。

**缺点**

- 拓展新的功能困难，需要修改抽象工厂的接口
- 只适合那些功能相对固定的产品族的创建。

**适用场景**



**UML 图**

### 实现

```Java
//举例：新建水果抽象类 Fruit，包含 buy 抽象方法：

public abstract class Fruit {

    public abstract void buy();
}
//新建价格抽象类 Price，包含 pay 抽象方法：

public abstract class Price {

    public abstract void pay();
}
//新建水果创建工厂接口 FruitFactory，包含获取水果和价格抽象方法（产品族的体现是，一组产品包含水果和对应的价格）：

public interface FruitFactory {

    Fruit getFruit();
    Price getPrice();
}
//接下来开始创建🍎这个“产品族”。新建 Fruit 实现类 AppleFruit：

public class AppleFruit extends Fruit{
    @Override
    public void buy() {
        System.out.println("购买🍎");
    }
}
//新建对应的苹果价格实现 ApplePrice：

public class ApplePrice extends Price{
    @Override
    public void pay() {
        System.out.println("🍎单价 2 元");
    }
}
//创建客户端 Application，测试一波：

public class Application {
    public static void main(String[] args) {
        FruitFactory factory = new AppleFruitFactory();
        factory.getFruit().buy();
        factory.getPrice().pay();
    }
}
```



1. 工厂模式概述

   > **一、一句话概括工厂模式**
   >
   > - **简单工厂**：一个工厂类，一个产品抽象类。
   > - **工厂方法**：多个工厂类，一个产品抽象类。
   > - **抽象工厂**：多个工厂类，多个产品抽象类。
   >
   > **二、生活中的工厂模式**
   >
   > - 简单工厂类：一个麦当劳店，可以生产多种汉堡。
   > - 工厂方法类：一个麦当劳店，可以生产多种汉堡。一个肯德基店，也可以生产多种汉堡。
   > - 抽象工厂类：百胜餐饮集团下有肯德基和百事公司，肯德基生产汉堡，百事公司生成百事可乐。
