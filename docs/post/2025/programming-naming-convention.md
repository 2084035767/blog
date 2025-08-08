---
title: 关于| 编程命名规范
date: 2025-2-10
categories:
  - 编程知识
order: 2
---

# 编程命名规范

::: tip 前言

写代码的时候，最讨厌的事情就是给变量命名了，abcd 不行吗🤔

:::

## 简介

在编程中，命名规范是代码风格的重要组成部分。合理的命名可以显著提升代码的可读性和可维护性。不同的编程语言和场景通常会采用不同的命名规范。

## 驼峰命名法（Camel Case）

### 小驼峰命名法（lower camel case）

> 太常见了，想必 Javaer 都资道

- **定义**：单词之间没有空格，第一个单词以小写字母开头，后续单词以大写字母开头。

- **示例**：

  - `camelCase`
  - `myVariableName`
  - `getUsers`
  - `myUrl`

- **适用场景**：

  - 广泛用于 JavaScript、Java、C++、C# 等语言中的变量名和函数名。

  - 例如，在 JavaScript 中：

    ```javascript
    function getUserData() {
      let userName = "John";
      return userName;
    }
    ```

### 大驼峰命名法（Upper Camel Case 或 Pascal Case）

> 又叫帕斯卡命名法， Javaer 也资道

- **定义**：单词之间没有空格，每个单词都以大写字母开头。

- **示例**：

  - `PascalCase`
  - `MyVariableName`
  - `GetUsers`
  - `MyUrl`

- **适用场景**：

  - 常用于类名、接口名和构造函数名。

  - 例如，在 Java 中：

    ```java
    public class GetUsers {
      public void fetchData() {
        // Implementation
      }
    }
    ```

## 烤串命名法（Kebab Case）

> 前端用的多🤨
> 比如：vue的组件就有帕斯卡和烤串互换

- **定义**：单词全部小写，用连字符（-）连接。

- **示例**：

  - `kebab-case`
  - `my-variable-name`
  - `my-url`

- **适用场景**：

  - 推荐用于 HTML 和 CSS 中的类名和 ID。

  - 也适用于 URL、图片文件名和其他网络资源的命名。

  - 例如，在 HTML 和 CSS 中：
  
    ```html
    <div class="my-variable-name"></div>
    ```
    
    ```css
    .my-variable-name {
      color: red;
    }
    ```

## 蛇形命名法（Snake Case）

### 小蛇形命名法（small snake case）

- **定义**：单词全部小写，用下划线（_）连接。

- **示例**：

  - `snake_case`
  - `my_variable_name`
  - `my_url`

- **适用场景**：

  - 广泛用于 Python、Ruby 和 PHP 等语言中的变量名和函数名。

  - 例如，在 Python 中：

    ```python
    def get_user_data():
      user_name = "John"
      return user_name
    ```

### 大蛇形命名法（BIG_SNAKE_CASE）

- **定义**：单词全部大写，用下划线（_）连接。

- **示例**：

  - `BIG_SNAKE_CASE`
  - `MY_CONSTANT_NAME`

- **适用场景**：

  - 常用于定义常量。

  - 例如，在 Python 中：

    ```python
    MAX_USERS = 100
    ```

## 匈牙利命名法（Hungarian Notation）

> 很少见，好像早期微软公司喜欢用🤔？

- **定义**：通过前缀标识变量类型或用途，采用驼峰式组合命名（前缀小写，后续单词首字母大写）。

- **示例**：
  - `nCounter`（`n` 表示整数类型）
  - `strFirstName`（`str` 表示字符串类型）
  - `bIsValid`（`b` 表示布尔类型）

- **适用场景**：
  - 主要用于静态类型语言（如 C/C++），通过前缀快速识别变量类型或语义。
  - 在早期的 Windows API 和 MFC 框架中广泛使用。
  - 例如，在 C 语言中：
    ```c
    int iMaxUsers = 100;    // i 表示整数
    char* pszUserName;      // psz 表示指针指向以零结尾的字符串
    BOOL bIsReady;          // b 表示布尔值
    ```

## 写在最后

良好的命名可以代替注释，前提英语得学好🙄

> 别管，`abcd` 我能看懂就行🤪



## 参考三三

- https://en.wikipedia.org/wiki/Naming_convention_(programming)
- https://zhuanlan.zhihu.com/p/89909623
- https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/naming.html

