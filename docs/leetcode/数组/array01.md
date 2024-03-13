---
order: 1
---

# Binary Search

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.



**Example 1:**

```txt
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

**Example 2:**

```txt
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

 

**Constraints:**

- `1 <= nums.length <= 104`
- `-104 < nums[i], target < 104`
- All the integers in `nums` are **unique**.
- `nums` is sorted in ascending order.

## 思路

**premise**

- 数组为有序数组
- 数组中无重复元素



::: info 扩展

**循环不变量规则**：在二分查找的过程中，保持不变量（**区间的定义就是不变量**），就是在while寻找中每一次边界的处理都要坚持根据区间的定义来操作。

:::



### 左闭右闭

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size() - 1; // 左闭右闭的区间 [left, right]
        while (left <= right) {
            int middle = (left + right) / 2
            if (nums[middle] > target) {
                right = middle - 1; // target 在左区间，所以[left, middle - 1]
            } else if (nums[middle] < target) {
                left = middle + 1; // target 在右区间，所以[middle + 1, right]
            } else { 
                return middle; // 返回下标
            }
        }
        return -1;
    }
};
```

- 时间复杂度：O(log n)
- 空间复杂度：O(1)



### 左闭右开

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size(); // 在左闭右开的区间里 [left, right)
        while (left < right) { 
            int middle = (left + right)/2
            if (nums[middle] > target) {
                right = middle; // target 在左区间，在[left, middle)中
            } else if (nums[middle] < target) {
                left = middle + 1; // target 在右区间，在[middle + 1, right)中
            } else {
                return middle; // 返回下标
            }
        }
        return -1;
    }
};
```

- 时间复杂度：O(log n)
- 空间复杂度：O(1)
