---
title: 设计模式| 迭代器模式
date: 2025-1-1
---



## 迭代器模式

好的，下面是一个从低级到高级的 Java 迭代器模式示例代码。

### 低级示例

```java
// 迭代器接口
interface Iterator {
    boolean hasNext(); // 是否存在下一个元素
    Object next();     // 返回下一个元素
}

// 容器接口
interface Container {
    Iterator getIterator(); // 获取迭代器
}

// 具体容器类：数组容器
class ArrayListContainer implements Container {
    private String[] items;

    public ArrayListContainer() {
        items = new String[]{"Item 1", "Item 2", "Item 3", "Item 4"};
    }

    @Override
    public Iterator getIterator() {
        return new ArrayListIterator(this);
    }
}

// 具体迭代器类：数组迭代器
class ArrayListIterator implements Iterator {
    private ArrayListContainer container;
    private int index;

    public ArrayListIterator(ArrayListContainer container) {
        this.container = container;
    }

    @Override
    public boolean hasNext() {
        if (index < container.items.length) {
            return true;
        }
        return false;
    }

    @Override
    public Object next() {
        if (this.hasNext()) {
            return container.items[index++];
        }
        return null;
    }
}

// 客户端代码
public class IteratorPatternDemo {
    public static void main(String[] args) {
        Container container = new ArrayListContainer();
        Iterator iterator = container.getIterator();

        while (iterator.hasNext()) {
            String item = (String) iterator.next();
            System.out.println("Item: " + item);
        }
    }
}
```

### 高级示例

在 Java 中，已经内置了迭代器接口（`java.util.Iterator`）和集合框架，我们可以通过继承和实现这些接口来使用迭代器模式。下面是一个更贴近实际应用的高级示例，展示如何使用 Java 内置的迭代器：

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

// 具体容器类：自定义集合类
class MyCollection implements Iterable<String> {
    private List<String> items;

    public MyCollection() {
        items = new ArrayList<>();
    }

    public void add(String item) {
        items.add(item);
    }

    @Override
    public Iterator<String> iterator() {
        return new MyIterator(items);
    }
}

// 具体迭代器类：自定义迭代器
class MyIterator implements Iterator<String> {
    private List<String> items;
    private int index;

    public MyIterator(List<String> items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        return index < items.size();
    }

    @Override
    public String next() {
        if (hasNext()) {
            return items.get(index++);
        }
        return null;
    }
}

// 客户端代码
public class AdvancedIteratorDemo {
    public static void main(String[] args) {
        MyCollection collection = new MyCollection();
        collection.add("Apple");
        collection.add("Banana");
        collection.add("Cherry");

        // 使用自定义迭代器遍历集合
        Iterator<String> iterator = collection.iterator();
        while (iterator.hasNext()) {
            String item = iterator.next();
            System.out.println("Fruit: " + item);
        }

        // 使用增强型 for 循环（foreach）遍历集合
        System.out.println("\nUsing foreach loop:");
        for (String item : collection) {
            System.out.println("Fruit: " + item);
        }
    }
}
```

### 高级应用示例（双向链表的迭代器）

在这个示例中，我们将创建一个双向链表，并为其实现一个迭代器，以便能够从前向后遍历链表。

```java
// 节点类
class Node {
    String data;
    Node prev;
    Node next;

    public Node(String data) {
        this.data = data;
    }
}

// 双向链表容器类
class LinkedListContainer implements Iterable<String> {
    private Node head;
    private Node tail;

    public void add(String data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            newNode.prev = tail;
            tail = newNode;
        }
    }

    @Override
    public Iterator<String> iterator() {
        return new LinkedListIterator(head);
    }
}

// 双向链表迭代器类
class LinkedListIterator implements Iterator<String> {
    private Node current;

    public LinkedListIterator(Node head) {
        this.current = head;
    }

    @Override
    public boolean hasNext() {
        return current != null;
    }

    @Override
    public String next() {
        if (hasNext()) {
            String data = current.data;
            current = current.next;
            return data;
        }
        return null;
    }
}

// 客户端代码
public class LinkedListIteratorDemo {
    public static void main(String[] args) {
        LinkedListContainer linkedList = new LinkedListContainer();
        linkedList.add("Node 1");
        linkedList.add("Node 2");
        linkedList.add("Node 3");

        // 使用自定义迭代器遍历链表
        System.out.println("Traversing linked list using iterator:");
        Iterator<String> iterator = linkedList.iterator();
        while (iterator.hasNext()) {
            String data = iterator.next();
            System.out.println(data);
        }

        // 使用增强型 for 循环（foreach）遍历链表
        System.out.println("\nTraversing linked list using foreach loop:");
        for (String data : linkedList) {
            System.out.println(data);
        }
    }
}
```

以上示例展示了迭代器模式在不同场景下的应用，从简单的数组容器到复杂的双向链表容器，均通过迭代器实现了对集合的统一遍历方式。
