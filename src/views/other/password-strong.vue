<template>
  <n-card title="密码强度组件" segmented>
    <div class="w-1/3" style="margin: 0 auto">
      <n-input v-model:value="password1" placeholder="请输入密码" />
      <PasswordStrong :input-value="password1" />
      <n-input v-model:value="password2" placeholder="请再次输入密码" />
      <div class="mt-5 text-center">
        <n-button size="small" type="primary" round style="width: 100%">确定</n-button>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const password1 = ref('')
  const password2 = ref('')
</script>
