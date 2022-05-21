<template>
  <n-card>
    <template #header>
      <div>以下是项目中 src/icons 目录下的所有的在本项目中使用 svg 文件。鼠标放上，可以复制</div>
    </template>
    <n-grid cols="xs:2 s:3 m:4 l:6 xl:8" class="icon-parent" responsive="screen">
      <n-grid-item v-for="item of icons" :key="item">
        <div class="flex flex-col items-center justify-center icon-wrapper">
          <SvgIcon prefix="svg" :name="item" style="font-size: 30px" />
          <div class="text-xs">{{ item }}</div>
          <div class="text-center copy" @click="onCopy(item)"> 复制 </div>
        </div>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  // import Iconfonts from '@/icons/iconfont/iconfont.json'
  import { useMessage } from 'naive-ui'
  import { useClipboard } from '@vueuse/core'
  import {} from 'path-browserify'
  const svgs = import.meta.glob('/src/icons/*.svg')
  const svgFileName = Object.keys(svgs).map((it) => {
    return it.split('.')[0].split('/')[3]
  })

  export default defineComponent({
    name: 'IconFont',
    setup() {
      const message = useMessage()
      const icons = reactive([] as Array<string>)
      icons.push(...svgFileName)
      const { copy, isSupported } = useClipboard({ source: '' })
      const onCopy = (item: string) => {
        if (!isSupported) {
          message.error('当前浏览器不支持功能')
          return
        }
        copy(getCopyContent(item)).then(() => {
          message.success('复制成功')
        })
      }
      function getCopyContent(item: string) {
        return `<SvgIcon prefix="svg" name="${item}"></SvgIcon>`
      }
      return {
        icons,
        onCopy,
        getCopyContent,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .icon-parent {
    border-top: 1px solid #f7f7f7;
    border-left: 1px solid #f7f7f7;
    .icon-wrapper {
      position: relative;
      height: 100px;
      border-right: 1px solid #f7f7f7;
      border-bottom: 1px solid #f7f7f7;
      overflow: hidden;
      padding-bottom: 0;
      transition: padding-bottom 0.2s ease-in-out;
      &:hover {
        color: var(--primary-color);
        box-shadow: 0 0 10px #f0f0f0;
        padding-bottom: 22px;
        transition: padding-bottom 0.2s ease-in-out;
        .copy {
          cursor: pointer;
          background-color: var(--primary-color);
          transform: translateY(0);
          transition: transform 0.2s ease-in-out;
        }
      }
      .copy {
        position: absolute;
        background-color: var(--primary-color);
        padding: 5px 0;
        color: #fff;
        font-size: 12px;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
</style>
