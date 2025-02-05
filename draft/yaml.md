---
title: 胡说| yaml语言教程
date: 2022-8-26
categories:
  - 编程知识
tags:
  - Yaml
---

# YAML 语言简明教程

## 什么是 YAML？

YAML（**YAML Ain't a Markup Language**）是一种专注于数据序列化的轻量级语言。尽管其名称最初是“Yet Another Markup Language”，但现在的递归缩写更强调其非标记语言的特性。YAML 以简洁的语法和易读性著称，常用于配置文件（如 Docker Compose、Kubernetes、CI/CD 工具）、数据交换和复杂结构的表达。

## 为什么选择 YAML？

1. **简洁直观**：通过缩进和符号（如 `-`、`:`）即可表达复杂数据结构，无需冗余符号。  
2. **跨语言支持**：几乎所有主流编程语言（Python、Java、JavaScript 等）都有成熟的 YAML 解析库。  
3. **适用场景广泛**：  
   - 配置文件（如 `.gitlab-ci.yml`、`docker-compose.yml`）。  
   - 数据序列化与传输。  
   - 动态生成模板（如 Ansible Playbooks）。

---

## 基础语法与核心规则

1. **大小写敏感**：`key` 和 `Key` 表示不同的键。  
2. **缩进规则**：  
   - 使用空格（**禁止 Tab**）。  
   - 同级元素左对齐，缩进空格数不限。  
3. **注释**：以 `#` 开头。  
4. **键值分隔**：冒号 `:` 后必须加空格，如 `name: John`。

---

## 数据类型详解

### 1. 对象（映射）
表示键值对集合，支持多种写法：  
```yaml
# 单行写法
person: {name: Alice, age: 30}

# 多行缩进
person:
  name: Alice
  age: 30

# 复杂键（使用 ? 标记）
? [key1, key2]
: [value1, value2]
```

### 2. 数组（序列）
以 `-` 开头的行表示数组元素：  
```yaml
# 简单数组
fruits:
  - Apple
  - Banana

# 多维数组（行内写法）
matrix: [[1, 2], [3, 4]]

# 对象数组
users:
  - name: Bob
    role: admin
  - name: Eve
    role: guest
```

### 3. 纯量（标量）
不可再分的基本值类型：  
- **字符串**：默认不加引号，含特殊字符时可用单/双引号包裹。  
- **布尔值**：`true`/`false`（不区分大小写）。  
- **数值**：整数、浮点数（支持科学计数法 `6.852e+5`）。  
- **空值**：用 `null` 或 `~` 表示。  
- **日期与时间**：遵循 ISO 8601 格式，如 `2023-10-05T14:30:00+08:00`。

```yaml
example:
  string: Hello World
  boolean: true
  float: 3.14
  timestamp: 2023-10-05T14:30:00+08:00
  empty: ~
```

### 4. 多行文本处理
- `|` 保留换行符：  
  ```yaml
  message: |
    Line 1
    Line 2
  ```
  输出：`"Line 1\nLine 2\n"`  

- `>` 折叠换行符为空格：  
  ```yaml
  message: >
    Line 1
    Line 2
  ```
  输出：`"Line 1 Line 2\n"`  

---

## 高级特性

### 1. 类型强制转换
使用 `!!` 强制指定类型：  
```yaml
port: !!str 8080  # 将整数转为字符串
enabled: !!str true  # 将布尔值转为字符串
```

### 2. 锚点与别名
通过 `&` 定义锚点，`*` 引用别名，`<<` 合并数据：  
```yaml
defaults: &base-config
  timeout: 30
  retry: 3

production:
  <<: *base-config  # 合并锚点内容
  endpoint: api.example.com

# 等效于：
production:
  timeout: 30
  retry: 3
  endpoint: api.example.com
```

---

## 实际应用示例

### 场景 1：Docker Compose 配置
```yaml
version: "3.8"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    environment:
      - DEBUG=true
  db:
    image: postgres:13
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

### 场景 2：Kubernetes 部署文件
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

---

## YAML vs. JSON

| 特性         | YAML                       | JSON                 |
| ------------ | -------------------------- | -------------------- |
| **可读性**   | 高（依赖缩进与符号）       | 较低（依赖括号逗号） |
| **注释**     | 支持                       | 不支持               |
| **数据类型** | 更丰富（日期、多行文本等） | 基础类型             |
| **适用场景** | 配置文件、复杂结构         | API 数据交换         |

---

## 常见问题与陷阱

1. **缩进错误**：混合 Tab 和空格会导致解析失败。  
2. **冒号遗漏空格**：`key:value` 无效，应为 `key: value`。  
3. **布尔值混淆**：`yes`/`no` 可能被误判为字符串，建议统一用 `true`/`false`。  

---

## 学习资源

- **官方文档**：[yaml.org](https://yaml.org/)  
- **在线解析工具**：[YAML to JSON Converter](https://www.json2yaml.com/)  
- **深入教程**：[阮一峰 YAML 教程](https://www.ruanyifeng.com/blog/2016/07/yaml.html)  

---

掌握 YAML 能极大提升配置管理的效率。无论是开发、运维还是数据工程，它都是值得投入学习的实用工具。