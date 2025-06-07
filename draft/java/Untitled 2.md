### **从MySQL到Redis：排行榜设计的演进之路**

#### **1. 基础方案：MySQL + ORDER BY**
**实现逻辑**：  
- **表结构**：用户积分表（`user_score`）存储用户ID和积分。
  ```sql
  CREATE TABLE user_score (
    user_id INT PRIMARY KEY,
    score INT NOT NULL
  );
  ```
- **查询Top N**：通过`ORDER BY score DESC`排序，`LIMIT`限制结果。
  ```sql
  SELECT user_id, score 
  FROM user_score 
  ORDER BY score DESC 
  LIMIT 10;
  ```

**问题**：  
- **性能瓶颈**：数据量超百万时，全表排序会导致查询缓慢（时间复杂度O(n log n)）。
- **分页问题**：`LIMIT 10000, 10`需扫描10010条记录，深层分页性能骤降。
- **实时更新**：频繁更新积分需锁表，影响并发性能。



#### **2. 优化方案：Redis Sorted Set**
**核心数据结构**：  
- **Sorted Set**：以用户积分作为分数（score），用户ID作为成员（member）。
- **命令示例**：
  ```redis
  ZADD leaderboard 100 user:1001  # 添加用户积分
  ZRANGE leaderboard 0 -1 WITHSCORES  # 获取全部排名
  ZREVRANGE leaderboard 0 9 WITHSCORES  # 获取Top 10
  ```

**优势**：  
- **查询效率**：`ZRANGE`时间复杂度O(log n + m)，百万级数据毫秒响应。
- **实时更新**：`ZADD`支持原子操作，天然适合高并发场景。
- **内存优化**：通过`ZSET`编码（ziplist/skiplist）节省存储空间。

---

#### **3. 高级优化策略**
- **冷热分离**：  
  - 热点数据（如Top 100）单独存储为一个Sorted Set，提升访问速度。
  - 历史数据按月份分片（如`leaderboard:202301`），降低单集合规模。
  
- **分而治之**：  
  - 按用户等级分桶（如`leaderboard:level1`、`leaderboard:level2`）。
  - 合并查询时通过`ZUNIONSTORE`聚合多集合。

- **近实时同步**：  
  - 通过Binlog监听MySQL积分变更，异步更新Redis（如使用Canal）。
  - 保证最终一致性，降低数据库压力。

---

### **MySQL与Redis方案对比**
| **维度**     | **MySQL**              | **Redis**                     |
| ------------ | ---------------------- | ----------------------------- |
| **性能**     | 百万级数据查询秒级延迟 | 千万级数据查询毫秒级响应      |
| **实时性**   | 更新需写磁盘，延迟较高 | 内存操作，实时更新无延迟      |
| **持久化**   | 强一致性，数据不丢失   | 依赖AOF/RDB，存在极小概率丢失 |
| **开发成本** | 需分库分表、索引优化   | 开箱即用，命令简单            |

---

### **典型应用场景**
- **游戏实时榜单**：玩家积分、战力排名实时更新。
- **电商促销活动**：秒杀排行榜、限时销量Top商品。
- **社交平台**：点赞数、阅读量等UGC内容热度排名。

---

### **注意事项**
- **数据一致性**：  
  - 若需强一致性（如金融场景），建议结合MySQL事务 + Redis缓存双写。
- **内存规划**：  
  - 每个Sorted Set成员消耗约70字节，预估100万用户需约70MB内存。
- **降级策略**：  
  - Redis故障时，可降级为MySQL分页查询 + 缓存预热。

---

### **总结**
- **小规模场景**：直接使用MySQL + 索引优化，简单可靠。
- **高并发/大数据量**：优先选择Redis Sorted Set，结合冷热分离和分桶策略。
- **极端复杂场景**：可考虑专用排行榜数据库（如Amazon Redshift、ClickHouse）。

通过合理选择技术方案，可在性能、成本和开发效率间取得平衡。