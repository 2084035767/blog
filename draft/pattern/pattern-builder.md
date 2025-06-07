```
title: 关于| 初等基本函数
date: 2025-1-1
categories: 
  - 知识了解
```

:::tip 前言



:::

## 建造者模式

建造者模式也称为生成器模式（Builder Pattern），将复杂对象的建造过程抽象出来（抽象类别），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。简单来说就是，相同的过程可以创建不同的产品。

### 什么是建造者模式？

建造者模式属于创建型模式的一员，可以控制对象的实例化过程。
建造者模式简化了复杂对象的实例化过程。
建造者模式的经典定义如下：

>将复杂对象的构造和其表示分开，如此一来，相同的构造处理过程可以创建不同的表现。

### 建造者模式的特点

在Java中通过构造器创建对象实例时，我们一般会传递属性参数。会存在不同的参数组合去创建对象，并且其中一些是必须的还有一些是可选的。我们可以通过重载类的构造器来实现不同的参数组合。
建造者模式不适用大量的构造器，而是使用另一个对象，一个建造者builder，它会一步一步的接收每个初始化参数，并返回生成的构造对象。







**优点**

- 封装性好，创建和使用分离

- 拓展性好，建造类之间独立，一定程度上解耦。

**缺点**

- 产生多余的 Builder 对象；

- 产品内部发生变化，建造者需要更改，成本较大。

**适用场景**

- 一个对象有非常复杂的内部结构（很多属性）

- 想将复杂对象的创建和使用分离。

**UML 图**

### 实现

#### 常规写法

```Java
// 新增商铺类 Shop，包含名称，地点和类型属性：

public class Shop {

    private String name;
    private String location;
    private String type;

    @Override
    public String toString() {
        return "Shop{" +
                "name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", type='" + type + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
// 接着创建 Shop 抽象生成器 ShopBuilder：

public abstract class ShopBuilder {

    private String name;
    private String location;
    private String type;

    public abstract void name(String name);
    public abstract void location(String location);
    public abstract void type(String type);

    public abstract Shop build();
}
// 包含和 Shop 相同的属性及对应的抽象构建方法。

// 继续创建 ShopBuilder 的实现，水果店构造器 FruitShopBuilder：

public class FruitShopBuilder extends ShopBuilder{

    private Shop shop = new Shop();

    @Override
    public void name(String name) {
        this.shop.setName(name);
    }

    @Override
    public void location(String location) {
        this.shop.setLocation(location);
    }

    @Override
    public void type(String type) {
        this.shop.setType(type);
    }

    @Override
    public Shop build() {
        return shop;
    }
}
// 创建个经销商类 Dealer，用于通过 ShopBuilder 构建具体的商店：

public class Dealer {

    private ShopBuilder builder;

    public void setBuilder(ShopBuilder builder) {
        this.builder = builder;
    }

    public Shop build(String name, String location, String type) {
        this.builder.name(name);
        this.builder.location(location);
        this.builder.type(type);
        return builder.build();
    }
}
// 创建个客户端 Application 测试一波：

public class Application {

    public static void main(String[] args) {
        ShopBuilder builder = new FruitShopBuilder();
        Dealer dealer = new Dealer();
        dealer.setBuilder(builder);

        Shop shop = dealer.build("XX 水果店", "福州市 XX 区 XX 街 XX 号", "水果经营");
        System.out.println(shop);
    }
}
// 输出如下：

Shop{name='XX 水果店 ', location=' 福州市 XX 区 XX 街 XX 号 ', type=' 水果经营 '}
```



#### 简约写法

> 这种用法和 「Lombok」 的`@Builder`注解效果是一样的。

```Java
public class Shop {

    private String name;
    private String location;
    private String type;

    public Shop(ShopBuilder builder) {
        this.name = builder.name;
        this.location = builder.location;
        this.type = builder.type;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", type='" + type + '\'' +
                '}';
    }

    public static class ShopBuilder {
        private String name;
        private String location;
        private String type;

        public ShopBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ShopBuilder location(String location) {
            this.location = location;
            return this;
        }

        public ShopBuilder type(String type) {
            this.type = type;
            return this;
        }

        public Shop build() {
            return new Shop(this);
        }
    }
}
// 在客户端构建 Shop 只需：
public class Application {

    public static void main(String[] args) {
        Shop shop = new Shop.ShopBuilder()
                .name("XX 水果店")
                .location("福州市 XX 区 XX 街 XX 号")
                .type("水果经营")
                .build();
        System.out.println(shop);
    }
}
```



