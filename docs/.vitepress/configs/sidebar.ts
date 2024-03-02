import type { DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export const sidebar: DefaultTheme.Config['sidebar'] = generateSidebar([
  {
    documentRootPath: '/docs',
    scanStartPath: 'post',
    resolvePath: '/post/',
    excludeFolders: ['img', 'books', 'poem'],
    sortMenusByFrontmatterOrder: true,
    useTitleFromFrontmatter: true,
  },
  {
    documentRootPath: '/docs',
    scanStartPath: 'base',
    resolvePath: '/base/',
    excludeFolders: ['img'],
    sortMenusByFrontmatterOrder: true,
    useTitleFromFrontmatter: true,
  },
  {
    documentRootPath: '/docs',
    scanStartPath: 'code',
    resolvePath: '/code/',
    excludeFolders: ['img'],
    // sortMenusByFrontmatterOrder: true,
    useTitleFromFileHeading: true,
  },
])
