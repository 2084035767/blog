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
新增商铺类 Shop，包含名称，地点和类型属性：

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
接着创建 Shop 抽象生成器 ShopBuilder：

public abstract class ShopBuilder {

    private String name;
    private String location;
    private String type;

    public abstract void name(String name);
    public abstract void location(String location);
    public abstract void type(String type);

    public abstract Shop build();
}
包含和 Shop 相同的属性及对应的抽象构建方法。

继续创建 ShopBuilder 的实现，水果店构造器 FruitShopBuilder：

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
创建个经销商类 Dealer，用于通过 ShopBuilder 构建具体的商店：

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
创建个客户端 Application 测试一波：

public class Application {

    public static void main(String[] args) {
        ShopBuilder builder = new FruitShopBuilder();
        Dealer dealer = new Dealer();
        dealer.setBuilder(builder);

        Shop shop = dealer.build("XX 水果店", "福州市 XX 区 XX 街 XX 号", "水果经营");
        System.out.println(shop);
    }
}
输出如下：

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
在客户端构建 Shop 只需：
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



## 装饰器模式

在不改变原有对象的基础之上，将功能附加到对象上，提供了比继承更有弹性的替代方案。


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

````
定义一个抽象的水果沙拉类 AbstractFruitSalad：
public abstract class AbstractFruitSalad {
    public abstract String remark();
    public abstract int price();
}
包含备注和价格抽象方法。

接着创建一个抽象的装饰器 AbstractDecorator（关键点，继承抽象水果沙拉类）：
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
创建具体的水果沙拉类 FruitSalad：
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
该沙拉是标准的水果沙拉，价格是 9 元。

如果我们的水果沙拉还允许客户添加猕猴桃和西瓜，那么我们可以添加两个新的装饰器。添加猕猴桃装饰器 KiwiDecorator：

```
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

接着继续创建西瓜装饰器 WaterMelonDecorator：

```
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

```
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

```
public class Application {

    public static void main(String[] args) {
        // 点了份水果沙拉，并加了两份🥝和一份🍉，看看最终价格是多少？
        AbstractFruitSalad fruitSalad = new FruitSalad();
        fruitSalad = new WaterMelonDecorator(new KiwiDecorator(new KiwiDecorator(fruitSalad)));

        System.out.println(fruitSalad.remark() + "价格是：" + fruitSalad.price());
    }
}
```


````



## 适配器模式

将一个类的接口转换为期望的另一个接口，使原本不兼容的类可以一起工作。

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









## 组合模式

将对象组合成树形结构以表示“部分-整体”的层次结构，使客户端对单个对象和组合对象保持一致的方式处理。

**优点**

- 层次清晰；
- 客户端不必关系层次差异，方便控制；
- 符合开闭原则。

**缺点**

- 工厂类职责过重，违背单一职责原则
- 增加新的类型时，得修改工程类得代码，违背开闭原则。
- 工厂类中集合了所有的类的实例创建逻辑，违反了高内聚的责任分配原则

**适用场景**

- 树形处理较为复杂。



**UML 图**

### 实现

```Java
新建菜单按钮的组合抽象类 AbstractMenuButton：

public abstract class AbstractMenuButton {

    public void add(AbstractMenuButton abstractMenuButton) {
        throw new UnsupportedOperationException("不支持创建操作");
    }

    public String getName() {
        throw new UnsupportedOperationException("不支持名称获取");
    }

    public String getType() {
        throw new UnsupportedOperationException("不支持类型获取");
    }

    public String getIcon() {
        throw new UnsupportedOperationException("不支持图标");
    }

    public void print() {
        throw new UnsupportedOperationException("不支持打印操作");
    }
}
组合了菜单按钮操作的基本方法。

新增按钮类 Button：

public class Button extends AbstractMenuButton {

    private String name;

    public Button(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getType() {
        return "按钮";
    }

    @Override
    public void print() {
        System.out.println(getName() + "【" + getType() + "】");
    }
}
按钮拥有名称属性，并且支持名称获取，类型获取和打印方法，所以重写了这三个父类方法。

接着新建菜单类 Menu：

public class Menu extends AbstractMenuButton {

    private List<AbstractMenuButton> items = new ArrayList<>();
    private String name;
    private String icon;
    private Integer level;

    public Menu(String name, String icon, Integer level) {
        this.name = name;
        this.icon = icon;
        this.level = level;
    }

    @Override
    public void add(AbstractMenuButton abstractMenuButton) {
        items.add(abstractMenuButton);
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public String getType() {
        return "菜单";
    }

    @Override
    public String getIcon() {
        return this.icon;
    }

    @Override
    public void print() {
        System.out.println(getIcon() + getName() + "【" + getType() + "】");
        for (AbstractMenuButton item : items) {
            if (this.level != null) {
                for (int i = 0; i < this.level; i++) {
                    System.out.print("    ");
                }
            }
            item.print();
        }
    }
}
菜单包含名称、图标和层级属性，并且菜单可以包含下级（比如下级菜单，下级按钮），所以它包含一个 List 类型的属性 items。

此外，菜单包含添加下级、名称获取、类型获取、图标获取和打印方法。

新建一个客户端，测试菜单按钮的层级结构：

public class Application {

