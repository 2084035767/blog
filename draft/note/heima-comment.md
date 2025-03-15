---
title: 笔记| 《苍穹外卖》
date: 2025-1-22
categories: 
  - 项目笔记
---

::: tip 前言



:::

### 基于Session实现短信验证码登录

#### 功能概述
基于Session实现短信验证码登录是一种常见的登录方式，适用于需要验证用户身份的场景。通过短信验证码登录，可以增强账户的安全性，同时为用户提供便捷的登录体验。

#### 实现步骤

1. **短信验证码发送**
   - **触发条件**：用户输入手机号后，点击“获取验证码”按钮。
   - **实现逻辑**：
     - 检查用户输入的手机号是否合法。
     - 生成6位随机数字作为验证码。
     - 将验证码通过短信接口发送给用户。
     - 将验证码和手机号存储在Session中，设置过期时间为5分钟。

   ```java
   @PostMapping("/sendVerifyCode")
   public Result sendVerifyCode(@RequestParam String phone) {
       // 检查手机号是否合法
       if (!PhoneUtil.isValidPhone(phone)) {
           return Result.error("手机号格式不正确");
       }
       // 生成6位随机验证码
       String verifyCode = RandomUtil.randomNumbers(6);
       // 将验证码存储到Session中
       HttpSession session = request.getSession();
       session.setAttribute("verifyCode", verifyCode);
       session.setMaxInactiveInterval(5 * 60); // 设置Session过期时间为5分钟
       // 发送验证码到用户手机
       boolean sendResult = SmsUtil.sendSms(phone, verifyCode);
       if (sendResult) {
           return Result.success("验证码发送成功");
       } else {
           return Result.error("验证码发送失败");
       }
   }
   ```

2. **短信验证码验证**
   - **触发条件**：用户输入手机号和验证码后，点击“登录”按钮。
   - **实现逻辑**：
     - 检查用户输入的手机号和验证码是否为空。
     - 从Session中获取存储的验证码，与用户输入的验证码进行比对。
     - 如果验证码匹配，将用户信息存储在Session中，表示用户已登录。
     - 如果验证码不匹配或已过期，返回错误信息。

   ```java
   @PostMapping("/login")
   public Result login(@RequestParam String phone, @RequestParam String verifyCode) {
       // 检查手机号和验证码是否为空
       if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(verifyCode)) {
           return Result.error("手机号或验证码不能为空");
       }
       // 从Session中获取存储的验证码
       HttpSession session = request.getSession();
       String storedVerifyCode = (String) session.getAttribute("verifyCode");
       if (StringUtils.isEmpty(storedVerifyCode)) {
           return Result.error("验证码已过期");
       }
       // 验证码比对
       if (!verifyCode.equals(storedVerifyCode)) {
           return Result.error("验证码错误");
       }
       // 验证码匹配，存储用户信息到Session
       User user = new User();
       user.setPhone(phone);
       session.setAttribute("user", user);
       return Result.success("登录成功");
   }
   ```

3. **配置登录拦截器**
   - **拦截器作用**：确保只有登录用户才能访问特定资源。
   - **实现逻辑**：
     - 创建一个拦截器类，实现`HandlerInterceptor`接口。
     - 在`preHandle`方法中，检查Session中是否存储有用户信息。
     - 如果用户未登录，跳转到登录页面。
     - 如果用户已登录，允许访问资源。

   ```java
   public class LoginInterceptor implements HandlerInterceptor {
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           HttpSession session = request.getSession();
           User user = (User) session.getAttribute("user");
           if (user == null) {
               response.sendRedirect("/login");
               return false;
           }
           return true;
       }
   }
   ```

   - **配置拦截器**：在Spring配置文件中配置拦截器。

   ```java
   @Configuration
   public class WebConfig implements WebMvcConfigurer {
       @Override
       public void addInterceptors(InterceptorRegistry registry) {
           registry.addInterceptor(new LoginInterceptor())
                   .addPathPatterns("/**")
                   .excludePathPatterns("/login", "/sendVerifyCode");
       }
   }
   ```

