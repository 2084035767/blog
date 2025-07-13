# 文件存储

## 本地存储

`MultipartFile` 是 Spring 框架中用于处理文件上传的一个接口。在处理 HTTP 请求中的文件上传项时，Spring MVC 提供了对 `MultipartFile` 的支持，它封装了上传文件的内容和相关属性，方便开发者对上传的文件进行操作。

### 常用方法
- ##### `String getName()`：获取参数名。
- ##### `String getOriginalFilename()`：获取上传文件的原始名称。
- `String getContentType()`：获取文件的 MIME 类型。
- `boolean isEmpty()`：判断文件是否为空。
- `long getSize()`：获取文件大小（以字节为单位）。
- `byte[] getBytes()`：获取文件内容，以字节数组形式返回。
- ##### `InputStream getlnputStream()`：获取接收到的文件内容的输入流
- ##### `void transferTo(File dest)`：将文件内容传输到指定位置。

### 使用场景
`MultipartFile` 主要用于处理文件上传操作，比如在 Web 应用中，用户通过表单上传文件时，Spring MVC 会将上传的文件封装成 `MultipartFile` 对象，供控制器方法处理。

### 示例代码
```java
@RestController
public class FileUploadController {

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        // 获取文件名
        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            return "文件名为空";
        }

        // 获取文件大小
        long fileSize = file.getSize();
        System.out.println("文件大小：" + fileSize);

        // 获取文件内容
        try {
            byte[] bytes = file.getBytes();
            // 处理文件内容，比如保存到服务器
            Path path = Paths.get("uploads/" + fileName);
            Files.write(path, bytes);
            return "文件上传成功";
        } catch (IOException e) {
            e.printStackTrace();
            return "文件上传失败";
        }
    }
}
```

### 注意事项
- 配置文件上传限制：在 Spring Boot 中，可以在 `application.properties` 或 `application.yml` 中配置文件上传的最大大小等限制。
- 处理大文件上传时，需考虑服务器的内存和存储资源，避免资源耗尽。
- 对上传的文件进行病毒扫描等安全检查，防止恶意文件上传。
- 防止文件被覆盖可以用UUID等唯一标识





## 阿里云OSS

开通服务获取将`endpoint`、`accessKeyId`、`accessKeySecret`和`bucketName`替换为你的阿里云OSS实际配置。

引入依赖

```xml
<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.13.0</version>
</dependency>
```



阿里云OSS工具类

```java
/**
 * 阿里云OSS工具类
 */
public class AliyunOssUtil {

    private static final String endpoint = "你的Endpoint";// 地区
    private static final String accessKeyId = "你的AccessKeyId";
    private static final String accessKeySecret = "你的AccessKeySecret";
    private static final String bucketName = "你的BucketName"; // 桶名

    private static OSS ossClient = null;

    /**
     * 初始化OSS客户端
     */
    private static void initOssClient() {
        if (ossClient == null) {
            ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        }
    }

    /**
     * 上传文件到OSS
     *
     * @param objectName 文件在OSS中的名称
     * @param filePath   本地文件路径
     * @return 上传是否成功
     */
    public static boolean uploadFile(String objectName, String filePath) {
        initOssClient();
        try {
            ossClient.putObject(bucketName, objectName, new File(filePath));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 上传文件流到OSS
     *
     * @param objectName 文件在OSS中的名称
     * @param inputStream 文件输入流
     * @return 上传是否成功
     */
    public static boolean uploadFile(String objectName, InputStream inputStream) {
        initOssClient();
        try {
            ossClient.putObject(bucketName, objectName, inputStream);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 下载文件从OSS
     *
     * @param objectName 文件在OSS中的名称
     * @param filePath   本地保存路径
     * @return 下载是否成功
     */
    public static boolean downloadFile(String objectName, String filePath) {
        initOssClient();
        try {
            OSSObject ossObject = ossClient.getObject(new GetObjectRequest(bucketName, objectName));
            ossObject.getObjectContent().transferTo(new File(filePath));
            ossObject.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 获取文件输入流
     *
     * @param objectName 文件在OSS中的名称
     * @return 文件输入流
     */
    public static InputStream getFileInputStream(String objectName) {
        initOssClient();
        try {
            OSSObject ossObject = ossClient.getObject(bucketName, objectName);
            return ossObject.getObjectContent();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 删除文件从OSS
     *
     * @param objectName 文件在OSS中的名称
     * @return 删除是否成功
     */
    public static boolean deleteFile(String objectName) {
        initOssClient();
        try {
            ossClient.deleteObject(bucketName, objectName);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 列出指定前缀下的所有文件
     *
     * @param prefix 文件前缀
     * @return 文件名称列表
     */
    public static List<String> listFiles(String prefix) {
        initOssClient();
        try {
            ObjectListing objectListing = ossClient.listObjects(new ListObjectsRequest(bucketName).withPrefix(prefix));
            return objectListing.getObjectSummaries().stream()
                    .map(summary -> summary.getKey())
                    .toList();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 关闭OSS客户端
     */
    public static void shutdown() {
        if (ossClient != null) {
            ossClient.shutdown();
        }
    }

    public static void main(String[] args) {
        // 测试上传文件
        boolean uploadSuccess = uploadFile("test.txt", "D:/test.txt");
        System.out.println("上传成功: " + uploadSuccess);

        // 测试下载文件
        boolean downloadSuccess = downloadFile("test.txt", "D:/downloaded_test.txt");
        System.out.println("下载成功: " + downloadSuccess);

        // 测试列出文件
        List<String> files = listFiles("");
        System.out.println("文件列表: " + files);

        // 测试删除文件
        boolean deleteSuccess = deleteFile("test.txt");
        System.out.println("删除成功: " + deleteSuccess);

        // 关闭客户端
        shutdown();
    }
}
```





