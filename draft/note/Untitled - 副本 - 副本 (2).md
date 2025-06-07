## 主从复制

MySQL主从复制是一个异步的复制过程，底层是基于MySq1数据库自带的二进制日志功能。就是一台或多台MySQL数据
库（slave，即从库）从另一台MySQL数据库（master，即主库）进行日志的复制然后再解析日志并应用到自身，最
终实现从库的数据和主库的数据保持一致。MySQL主从复制是MySQL数据库自带功能，无需借助第三方工具

MySQL复制过程分成三步：

- master将改变记录到二进制日志（binary log）
- slave将master的binary log拷贝到它的中继日志（relay log)
- slave重做中继日志中的事件，将改变应用到自己的数据库中

### 配置-主库Master

第一步：修改Mysql数据库的配置文件/etc/my.cnf

```ini
[mysqld]
log-bin=mysql-bin #启动二进制
server-id=100 #唯一id
```

第二步：重启Mysql服务
```shell
systemctl restart mysqld
```

第三步：登录Mysql数据库，执行下面SQL

```sql
GRANT REPLICATION SLAVE ON*.*to'xiaoming'@'%'identified by 'Root@123456';
--查看状态 
show master status
```

注：上面SQL的作用是创建一个用户xiaoming，密码为Root@123456，并且给xiaoming用户授予REPLICATIONSLAVE
权限。常用于建立复制时所需要用到的用户权限，也就是slave必须被master授权具有该权限的用户，才能通过该用户复
制。



配置-从库Slave
第一步：修改Mysql数据库的配置文件/etc/my.cnf

```
[mysqld]
server-id=101#[必须]服务器唯一ID
```

配置-从库Slave
第二步：重启Mysql服务

```
systemctl restart mysqld
```

第三步：登录Mysql数据库，执行下面SQL

```sql
change master to
master_host='192.168.138.100',master_user='xiaoming',master_password='Root@123456',master_log_file='mysql-bin.000001',master_1og_pos=439;
--有些需要在主库状态中获取
start slave;
```





## 读写分离

使用Sharding-JDBC实现读写分离步骤：



1. 导入maven坐标

```sql
        <dependency>
            <groupId>org.apache.shardingsphere</groupId>
            <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
            <version>4.0.0-RC1</version>
        </dependency>
```

2. 在配置文件中配置读写分离规则

```yml
spring:
  application:
    name: ccTakeOut
  shardingsphere:
    datasource:
      names:
        master,slave
      # 主库（增删改操作）
      master:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://121.89.200.204:3306/ruiji?characterEncoding=utf-8
        username: root
        password: 333
      # 从数据源（读操作）
      slave:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://121.36.51.170:3306/ruiji?characterEncoding=utf-8
        username: root
        password: 333
    masterslave:
      # 读写分离配置
      load-balance-algorithm-type: round_robin #轮询（如果有多个从库会轮询着读）
      # 最终的数据源名称
      name: dataSource
      # 主库数据源名称
      master-data-source-name: master
      # 从库数据源名称列表，多个逗号分隔
      slave-data-source-names: slave
    props:
      sql:
        show: true #开启SQL显示，默认false
  main:
    allow-bean-definition-overriding: true #允许bean数据源覆盖，允许Bean定义覆盖很重要
```

3. 在配置文件中配置允许bean定义覆盖配置项



## 分库分表
