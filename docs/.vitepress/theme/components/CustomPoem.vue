<template>
  <div class="heti heti--ancient">
    <h2>{{ props.t }}</h2>
    <p class="heti-verse heti-x-large">
      <span v-for="(line, index) in props.p" :key="index">
        {{ line }}
        <br />
      </span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  t: {
    type: String,
    required: true,
  },
  p: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@import 'https://s4.zstatic.net/ajax/libs/heti/0.9.5/heti.min.css';
</style>
