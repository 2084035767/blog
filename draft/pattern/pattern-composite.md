## 组合模式

好的！下面是一个从低级到高级的 Java 组合模式示例代码。低级示例将展示组合模式的基本结构和实现，高级示例则会引入更多的复杂性和实际应用场景。

### 低级示例：简单文件系统

在这个低级示例中，我们将实现一个简单的文件系统，其中包含文件（叶子节点）和文件夹（组合节点）。

#### 1. 抽象组件接口
定义一个抽象接口 `FileSystemComponent`，表示文件系统中的组件。

```java
interface FileSystemComponent {
    void display(String indent); // 显示组件信息
}
```

#### 2. 叶子节点：文件
实现一个叶子节点类 `File`，表示文件。

```java
class File implements FileSystemComponent {
    private String name;

    public File(String name) {
        this.name = name;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "File: " + name);
    }
}
```

#### 3. 组合节点：文件夹
实现一个组合节点类 `Folder`，表示文件夹，可以包含其他文件或文件夹。

```java
class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    public void addComponent(FileSystemComponent component) {
        children.add(component);
    }

    public void removeComponent(FileSystemComponent component) {
        children.remove(component);
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "Folder: " + name);
        for (FileSystemComponent component : children) {
            component.display(indent + "  ");
        }
    }
}
```

#### 4. 客户端代码
使用组合模式构建文件系统并显示其结构。

```java
public class CompositePatternDemo {
    public static void main(String[] args) {
        // 创建文件和文件夹
        Folder root = new Folder("Root");
        Folder documents = new Folder("Documents");
        Folder pictures = new Folder("Pictures");

        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");
        File picture1 = new File("picture1.jpg");

        // 组装文件系统
        documents.addComponent(file1);
        documents.addComponent(file2);
        pictures.addComponent(picture1);

        root.addComponent(documents);
        root.addComponent(pictures);

        // 显示文件系统结构
        root.display("");
    }
}
```

#### 输出结果
```
Folder: Root
  Folder: Documents
    File: file1.txt
    File: file2.txt
  Folder: Pictures
    File: picture1.jpg
```

### 高级示例：组织结构

在高级示例中，我们将实现一个更复杂的场景：一个公司的组织结构。组织结构可以包含部门（组合节点）和员工（叶子节点）。

#### 1. 抽象组件接口
定义一个抽象接口 `OrganizationComponent`，表示组织结构中的组件。

```java
interface OrganizationComponent {
    void display(String indent); // 显示组件信息
    void addComponent(OrganizationComponent component); // 添加子组件
    void removeComponent(OrganizationComponent component); // 移除子组件
}
```

#### 2. 叶子节点：员工
实现一个叶子节点类 `Employee`，表示员工。

```java
class Employee implements OrganizationComponent {
    private String name;
    private String position;

    public Employee(String name, String position) {
        this.name = name;
        this.position = position;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "Employee: " + name + " (" + position + ")");
    }

    @Override
    public void addComponent(OrganizationComponent component) {
        throw new UnsupportedOperationException("Cannot add components to an employee.");
    }

    @Override
    public void removeComponent(OrganizationComponent component) {
        throw new UnsupportedOperationException("Cannot remove components from an employee.");
    }
}
```

#### 3. 组合节点：部门
实现一个组合节点类 `Department`，表示部门，可以包含其他部门或员工。

```java
class Department implements OrganizationComponent {
    private String name;
    private List<OrganizationComponent> components = new ArrayList<>();

    public Department(String name) {
        this.name = name;
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "Department: " + name);
        for (OrganizationComponent component : components) {
            component.display(indent + "  ");
        }
    }

    @Override
    public void addComponent(OrganizationComponent component) {
        components.add(component);
    }

    @Override
    public void removeComponent(OrganizationComponent component) {
        components.remove(component);
    }
}
```

#### 4. 客户端代码
使用组合模式构建组织结构并显示其结构。

```java
public class AdvancedCompositePatternDemo {
    public static void main(String[] args) {
        // 创建部门和员工
        Department hr = new Department("Human Resources");
        Department it = new Department("Information Technology");
        Department finance = new Department("Finance");

        Employee alice = new Employee("Alice", "HR Manager");
        Employee bob = new Employee("Bob", "IT Manager");
        Employee charlie = new Employee("Charlie", "Finance Manager");

        Employee david = new Employee("David", "HR Staff");
        Employee eve = new Employee("Eve", "IT Staff");
        Employee frank = new Employee("Frank", "Finance Staff");

        // 组装组织结构
        hr.addComponent(alice);
        hr.addComponent(david);

        it.addComponent(bob);
        it.addComponent(eve);

        finance.addComponent(charlie);
        finance.addComponent(frank);

        Department company = new Department("Company");
        company.addComponent(hr);
        company.addComponent(it);
        company.addComponent(finance);

        // 显示组织结构
        company.display("");
    }
}
```

#### 输出结果
```
Department: Company
  Department: Human Resources
    Employee: Alice (HR Manager)
    Employee: David (HR Staff)
  Department: Information Technology
    Employee: Bob (IT Manager)
    Employee: Eve (IT Staff)
  Department: Finance
    Employee: Charlie (Finance Manager)
    Employee: Frank (Finance Staff)
```

### 总结
通过以上两个示例，你可以看到组合模式的强大之处：
1. **低级示例**：展示了组合模式的基本结构，适用于简单的层次结构，如文件系统。
2. **高级示例**：引入了更复杂的场景（组织结构），展示了组合模式在处理复杂层次结构时的灵活性和扩展性。

组合模式的核心在于，客户端可以统一处理叶子节点和组合节点，而无需关心它们的具体类型。