4. **数据脱敏**
   - **脱敏目的**：保护用户隐私，防止敏感信息泄露。
   - **实现逻辑**：
     - 在返回用户信息时，对手机号等敏感信息进行脱敏处理。
     - 例如，将手机号的中间四位替换为星号。

   ```java
   public class DataDesensitizationUtil {
       public static String desensitizePhone(String phone) {
           if (StringUtils.isEmpty(phone) || phone.length() != 11) {
               return phone;
           }
           return phone.substring(0, 3) + "****" + phone.substring(7);
       }
   }
   ```

**Session 集群共享问题** ：在分布式集群环境下，Web 应用程序的会话默认保存在单个服务器上，导致其他服务器无法访问该会话信息。

**造成的问题** ：服务器间无法共享会话状态，如用户在一个服务器上登录后，其登录信息无法被其他服务器获取，进而无法调用相应服务。

**解决方案** ：

  * **方案一：Session 拷贝（不推荐）**
    * **原理** ：Tomcat 提供的 Session 拷贝功能可通过配置实现拷贝。
    * **缺点** ：增加服务器额外内存开销，且存在数据一致性问题。

  * **方案二：Redis 缓存（推荐）**
    * **优点** ：
      * **高性能和可伸缩性** ：Redis 作为内存数据库，读写速度快，支持集群和分片，可水平扩展，提升处理能力。
      * **可靠性和持久性** ：通过持久化机制，保障数据持久性，防止服务器故障导致会话数据丢失。
      * **丰富的数据结构** ：支持多种数据结构，方便存储和操作复杂会话数据。
      * **分布式缓存功能** ：缓存会话数据，减轻后端服务器负载，提高系统性能和可扩展性。
      * **可用性和可部署性** ：成熟开源，社区支持丰富，可与多种编程语言和框架集成，兼容性强。

    * **缺点** ：成本较高且增加了系统复杂度。



### 基于Redis实现短信验证码登录

#### 功能概述
基于Redis实现短信验证码登录是一种高效的登录方式，特别适用于分布式系统和高并发场景。通过Redis存储短信验证码，可以解决Session共享问题，提高系统的可扩展性和性能。

#### 实现步骤

1. **短信验证码发送**
   - **触发条件**：用户输入手机号后，点击“获取验证码”按钮。
   - **实现逻辑**：
     - 检查用户输入的手机号是否合法。
     - 生成6位随机数字作为验证码。
     - 将验证码通过短信接口发送给用户。
     - 将验证码和手机号存储在Redis中，设置过期时间为5分钟。

   ```java
   @PostMapping("/sendVerifyCode")
   public Result sendVerifyCode(@RequestParam String phone) {
       // 检查手机号是否合法
       if (!PhoneUtil.isValidPhone(phone)) {
           return Result.error("手机号格式不正确");
       }
       // 生成6位随机验证码
       String verifyCode = RandomUtil.randomNumbers(6);
       // 将验证码存储到Redis中
       stringRedisTemplate.opsForValue().set("verifyCode:" + phone, verifyCode, 5, TimeUnit.MINUTES);
       // 发送验证码到用户手机
       boolean sendResult = SmsUtil.sendSms(phone, verifyCode);
       if (sendResult) {
           return Result.success("验证码发送成功");
       } else {
           return Result.error("验证码发送失败");
       }
   }
   ```

2. **短信验证码验证**
   - **触发条件**：用户输入手机号和验证码后，点击“登录”按钮。
   - **实现逻辑**：
     - 检查用户输入的手机号和验证码是否为空。
     - 从Redis中获取存储的验证码，与用户输入的验证码进行比对。
     - 如果验证码匹配，将用户信息存储在Redis中，表示用户已登录。
     - 如果验证码不匹配或已过期，返回错误信息。

   ```java
   @PostMapping("/login")
   public Result login(@RequestParam String phone, @RequestParam String verifyCode) {
       // 检查手机号和验证码是否为空
       if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(verifyCode)) {
           return Result.error("手机号或验证码不能为空");
       }
       // 从Redis中获取存储的验证码
       String storedVerifyCode = stringRedisTemplate.opsForValue().get("verifyCode:" + phone);
       if (StringUtils.isEmpty(storedVerifyCode)) {
           return Result.error("验证码已过期");
       }
       // 验证码比对
       if (!verifyCode.equals(storedVerifyCode)) {
           return Result.error("验证码错误");
       }
       // 验证码匹配，存储用户信息到Redis
       User user = new User();
       user.setPhone(phone);
       stringRedisTemplate.opsForValue().set("user:" + phone, JSON.toJSONString(user), 30, TimeUnit.MINUTES);
       return Result.success("登录成功");
   }
   ```

