import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '博文', link: '/post/', activeMatch: '^/post/' },
  // {
  //   text: '编程',
  //   items: [
  //     { text: '文档', link: '/base/', activeMatch: '^/base/' },
  //     { text: '源码', link: '/code/', activeMatch: '^/code/' },
  //     { text: '力扣', link: '/leetcode/', activeMatch: '^/leetcode/' },
  //   ],
  // },
  // { text: '笔记', link: '/note/', activeMatch: '^/note/' },
  { text: '作品', link: '/works', activeMatch: '^/works' },
  { text: '友链', link: '/friends', activeMatch: '^/friends' },
  { text: '关于', link: '/about', activeMatch: '^/about' },
]
