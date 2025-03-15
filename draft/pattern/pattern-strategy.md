```
title: 关于| 初等基本函数
date: 2025-1-1
categories: 
  - 知识了解
```

:::tip 前言



:::

## 策略模式

策略模式定义了算法家族，分别封装起来，让它们之间可以互相替换。此模式让算法的变化不会影响到使用算法的用户。策略模式常用于消除大量的 if else 代码。



策略模式属于行为模式，可以在运行时不修改类本身而通过变更内部算法来处理类的行为变更。这允许对象的可扩展性和松耦合性。
经典定义如下:

>定义一系列封装的算法，可以交换这些算法来执行特定的行为。

### 用例

解压软件例如 WinZip，提供了不同的算法去处理 gip、gzip、tar、jar、7zip格式。
在运行时，客户端选择了要执行的算法类型。
Email 客户端像 outlook 支持很多类型的邮件类型例如 HTML 类型。允许客户端选择 email 格式。

### 策略模式是怎样工作的？ 

策略模式是简单而流行的模式，经常与状态模式一起使用。
以下是创建策略设计模式的步骤：

- 1.为你的策略对象实现一个策略接口，这个接口定义了策略对象的行为。
- 2.实现具体的策略类（实现了 定义了上述步骤的策略接口）
- 3.创建一个上下文类，并且维护策略对象的引用。创建getter、setter方法，允许访问策略对象。







**优点**

- 

**缺点**

- 

**适用场景**

- 系统有很多类，它们的区别仅仅在于行为不同；

- 一个系统需要动态地在几种算法中选择一种；

**UML 图**

### 实现

```Java
举个策略模式的例子（促销活动），定义一个促销策略接口：

public interface PromotionStrategy {

    void promotion();
}
实现类之一（策略之一），满减促销策略：

public class FullReductionPromotionStrategy implements PromotionStrategy {
    public void promotion() {
        System.out.println("满 1000 立减 1");
    }
}
实现类之一（策略之一），打折促销策略：

public class DiscountPromotionStrategy implements PromotionStrategy {
    public void promotion() {
        System.out.println("9.9 折钜惠");
    }
}
创建一个客户端测试：

public class Application {

    public static void main(String[] args) {
        // 模拟客户端传递的促销策略 key
        String promotionKey = "fr";
        PromotionStrategy strategy;
        if ("fr".equals(promotionKey)) {
            strategy = new FullReductionPromotionStrategy();
        } else if ("ds".equals(promotionKey)) {
            strategy = new DiscountPromotionStrategy();
        } else {
            throw new RuntimeException("暂不支持该促销活动");
        }
        strategy.promotion();
    }
}
输出结果：
```



**策略+工厂**

```Java
策略模式常结合工厂模式来消除大量的 if else 代码，我们新建一个促销策略的创建工厂：

public class PromotionStrategyFactory {

    private static final Map<String, PromotionStrategy> PROMOTION_STRATEGY_MAP = new HashMap<>();

    private static final PromotionStrategy NON_PROMOTION = () -> System.out.println("无促销活动");

    static {
        PROMOTION_STRATEGY_MAP.put(PromotionKey.FR, new FullReductionPromotionStrategy());
        PROMOTION_STRATEGY_MAP.put(PromotionKey.DS, new DiscountPromotionStrategy());
    }

    private PromotionStrategyFactory() {
    }

    public static PromotionStrategy getPromotionStrategy(String promotionKey) {
        PromotionStrategy strategy = PROMOTION_STRATEGY_MAP.get(promotionKey);
        return strategy == null ? NON_PROMOTION : strategy;
    }

    private interface PromotionKey {
        String FR = "fr";
        String DS = "ds";
    }
}
上面代码中，我们通过 Map 来装载促销策略，这样可以减少对象的重复创建。如果不希望在 static 块中一次性初始化所有促销策略，我们可以结合享元模式来推迟对象创建过程。

通过这个工厂方法，上面客户端代码可以简写为：

public class Application {

    public static void main(String[] args) {
        // 模拟客户端传递的促销策略 key
        String promotionKey = "fr";
        PromotionStrategy promotionStrategy = PromotionStrategyFactory.getPromotionStrategy(promotionKey);
        promotionStrategy.promotion();
    }
}
```



我的理解：策略模式与工厂模式有些类似，使用工厂模式的话，客户端最终获得的是Product，然后通过Product类执行Product中的方法。而使用策略模式，客户端通过使用Context使用具体的算法行为。

### 何时使用 [#](#何时使用)

当你遇到某些类，仅他们的行为（算法）不同时，将不同的算法分离在不同的类中，在使用的时候根据需要去选择不同的类来使用对应的算法。

### 目的 [#](#目的)

定义一些列算法，独立封装这些算法中的每一个，并且可以自由切换算法。策略模式使算法独立于使用这些算法的用户（client），用户端可以自由切换算法，保证了业务逻辑和界面分离，减少代码耦合性。

### 代码实现 [#](#代码实现)

```C#
/* 以机器人的行为为例 */

// Strategy——抽象行为接口
public interface IBehaviour {
    public int moveCommand();
}

// ConcreteStrategy——具体的行为：agressive behaviour
public class AgressiveBehaviour implements IBehaviour{
    public int moveCommand()
    {
        System.out.println("\tAgressive Behaviour: if find another robot attack it");
        return 1;
    }
}

// ConcreteStrategy——具体的行为：defensive behaviour
public class DefensiveBehaviour implements IBehaviour{
    public int moveCommand()
    {
        System.out.println("\tDefensive Behaviour: if find another robot run from it");
        return -1;
    }
}

// ConcreteStrategy——具体的行为：normal behaviour
public class NormalBehaviour implements IBehaviour{
    public int moveCommand()
    {
        System.out.println("\tNormal Behaviour: if find another robot ignore it");
        return 0;
    }
}

// Context-机器人
public class Robot {
    IBehaviour behaviour; // Strategy的引用
    String name;

    public Robot(String name)
    {
        this.name = name;
    }

    public void setBehaviour(IBehaviour behaviour)
    {
        this.behaviour = behaviour;
    }

    public IBehaviour getBehaviour()
    {
        return behaviour;
    }

    public void move()
    {
        System.out.println(this.name + ": Based on current position" +
                     "the behaviour object decide the next move:");
        int command = behaviour.moveCommand();
        // ... send the command to mechanisms
        System.out.println("\tThe result returned by behaviour object " +
                    "is sent to the movement mechanisms " + 
                    " for the robot '"  + this.name + "'");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

// client
public class Main {

    public static void main(String[] args) {

        Robot r1 = new Robot("Big Robot");
        Robot r2 = new Robot("George v.2.1");
        Robot r3 = new Robot("R2");

        r1.setBehaviour(new AgressiveBehaviour());
        r2.setBehaviour(new DefensiveBehaviour());
        r3.setBehaviour(new NormalBehaviour());

        r1.move();
        r2.move();
        r3.move();

        System.out.println("\r\nNew behaviours: " +
                "\r\n\t'Big Robot' gets really scared" +
                "\r\n\t, 'George v.2.1' becomes really mad because" +
                "it's always attacked by other robots" +
                "\r\n\t and R2 keeps its calm\r\n");

        r1.setBehaviour(new DefensiveBehaviour());
        r2.setBehaviour(new AgressiveBehaviour());

        r1.move();
        r2.move();
        r3.move();
    }
}
```
