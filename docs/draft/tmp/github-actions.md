---
title: 关于| GitHub Actions
date: 2023-10-11
categories:
  - 知识科普
tags:
  - GitHub
---

## GitHub Actions 组件

你可以配置一个 GitHub Actions **工作流（workflow**），它会在你的仓库发生某个事件时被触发，就比如一个 pull request 或者一个 issue 被创建的时候。

你的工作流包含一个或者多个**任务（jobs）**， 它们可以并行或者串行执行。每一个任务（jobs）都会在它自己的虚拟机**运行器(runner)\**上，任务可以有一个或者多个\**步骤（steps）**，可以运行一个自定义的脚本或者运行一个**动作（action）**，所谓动作（action）是一个可复用的扩展，用于简化你的工作流。

### Workflows（工作流）

工作流是一个可配置的自动化的程序。创建一个工作流，你需要定义一个 YAML 文件，当你的仓库触发某个事件的时候，工作流就会运行，当然也可以手动触发，或者定义一个时间表。

一个仓库可以创建多个工作流，每一个都执行不同的步骤，举个例子，一个工作流用于构建和测试 pull request，一个用于部署你的应用，再来一个，当有人新建 issue 的时候自动添加一个标签。

你也可以在一个工作流中引用另外一个工作流，查看「[可复用工作流](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fen%2Factions%2Flearn-github-actions%2Freusing-workflows)」。

### 事件（Events）

事件是指仓库触发运行工作流的具体的行为，比如创建一个 pull request，新建一个 issue、或者推送一个 commit。你也可以使用时间表触发一个工作流，或者通过请求一个 REST API，再或者手动触发。

事件完整的列表，可以查看「[触发工作流的事件](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fen%2Factions%2Freference%2Fevents-that-trigger-workflows)」。

### 任务（Jobs）

任务是在同一个运行器上执行的一组步骤（steps）。一个步骤（steps）要么是一个shell 脚本（script）要么是一个动作（action）。步骤会顺序执行，并彼此独立。因为每一个步骤都在同一个运行器上被执行，所以你可以从一个步骤（step）传递数据到另一个步骤（step） 。

你可以配置一个任务依赖其他任务，默认情况下，任务没有依赖，并行执行。当一个任务需要另外一个任务的时候，它会等到依赖的任务完成再执行。

### 动作（Actions）

动作是 GitHub Actions 平台的一个自定义的应用，它会执行一个复杂但是需要频繁重复的作业。使用动作可以减少重复代码。比如一个 action 可以实现从 GitHub 拉取你的 git 仓库，为你的构建环境创建合适的工具链等。

你可以写自己的动作 ，或者在 GitHub 市场找已经实现好的动作。

### 运行器（Runners）

一个运行器是一个可以运行工作流的服务。每一个运行器一次只运行一个单独的任务。GitHub 提供 Ubuntu Linux，Microsoft Windows 和 macOS 运行器，每一个工作流都运行在一个独立新建的虚拟机中。如果你需要一个不同的操作系统，你可以自定义运行器。请查看「[自定义运行器](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fen%2Factions%2Fhosting-your-own-runners)」。

## 创建一个工作流

GitHub Actions 使用 YAML 语法定义工作流。每一个工作流保存为一个独立的 YAML 文件，目录是 `.github/workflows` 。

现在我们在代码仓库创建一个示例工作流，当代码被推送的时候，会自动执行一系列的命令。在这个示例工作流中，GitHub Actions 会检出提交的代码，安装依赖，运行 `bats -v`：

1. 在你的仓库，创建一个 `.github/workflows/` 目录
2. 在 `.github/workflows/` 目录，创建一个文件，名为 `learn-github-actions.yml` ，添加下面的代码：

