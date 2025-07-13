---
layout: page
---

<script setup>
    import {VPTeamPage,VPTeamPageTitle,VPTeamMembers } from 'vitepress/theme'
    const members = [{
        avatar: '',
        name: '暂无',
        title: '',
        links: [{ icon: 'github', link: '' }]
},]
</script>

<VPTeamPage>
<VPTeamPageTitle>
    <template #title>MY PROJECT</template>
    <template #lead>敬请期待</template>
</VPTeamPageTitle>
</VPTeamPage>