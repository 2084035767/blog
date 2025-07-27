# 爬“云”教程 ~--爬虫基础~

最近在网站浏览的时候，遇到了这样的网站

![云](http://images.jiangtblog.top/img/Snipaste_2022-12-03_00-16-56.png)

看到各种各样，色彩斑斓，不同形状的云，瞬间有了收藏的兴致。但我右键一点，出现了这样的提示。

![伊恩·费舍尔，保留所有权利](http://images.jiangtblog.top/img/Snipaste_2022-12-03_00-17-15.png)

我默默打开了 python

## 分析

1. 首先用开发者工具分析一下，这个网站的基本结构。

  ![图1](http://images.jiangtblog.top/img/Snipaste_2022-12-03_00-17-41.png)

  > 我们发现所有图片在<img>便签里，而所有<img>在<a>里。我们需要拿到所有的<a>，再在<a>里取<img>

2. ![图2](http://images.jiangtblog.top/img/Snipaste_2022-12-03_00-18-39.png)

  > <img>里有 src 属性，但里面的网址好像缺了什么
  > https 协议头，先将 https 备用，我们再去请求网站

## 代码操作

首先我们先写出爬虫的一般请求方式

```python
import requests
# xpath
from lxml import etree
# 进度条
from tqdm import trange

url = r'https://www.ianfisherart.com/gallery/painting'
# 请求头（解决一般反扒）
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105."
                  "0.0.0 Safari/537.36 Edg/105.0.1343.42"
}
# 代理
proxies = {
    'http': 'http://47.92.234.75:80'
}
# https协议头（备用）
https = "https:"
# 爬虫的一般请求
r = requests.get(url, headers=headers, proxies=proxies)
r.encoding = 'utf-8'
html = r.text
```

我选择用`xpath`解析网站（因为`xpath`可以在开发者工具里复制）
根据前面的分析我们先取到所有的<a>

又因为 path 取出来的东西会以列表返回

我们计算就可以有多少个<a>就有多少个图片

```python
tree = etree.HTML(html)
# 计算所有的<a>
anumber = len(tree.xpath('//*[@id="gallery"]/a'))
```

这样我们可以用 for 循环来一个一个提取<img>

提取出<img>还要用 https 组成完整的网址

我们再去请求网址就可以得到图片的二进制内容

```python
for i in trange(1, anumber):
    # 组成完整网址
    cloud_url = https + tree.xpath(f'//*[@id="gallery"]/a[{i}]/img/@src')[0]
```

怎么去写入文件呢？
我们需要去解决图片的名字，而且名字必须要带上图片的后缀，我们可能会想到用 jpg？

别忘了看图 2，这里有不同的格式，怎么用不同格式来命名后缀呢？

我们可以在网址里提取，这里用到了字符串的分切，我们先用”/“分切取最后一段，再用“?"分切取前一段，这样就得到了图片的名字

```python
	# 先用”/“分切，取最后一段
    namea_one = tree.xpath(f'//*[@id="gallery"]/a[{i}]/img/@src')[0].split('/')[-1]
    # 用" ? "分切，取前一段
    name = namea_one.split('?')[0]
    # 请求网址得到图片的二进制内容
    res = requests.get(cloud_url, headers=headers, proxies=proxies)
    res.encoding = 'utf-8'
    cloud = res.content
   
```

我们将图片名字作为文件名，再选择二进制写入（`wb`），这样就可以方便的写入文件了

```python
	# 写入文件
    with open(name, "wb") as f:
        f.write(cloud)
```



## 简化

因为我们用了两次请求，而且好像只有`url`和返回不同，我们要怎么办呢？

我们可以将请求写成函数，再将函数加入一个额外参数，选择去返回不同的内容

```python
def cloud_download(url, i):
    r = requests.get(url, headers=headers, proxies=proxies)
    r.encoding = 'utf-8'
    # 这里可以用“三元表达式”
    if i == True:
        return r.text
    else:
        return r.content
    # “三元表达式”
    return r.text if i else r.content
```

==(python 并没有“三元表达式”，这里说的是 if···else···结构类似“三元表达式”的表示方式 )==

我们还可以加上进度条来方便看

```python
# trange()函数，tqdm+range的结合体
for i in trange(1, anumber):
```

这个图片名字看起来不行？我们还想去改变图片的名字，（例如图 1、2、3、4）而且后缀还不变？当然可以

我们利用字符串分隔，来将名字分开，再加上自己喜欢的名字

这里就不演示了，可以自行探索

# 最终方案

```python
import requests
from lxml import etree
from tqdm import trange

url = r'https://www.ianfisherart.com/gallery/painting'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105."
                  "0.0.0 Safari/537.36 Edg/105.0.1343.42"
}
proxies = {
    'http': 'http://47.92.234.75:80'
}
https = "https:"


def cloud_download(url, i):
    r = requests.get(url, headers=headers, proxies=proxies)
    r.encoding = 'utf-8'
    return r.text if i else r.content


text = cloud_download(url, 1)
tree = etree.HTML(text)
anumber = len(tree.xpath('//*[@id="gallery"]/a'))
for i in trange(1, anumber):
    cloud_str = tree.xpath(f'//*[@id="gallery"]/a[{i}]/img/@src')[0]
    cloud_url = https + cloud_str
    cloud_name = cloud_str.split('/')[-1].split('?')[0]
    cloud = cloud_download(cloud_url, 0)
    with open(cloud_name, "wb") as f:
        f.write(cloud)
```

这就是我现阶段写出来的最终方案 ==(不代表我做的最好)==
如果有更好的方式请联系我哦，一起学习，共同进步！