三个大问题（缓存雪崩、缓存击穿、缓存穿透）

- 缓存雪崩：大量请求打到缓存，此时缓存全部失效，导致请求到数据库，数据库崩溃

  设置永不过期

  提前预热

  缓存数据随机设置过期时间

- 缓存击穿：大量热点数据全部失效，打到数据库

  设置永不过期时间

  使用互斥锁

- 缓存穿透：访问缓存和数据库都没有的数据，导致其错误

  缓存空对象

  使用布隆过滤器



redis 刷盘

- AOF：每执行一次写命令，就行这条命令追加到日志文件（日志）

  - 写回策略

    同步写回

    每秒写回

    内核写回

- RDB：将某一时刻的数据以二进制的形式存到磁盘（快照）

- 混合持久化：综合AOF和RDB的优点



AOF

- 写回策略
- 重写机制
  - bgrewriteaof【子进程】
  - 重写缓存区



RDB

- 全量快照
- 写时复制



混合持久化

- 前面部分是RDB格式的全量数据
- 后面部分是AOF格式的增量数据
- 在AOF的文件中





Redis集群

主从复制

一主多从，读写分离

哨兵模式

监控主从服务，提供主从节点故障转移

切片集群

数据分布不同服务器，避免单点故障带来的问题





redis 过期删除、内存淘汰过期删除

- - 惰性删除：不主动删除，到访问时查看是否过期，过期的话删除
  - 定期删除：每隔一段时间随机取出一定数量的key，删除过期key



- 内存淘汰
  - LRU：最近最少使用
  -  LFU：最近最不常使用



缓存更新策略

- Cache Aside（旁路缓存）策略【读多写少】
  - 先更新再删除
- Read/Write Through（读穿 / 写穿）策略
  - 
- Write Back（写回）策略
  - 
