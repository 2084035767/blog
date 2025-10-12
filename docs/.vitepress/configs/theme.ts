import type { DefaultTheme } from 'vitepress'
import { nav } from './nav'
import { sidebar } from './sidebar'
export const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,
  i18nRouting: true,
  logo: '/logo.png',
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
    copyright: `Copyright © 2021-${new Date().getFullYear()} 子十`,
  },
  darkModeSwitchLabel: '外观',
  returnToTopLabel: '返回顶部',
  lastUpdatedText: '上次更新',
  docFooter: {
    prev: '上一篇',
    next: '下一篇',
  },
  socialLinks: [
    {
      icon: 'gitee',
      link: 'https://gitee.com/zs2084035767',
    },
  ],
}