## MinIo

以下是使用MinIo在Spring Boot中的完整流程：

### 1. 安装和配置MinIo
- **使用Docker安装MinIo**：通过Docker拉取MinIo镜像并运行容器，指定访问密钥和存储卷。
  ```bash
  docker pull minio/minio
  docker volume create minio-data
  docker run -p 9000:9000 -p 9001:9001 --name minio \
    -e "MINIO_ROOT_USER=your-access-key" \
    -e "MINIO_ROOT_PASSWORD=your-secret-key" \
    -v minio-data:/data \
    minio/minio server /data --console-address ":9001"
  ```
  其中，`your-access-key`和`your-secret-key`是自定义的访问密钥，需满足长度要求。

- **访问MinIo管理界面**：通过浏览器访问`http://localhost:9001`，使用设置的访问密钥登录。

### 2. 在Spring Boot项目中集成MinIo
- **添加MinIo依赖**：在项目的`pom.xml`文件中添加MinIo的依赖。
  ```xml
  <dependency>
      <groupId>io.minio</groupId>
      <artifactId>minio</artifactId>
      <version>8.4.0</version>
  </dependency>
  ```

- **配置MinIo参数**：在`application.properties`文件中添加MinIo的配置信息。
  ```properties
  minio.url=http://localhost:9000
  minio.access-key=your-access-key
  minio.secret-key=your-secret-key
  minio.bucket-name=your-bucket-name
  ```

- **创建MinIo配置类**：编写一个配置类来初始化MinIo客户端。
  ```java
  @Configuration
  public class MinioConfig {
      @Value("${minio.url}")
      private String minioUrl;
      @Value("${minio.access-key}")
      private String accessKey;
      @Value("${minio.secret-key}")
      private String secretKey;
  
      @Bean
      public MinioClient minioClient() {
          return MinioClient.builder()
                  .endpoint(minioUrl)
                  .credentials(accessKey, secretKey)
                  .build();
      }
  }
  ```

### 3. 使用MinIo进行文件操作
- **创建服务类**：编写一个服务类来处理文件的上传和下载等操作。
  ```java
  @Service
  public class MinioService {
      @Autowired
      private MinioClient minioClient;
      @Value("${minio.bucket-name}")
      private String bucketName;
  
      public void uploadFile(String objectName, InputStream inputStream, long size) throws Exception {
          minioClient.putObject(
                  PutObjectArgs.builder()
                          .bucket(bucketName)
                          .object(objectName)
                          .stream(inputStream, size, -1)
                          .build()
          );
      }
  
      public InputStream downloadFile(String objectName) throws Exception {
          return minioClient.getObject(
                  GetObjectArgs.builder()
                          .bucket(bucketName)
                          .object(objectName)
                          .build()
          );
      }
  }
  ```

- **在控制器中使用服务类**：在控制器中调用服务类的方法来实现文件的上传和下载。
  ```java
  @RestController
  @RequestMapping("/files")
  public class FileController {
      @Autowired
      private MinioService minioService;
  
      @PostMapping("/upload")
      public String uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
          minioService.uploadFile(file.getOriginalFilename(), file.getInputStream(), file.getSize());
          return "File uploaded successfully.";
      }
  
      @GetMapping("/download/{name}")
      public ResponseEntity<byte[]> downloadFile(@PathVariable String name) throws Exception {
          InputStream inputStream = minioService.downloadFile(name);
          // 处理响应实体
          return ResponseEntity.ok()
                  .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + name)
                  .body(IOUtils.toByteArray(inputStream));
      }
  }
  ```

### 4. 测试应用
- **运行应用**：确保MinIo服务器正在运行，然后启动Spring Boot应用程序。
- **测试文件操作**：通过调用`/upload`和`/download/{name}`接口来测试文件的上传和下载功能。

以上步骤帮助你在Spring Boot项目中成功集成MinIo，并实现基本的文件存储和检索功能。



