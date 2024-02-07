import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/base/': [
    {
      text: '前端',
      // collapsed: false,
      items: [
        { text: 'HTML 入门', link: '/base/html' },
        { text: 'CSS 入门', link: '/base/css' },
      ],
    },
    {
      text: '后端',
      // collapsed: false,
      items: [
        { text: 'Python 入门', link: '/base/python' },
        { text: '计算机基础', link: '/base/cs' },
        { text: '数据库理论', link: '/base/db' },
      ],
    },
  ],
}