    public static void main(String[] args) {
        Menu userMenu = new Menu("用户管理", "🧑", 2);
        Button createUser = new Button("新增用户");
        Button updateUser = new Button("修改用户");
        Button deleteUser = new Button("删除用户");
        userMenu.add(createUser);
        userMenu.add(updateUser);
        userMenu.add(deleteUser);

        Menu logMenu = new Menu("操作日志", "📃", 2);
        Button export = new Button("导出 Excel");
        logMenu.add(export);

        Menu systemMenu = new Menu("系统管理", "🔨", 1);
        systemMenu.add(userMenu);
        systemMenu.add(logMenu);

        systemMenu.print();
    }
}
打印输出如下所示：
```



## 外观模式

外观模式又叫门面模式，提供了统一得接口，用来访问子系统中的一群接口。

**优点**

- 简化了调用过程，无需了解深入子系统；
- 减低耦合度；
- 更好的层次划分；
- 符合迪米特法则。

**缺点**

- 增加子系统，拓展子系统行为容易引入风险；
- 不符合开闭原则。

**适用场景**

- 子系统越来越复杂，增加外观模式提供简单接口调用；

- 构建多层系统结构，利用外观对象作为每层的入口，简化层间调用。

**UML 图**

### 实现

```Java
创建一个外卖实体类 Takeaway：

public class Takeaway {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
订外卖过程一般分为三个步骤：下单、支付和配送，所以我们创建三个 Service 对应这三个过程。新建下单服务 OrderService：

public class OrderService {

    public boolean placeAnOrder(Takeaway takeaway) {
        System.out.println(takeaway.getName() + "下单成功");
        return true;
    }
}
新建支付服务 PayService：

public class PayService {

    public boolean pay(Takeaway takeaway) {
        System.out.println("商品" + takeaway.getName() + "支付成功");
        return true;
    }
}
新建配送服务 DeliveryService：

public class DeliveryService {

    public void delivery(Takeaway takeaway) {
        System.out.println(takeaway.getName() + "已由骑手 XX 接单，订单派送中");
    }
}
基于外观模式法则，我们需要创建一个 Service 来聚合这三个服务，客户端只需要和这个 Service 交互即可。新建外卖服务 TakeawayService：

public class TakeawayService {

    private OrderService orderService = new OrderService();
    private PayService payService = new PayService();
    private DeliveryService deliveryService = new DeliveryService();

    public void takeOrder(Takeaway takeaway) {
        if (orderService.placeAnOrder(takeaway)) {
            if (payService.pay(takeaway)) {
                deliveryService.delivery(takeaway);
            }
        }
    }
}
新建个客户端测试一波：

public class Application {

    public static void main(String[] args) {
        Takeaway takeaway = new Takeaway();
        takeaway.setName("泡椒🐸");

        TakeawayService takeawayService = new TakeawayService();
        takeawayService.takeOrder(takeaway);
    }
}
可以看到，客户端只需要调用 TakeawayS
```



## 代理模式

为其他对象提供一种代理，以控制对这个对象的访问，代理对象在客户端和目标对象之间起到了中介的作用。

**优点**

- 将代理对象和真实被调用的目标对象分离；
- 降低耦合，拓展性好；
- 保护目标对象，增强目标对象。

**缺点**

- 造成类的数目增加，增加复杂度；
- 客户端和目标对象增加代理对象，会造成处理速度变慢。

**适用场景**

- 保护目标对象；

- 增强目标对象。



**UML 图**

### 实现

静态代理

```Java
新建一个派的制作接口 PieService：

public interface PieServcie {
    void makePie();
}
创建其实现类 PieServiceImpl：

public class PieServiceImpl implements PieServcie{
    public void makePie() {
        System.out.println("制作🥗派");
    }
}
要对 PieServiceImpl 的 makePie 方法增强，我们需要创建一个代理对象 PieServiceProxy：

public class PieServiceProxy {

    private PieServcie pieServcie;

    public void makePie() {
        beforeMethod();
        pieServcie = new PieServiceImpl();
        pieServcie.makePie();
        afterMethod();
    }

    private void beforeMethod() {
        System.out.println("准备材料");
    }

    private void afterMethod() {
        System.out.println("保鲜");
    }

}
在 PieServiceProxy 中我们创建了一个和 PieServcie 一致的同名方法 makePie，方法内部调用了 PieServiceImpl 的 makePie 方法，并且在方法调用前调用了代理类的 beforeMethod 方法，方法调用后调用了代理类的 afterMethod 方法。

创建客户端 Application，测试：

public class Application {

    public static void main(String[] args) {
        PieServiceProxy proxy = new PieServiceProxy();
        proxy.makePie();
    }
}
输出：
```

动态代理

```Java
JDK 的动态代理只能代理接口，通过接口的方法名在动态生成的代理类中调用业务实现类的同名方法。

静态代理的缺点就是每需要代理一个类，就需要手写对应的代理类。这个问题可以用动态代理来解决。举个动态代理的例子：

新建冰淇淋制作接口 IceCreamService：

public interface IceCreamService {
    void makeIceCream(String fruit);
}
实现类 IceCreamServiceImpl：

public class IceCreamServiceImpl implements IceCreamService {