## x-file-storage

#### 配置

这里以阿里云 OSS 为例，`pom.xml` 引入本项目

```xml
<dependency>
    <groupId>org.dromara.x-file-storage</groupId>
    <artifactId>x-file-storage-spring</artifactId>
    <version>2.2.1</version>
</dependency>
<!-- 引入 阿里云 OSS SDK，如果使用其它存储平台，就引入对应的 SDK  -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.16.1</version>
</dependency>
```

`application.yml` 配置文件中添加以下基础配置

```yml
dromara:
  x-file-storage: #文件存储配置
    default-platform: aliyun-oss-1 #默认使用的存储平台
    aliyun-oss:
      - platform: aliyun-oss-1 # 存储平台标识
        enable-storage: true  # 启用存储
        access-key: ??
        secret-key: ??
        end-point: ??
        bucket-name: ??
        domain: ?? # 访问域名，注意“/”结尾，例如：https://abc.oss-cn-shanghai.aliyuncs.com/
        base-path: test/ # 基础路径
```

#### 🔨编码

在启动类上加上`@EnableFileStorage`注解

```java
@EnableFileStorage
@SpringBootApplication
public class SpringFileStorageTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringFileStorageTestApplication.class,args);
    }

}
```

#### 开始上传

支持 File、MultipartFile、UploadedFile、byte[]、InputStream、URL、URI、String、HttpServletRequest，大文件会自动分片上传。

```java
@RestController
public class FileDetailController {

    @Autowired
    private FileStorageService fileStorageService;//注入实列

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    public FileInfo upload(MultipartFile file) {
        //只需要这一行代码即可上传成功
        return fileStorageService.of(file).upload();
    }
    
    /**
     * 上传文件，成功返回文件 url
     */
    @PostMapping("/upload2")
    public String upload2(MultipartFile file) {
        FileInfo fileInfo = fileStorageService.of(file)
                .setPath("upload/") //保存到相对路径下，为了方便管理，不需要可以不写
                .setSaveFilename("image.jpg") //设置保存的文件名，不需要可以不写，会随机生成
                .setObjectId("0")   //关联对象id，为了方便管理，不需要可以不写
                .setObjectType("0") //关联对象类型，为了方便管理，不需要可以不写
                .putAttr("role","admin") //保存一些属性，可以在切面、保存上传记录、自定义存储平台等地方获取使用，不需要可以不写
                .upload();  //将文件上传到对应地方
        return fileInfo == null ? "上传失败！" : fileInfo.getUrl();
    }

    /**
     * 上传图片，成功返回文件信息
     * 图片处理使用的是 https://github.com/coobird/thumbnailator
     */
    @PostMapping("/upload-image")
    public FileInfo uploadImage(MultipartFile file) {
        return fileStorageService.of(file)
                .image(img -> img.size(1000,1000))  //将图片大小调整到 1000*1000
                .thumbnail(th -> th.size(200,200))  //再生成一张 200*200 的缩略图
                .upload();
    }

    /**
     * 上传文件到指定存储平台，成功返回文件信息
     */
    @PostMapping("/upload-platform")
    public FileInfo uploadPlatform(MultipartFile file) {
        return fileStorageService.of(file)
                .setPlatform("aliyun-oss-1")    //使用指定的存储平台
                .upload();
    }

    /**
     * 直接读取 HttpServletRequest 中的文件进行上传，成功返回文件信息
     * 使用这种方式有些注意事项，请查看文档 基础功能-上传 章节
     */
    @PostMapping("/upload-request")
    public FileInfo uploadPlatform(HttpServletRequest request) {
        return fileStorageService.of(request).upload();
    }
}
```

#### 其它操作

```java
//手动构造文件信息，可用于其它操作
FileInfo fileInfo = new FileInfo()
        .setPlatform("huawei-obs-1")
        .setBasePath("test/")
        .setPath("aa/")
        .setFilename("image.png")
        .setThFilename("image.png.min.jpg");

//文件是否存在
boolean exists = fileStorageService.exists(fileInfo);
//下载
byte[] bytes = fileStorageService.download(fileInfo).bytes();
//删除
fileStorageService.delete(fileInfo);
//其它更多操作
```

如果将文件记录保存到数据库中，还可以更方便的根据 URL 进行操作了

```java
//直接从数据库中获取 FileInfo 对象，更加方便执行其它操作
FileInfo fileInfo = fileStorageService.getFileInfoByUrl("https://abc.def.com/test/aa/image.png");

//文件是否存在
boolean exists = fileStorageService.exists("https://abc.def.com/test/aa/image.png");
//下载
byte[] bytes = fileStorageService.download("https://abc.def.com/test/aa/image.png").bytes();
//删除
fileStorageService.delete("https://abc.def.com/test/aa/image.png");
//其它更多操作
```
