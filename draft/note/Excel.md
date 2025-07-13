# Excel文件

在Spring Boot中使用EasyExcel进行Excel文件的读写操作

### 1. 添加依赖
在项目的`pom.xml`文件中添加EasyExcel的依赖：
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.2.0</version>
</dependency>
```

### 2. 创建实体类
创建一个实体类，用于映射Excel中的行数据。例如：
```java
public class ExcelData {
    @ExcelProperty("姓名")
    private String name;
    @ExcelProperty("年龄")
    private Integer age;
    @ExcelProperty("邮箱")
    private String email;

    // getter和setter方法
}
```

### 3. 创建Excel读取服务
编写一个服务类，用于读取Excel文件：
```java
@Service
public class ExcelReadService {
    public List<ExcelData> readExcel(MultipartFile file) throws Exception {
        ExcelReader excelReader = EasyExcel.read(file.getInputStream())
                .head(ExcelData.class)
                .build();
        ReadSheet readSheet = EasyExcel.readSheet(0).build();
        return excelReader.readAll(readSheet);
    }
}
```

### 4. 创建Excel写入服务
编写一个服务类，用于写入Excel文件：
```java
@Service
public class ExcelWriteService {
    public void writeExcel(HttpServletResponse response, List<ExcelData> dataList) throws Exception {
        // 设置响应头
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=test.xlsx");

        EasyExcel.write(response.getOutputStream(), ExcelData.class)
                .sheet("模板")
                .doWrite(dataList);
    }
}
```

### 5. 创建控制器
在控制器中调用读取和写入服务：
```astarterjava
@RestController
@RequestMapping("/excel")
public class ExcelController {
    @Autowired
    private ExcelReadService excelReadService;
    @Autowired
    private ExcelWriteService excelWriteService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadExcel(@RequestParam("file") MultipartFile file) throws Exception {
        List<ExcelData> dataList = excelReadService.readExcel(file);
        return ResponseEntity.ok("上传成功，共读取 " + dataList.size() + " 条数据");
    }

    @GetMapping("/download")
    public void downloadExcel(HttpServletResponse response) throws Exception {
        List<ExcelData> dataList = new ArrayList<>();
        // 添加示例数据
        dataList.add(new ExcelData("张三", 25, "zhangsan@example.com"));
        dataList.add(new ExcelData("李四", 30, "lisi@example.com"));

        excelWriteService.writeExcel(response, dataList);
    }
}
```
