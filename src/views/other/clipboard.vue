<template>
  <n-card title="请输入内容" :content-style="{ padding: '10px' }">
    <n-input-group>
      <n-input :style="{ width: '50%' }" v-model:value="content" placeholder="请输入内容" />
      <n-button ghost type="primary" class="copy" :data-clipboard-text="content" @click="onCopy">
        复制
      </n-button>
    </n-input-group>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useMessage } from 'naive-ui'
  import { useClipboard } from '@vueuse/core'

  export default defineComponent({
    name: 'Clipboard',
    setup() {
      const content = ref('')
      const message = useMessage()
      const { copy, isSupported, text } = useClipboard({ source: content })
      const onCopy = () => {
        copy(content.value).then(() => {
          message.success('复制成功，内容为：' + text.value)
        })
      }
      if (!isSupported) {
        message.error('当前浏览器不支持此功能')
      }
      return {
        content,
        onCopy,
      }
    },
  })
</script>
