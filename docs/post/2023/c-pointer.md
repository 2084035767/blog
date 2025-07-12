---
title: 关于| C 语言指针
date: 2023-10-30
categories:
  - 编程知识
tags:
  - C 语言
order: 10
---

# C 语言指针

::: tip 前言

前两天复习 C 语言的时候，指针给我搞麻了。

刚上大一学 C 语言时，指针就像只拦路虎，当时为了“打虎”还仔细学习了指针，如今又忘掉了，遂有此篇。

:::

## 指针简介

### 什么是指针？

> 通常人们所说的指针是广义的，包含指针和指针变量😶

通俗来说，指针就是内存地址，指针变量就是存储内存地址的变量。

图1

**指针变量的定义**

::: warning 警告

在声明指针变量时，只声明不赋值，会造成“野指针问题”。

:::

```c
/* 
* 符号用来声明指针变量，通常在用来访问地址的对应值时，简称取值符
& 符号用来取出变量地址，简称取址符
*/

// 声明一个变量
int var = 10;
// 声明一个指针变量
int* varptr = &var;
// 声明一个指针变量（错误）
int* varptr;

printf("var 变量的值: %d\n", var  ); // > var 变量的值: 10
printf("var 变量的地址: %p\n", &var  ); // > var 变量的地址: 000000xxx
printf("*varPointer 变量的值: %d\n", *varptr ); // > *varptr 变量的值: 10
printf("varPointer 变量存储的地址: %p\n", varptr ); // > varptr 变量存储的地址: 000000xxx
```

### 什么是野指针？

野指针（Dangling Pointer）是指指向已释放或无效内存地址的指针。当一个指针被赋值为一个已释放的内存地址，或者指向一个无效的内存位置时，就会形成野指针。

野指针导致的问题：

- 访问无效的内存：当使用野指针访问已释放的内存或无效的内存时，可能会导致程序崩溃或产生不可预测的行为。

- 内存泄漏：如果存在野指针，可能会导致无法访问已释放的内存，从而造成内存泄漏。

### NULL 指针

声明指针后，系统会随机分配一个地址给指针变量，这时读取指针变量的地址，会发生出乎意料的错误，也就是上述所说的“野指针”。一般我们会配合其他变量使用。在声明未初始化的指针时，我们可以使用 `NULL` 指针。

```c
// 错误做法
int* var;
var = 10;

// 正确做法
int a = 1;
int* var = &a;

int* var = NULL;
```



## 指针的基本使用

> 学不会指针就相当于没学会 C 语言，指针是 C 语言的精髓。—《沃兹基硕德》

### 如何使用指针？

我们来看这样一个例子

```c
#include <stdio.h>

// 交换函数
void swap(int varA, int varB) {
    int tmp = varA;
    varA = varB;
    varB = tmp;
}

int main() {
    int varA = 5;
    int varB = 10;
    swap(varA,varB);
    printf("varA的值是%d\n",varA);
    printf("varB的值是%d\n",varB);
    return 0;
}

/* >>
varA的值是5
varB的值是10
*/ 
```

> 我靠？完全没变嘛，这不是🤔

使用“指针之神”的加持之力

```c
#include <stdio.h>

// 交换函数
void swap(int* varA, int* varB) {
	int tmp = *varA;
	*varA = *varB;
	*varB = tmp;
}

int main() {
	int varA = 5;
	int varB = 10;
	int* varAp = &varA;
	int* varBp = &varB;
	swap(varAp, varBp);
	printf("varA的值是%d\n", varA);
	printf("varB的值是%d\n", varB);
	return 0;
}

/* >>
varA的值是10
varB的值是5
*/ 
```

> 哎嘿，成了！😃

没有“指针之神”的加持之力，`swap` 函数是值传递，值传递在调用函数时，将实参的值复制给形参，在函数内部对参数的修改不会影响实际参数。你可以这样想，你把房产证复印件给了别人，别人将此改了名，那么房产证的名是真的改了吗？🤔



在“指针之神”的加持之力下，`swap` 是引用传递，引用传递在调用函数时，将实参的地址传递给形参，在函数内部对参数的修改会影响实际参数。你可以这样想，你把房产证给了别人，别人将此改了名，那么这回房产证的名是真的改了吧。😮



