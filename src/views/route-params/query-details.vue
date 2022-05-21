<template>
  <div class="flex justify-center items-center h-full mt-16">
    <n-card :style="{ width: '400px' }" title="通过 query 方式传递参数如下：">
      {{ query }}
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const query = route.query
</script>