3. **配置登录拦截器**
   - **拦截器作用**：确保只有登录用户才能访问特定资源。
   - **实现逻辑**：
     - 创建一个拦截器类，实现`HandlerInterceptor`接口。
     - 在`preHandle`方法中，检查Redis中是否存储有用户信息。
     - 如果用户未登录，跳转到登录页面。
     - 如果用户已登录，允许访问资源。

   ```java
   public class LoginInterceptor implements HandlerInterceptor {
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           String phone = request.getParameter("phone");
           String userInfo = stringRedisTemplate.opsForValue().get("user:" + phone);
           if (StringUtils.isEmpty(userInfo)) {
               response.sendRedirect("/login");
               return false;
           }
           return true;
       }
   }
   ```

   - **配置拦截器**：在Spring配置文件中配置拦截器。

   ```java
   @Configuration
   public class WebConfig implements WebMvcConfigurer {
       @Override
       public void addInterceptors(InterceptorRegistry registry) {
           registry.addInterceptor(new LoginInterceptor())
                   .addPathPatterns("/**")
                   .excludePathPatterns("/login", "/sendVerifyCode");
       }
   }
   ```





### 店铺数据查询

#### 功能概述
店铺数据查询是黑马点评项目中的一个重要模块，主要用于查询和展示店铺的相关信息。通过查询店铺数据，用户可以获取到店铺的详细信息，包括店铺名称、地址、评分、评论等。为了提高查询效率，项目中使用了Redis缓存。

1. **数据一致性问题**
   - **问题描述**：缓存与数据库之间的数据一致性问题。
   - **解决方案**：
     - **缓存主动更新策略**：通过监听数据库变化，主动更新缓存。
     - **缓存被动更新策略**：在查询数据时，检查数据版本，如果版本不一致，则更新缓存。

   ```java
   @Listener
   public void onShopUpdated(ShopUpdatedEvent event) {
       // 监听店铺更新事件，主动更新缓存
       Shop shop = event.getShop();
       String shopKey = "shop:" + shop.getId();
       stringRedisTemplate.opsForValue().set(shopKey, JSON.toJSONString(shop), 30, TimeUnit.MINUTES);
   }
   ```

2. **缓存穿透解决方案**
   - **问题描述**：对于不存在的店铺ID，避免频繁查询数据库。
   - **解决方案**：使用布隆过滤器或缓存空值。

   ```java
   @GetMapping("/shop/{id}")
   public Result getShopById(@PathVariable Long id) {
       // 检查布隆过滤器
       if (!bloomFilter.contains(id)) {
           return Result.error("店铺不存在");
       }
       // 从Redis中获取店铺数据
       String shopKey = "shop:" + id;
       String shopJson = stringRedisTemplate.opsForValue().get(shopKey);
       if (StringUtils.isEmpty(shopJson)) {
           // 如果Redis中不存在数据，从数据库中查询
           Shop shop = shopService.getShopById(id);
           if (shop == null) {
               return Result.error("店铺不存在");
           }
           // 将数据缓存到Redis中
           shopJson = JSON.toJSONString(shop);
           stringRedisTemplate.opsForValue().set(shopKey, shopJson, 30, TimeUnit.MINUTES);
       }
       return Result.success(JSON.parseObject(shopJson, Shop.class));
   }
   ```

3. **缓存雪崩解决方案**
   - **问题描述**：大量缓存同时过期，导致数据库压力过大。
   - **解决方案**：设置缓存过期时间和随机过期时间。
   - 缓存雪崩的常见解决方案
     - **给不同的Key的TTL添加随机值**
     - **利用Redis集群提高服务的可用性**
     - **给缓存业务添加降级限流策略**，比如快速失败机制，让请求尽可能打不到数据库上
     - **给业务添加多级缓存**

   ```java
   @GetMapping("/shop/{id}")
   public Result getShopById(@PathVariable Long id) {
       // 从Redis中获取店铺数据
       String shopKey = "shop:" + id;
       String shopJson = stringRedisTemplate.opsForValue().get(shopKey);
       if (StringUtils.isEmpty(shopJson)) {
           // 如果Redis中不存在数据，从数据库中查询
           Shop shop = shopService.getShopById(id);
           if (shop == null) {
               return Result.error("店铺不存在");
           }
           // 设置随机过期时间
           long randomExpireTime = 30 * 60 + new Random().nextInt(10 * 60);
           stringRedisTemplate.opsForValue().set(shopKey, JSON.toJSONString(shop), randomExpireTime, TimeUnit.SECONDS);
       }
       return Result.success(JSON.parseObject(shopJson, Shop.class));
   }
   ```

