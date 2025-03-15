```
title: 关于| 初等基本函数
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
假如项目里原有一条水果的产品线，比如包含一个树莓类 Raspberry：

public class Raspberry {

    public void addRaspberry() {
        System.out.println("添加点树莓");
    }
}
随着项目的拓展，现在新增了水果派产品线，新建 Pie 接口：

public interface Pie {

    void make();
}
要将 Raspberry 加入到 Pie 产品线，又不想修改 Raspberry 类的代码，则可以创建一个适配器 RaspberryPieAdaptor：

public class RaspberryPieAdaptor extends Raspberry implements Pie{
    @Override
    public void make() {
        System.out.println("制作一个派🥧");
        super.addRaspberry();
    }
}
适配器继承被适配的类，实现新的产品线接口。

在 Application 里测试一波：

public class Application {
    public static void main(String[] args) {
        Pie pie = new RaspberryPieAdaptor();
        pie.make();
    }
}
```



#### 对象适配器



```Java
假如项目里原有一条水果的产品线，比如包含一个树莓类 Raspberry：

public class Raspberry {

    public void addRaspberry() {
        System.out.println("添加点树莓");
    }
}
随着项目的拓展，现在新增了水果派产品线，新建 Pie 接口：

public interface Pie {

    void make();
}
要将 Raspberry 加入到 Pie 产品线，又不想修改 Raspberry 类的代码，则可以创建一个适配器 RaspberryPieAdaptor：

对象适配器模式只需要将 RaspberryPieAdaptor 修改为：

public class RaspberryPieAdaptor implements Pie{

    private Raspberry raspberry = new Raspberry();

    @Override
    public void make() {
        System.out.println("制作一个派🥧");
        raspberry.addRaspberry();
    }
}
适配器继承被适配的类，实现新的产品线接口。

在 Application 里测试一波：

public class Application {
    public static void main(String[] args) {
        Pie pie = new RaspberryPieAdaptor();
        pie.make();
    }
}
```



## 命令模式

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

```





## 观察者模式

观察者模式定义了对象之间的一对多依赖，让多个观察者同时监听某个主题对象，当主体对象发生变化时，它的所有观察者都会收到响应的通知。

**优点**

- 观察者和被观察者之间建立一个抽象的耦合；
- 观察者模式支持广播通信。

**缺点**

- 观察者之间有过多的细节依赖，提高时间消耗及程序复杂度；
- 应避免循环调用。

**适用场景**



**UML 图**

### 实现

```Java
JDK 对观察者模式提供了支持。下面举个观察者模式的例子。

创建一个博客类：

/**
 * 继承 Observable 类，Blog 为被观察对象
 */
public class Blog extends Observable {

    private String title;

    public Blog(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void comment(Comment comment) {

        System.out.println(comment.getNickname() + "评论了 <" + this.title + "> ，" +
                "评论内容：" + comment.getValue());
        // 设置标识位 changed = true，表示被观察者发生了改变
        setChanged();
        // 通知观察者，可以给观察者传递数据
        notifyObservers(comment);
    }

}
Comment 类代码：

public class Comment {
    /**
     * 评论者昵称
     */
    private String nickname;
    /**
     * 评论内容
     */
    private String value;

    public Comment(String nickname, String value) {
        this.nickname = nickname;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public String getNickname() {
        return nickname;
    }
}
Blog 类是被观察者对象，被观察者对象需要继承 JDK 的 Observable 类，继承后，被观察者对象包含如下属性和方法：

QQ20200511-093515@2x

这些方法都是线程安全方法（加了 synchronized 同步锁）。

Blog 的 comment 方法中，当博客收到评论时，首先调用父类的 setChanged() 方法，设置标识位 changed = true，表示被观察者发生了改变；然后调用父类的 notifyObservers(Object) 方法通知所有观察者。

被观察者对象创建好后，我们接着创建观察者。新建一个 Author 类：

public class Author implements Observer {

    private String name;

    public Author(String name) {
        this.name = name;
    }

    /**
     * 观察者被通知后，就会调用这个方法
     *
     * @param o   被观察者对象
     * @param arg 被观察者传递过来的数据
     */
    @Override
    public void update(Observable o, Object arg) {
        Blog blog = (Blog) o;
        Comment comment = (Comment) arg;
        System.out.println("系统感知到" + this.name + "撰写的博文 <" +
                blog.getTitle() + "> 收到了" + comment.getNickname() +
                "的评论，评论内容为：" + comment.getValue());
    }
}
观察者对象需要实现 JDK 的 Observer 类，重写 update 方法。当被观察者对象调用了 notifyObservers 方法后，相应的观察者的 update 方法会被调用。

新建一个客户端测试一下：

public class Application {

    public static void main(String[] args) {
        Blog blog = new Blog("Java 从入门到放弃");
        Author author = new Author("MrBird");

        // 添加观察者
        blog.addObserver(author);

        Comment comment = new Comment("Scott",
                "感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。");
        blog.comment(comment);
    }
}
程序输出如下：

Scott 评论了 <Java 从入门到放弃> ，评论内容：感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。
系统感知到 MrBird 撰写的博文 <Java 从入门到放弃> 收到了 Scott 的评论，评论内容为：感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。
值得注意的是，观察者的 update 方法里的逻辑最好进行异步化，这样在并发环境下可以提升程序性能。
```