```yaml
yaml复制代码name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

1. 提交这些改动，推送到你的 GitHub 仓库。

你的新 GitHub Actions 工作流文件就会被安装在你的仓库，当有人提交代码的时候，工作流就会自动执行。关于一个任务的执行历史，查看「[查看工作流活动](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fcn%2Factions%2Flearn-github-actions%2Fintroduction-to-github-actions%23viewing-the-jobs-activity)」章节。

## 理解工作流文件

为了帮助你理解 YAML 语法，这节会解释例子中的每行代码：

```yaml
yaml
复制代码name: learn-github-actions
```

可选，工作流的名字，会出现在 GitHub 仓库的 Actions 选项栏里。

```yaml
yaml
复制代码on: [push]
```

指定工作流的触发事件。这个例子里，使用是 `push` 事件，当有人提交了一个代码修改或者合并了一个 pull request ，工作流就会触发。提交到每个分支都会被触发，如果你想在指定分支、路径、标签，查看 「[GitHub Actions 工作流语法](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Factions%2Freference%2Fworkflow-syntax-for-github-actions%23onpushpull_requestpaths)」

```yaml
yaml
复制代码jobs:
```

将运行在 `learn-github-actions` 工作流的所有任务分组在一起。

```yaml
yaml
复制代码check-bats-version:
```

定义了一个名为`check-bats-version` 的任务，子键（child key）会定义该任务的属性。

```yaml
yaml
复制代码  runs-on: ubuntu-latest
```

配置任务运行在最新的 Ubuntu Linux 运行器。

```yaml
yaml
复制代码 steps:
```

将 `check-bats-version` 任务下的所有步骤分为一组，嵌套的每一个条目都是一个独立的 action 或者 shell 脚本。

```yaml
yaml
复制代码- uses: actions/checkout@v2
```

`uses` 关键字指定了这个步骤运行 `actions/checkout` 动作的 `v2` 大版本 。这是一个可以检出仓库代码到运行器的动作，它允许你运行脚本或者其他动作侵入你的代码（比如构建或者测试工具）。

```yaml
yaml复制代码- uses: actions/setup-node@v2
  with:
    node-version: '14'
```

这个步骤会使用 `actions/setup-node@v2` 动作安装指定版本的 Nodejs ，这会在你的 `PATH` 加上 `node` 和 `npm` 命令。

```yaml
yaml
复制代码- run: npm install -g bats
```

`run` 关键字会告诉任务在运行器上执行一个命令。在这个例子中，你正在使用 `npm` 安装 `bats` 软件测试包。

```yaml
yaml
复制代码- run: bats -v
```

最终，你运行 `bats` 命令，传入一个可以打印软件版本的参数。

## 可视化工作流文件

在这个图表，你可以看到你刚创建的工作流文件，以及这些 GitHub Actions 组件是如何组织的。每一个步骤都会执行一个独立的动作或者脚本文件。任务1 和 2 是运行命令，任务3 和 任务 4 是运行脚本文件。找到更多预构建的动作，查看 「[查找和自定义动作](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.github.com%2Fcn%2Factions%2Flearn-github-actions%2Ffinding-and-customizing-actions)」。

##

现在我们再来看 GitHub 同步 Gitee 的代码，是不是就清楚很多了：

```yaml
yaml复制代码name: syncToGitee
on:
  push:
    branches:
      - gh-pages
jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Mirror the Github organization repos to Gitee.
        uses: Yikun/hub-mirror-action@master
        with:
          src: 'github/mqyqingfeng'
          dst: 'gitee/mqyqingfeng'
          dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}
          dst_token:  ${{ secrets.GITEE_TOKEN }}
          static_list: "learn-typescript"
          force_update: true
          debug: true
