import { defineConfig } from 'vitepress'
import { head, nav, sidebar } from './configs'

export default defineConfig({
  // outDir: '../dist',
  // base: '/',
  // cleanUrls: true,
  /* markdown 配置 */

  lang: 'zh-CN',
  title: '为自由献诗',
  description: '这是子十的博客',
  head,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    math: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
  /* 主题配置 */
  themeConfig: {
    nav,
    sidebar,
    i18nRouting: false,
    logo: '/logo.jpg',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    footer: {
      message: '如有转载或 CV 请标注本站原文地址',
      copyright: 'Copyright © 2021-present zs',
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
  },
  // vite 配置,取消sass警告
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
})