4. **缓存击穿解决方案**
   - **问题描述**：高并发下，同一时间大量请求访问同一个缓存键。
   - **解决方案**：使用互斥锁或逻辑过期。

   ```java
   @GetMapping("/shop/{id}")
   public Result getShopById(@PathVariable Long id) {
       // 从Redis中获取店铺数据
       String shopKey = "shop:" + id;
       String shopJson = stringRedisTemplate.opsForValue().get(shopKey);
       if (StringUtils.isEmpty(shopJson)) {
           // 使用互斥锁
           String lockKey = "lock:" + id;
           boolean isLock = tryLock(lockKey);
           if (isLock) {
               try {
                   // 如果Redis中不存在数据，从数据库中查询
                   Shop shop = shopService.getShopById(id);
                   if (shop == null) {
                       return Result.error("店铺不存在");
                   }
                   // 将数据缓存到Redis中
                   shopJson = JSON.toJSONString(shop);
                   stringRedisTemplate.opsForValue().set(shopKey, shopJson, 30, TimeUnit.MINUTES);
               } finally {
                   releaseLock(lockKey);
               }
           } else {
               // 如果获取锁失败，返回缓存数据或提示稍后再试
               return Result.error("系统繁忙，请稍后再试");
           }
       }
       return Result.success(JSON.parseObject(shopJson, Shop.class));
   }
   
   private boolean tryLock(String key) {
       return stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 30, TimeUnit.SECONDS);
   }
   
   private void releaseLock(String key) {
       stringRedisTemplate.delete(key);
   }
   ```



### 优惠券秒杀

#### 功能概述
优惠券秒杀是黑马点评项目中的一个核心功能模块，主要用于实现用户在指定时间内以优惠价格购买商品或服务。该模块需要处理高并发请求，确保在高负载下系统的稳定性和数据的一致性。

#### 实现步骤

1. **自增ID存在的问题**
   - **问题描述**：在高并发场景下，自增ID可能导致性能瓶颈。
   - **解决方案**：使用分布式ID生成策略，如雪花算法。

2. **分布式ID的实现**
   - **功能描述**：生成全局唯一的ID。
   - **实现逻辑**：
     - 使用雪花算法生成分布式ID。
     - 雪花算法结合了时间戳、机器ID和序列号，确保生成的ID唯一。

   ```java
   public class SnowflakeIdGenerator {
       private long workerId;
       private long datacenterId;
       private Snowflake snowflake;
   
       public SnowflakeIdGenerator(long workerId, long datacenterId) {
           this.workerId = workerId;
           this.datacenterId = datacenterId;
           this.snowflake = new Snowflake(workerId, datacenterId);
       }
   
       public long generateId() {
           return snowflake.nextId();
       }
   }
   ```

3. **优惠券秒杀接口实现**
   - **功能描述**：实现优惠券的秒杀功能。
   - **实现逻辑**：
     - 用户点击秒杀按钮后，系统生成唯一的订单ID。
     - 使用分布式锁确保秒杀操作的原子性。
     - 更新库存信息，确保库存减少。

   ```java
   @PostMapping("/seckill")
   public Result seckill(@RequestParam Long couponId, @RequestParam Long userId) {
       // 生成分布式ID
       SnowflakeIdGenerator idGenerator = new SnowflakeIdGenerator(1, 1);
       long orderId = idGenerator.generateId();
   
       // 使用分布式锁
       String lockKey = "seckill:lock:" + couponId;
       try {
           boolean isLock = tryLock(lockKey);
           if (isLock) {
               // 检查库存
               Coupon coupon = couponService.getCouponById(couponId);
               if (coupon.getStock() <= 0) {
                   return Result.error("库存不足");
               }
   
               // 减少库存
               coupon.setStock(coupon.getStock() - 1);
               couponService.updateCoupon(coupon);
   
               // 保存订单
               Order order = new Order();
               order.setOrderId(orderId);
               order.setUserId(userId);
               order.setCouponId(couponId);
               order.setStatus(OrderStatus.SUCCESS);
               orderService.saveOrder(order);
   
               return Result.success("秒杀成功");
           } else {
               return Result.error("系统繁忙，请稍后再试");
           }
       } finally {
           releaseLock(lockKey);
       }
   }
   
   private boolean tryLock(String key) {
       return stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 30, TimeUnit.SECONDS);
   }
   
   private void releaseLock(String key) {
       stringRedisTemplate.delete(key);
   }
   ```

