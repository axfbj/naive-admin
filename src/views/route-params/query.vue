<template>
  <div class="flex justify-center items-center h-full mt-16">
    <n-card :style="{ width: '400px' }" title="演示路由跳转通过 query 方式传递参数">
      <n-space direction="vertical" fill>
        <n-input v-model:value="id" placeholder="请输入id值" />
        <n-button type="primary" size="small" long @click="onClick">跳转</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const id = ref('')

  const router = useRouter()
  function onClick() {
    router.push({
      path: '/params-info/query',
      query: {
        id: id.value || new Date().getTime(),
      },
    })
  }
</script>
