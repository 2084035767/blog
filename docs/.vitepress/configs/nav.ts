import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '博文', link: '/post/', activeMatch: '^/post/' },
  { text: '文档', link: '/base/', activeMatch: '^/base/' },
  { text: '友链', link: '/friends', activeMatch: '^/friends' },
  { text: '关于', link: '/about', activeMatch: '^/about' },
]