### 指针的运算

指针变量本质上是一个十六进制的无符号整数，代表了内存地址。

- 指针的每一次递增，它其实会指向下一个元素的存储单元。
- 指针的每一次递减，它都会指向上一个元素的存储单元。
- 指针在递增和递减时跳跃的字节数取决于指针所指向变量数据类型长度。

#### 指针的递增和递减

**指针的递增**

```c
#include <stdio.h>

int main () {
    int  var[] = {10, 100, 1000};
    /* 指针中的数组地址 */
    int* ptr= var;
    for (int i = 0; i < 3; i++) {
        printf("存储地址：var[%d] = %p\n", i, ptr );
        printf("存储值：var[%d] = %d\n", i, *ptr );
        /* 指向下一个位置 */
        ptr++;
    }
    return 0;
}
/* >>
存储地址：var[0] = 000000xxx
存储的值：var[0] = 10
存储地址：var[1] = 000000xxx
存储的值：var[1] = 100
存储地址：var[2] = 000000xxx
存储的值：var[2] = 1000
*/
```

**指针的递减**

```c
#include <stdio.h>

int main () {
	int  var[] = {10, 100, 1000};
	/* 指针中的数组地址 */
	int* ptr= &var[2];
	for ( int i = 0; i < 3; i++) {
		printf("存储地址：var[%d] = %p\n", i, ptr );
		printf("存储的值：var[%d] = %d\n", i, *ptr );
		/* 指向上一个位置 */
		ptr--;
	}
	return 0;
}
/* >>
存储地址：var[0] = 000000xxx
存储的值：var[0] = 1000
存储地址：var[1] = 000000xxx
存储的值：var[1] = 100
存储地址：var[2] = 000000xxx
存储的值：var[2] = 10
*/
```



#### 指针的比较运算

指针之间的比较运算，比较的是各自的内存地址哪一个更大，返回值是整数`1`或`0`。

```c
#include <stdio.h>

int main () {
	int  var[] = {10, 100, 1000};
	/* 指针中的数组地址 */
	int* ptr1= &var[1];
	int* ptr2= &var[2];
	printf("ptr1的地址是：%p\n",ptr1);
	printf("ptr2的地址是：%p\n",ptr2);
	printf("ptr1和ptr2的比值是：%d",ptr1<ptr2);
	return 0;
}

/* >>
ptr1的地址是：000000f07bbff918
ptr2的地址是：000000f07bbff91c
ptr1和ptr2的比值是：1
*/
```

## 指针与其他类型

> C 语言的指针好像“漫威毒液”一样，逮谁都能结合一下。下面我们讲解指针与其他类型的搭配。

### 指针和数组

首先就是指针和数组了，指针和数组分为**指针数组**和**数组指针**，在C语言中，因为数组本身就是一个**常量指针**，所以通常可以转化为指针使用。

#### 指针数组

指针数组本质就是一个数组，其中的每个元素都是指向某种数据类型的指针。

::: tip 

指针数组通常在处理不定数量元素的数据结构时有很大作用，如动态分配的字符串数组或动态创建的结构体数组。

:::

```c
#include <stdio.h>

int main() {
	int num1 = 10, num2 = 20, num3 = 30;

	// 声明一个整数指针数组，包含三个指针
	int *var[3]={&num1,&num2,&num3};


	// 使用指针数组访问这些整数变量的值
	printf("指针数组[0]的值: %d\n", *var[0]);
	printf("指针数组[1]的值: %d\n", *var[1]);
	printf("指针数组[2]的值: %d\n", *var[2]);

	return 0;
}

/* >>
指针数组[0]的值: 10
指针数组[1]的值: 20
指针数组[2]的值: 30
*/
```

> 这样看来，指针数组和数组差不多嘛。只不过一个存变量值，一个存内存地址罢了😮

#### 数组指针

照上面的说法，想必聪明的你已经知道了。数组指针本质就是指针，不过指向数组罢。

> 上面说过了，“在C语言中，因为数组本身就是一个**常量指针**，所以通常可以转化为指针使用。”，接下来让我们看看，怎么个事？🤔