4. **单体下一人多单超卖问题**
   - **问题描述**：在单体应用中，用户可能通过多次快速请求实现多单购买，导致超卖。
   - **解决方案**：使用乐观锁。

   ```java
   @PostMapping("/seckill")
   public Result seckill(@RequestParam Long couponId, @RequestParam Long userId) {
       // 生成分布式ID
       SnowflakeIdGenerator idGenerator = new SnowflakeIdGenerator(1, 1);
       long orderId = idGenerator.generateId();
   
       // 检查用户是否已购买
       List<Order> orders = orderService.getOrdersByUserIdAndCouponId(userId, couponId);
       if (!orders.isEmpty()) {
           return Result.error("您已购买过该优惠券");
       }
   
       // 检查库存
       Coupon coupon = couponService.getCouponById(couponId);
       if (coupon.getStock() <= 0) {
           return Result.error("库存不足");
       }
   
       // 使用乐观锁
       int rows = couponService.updateCouponStock(couponId, coupon.getVersion(), coupon.getStock() - 1);
       if (rows > 0) {
           // 保存订单
           Order order = new Order();
           order.setOrderId(orderId);
           order.setUserId(userId);
           order.setCouponId(couponId);
           order.setStatus(OrderStatus.SUCCESS);
           orderService.saveOrder(order);
   
           return Result.success("秒杀成功");
       } else {
           return Result.error("秒杀失败");
       }
   }
   ```

5. **单体下一人一单超卖问题**
   - **问题描述**：在单体应用中，用户可能通过快速请求实现多单购买，导致超卖。
   - **解决方案**：使用悲观锁。

   ```java
   @PostMapping("/seckill")
   public Result seckill(@RequestParam Long couponId, @RequestParam Long userId) {
       // 生成分布式ID
       SnowflakeIdGenerator idGenerator = new SnowflakeIdGenerator(1, 1);
       long orderId = idGenerator.generateId();
   
       // 检查用户是否已购买
       List<Order> orders = orderService.getOrdersByUserIdAndCouponId(userId, couponId);
       if (!orders.isEmpty()) {
           return Result.error("您已购买过该优惠券");
       }
   
       // 使用悲观锁
       Coupon coupon = couponService.lockCoupon(couponId);
       if (coupon.getStock() <= 0) {
           return Result.error("库存不足");
       }
   
       // 减少库存
       coupon.setStock(coupon.getStock() - 1);
       couponService.updateCoupon(coupon);
   
       // 保存订单
       Order order = new Order();
       order.setOrderId(orderId);
       order.setUserId(userId);
       order.setCouponId(couponId);
       order.setStatus(OrderStatus.SUCCESS);
       orderService.saveOrder(order);
   
       return Result.success("秒杀成功");
   }
   ```

6. **分布式锁**
   - **问题描述**：在分布式系统中，多个实例可能同时处理同一个秒杀请求，导致超卖。
   - **解决方案**：使用Redis实现分布式锁。

   ```java
   private boolean tryLock(String key) {
       return stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 30, TimeUnit.SECONDS);
   }
   
   private void releaseLock(String key) {
       stringRedisTemplate.delete(key);
   }
   ```



### 好友关注

##### 功能概述
好友关注模块允许用户关注其他用户，并查看关注的好友动态。通过Redis的Set数据结构，可以高效地存储和查询关注关系。

##### 实现步骤

