<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue';
import { mdiRefresh } from '@mdi/js';
import { ref } from 'vue';

const emit = defineEmits(['click']);
const data = [
  '你是谁 你能做什么',
  '怎么转专业',
  '校园卡丢了如何办理',
  '什么时候放假',
  '大一怎么选课',
  '图书馆104一站式服务中心能做什么'
];
const value = ref([] as string[]);

update();
function update() {
  value.value.splice(0);

  data
    .map((s) => ({ priority: Math.random(), value: s }))
    .sort((a, b) => a.priority - b.priority)
    .filter(({ value: v }) => !value.value.includes(v))
    .slice(0, 3)
    .forEach((i) => {
      value.value.push(i.value);
    });
}
</script>

<template>
  <div class="mt-10 text-sm">
    <div class="text-gray-500 text-center">尝试这样问我...</div>
    <div class="flex flex-col items-center">
      <TransitionGroup>
        <div
          v-for="(text, index) in value"
          :key="index"
          class="rounded-xl bg-gray-200 m-2 py-2 px-3 cursor-pointer hover:bg-gray-300 transition-all size-fit"
          @click="() => emit('click', text)"
        >
          {{ text }}
        </div>
      </TransitionGroup>
    </div>
    <div class="text-center mt-2 text-md">
      <button
        type="button"
        class="bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-all rounded-full p-2"
        @click="update"
      >
        <BaseIcon :path="mdiRefresh" />
      </button>
    </div>
  </div>
</template>