```c
#include <stdio.h>

int main () {
    /* 带有 5 个元素的整型数组 */
    int var[5] = {1,2,3,4,5};
    int *p=var;

    /* 输出数组中每个元素的值 */
    printf( "使用数组的数组值\n");
    for (int i = 0; i < 5; i++ ) {
        printf("*(var + %d) : %d\n",  i, *(var + i) );
    }
    
    printf( "使用数组指针的数组值\n");
    for (int i = 0; i < 5; i++ ) {
        printf("*(p + %d) : %d\n",  i, *(p + i) );
    }

    return 0;
}

/* >>
使用数组的数组值
*(p + 0) : 1
*(p + 1) : 2
*(p + 2) : 3
*(p + 3) : 4
*(p + 4) : 5
使用数组指针的数组值
*(var + 0) : 1
*(var + 1) : 2
*(var + 2) : 3
*(var + 3) : 4
*(var + 4) : 5
*/
```

> 怎么样？懵了吧。哈哈哈🤣

上述我们说过数组本身就是个常量指针，它指向数组第一个元素的内存地址`&var[0]`，且不可变。所以 `*var=var[0]`。这样你就明白了，数组名可以当作指针使用。那么`p`指针呢？`p`指代了`var`指针，所以其实你不用也无伤大雅。



### 指针和函数

指针和函数的结合可就有意思了。分为**指针参数**，**指针返回值**，**函数指针**，**回调函数**。

#### 指针参数

顾名思义，就是指针做函数的参数。

>  那么你想到了什么？ 什么\~? 啥都没想到？ 请“出去”😤。

```c
// 交换函数
void swap(int* varA, int* varB) {
	int tmp = *varA;
	*varA = *varB;
	*varB = tmp;
} 
```

我们的交换函数就使用了指针参数。**指针变量存储的就是内存地址**。那么我们可以这么想，`swap` 函数中将内存地址作为参数传递给函数。`tmp`接受了`*varA`的地址上的值，`*varA`修改成`*varB`地址上的值，最后`*varB`修改成`tmp`的存储的值。你要清楚 房产证上改名了是真滴改名了！



#### 指针返回值

顾名思义，就是指针变量做函数的返回值。

::: tip

C 不支持在调用函数时返回局部变量的地址，除非定义局部变量为 static 变量。

:::

> 那么你想到了什么？ 什么\~? 啥都没想到？ 那就对了，前面可没出现过😉。

```c
// 函数返回一个指针，指向数组中的最大元素
int* findMax(int arr[], int size) {
	if (size == 0) {
		return NULL; // 如果数组为空，返回空指针
	}
	int maxIndex = 0;
	for (int i = 1; i < size; i++) {
		if (arr[i] > arr[maxIndex]) {
			maxIndex = i;
		}
	}
	return &arr[maxIndex]; // 返回指向最大元素的指针
}
```





#### 函数指针

函数指针是指向函数的指针变量。函数指针可以像一般函数一样，用于调用函数、传递参数。

::: tip

一般 C 语言中的函数指针不会单独使用，而会作为回调函数使用，允许将函数作为参数传递给其他函数。

:::

```c
#include <stdio.h>

int max(int x, int y) {
	return x > y ? x : y;
}

int main(void) {
	/* p 是函数指针 */
	int (* p)(int, int) = & max; // &可以省略
	int a = 1, b = 2, c = 3, d;
	/* 与直接调用函数等价，d = max(max(a, b), c) */
	d = p(p(a, b), c);
	printf("最大的数字是: %d\n", d);
	return 0;
}
```

> 看不懂也没关系，你已经很棒了。🙂



#### 回调函数

函数指针变量可以作为某个函数的参数来使用的，回调函数就是一个通过函数指针调用的函数。通俗来说，回调函数是别人的函数执行时调用你实现的函数。

> 回调函数是一个重点，建议你好好学习一下。你可以结合JS中的回调函数理解。

```c
#include <stdio.h>

// 回调函数类型定义
typedef void (*CallbackFunc)(int);

// 执行操作，并在操作完成后调用回调函数
void performOperation(int data, CallbackFunc callback) {
	// 执行某个操作
	printf("执行操作：%d\n", data);
	// 操作完成后调用回调函数
	callback(data);
}

// 回调函数实现
void callbackFunction(int data) {
	printf("回调函数被调用，参数为：%d\n", data);
}

int main() {
	int data = 42;
	// 调用 performOperation 函数，并传递回调函数作为参数
	performOperation(data, callbackFunction);
	return 0;
}

/* >>
执行操作：42
回调函数被调用，参数为：42
*/
```