```

在这个例子里，我们定义了一个名为 `syncToGitee` 的工作流，指定代码提交到分支 `gh-pages` 才触发工作流。

任务下只有一个名为 `repo-sync` 的任务，运行在 `ubuntu-latest`，具体的步骤下，也只有一个名为 `Mirror the GitHub organization repos to Gitee.` 的步骤，使用了 `Yikun/hub-mirror-action@master` 动作，而 `with` 里的内容则是该动作需要的一些参数。



## 二、基本概念

GitHub Actions 有一些自己的术语。

（1）**workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。

（2）**job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

（3）**step**（步骤）：每个 job 由多个 step 构成，一步步完成。

（4）**action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

## 三、workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录。

workflow 文件采用 [YAML 格式](http://www.ruanyifeng.com/blog/2016/07/yaml.html)，文件名可以任意取，但是后缀名统一为`.yml`，比如`foo.yml`。一个库可以有多个 workflow 文件。GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会自动运行该文件。

workflow 文件的配置字段非常多，详见[官方文档](https://help.github.com/en/articles/workflow-syntax-for-github-actions)。下面是一些基本字段。

**（1）`name`**

`name`字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名。

> ```bash
> name: GitHub Actions Demo
> ```

**（2）`on`**

`on`字段指定触发 workflow 的条件，通常是某些事件。

> ```bash
> on: push
> ```

上面代码指定，`push`事件触发 workflow。

`on`字段也可以是事件的数组。

> ```bash
> on: [push, pull_request]
> ```

上面代码指定，`push`事件或`pull_request`事件都可以触发 workflow。

完整的事件列表，请查看[官方文档](https://help.github.com/en/articles/events-that-trigger-workflows)。除了代码库事件，GitHub Actions 也支持外部事件触发，或者定时运行。

**（3）`on.<push|pull_request>.<tags|branches>`**

指定触发事件时，可以限定分支或标签。

> ```bash
> on:
>   push:
>     branches:    
>       - master
> ```

上面代码指定，只有`master`分支发生`push`事件时，才会触发 workflow。

**（4）`jobs.<job_id>.name`**

workflow 文件的主体是`jobs`字段，表示要执行的一项或多项任务。

`jobs`字段里面，需要写出每一项任务的`job_id`，具体名称自定义。`job_id`里面的`name`字段是任务的说明。

> ```javascript
> jobs:
>   my_first_job:
>     name: My first job
>   my_second_job:
>     name: My second job
> ```

上面代码的`jobs`字段包含两项任务，`job_id`分别是`my_first_job`和`my_second_job`。

**（5）`jobs.<job_id>.needs`**

`needs`字段指定当前任务的依赖关系，即运行顺序。

> ```javascript
> jobs:
>   job1:
>   job2:
>     needs: job1
>   job3:
>     needs: [job1, job2]
> ```

上面代码中，`job1`必须先于`job2`完成，而`job3`等待`job1`和`job2`的完成才能运行。因此，这个 workflow 的运行顺序依次为：`job1`、`job2`、`job3`。

**（6）`jobs.<job_id>.runs-on`**

`runs-on`字段指定运行所需要的虚拟机环境。它是必填字段。目前可用的虚拟机如下。

> - `ubuntu-latest`，`ubuntu-18.04`或`ubuntu-16.04`
> - `windows-latest`，`windows-2019`或`windows-2016`
> - `macOS-latest`或`macOS-10.14`

下面代码指定虚拟机环境为`ubuntu-18.04`。

> ```javascript
> runs-on: ubuntu-18.04
> ```

**（7）`jobs.<job_id>.steps`**

`steps`字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。

> - `jobs.<job_id>.steps.name`：步骤名称。
> - `jobs.<job_id>.steps.run`：该步骤运行的命令或者 action。
> - `jobs.<job_id>.steps.env`：该步骤所需的环境变量。

下面是一个完整的 workflow 文件的范例。

> ```javascript
> name: Greeting from Mona
> on: push
> 
> jobs:
>   my-job:
>     name: My Job
>     runs-on: ubuntu-latest
>     steps:
>     - name: Print a greeting
>       env:
>         MY_VAR: Hi there! My name is
>         FIRST_NAME: Mona
>         MIDDLE_NAME: The
>         LAST_NAME: Octocat
>       run: |
>         echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
> ```

上面代码中，`steps`字段只包括一个步骤。该步骤先注入四个环境变量，然后执行一条 Bash 命令。

## 参考三三

- [还不会用 GitHub Actions ？看看这篇 - 掘金 (juejin.cn)](https://juejin.cn/post/7042619884643024903)
- [GitHub Actions 入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
