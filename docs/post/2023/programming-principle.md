---
title: 关于| 编程设计原则
date: 2023-8-16
categories: 
  - 知识科普
tags: 
  - 设计模式
order: 8
---

# 编程设计原则

:::tip 前言

不了解？那就尽量了解了解呗🧐

:::

## 设计原则

设计原则是在软件设计和开发中用于指导和约束设计决策的基本原则和准则。这些原则旨在提高代码的可维护性、可扩展性和复用性，以及降低代码的耦合度和复杂性。



**最常见的7种面向对象设计原则**

| 设计原则名称                                         | 含义                                             | 使用频率 |
| ---------------------------------------------------- | ------------------------------------------------ | -------- |
| 单一职责原则(`Single Responsibility Principle, SRP`) | 一个类只负责一个功能领域中的相应职责             | ★★★★☆    |
| 开闭原则(`Open-Closed Principle, OCP`)               | 软件实体应对扩展开放，而对修改关闭               | ★★★★★    |
| 里氏代换原则(`Liskov Substitution Principle, LSP`)   | 所有引用基类对象的地方能够透明地使用其子类的对象 | ★★★★★    |
| 依赖倒转原则(`Dependence Inversion Principle, DIP`)  | 抽象不应该依赖于细节，细节应该依赖于抽象         | ★★★★★    |
| 接口隔离原则(`Interface Segregation Principle, ISP`) | 使用多个专门的接口，而不使用单一的总接口         | ★★☆☆☆    |
| 合成复用原则(`Composite Reuse Principle, CRP`)       | 尽量使用对象组合，而不是继承来达到复用的目的     | ★★★★☆    |
| 迪米特法则(`Law of Demeter, LoD`)                    | 一个软件实体应当尽可能少地与其他实体发生相互作用 | ★★★☆☆    |



## 五大设计原则

这 5 个原则的首字母联合起来就是：**SOLID**(稳定的)，其代表的含义也就是把这 5 个原则结合使用的好处：建立稳定、灵活、健壮的设计。

五大设计原则主要是指：

- 开闭原则
- 单一职责原则
- 里氏替换原则
- 接口隔离原则
- 依赖倒置原则



::: info 扩展

面向对象的基本原则(solid)是五个，但是在经常被提到的除了这五个之外还有 `迪米特法则`和`合成复用原则`等， 所以在常见的文章中有表示写六大或七大原则的

:::

### 开闭原则 <Badge text="设计模式的核心原则"/>

开闭原则（OCP：Open-Closed Principle），一个软件实体(如类、模块和函数)应该对扩展开放，对修改关闭。



**优点**

- 开闭原则提高了复用性，以及可维护性。



### 单一职责原则

单一职责（SRP：Single Responsibility Principle）一个对象应该只包含单一的职责，并且该职责被完整地封装在一个类中。通过缩小职责范围，尽量减少错误的发生。

> 单一职责原则可以看做是低耦合,高内聚在面向对象原则的引申,将职责定义为引起变化的原因,以提高内聚性减少引起变化的原因。



**优点**

- 变更引起的风险减低
- 提高类的可读性和维护性
- 降低类的复杂性，类的职责清晰明确



### 里氏替换原则

里氏替换原则（LSP：Liskov Substitution Principle）：所有引用基类的地方必须能透明地使用其子类的对象



**实现思路**

- 子类可以实现父类的抽象方法
- 子类中可以增加自己特有的方法。
- 当子类的方法重载父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
- 当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。



### 依赖倒置原则

依赖倒置原则（DIP：Dependence Inversion Principle）：高层模块不应直接依赖底层模块，二者应依赖于抽象；抽象不应该依赖实现细节；而实现细节应该依赖于抽象

> 依赖倒置原则的主要思想是要面向接口编程，不要面向具体实现编程。



**优点：**

- 降低类间的耦合性
- 提高系统的稳定性
- 降低并行开发引起的风险
- 提高代码的可读性和可维护性



**使用建议**

