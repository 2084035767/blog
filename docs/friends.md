---
layout: page
---

<script setup>
    import {VPTeamPage,VPTeamPageTitle,VPTeamMembers } from 'vitepress/theme'
    const members = [{
        avatar: '',
        name: '暂无',
        title: '',
        links: [{ icon: 'github', link: '' },
                { icon: 'twitter', link: '' }]
},]
</script>
<VPTeamPage>
<VPTeamPageTitle>
    <template #title>MY FRIENDS</template>
    <template #lead>等什么，快来交换吧</template>
</VPTeamPageTitle>
<!--
 <VPTeamMembers size="small" :members="members"/>
-->

</VPTeamPage>