### 指针的指针

#### 指针嵌套

还用我说嘛，指向指针的指针就是指针嵌套。指向指针的指针是一种多级间接寻址的形式，或者说是一个指针链。

> 指针已经让人麻了，指针的指针不得让人瘫了。🙃

```c
#include <stdio.h>

int main () {
	int  var = 100;
	/* 获取 var 的地址 */
	int* ptr1 = &var;
	/* 使用运算符 & 获取 ptr1 的地址 */
	int** ptr2 = &ptr1;
	/* 获取值 */
	printf("var的值： %d\n", var );
	printf("ptr1的值： %p\n", ptr1 );
	printf("*ptr1的值： %d\n", *ptr1 );
	printf("ptr2的值： %p\n", ptr2);
	printf("*ptr2的值： %p\n", *ptr2);
	printf("**ptr2的值： %d\n", **ptr2);
	return 0;
}
/* >>
var的值： 100
ptr1的值： 000000xxx
*ptr1的值： 100
ptr2的值： 000000xxx
*ptr2的值： 000000xxx
**ptr2的值： 100
*/
```

你看到的`**ptr2`这样的东西，`**`就是指针嵌套的声明方式，想当然`**`也是指针嵌套变量的取值符。指针嵌套就像个纸老虎，看起来麻烦，但其实还真不简单。你得时刻分清楚`*`是指针的声明类型，还是取值符。学过C++的都知道，C++中的引用可以被视为一种更安全和方便的指针替代方式。

> 最终到我想吐槽的地方了，`*`作为指针的声明类型，又作为取值符，真的很让人混淆。`**ptr`这种就更让人头昏了，满头星星。 所以我推崇的一种方式是将`*`与数据类型结合起来，比如`int* ptr`。🧐

图2



### 指针和结构体

#### 结构体指针

如果你学过数据结构，你可能看过许多结构体中有指针的身影。结构体指针在数据结构中有大量运用。

::: tip 提示

**结构体**使用点运算符（`.`）获取属性；**结构体指针**使用箭头运算符（`->`）获取属性。

:::

```c
typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode* next;
} LNode, *LinkNode;

// 头插法创建链表
void CreateListF(LinkNode* L, ElemType a[], int n) {
    LinkNode s;
    *L = (LinkNode)malloc(sizeof(LNode));
    (*L)->next = NULL;
    for (int i = 0; i < n; i++) {
        s = (LinkNode)malloc(sizeof(LNode));
        s->data = a[i];
        s->next = (*L)->next;
        (*L)->next = s;
    }
}

// 尾插法创建链表
void CreateListR(LinkNode* L, ElemType a[], int n) {
    LinkNode s, r;
    *L = (LinkNode)malloc(sizeof(LNode));
    r = *L;
    for (int i = 0; i < n; i++) {
        s = (LinkNode)malloc(sizeof(LNode));
        s->data = a[i];
        r->next = s;
        r = s;
    }
    r->next = NULL;
}

// 销毁单链表
void DestroyList(LinkNode* L) {
    LinkNode ptr = *L, p = (*L)->next;
    while (p != NULL) {
        free(ptr);
        ptr = p;
        p = ptr->next;
    }
    free(ptr);
}

```

上面是一个单链表，我就不就行讲解了。如果你有数据结构的基础，想必你比我懂。我来讲讲结构体指针获取属性，结构体使用点运算符获取属性而结构体指针使用箭头运算符获取属性。其实箭头运算符算一个”语法糖“，它简化了`(*ptr).data`的写法为`ptr->data`。



## 写在最后

> 恭喜你了解了C语言指针🎉。本文只是将指针相关知识系统化总结一下，省略了大部分解释和说明。如有需要可查询相关资料。

C语言的指针是一个很神奇的东西，如果学习好了，可如利剑。如学不好，那就没学好。

指针允许程序直接访问和操作内存地址，这也是C语言可与系统交互的重要原因之一。



## 参考三三

- https://www.runoob.com/cprogramming/c-pointers.html