- 结合里氏替换原则使用。
- 任何类都不应该从具体类派生。
- 变量的表面类型尽量是接口或抽象类。
- 每个类尽量都有接口或抽象类，或者接口和抽象类两者都具备。
- 尽量不要重写基类的方法。如果基类是一个抽象类，而且这个方法已经实现了，子类尽量不要重写。



### 接口隔离原则

接口隔离原则（ISP：Interface Segregation Principle）一旦一个接口太大，则需要将它分割成一些更细小的接口，使用该接口的客户端仅需知道与之相关的方法即可。 



**实现思路**

- 接口尽量小，但是要有限度。一个接口只服务于一个子模块或业务逻辑。
- 为依赖接口的类定制服务。只提供调用者需要的方法，屏蔽不需要的方法。
- 结合业务，因地制宜。每个项目或产品都有特定的环境因素，环境不同，接口拆分的标准就不同，需要我们有较强的业务 sense
- 提高内聚，减少对外交互。使接口用最少的方法去完成最多的事情。



### 迪米特法则

迪米特法则（LoD：Law of Demeter）系统中的类,尽量不要与其他类互相作用,减少类之间的耦合度。

又叫最少知识原则(Least Knowledge Principle或简写为LKP)几种形式定义:

- 不要和“陌生人”说话。英文定义为: Don't talk to strangers.
- 只与你的直接朋友通信。英文定义为: Talk only to your immediate friends.
- 每一个软件单位对其他的单位都只有最少的知识，而且局限于那些与本单位密切相关的软件单位。

> 迪米特法则的核心观念就是类间解耦，弱耦合，只有弱耦合了以后，类的复用率才可以提升上去。



## 其他

### 合成复用原则

合成复用原则(CARP：Composite/Aggregate ReusePrinciple): 要尽量使用对象组合,而不是继承关系达到软件复用的目的

> 简而言之，要尽量使用合成/聚合，尽量不要使用继承。



**优点**

- 使系统易于维护，提高代码的可读性。



### 简单原则

简单原则（KISS：Keep It Simple and Stupid）保持简单，保持愚蠢。



**实现思路**

- 不要长期进行打补丁式的编码
- 不要炫耀编程技巧
- 不要简单编程
- 不要过早优化
- 要定期做 Code Review
- 要选择合适的编码规范
- 要适时重构
- 要有目标地逐渐优化



### 表达原则

表达原则（Program Intently and Expressively，简称 PIE），起源于敏捷编程，是指编程时应该有清晰的编程意图，并通过代码明确地表达出来。

> 表达原则的核心思想：代码即文档，通过代码清晰地表达我们的真实意图。



**实现思路**

- 优化代码表现形式
- 改进控制流和逻辑



### 契约原则

契约式原则（DbC：Design by Contract）。软件设计时应该为软件组件定义一种精确和可验证的接口规范，这种规范要包括使用的预置条件、后置条件和不变条件，用来扩展普通抽象数据类型的定义。



**契约原则关注重点**

- API 必须要保证输入是接收者期望的输入参数
- API 必须要保证输出结果的正确性
- API 必须要保持处理过程中的一致性。如果一个API被二次修改后，整个集群的服务器都要重新部署，保证服务能力状态的一致。



**实现思路**

- 接口职责分离。设计 API 的时候，应该尽量让每一个 API 只做一个职责的事情，保证API的简单和稳定性。避免相互干扰。
- API 命名。通过命名基本能猜出接口的功能，另外尽量使用小写英文
- 接口具有幂等性。当一个操作执行多次所产生的影响与一次执行的影响相同
- 安全策略。如果API是外部使用，要考虑黑客攻击、接口滥用，比如采用限流策略。
- 版本管理。API发布后不可能一成不变，很可能因为升级导致新、旧版本的兼容性问题，解决办法就是对`API` 进行版本控制和管理。



## 写在最后

> “我要写出只有我看懂的代码”🙃

设计原则在软件开发中具有重要的意义，它们可以帮助开发人员编写高质量、可维护和可扩展的代码。



## 参考

- https://www.cnblogs.com/bytesfly/p/object-oriented-design-principles.html
- https://www.runoob.com/design-pattern/design-pattern-tutorial.html
- http://c.biancheng.net/view/1317.html
