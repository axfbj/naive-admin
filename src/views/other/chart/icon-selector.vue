<template>
  <n-card :header-style="{ padding: '10px' }" title="图标选择器" segmented>
    <n-space justify="center">
      <IconSelector v-model:value="icon" />
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { useMessage } from 'naive-ui'
  import { ref, watch } from 'vue'

  const message = useMessage()
  const icon = ref('LogoVue')
  watch(icon, () => {
    message.success('已选择：' + icon.value + ' 图标')
  })
</script>
