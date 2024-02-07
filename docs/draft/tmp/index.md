---
title: 胡说| MySql 索引
date: 2022-8-26
categories:
  - 编程知识
tags:
  - MySql
---

:::tip

:::

## MySql 索引简介

1. 全文索引（Full-Text Index）：

   - 全文索引用于在文本字段上进行全文搜索，例如在文章内容或产品描述中搜索关键词。
   - 创建全文索引：在创建表或修改表结构时，可以使用`FULLTEXT`关键字来创建全文索引。例如：
     ```sql
     ALTER TABLE table_name ADD FULLTEXT(column_name);
     ```
   - 使用场景：适用于需要在文本字段上进行全文搜索的场景，例如博客文章的标题和内容搜索。

2. 普通索引（Normal Index）：
   - 普通索引是最基本的索引类型，用于加速等值查询和排序操作。
   - 创建普通索引：在创建表或修改表结构时，可以使用`CREATE INDEX`语句来创建普通索引。例如：
     ```sql
     CREATE INDEX idx_column ON table_name (column_name);
     ```
   - 使用场景：适用于需要加速等值查询和排序操作的字段。

3. 空间索引（Spatial Index）：
   - 空间索引用于优化地理空间数据的查询，例如点、线、面等地理对象的查询。
   - 创建空间索引：在创建表或修改表结构时，可以使用`SPATIAL`关键字来创建空间索引。例如：
     ```sql
     CREATE SPATIAL INDEX idx_column ON table_name (column_name);
     ```
   - 使用场景：适用于需要处理地理空间数据的场景，例如地理位置搜索、地理区域查询等。

4. 唯一索引（Unique Index）：
   - 唯一索引用于确保字段的唯一性，不允许重复值的存在。
   - 创建唯一索引：在创建表或修改表结构时，可以使用`UNIQUE`关键字来创建唯一索引。例如：
     ```sql
     CREATE UNIQUE INDEX idx_column ON table_name (column_name);
     ```
   - 使用场景：适用于需要保证字段唯一性的场景，例如用户名、邮箱等字段。

根据具体的查询需求和数据特点，可以选择适当的索引类型来提升查询性能和数据完整性。请注意，过多或不恰当的索引使用可能会导致性能下降，因此需要根据实际情况进行权衡和优化。