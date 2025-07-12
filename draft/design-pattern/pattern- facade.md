---
title: 设计模式| 门面模式
date: 2025-1-1
---

## 门面模式

好的！门面模式（Facade Pattern）是一种结构型设计模式，用于提供一个简化的接口，隐藏复杂的子系统内部的复杂性，让客户端可以更简单地与子系统交互。下面是一个从低级到高级的 Java 门面模式示例代码。

### 低级示例：简单多媒体库

在这个低级示例中，我们将实现一个简单的多媒体库，其中包含多个子系统（如音频播放器、视频播放器、字幕处理器等），并通过一个门面类来简化客户端的交互。

#### 1. 子系统类：音频播放器

```java
class AudioPlayer {
    public void playAudio(String audioFile) {
        System.out.println("AudioPlayer: Playing audio file: " + audioFile);
    }
}
```

#### 2. 子系统类：视频播放器

```java
class VideoPlayer {
    public void playVideo(String videoFile) {
        System.out.println("VideoPlayer: Playing video file: " + videoFile);
    }
}
```

#### 3. 子系统类：字幕处理器

```java
class SubtitleProcessor {
    public void processSubtitles(String subtitleFile) {
        System.out.println("SubtitleProcessor: Processing subtitle file: " + subtitleFile);
    }
}
```

#### 4. 门面类：多媒体播放器

```java
class MultimediaPlayer {
    private AudioPlayer audioPlayer = new AudioPlayer();
    private VideoPlayer videoPlayer = new VideoPlayer();
    private SubtitleProcessor subtitleProcessor = new SubtitleProcessor();

    public void playMultimedia(String audioFile, String videoFile, String subtitleFile) {
        audioPlayer.playAudio(audioFile);
        videoPlayer.playVideo(videoFile);
        subtitleProcessor.processSubtitles(subtitleFile);
    }
}
```

#### 5. 客户端代码

```java
public class FacadePatternDemo {
    public static void main(String[] args) {
        // 创建门面对象
        MultimediaPlayer multimediaPlayer = new MultimediaPlayer();

        // 客户端通过门面对象调用功能
        multimediaPlayer.playMultimedia("audio.mp3", "video.mp4", "subtitle.srt");
    }
}
```

#### 输出结果

```
AudioPlayer: Playing audio file: audio.mp3
VideoPlayer: Playing video file: video.mp4
SubtitleProcessor: Processing subtitle file: subtitle.srt
```

### 高级示例：电子商务系统

在这个高级示例中，我们将实现一个电子商务系统，其中包含多个复杂的子系统（如库存管理、支付系统、订单处理、物流等），并通过一个门面类来简化客户端的交互。

#### 1. 子系统类：库存管理

```java
class InventorySystem {
    public void checkInventory(String product) {
        System.out.println("InventorySystem: Checking inventory for product: " + product);
        // 模拟库存检查
        System.out.println("InventorySystem: Product " + product + " is in stock.");
    }
}
```

#### 2. 子系统类：支付系统

```java
class PaymentSystem {
    public void processPayment(String paymentDetails) {
        System.out.println("PaymentSystem: Processing payment with details: " + paymentDetails);
        // 模拟支付处理
        System.out.println("PaymentSystem: Payment successful.");
    }
}
```

#### 3. 子系统类：订单处理

```java
class OrderProcessingSystem {
    public void processOrder(String orderDetails) {
        System.out.println("OrderProcessingSystem: Processing order with details: " + orderDetails);
        // 模拟订单处理
        System.out.println("OrderProcessingSystem: Order processed successfully.");
    }
}
```

#### 4. 子系统类：物流系统

```java
class LogisticsSystem {
    public void shipOrder(String orderDetails) {
        System.out.println("LogisticsSystem: Shipping order with details: " + orderDetails);
        // 模拟物流发货
        System.out.println("LogisticsSystem: Order shipped successfully.");
    }
}
```

#### 5. 门面类：电子商务系统

```java
class ECommerceSystem {
    private InventorySystem inventorySystem = new InventorySystem();
    private PaymentSystem paymentSystem = new PaymentSystem();
    private OrderProcessingSystem orderProcessingSystem = new OrderProcessingSystem();
    private LogisticsSystem logisticsSystem = new LogisticsSystem();

    public void placeOrder(String product, String paymentDetails, String orderDetails) {
        // 检查库存
        inventorySystem.checkInventory(product);

        // 处理支付
        paymentSystem.processPayment(paymentDetails);

        // 处理订单
        orderProcessingSystem.processOrder(orderDetails);

        // 发货
        logisticsSystem.shipOrder(orderDetails);
    }
}
```

#### 6. 客户端代码

```java
public class AdvancedFacadePatternDemo {
    public static void main(String[] args) {
        // 创建门面对象
        ECommerceSystem ecommerceSystem = new ECommerceSystem();

        // 客户端通过门面对象调用功能
        ecommerceSystem.placeOrder("Product A", "Credit Card 1234", "Order 001");
    }
}
```

#### 输出结果

```
InventorySystem: Checking inventory for product: Product A
InventorySystem: Product Product A is in stock.
PaymentSystem: Processing payment with details: Credit Card 1234
PaymentSystem: Payment successful.
OrderProcessingSystem: Processing order with details: Order 001
OrderProcessingSystem: Order processed successfully.
LogisticsSystem: Shipping order with details: Order 001
LogisticsSystem: Order shipped successfully.
```

### 总结

通过以上两个示例，你可以看到门面模式的强大之处：
1. **低级示例**：展示了门面模式的基本结构，通过门面类简化了客户端与多个子系统的交互。
2. **高级示例**：引入了更复杂的场景（电子商务系统），展示了门面模式在处理复杂业务流程时的灵活性和简化能力。

门面模式的核心在于，客户端可以通过一个简单的接口与复杂的子系统交互，而无需关心子系统内部的复杂性。
