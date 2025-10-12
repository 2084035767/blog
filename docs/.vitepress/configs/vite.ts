import type { DefaultTheme } from 'vitepress'
import { RssPlugin } from 'vitepress-plugin-rss'
export const vite  = {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    plugins: [
      RssPlugin({
        title: '为自由献诗',
        copyright: 'Copyright © 2021-present zs',
        description: '任何限制自由的链条都将束缚我们的灵魂',
        author: {
          name: '子十',
          email: 'jiangtzs@foxmail.com',
        },
        language: 'zh-CN',
        icon: true,
        baseUrl: 'https://www.jtao.fun',
        filter: page => page.filepath.includes('/post/'),
      }),
    ],

};