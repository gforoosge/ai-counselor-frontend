<script setup lang="ts">
import { mdiAccount, mdiRobot } from '@mdi/js';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  role: {
    type: String,
    default: 'user'
  },
  text: {
    type: String,
    default: ''
  }
});

const isUser = props.role === 'user';
</script>

<template>
  <div class="m-10">
    <div class="flex" :class="isUser ? 'flex-row-reverse' : ''">
      <div class="mx-5">
        <div
          class="rounded-full p-1 flex items-center justify-center w-10 h-10"
          :class="isUser ? 'bg-stone-300' : 'bg-gray-300'"
        >
          <BaseIcon v-if="isUser" :path="mdiAccount" />
          <BaseIcon v-else :path="mdiRobot" />
        </div>
      </div>
      <div class="group">
        <div
          class="rounded-xl p-4 break-all"
          :class="isUser ? 'bg-stone-100 ' : 'bg-gray-100 '"
        >
          {{ text }}
        </div>
        <div v-if="!isUser" class="text-gray-500 text-xs m-1">
          <div class="select-none">内容由 AI 生成，请仔细甄别</div>
          <div
            class="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
          >
            {{ new Date().toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
