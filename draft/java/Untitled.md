## 如何基于Redis统计UV？

### PV与UV统计的核心区别
- **PV（Page View）**：直接累加访问次数，无需去重，统计简单。
- **UV（Unique Visitor）**：需根据用户ID或IP去重，统计复杂度高。

---

### 基于Redis HyperLogLog的UV统计方案

#### 1. **核心优势**
- **内存效率极高**：HyperLogLog通过概率算法，仅用**12KB**内存即可统计**百亿级**数据，误差率约**0.81%**。
- **自动去重**：重复用户ID/IP会被自动过滤。
- **支持合并**：可合并多个HyperLogLog结构，用于跨时间段或跨页面的UV统计。

#### 2. **关键命令**
- **`PFADD key value [value ...]`**  
  添加用户ID/IP到HyperLogLog，自动去重。  
  *示例：记录用户访问页面`article_1001`*  
  ```redis
  PFADD uv:article_1001:20231001 user_123 user_456
  ```

- **`PFCOUNT key`**  
  统计指定HyperLogLog的UV值。  
  *示例：查询`article_1001`在2023-10-01的UV*  
  ```redis
  PFCOUNT uv:article_1001:20231001
  ```

- **`PFMERGE dest_key source_key [source_key ...]`**  
  合并多个HyperLogLog结构，结果存储到`dest_key`。  
  *示例：合并三天数据计算周UV*  
  ```redis
  PFMERGE uv:weekly_summary uv:day1 uv:day2 uv:day3
  ```

#### 3. **数据结构设计**
- **Key命名规范**：`uv:<页面ID>:<日期>`  
  *示例：`uv:home_page:20231001`*
- **动态分片**：若单日UV极大，可按小时分片（如`uv:article_1001:20231001_09`），再用`PFMERGE`汇总。

#### 4. **误差控制**
- **误差来源**：HyperLogLog通过哈希函数的二进制分布估计基数，存在概率误差。
- **优化策略**：  
  - 对精度要求高的场景，可结合**Bloom Filter**二次验证。
  - 关键指标（如付费用户UV）改用精确去重（如Redis Set）。

---

### 对比传统Set方案
| **方案**        | **内存消耗**  | **查询性能** | **适用场景**                |
| --------------- | ------------- | ------------ | --------------------------- |
| **Redis Set**   | O(N) 线性增长 | O(1)         | 访问量较小（UV<百万）       |
| **HyperLogLog** | 固定12KB/Key  | O(1)         | 高并发、海量数据（UV≥千万） |

---

### 典型应用场景
1. **实时大屏统计**：展示全站UV、各页面UV，低延迟更新。
2. **跨周期分析**：通过`PFMERGE`合并周/月UV数据。
3. **广告系统**：统计广告曝光UV，评估投放效果。

---

### 注意事项
- **数据持久化**：HyperLogLog是Redis数据结构，需配合持久化策略（RDB/AOF）防止数据丢失。
- **冷热分离**：历史UV数据可定期导出到OLAP数据库（如ClickHouse），释放Redis内存。

通过HyperLogLog，可在资源有限的情况下实现高精度的海量UV统计，是高并发场景下的首选方案。