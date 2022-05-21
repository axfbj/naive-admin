<template>
  <n-card title="tabbar操作" segmented>
    <n-space>
      <n-button type="primary" @click="onSetTitle"> 设置标题 </n-button>
      <n-button type="error" @click="onCloseTabbar"> 关闭当前标签页面，关跳转到默认页面 </n-button>
      <n-button type="warning" @click="onCloseTabbarAndPush">
        关闭当前标签页面，关跳转到指定的页面
      </n-button>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { useCloseTabbar, useCurrentTabbar } from '@/hooks/useTabbar'
  import { useMessage } from 'naive-ui'
  const currentTabbar = useCurrentTabbar()
  const closeTabbar = useCloseTabbar()
  const closeAndPushTabbar = useCloseTabbar()
  const message = useMessage()
  function onSetTitle() {
    currentTabbar!.meta!.title = '新的标题'
    message.success('设置标题成功')
  }
  function onCloseTabbar() {
    closeTabbar()
  }
  function onCloseTabbarAndPush() {
    closeAndPushTabbar({ path: '/index/work-place' })
  }
</script>
