<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useAccountStore } from '@/stores/account.ts';

const accountStore = useAccountStore();
const tips = [
  '你好像来到了无人的荒原。',
  '恭喜你解锁隐藏关卡',
  '这里什么都没有',
  '你是不是迷路了？',
  '你好像走错了地方',
  '这里是荒无人烟之地',
  '你好像迷路了'
];
</script>

<template>
  <BaseLayout :hide-aside="!accountStore.logined">
    <div class="flex items-center justify-center h-full flex-grow flex-col">
      <div class="text-4xl mb-5">404 Not found.</div>
      <div class="text-gray-500 text-lg">
        {{ tips[Math.floor(tips.length * Math.random())] }}
      </div>
    </div>
  </BaseLayout>
</template>
