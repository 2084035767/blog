```
title: 关于| 初等基本函数
date: 2025-1-1
categories: 
  - 知识了解
```

:::tip 前言



:::

## 观察者模式

观察者模式定义了对象之间的一对多依赖，让多个观察者同时监听某个主题对象，当主体对象发生变化时，它的所有观察者都会收到响应的通知。

### 什么是观察者模式

- 观察者模式属于行为模式的一种，定义了对象的通用交流方式。
- 观察者模式定义了一对多的关系，一个对象改变了状态，则其它所有依赖它的对象都会收到通知。
- 观察者模式有时候在网络模型中也叫做发布-订阅模式。
- 原来的对象叫做观察者，观察者们注册的对象叫做主体。当主体状态变更的时候，所有的观察者都会收到通知。


### 观察者模式的特点

- 观察者们注册到主体对象中去。
- 主体维护一个观察者的列表，并且在其状态发生变更的时候会广播通知所有的观察者。
- 当明确不需要被通知的时候，观察者可以注销。

### 观察者模式的使用场景

- 这种模式广泛运用于用户接口框架中。
- 在很多MVC框架模型中经常使用。
- 考虑一个excel文档中的表格的应用场景。一个表格中的图标是根据其数据构建出来的，如果数据有任何变更，表格都会自动重绘。



**优点**

- 观察者和被观察者之间建立一个抽象的耦合；
- 观察者模式支持广播通信。

**缺点**

- 观察者之间有过多的细节依赖，提高时间消耗及程序复杂度；
- 应避免循环调用。

**适用场景**



**UML 图**

### 实现


JDK 对观察者模式提供了支持。下面举个观察者模式的例子。

创建一个博客类：

```java
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
```




Comment 类代码：



```java
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
```
}
Blog 类是被观察者对象，被观察者对象需要继承 JDK 的 Observable 类，继承后，被观察者对象包含如下属性和方法：

QQ20200511-093515@2x

这些方法都是线程安全方法（加了 synchronized 同步锁）。

Blog 的 comment 方法中，当博客收到评论时，首先调用父类的 setChanged() 方法，设置标识位 changed = true，表示被观察者发生了改变；然后调用父类的 notifyObservers(Object) 方法通知所有观察者。

被观察者对象创建好后，我们接着创建观察者。新建一个 Author 类：



```java
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

```
观察者对象需要实现 JDK 的 Observer 类，重写 update 方法。当被观察者对象调用了 notifyObservers 方法后，相应的观察者的 update 方法会被调用。

新建一个客户端测试一下：



```java
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
```
Scott 评论了 <Java 从入门到放弃> ，评论内容：感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。
系统感知到 MrBird 撰写的博文 <Java 从入门到放弃> 收到了 Scott 的评论，评论内容为：感谢楼主的文章，让我及时放弃 Java，回家继承了千万家产。
值得注意的是，观察者的 update 方法里的逻辑最好进行异步化，这样在并发环境下可以提升程序性能。
