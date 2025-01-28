```
title: 关于| 初等基本函数
date: 2025-1-1
categories: 
  - 知识了解
```

:::tip 前言



:::

## 责任链模式

职责链模式为请求创建一个接收此次请求对象的链。



## 概念描述

责任链，顾名思义，就是用来处理相关事务责任的一条执行链，执行链上有多个节点，每个节点都有机会（条件匹配）处理请求事务，如果某个节点处理完了就可以根据实际业务需求传递给下一个节点继续处理或者返回处理完毕。


## 适用场景

现实中，请假的OA申请，请假天数如果是半天到1天，可能直接主管批准即可；
如果是1到3天的假期，需要部门经理批准；
如果是3天到30天，则需要总经理审批；
大于30天，正常不会批准。

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
