---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 为自由献诗
  text: 子十的成长之路
  tagline: 任何限制自由的链条都将束缚我们的灵魂
  image:
    src: /logo.png
    alt: 背景图
  actions:
    - text: 博客
      link: /post/
    - text: 关于我
      link: /about
      theme: alt
features:
  - title: 保持好奇
    icon: 🤔
    details: 对一切事物保持原有的好奇心，去思考，去理解，去发现。
  - title: 专注自我
    icon: 🧐
    details: 观察自己，了解自己，突破自己，不要让外界干扰你的判断。
  - title: 分享交流
    icon: 🤗
    details: 在记录与分享的过程中，梳理所学，交流所得，必有所获。
---


<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