1. **关注和取关**
   - **功能描述**：用户可以关注或取消关注其他用户。
   - **实现逻辑**：
     - 使用Redis的Set数据结构存储用户关注列表。
     - 关注操作：将被关注用户的ID添加到关注者的Set中。
     - 取关操作：从关注者的Set中移除被关注用户的ID。

   ```java
   @PostMapping("/follow/{userId}")
   public Result followUser(@PathVariable Long userId, @RequestParam Long targetUserId) {
       // 关注用户
       stringRedisTemplate.opsForSet().add("follow:" + userId, targetUserId.toString());
       return Result.success("关注成功");
   }
   
   @PostMapping("/unfollow/{userId}")
   public Result unfollowUser(@PathVariable Long userId, @RequestParam Long targetUserId) {
       // 取消关注用户
       stringRedisTemplate.opsForSet().remove("follow:" + userId, targetUserId.toString());
       return Result.success("取消关注成功");
   }
   ```

2. **Set实现共同关注**
   - **功能描述**：查询两个用户之间的共同关注。
   - **实现逻辑**：
     - 使用Redis的Set交集操作，找出两个用户关注列表的交集。

   ```java
   @GetMapping("/commonFollow/{userId1}/{userId2}")
   public Result getCommonFollow(@PathVariable Long userId1, @PathVariable Long userId2) {
       // 查询共同关注
       Set<String> commonFollow = stringRedisTemplate.opsForSet().intersection("follow:" + userId1, "follow:" + userId2);
       return Result.success(commonFollow);
   }
   ```

3. **Feed流关注推送**
   - **功能描述**：当用户关注或取消关注时，实时更新Feed流。
   - **实现逻辑**：
     - 使用Redis的监听器，监听关注和取关事件，实时更新Feed流。

   ```java
   @Listener
   public void onFollowEvent(FollowEvent event) {
       // 监听关注事件，更新Feed流
       Long userId = event.getUserId();
       Long targetUserId = event.getTargetUserId();
       stringRedisTemplate.opsForSet().add("feed:" + userId, targetUserId.toString());
   }
   
   @Listener
   public void onUnfollowEvent(UnfollowEvent event) {
       // 监听取关事件，更新Feed流
       Long userId = event.getUserId();
       Long targetUserId = event.getTargetUserId();
       stringRedisTemplate.opsForSet().remove("feed:" + userId, targetUserId.toString());
   }
   ```

### 附近商铺搜索

##### 功能概述
附近商铺搜索模块允许用户根据当前位置搜索附近的商铺。通过Redis的GEO数据结构，可以高效地存储和查询地理位置信息。

##### 实现步骤

1. **GEO数据结构**
   - **功能描述**：使用Redis的GEO数据结构存储商铺的地理位置。
   - **实现逻辑**：
     - 将商铺的经纬度信息存储在Redis的GEO集合中。

   ```java
   @PostMapping("/shop/geoposition")
   public Result addShopGeoPosition(@RequestParam Long shopId, @RequestParam Double longitude, @RequestParam Double latitude) {
       // 添加商铺地理位置
       stringRedisTemplate.opsForGeo().add("shop:geo", new Point(longitude, latitude), shopId.toString());
       return Result.success("地理位置添加成功");
   }
   ```

2. **附近商户搜索**
   - **功能描述**：根据用户位置，搜索附近的商铺。
   - **实现逻辑**：
     - 使用Redis的GEOSEARCH命令，查找指定半径内的商铺。

   ```java
   @GetMapping("/shop/nearby")
   public Result getNearbyShops(@RequestParam Double longitude, @RequestParam Double latitude, @RequestParam Double radius) {
       // 搜索附近商铺
       GeoResults<GeoLocation<String>> nearbyShops = stringRedisTemplate.opsForGeo().search(
               "shop:geo",
               new GeoRadiusCommandArgs(new Circle(new Point(longitude, latitude), radius), GeoUnit.KM)
       );
       return Result.success(nearbyShops.getContent());
   }
   ```

### UV统计

##### 功能概述
UV（独立访客）统计模块用于统计网站的独立访客数。通过Redis的HyperLogLog数据结构，可以高效地进行UV统计。

#### HyperLogLog用法

Hyperloglog(HLL)是从Loglog算法派生的概率算法，用于确定非常大的集合的基数，而不需要存储其所有值。

Redis中的`HLL`是基于`string`结构实现的，单个HLL的内存永远小于**16kb**，内存占用低的令人发指！作为代价，其测量结果是概率性的，有小于**0.81％**的误差。不过对于UV统计来说，这完全可以忽略。

