<!-- Projects.vue -->
<template>
  <VPTeamPageTitle>
    <template #title> MY WORKS </template>
    <template #lead>欢迎 Star / PR</template>
  </VPTeamPageTitle>

  <div class="project-grid">
    <ProjectCard
      v-for="p in projects"
      :key="p.name"
      :name="p.name"
      :desc="p.desc"
      :links="p.links"
      :tags="p.tags"
    />
  </div>
</template>

<script setup lang="ts">
import { VPTeamPageTitle } from 'vitepress/theme'
import ProjectCard from './ProjectCard.vue'

// 想加项目直接往数组里 push
const projects = [
  {
    name: '在线简历',
    desc: '极简、响应式的「个人介绍 + 简历」页面，100% 纯前端，零后端依赖。',
    links: {
      icon: 'gitee',
      url: 'https://gitee.com/zs2084035767/online-resume.git',
    },
    tags: ['React', 'Vite', 'TypeScript'],
  },
]
</script>

<style scoped lang="scss">
/* ========== 网格 ========== */
.project-grid {
  display: grid;
  gap: var(--card-gap);
  margin-top: 2rem;
  /* 防止超宽屏被无限拉伸，整体居中 */
  max-width: 1440px;
  // margin: 0 auto;

  /* 默认 1 列 */
  grid-template-columns: 1fr;
  padding-inline: var(--card-phone);

  @media (min-width: 640px) {
    padding-inline: var(--card-pad);
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 960px) {
    padding-inline: var(--card-pc);
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
