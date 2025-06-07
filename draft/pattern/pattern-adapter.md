```
title: mo'shi| 适配器模式
date: 2025-1-1
categories: 
  - 知识了解
```

:::tip 前言



:::

## 适配器模式

将一个类的接口转换为期望的另一个接口，使原本不兼容的类可以一起工作。

### 什么是适配器模式

- 适配器模式属于结构型模式，可以使得两个不匹配的接口可以协同工作。
- 适配器模式允许两个不匹配的类通过将其中一个接口类型转换成另一个客户端期望的接口类型，从而达到二者协同工作。
- 适配器模式也叫包装器。
  适配器模式在 Gang of Four 书中原始的定义如下：

>将一个类的接口类型转换成另一个客户端期望的接口类型。
>适配器可以让多个类协同工作即使他们本来是不匹配的接口类型。

### 适配器模式的应用场景

- 考虑一个这样的场景，你在印度购买了一个轻便的笔记本，最近你刚搬到英国。但是英国的电子插座和印度的不一样。因此，你的笔记本不能直接工作了。
  你必须去购买一个适配器，可以为你的印度笔记本可以在英国的插座上充电。

- 当你有一个需要与新系统集成的遗留接口时，新系统不能直接接收遗留库的工作方式。由于遗留库不再进行开发了，所以我们需要使用适配器促使两种不同的类型进行工作。

- 你使用 Mac 时，经常需要转接头才能连接到会议室的投影仪，这个转接头，就是适配器，使得原本 Mac 、投影仪互不相容的两个物件可以协同工作。

### 适配器模式的特点

- 客户端通过使用目标接口调用适配器的方法向适配器发起请求。
- 适配器通过适配器接口将请求转换成适配者的一个或多个调用。
- 客户端收到调用结果，并且不感知存在一个适配器在做这个转换工作。

### 何时使用适配器模式

- 如果你想要将已经存在的类和他们的接口类型去匹配你最后需要的接口类型，就可以使用适配器模式。
- 如果你想创建可重用类以帮助在不匹配的两个类之间进行接口式交互。

**优点**

- 提高类的透明性和复用，现有的类复用但不需改变；

- 目标类和适配器类解耦，提高程序拓展性；

- 符合开闭原则。

**缺点**

- 适配器编写过程需要全面考虑，可能会增加系统的复杂性；

- 降低代码可读性。

**适用场景**

- 已存在的类，它的方法和需求不匹配时（方法结果相同或者相似）

**UML 图**





### 实现

#### 类适配器

```Java
// 假如项目里原有一条水果的产品线，比如包含一个树莓类 Raspberry：

public class Raspberry {

    public void addRaspberry() {
        System.out.println("添加点树莓");
    }
}
// 随着项目的拓展，现在新增了水果派产品线，新建 Pie 接口：

public interface Pie {

    void make();
}
// 要将 Raspberry 加入到 Pie 产品线，又不想修改 Raspberry 类的代码，则可以创建一个适配器 RaspberryPieAdaptor：

public class RaspberryPieAdaptor extends Raspberry implements Pie{
    @Override
    public void make() {
        System.out.println("制作一个派🥧");
        super.addRaspberry();
    }
}
// 适配器继承被适配的类，实现新的产品线接口。
// 在 Application 里测试一波：

public class Application {
    public static void main(String[] args) {
        Pie pie = new RaspberryPieAdaptor();
        pie.make();
    }
}
```



#### 对象适配器

```Java
// 假如项目里原有一条水果的产品线，比如包含一个树莓类 Raspberry：

public class Raspberry {

    public void addRaspberry() {
        System.out.println("添加点树莓");
    }
}
// 随着项目的拓展，现在新增了水果派产品线，新建 Pie 接口：

public interface Pie {

    void make();
}
// 要将 Raspberry 加入到 Pie 产品线，又不想修改 Raspberry 类的代码，则可以创建一个适配器 RaspberryPieAdaptor：

// 对象适配器模式只需要将 RaspberryPieAdaptor 修改为：
public class RaspberryPieAdaptor implements Pie{

    private Raspberry raspberry = new Raspberry();

    @Override
    public void make() {
        System.out.println("制作一个派🥧");
        raspberry.addRaspberry();
    }
}
// 适配器继承被适配的类，实现新的产品线接口。
// 在 Application 里测试一波：

public class Application {
    public static void main(String[] args) {
        Pie pie = new RaspberryPieAdaptor();
        pie.make();
    }
}
```