- **HyperLogLog常用指令**：
  - `PFADD key element [element...]` ：添加指定元素到 HyperLogLog 中
  - `PFCOUNT key [key ...]`：返回给定 HyperLogLog 的基数估算值
  - `PFMERGE destkey sourcekey [sourcekey ...]`：将多个 HyperLogLog 合并为一个 HyperLogLog
- **HyperLogLog的作用**：做海量数据的统计工作
- **HyperLogLog的优缺点**：
  - **优点**：内存占用极低、性能非常好
  - **缺点**：有一定的误差

##### 实现步骤

1. **HyperLogLog用法**
   - **功能描述**：使用Redis的HyperLogLog数据结构进行UV统计。
   - **实现逻辑**：
     - 使用HyperLogLog存储用户的唯一标识符（如用户ID或会话ID）。

   ```java
   @PostMapping("/uv")
   public Result addUV(@RequestParam String userId) {
       // 添加用户到HyperLogLog
       stringRedisTemplate.opsForHyperLogLog().add("uv:count", userId);
       return Result.success("UV统计成功");
   }
   ```

2. **实现UV统计**
   - **功能描述**：获取当前的UV统计数。
   - **实现逻辑**：
     - 使用HyperLogLog的size方法获取当前的UV数。

   ```java
   @GetMapping("/uv")
   public Result getUV() {
       // 获取UV统计数
       Long uvCount = stringRedisTemplate.opsForHyperLogLog().size("uv:count");
       return Result.success(uvCount);
   }
   ```

### 用户签到和连续签到统计

##### 功能概述
用户签到模块允许用户每天签到，并统计用户的签到次数和连续签到天数。通过Redis的BitMap数据结构，可以高效地记录用户的签到状态。

##### 实现步骤

1. **BitMap基本使用**
   - **功能描述**：使用Redis的BitMap数据结构记录用户的签到状态。
   - **实现逻辑**：
     - 将用户的签到状态存储在BitMap中，每个位表示一天的签到状态。

   ```java
   @PostMapping("/sign-in")
   public Result signIn(@RequestParam Long userId) {
       // 获取当前日期
       LocalDate now = LocalDate.now();
       // 计算当前日期与起始日期的天数差
       long days = ChronoUnit.DAYS.between(LocalDate.of(2023, 1, 1), now);
       // 设置BitMap中的位
       stringRedisTemplate.opsForValue().setBit("sign-in:" + userId, days, true);
       return Result.success("签到成功");
   }
   ```

2. **签到功能**
   - **功能描述**：用户可以每天签到。
   - **实现逻辑**：
     - 调用签到接口，记录用户的签到状态。

   ```java
   @GetMapping("/sign-in")
   public Result getSignInStatus(@RequestParam Long userId) {
       // 获取当前日期
       LocalDate now = LocalDate.now();
       // 计算当前日期与起始日期的天数差
       long days = ChronoUnit.DAYS.between(LocalDate.of(2023, 1, 1), now);
       // 获取BitMap中的位
       Boolean signedIn = stringRedisTemplate.opsForValue().getBit("sign-in:" + userId, days);
       return Result.success(signedIn);
   }
   ```

3. **签到统计**
   - **功能描述**：统计用户的签到次数和连续签到天数。
   - **实现逻辑**：
     - 使用BitMap的位运算，统计用户的签到次数和连续签到天数。

   ```java
   @GetMapping("/sign-in/stats")
   public Result getSignInStats(@RequestParam Long userId) {
       // 获取当前日期
       LocalDate now = LocalDate.now();
       // 计算当前日期与起始日期的天数差
       long days = ChronoUnit.DAYS.between(LocalDate.of(2023, 1, 1), now);
       // 获取BitMap中的位
       Long signCount = stringRedisTemplate.opsForValue().bitCount("sign-in:" + userId);
       // 计算连续签到天数
       long consecutiveDays = 0;
       for (long i = 0; i < days; i++) {
           if (stringRedisTemplate.opsForValue().getBit("sign-in:" + userId, days - i)) {
               consecutiveDays++;
           } else {
               break;
           }
       }
       return Result.success(Map.of("signCount", signCount, "consecutiveDays", consecutiveDays));
   }
   ```