    public void makeIceCream(String fruit) {
        System.out.println("制作" + fruit + "🍦");
    }
}
现在需要对 IceCreamServiceImpl 进行代理增强，如果使用静态代理，我们需要编写一个 IceCreamServiceImplProxy 类，使用动态代理的话，我们可以动态生成对应的代理类。

创建 DynamicProxy：
动态代理类通过实现 InvocationHandler 的 invoke 方法实现，proxy 用于生成代理对象。剩下的步骤和静态代理类似，完善 DynamicProxy：

public class DynamicProxy implements InvocationHandler {

    // 代理的目标对象
    private Object object;

    public DynamicProxy(Object object) {
        this.object = object;
    }

    public Object proxy() {
        Class<?> clazz = object.getClass();
        // 生成代理对象
        return Proxy.newProxyInstance(clazz.getClassLoader(),
                clazz.getInterfaces(), this);
    }

    /**
     * @param proxy  动态生成的代理对象
     * @param method 代理方法
     * @param args   代理方法的方法参数
     * @return 结果
     * @throws Throwable
     */
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        beforeMethod(object);
        // 反射执行代理对象的目标方法
        Object result = method.invoke(object, args);
        afterMethod(object);
        return result;
    }

    private void beforeMethod(Object object) {
        if (object instanceof PieServcie) {
            System.out.println("准备派的材料");
        } else if (object instanceof IceCreamService) {
            System.out.println("准备冰淇淋材料");
        } else {
            throw new RuntimeException("暂不支持代理" + object.getClass() + "类型");
        }
    }

    private void afterMethod(Object object) {
        if (object instanceof PieServcie) {
            System.out.println("保鲜派");
        } else if (object instanceof IceCreamService) {
            System.out.println("保鲜冰淇淋");
        } else {
            throw new RuntimeException("暂不支持代理" + object.getClass() + "类型");
        }
    }

}
创建客户端 Application 测试：

public class Application {

    public static void main(String[] args) {

        PieServcie pieServiceDynamicProxy = (PieServcie) new DynamicProxy(new PieServiceImpl()).proxy();
        pieServiceDynamicProxy.makePie();
        System.out.println("-----------------");
        IceCreamService iceCreamServiceDynamicProxy = (IceCreamService) new DynamicProxy(new IceCreamServiceImpl()).proxy();
        iceCreamServiceDynamicProxy.makeIceCream("🍓");
    }
}
结果：
```



## 责任链模式

职责链模式为请求创建一个接收此次请求对象的链。

**优点**

- 请求的发送者和接受者（请求的处理）解耦；
- 职责链可以动态的组合。

**缺点**

- 职责链太长或者处理时间过长，影响性能；
- 职责链可能过多。

**适用场景**

- 一个请求的处理需要多个对象当中的一个或几个协作处理；

**UML 图**

### 实现

```Java
举个字符串校验的例子。新建一个字符串校验抽象类：

public abstract class StringValidator {

    protected StringValidator validator;

    public void setNextValidator(StringValidator validator) {
        this.validator = validator;
    }

    public abstract void check(String value);
}
StringValidator 类包含了一个自身类型的成员变量，这也是该模式的设计核心，以此形成链条。

创建一个校验字符串长度的类 StringLengthValidator：

public class StringLengthValidator extends StringValidator {
    @Override
    public void check(String value) {
        if (value != null && value.length() != 0) {
            System.out.println("字符串长度合法");
            if (validator != null) {
                validator.check(value);
            }
        } else {
            System.out.println("字符串长度不合法");
        }
    }
}
上面代码中，在字符串长度校验合法后，我们判断父类的 validator 属性是否为空，不为空则调用其 check 方法继续下一步校验。

接着再新建一个校验字符串内容的类 StringValueValidator：

public class StringValueValidator extends StringValidator {
    @Override
    public void check(String value) {
        if (value.contains("fuck")) {
            System.out.println("字符串值不合法");
            if (validator != null) {
                validator.check(value);
            }
        } else {
            System.out.println("字符串值合法");
        }
    }
}
套路和 StringLengthValidator 一样。接着创建一个客户端类，演示下如何让校验类形成一个链条：

public class Application {

    public static void main(String[] args) {
        StringValidator lengthValidator = new StringLengthValidator();
        StringValidator valueValidator = new StringValueValidator();

        lengthValidator.setNextValidator(valueValidator);
        lengthValidator.check("hello");
    }
}
上面代码中，通过 StringValidator 的 setNextValidator 方法，我们可以指定下一个校验类，以此形成链条，程序输出如下：

字符串长度合法
字符串值合法

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



## 迭代器模式

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



## 策略模式

策略模式定义了算法家族，分别封装起来，让它们之间可以互相替换。此模式让算法的变化不会影响到使用算法的用户。策略模式常用于消除大量的 if else 代码。

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

