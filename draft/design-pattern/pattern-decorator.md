---
title: 设计模式| 装饰器模式
date: 2025-1-1
---

## 装饰器模式

在不改变原有对象的基础之上，将功能附加到对象上，提供了比继承更有弹性的替代方案。



在实际生产中，某个类的行为（它所提供的方法）已经没法满足当前的需要了，但是又需要使用原有的部分功能，因此需要对原有对象进行增强——装饰器设计模式（Decorator Pattern）也叫包装器模式就是为解决此问题而诞生的，它是对原有类的一个包装，属于结构性设计模式。

装饰器模式在不改变现有类方法签名的前提下，对当前的类进行了增强。

>Tips
>
>我们使用继承也可以实现，但是会导致类型结构的膨胀，难以维护。

## 装饰器设计模式的生活场景

我们来看一个现实中的例子，老李头家大儿子去年谈了个朋友，女方要求有车才能领证，所以老李家买了一辆奇瑞eQ1，但是女方嫌车速太慢喜欢开快车的感觉...现在老李家正苦恼中...直到有一天在市里工作的大表哥回来听说该情况后，大表哥说这个好整啊，搞到车行去改装一下，把速度提上去就可以了啊。

于是乎，老李家去车行把车进行了改装，车速上去了，媳妇也领到了，皆大欢喜...

这其实就是一个装饰器的使用案例，原来的eQ1车已经没法满足了，所以进行了速度增强，其他功能并没有改变。


## 装饰器设计模式的特征

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



```java
// 抽象组件（Component）：定义一个接口或抽象类，作为所有具体组件和装饰器的共同超类
interface Coffee {
    void makeCoffee(); // 定义制作咖啡的方法
}

// 具体组件（Concrete Component）：实现抽象组件接口的具体类
class SimpleCoffee implements Coffee {
    @Override
    public void makeCoffee() {
        System.out.println("制作简单的黑咖啡");
    }
}

// 装饰器（Decorator）：继承自抽象组件，并包含一个对抽象组件的引用，用于动态添加职责
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee; // 通过组合的方式关联到具体的咖啡对象

    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    // 覆盖抽象组件的方法，在实现中调用具体组件的方法，并添加额外的功能
    @Override
    public void makeCoffee() {
        coffee.makeCoffee(); // 调用具体咖啡的制作方法
        addCondiments();     // 添加额外的配料
    }

    // 定义添加配料的方法，在子类中实现具体的配料添加逻辑
    protected abstract void addCondiments();
}

// 具体装饰器（Concrete Decorator）：实现装饰器类，添加具体的额外功能
class MilkCoffeeDecorator extends CoffeeDecorator {
    public MilkCoffeeDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    protected void addCondiments() {
        System.out.println("添加牛奶");
    }
}

class SugarCoffeeDecorator extends CoffeeDecorator {
    public SugarCoffeeDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    protected void addCondiments() {
        System.out.println("添加糖");
    }
}

// 客户端代码
public class DecoratorPatternDemo {
    public static void main(String[] args) {
        Coffee simpleCoffee = new SimpleCoffee();
        simpleCoffee.makeCoffee(); // 输出：制作简单的黑咖啡
        System.out.println();

        Coffee milkCoffee = new MilkCoffeeDecorator(simpleCoffee);
        milkCoffee.makeCoffee(); // 输出：制作简单的黑咖啡，添加牛奶
        System.out.println();

        Coffee sugarMilkCoffee = new SugarCoffeeDecorator(milkCoffee);
        sugarMilkCoffee.makeCoffee(); // 输出：制作简单的黑咖啡，添加牛奶，添加糖
    }
}
```



```java
// 抽象组件（Component）：定义一个接口或抽象类，作为所有具体组件和装饰器的共同超类
public abstract class Beverage {
    String description = "Unknown Beverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}

// 具体组件（Concrete Component）：实现抽象组件接口的具体类
class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }

    @Override
    public double cost() {
        return 1.99;
    }
}

class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }

    @Override
    public double cost() {
        return 0.89;
    }
}

// 装饰器（Decorator）：继承自抽象组件，并包含一个对抽象组件的引用，用于动态添加职责
abstract class CondimentDecorator extends Beverage {
    public abstract String getDescription();
}

// 具体装饰器（Concrete Decorator）：实现装饰器类，添加具体的额外功能
class Mocha extends CondimentDecorator {
    Beverage beverage;

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.20;
    }
}

class Milk extends CondimentDecorator {
    Beverage beverage;

    public Milk(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Milk";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.10;
    }
}

class Whip extends CondimentDecorator {
    Beverage beverage;

    public Whip(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Whip";
    }

    @Override
    public double cost() {
        return beverage.cost() + 0.15;
    }
}

// 客户端代码
public class StarbuzzCoffee {
    public static void main(String[] args) {
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() + " $" + beverage.cost());
        System.out.println();

        Beverage beverage2 = new DarkRoast();
        beverage2 = new Mocha(beverage2);
        beverage2 = new Mocha(beverage2);
        beverage2 = new Whip(beverage2);
        System.out.println(beverage2.getDescription() + " $" + beverage2.cost());
        System.out.println();

        Beverage beverage3 = new HouseBlend();
        beverage3 = new Soy(beverage3);
        beverage3 = new Mocha(beverage3);
        beverage3 = new Whip(beverage3);
        System.out.println(beverage3.getDescription() + " $" + beverage3.cost());
    }
}
```

