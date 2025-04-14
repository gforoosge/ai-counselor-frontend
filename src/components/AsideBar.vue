<script setup lang="ts">
import AsiderFooter from '@/components/AsideFooter.vue';
import HistoryItem from '@/components/HistoryItem.vue';
import manager from '@/services/chat/manager';
import { ChatInfo } from '@/types/chat';
import { ref } from 'vue';

const history = ref<ChatInfo[]>([
  {
    id: '114514',
    title: '示例对话1',
    created_at: ''
  },
  {
    id: '114515',
    title: '示例对话2',
    created_at: ''
  }
]);
const isLoading = ref(true);

manager.getAllChatInfo().then(
  (data) => {
    history.value = data;
    isLoading.value = false;
  },
  () => (isLoading.value = false)
);
</script>

<template>
  <aside
    class="w-60 h-screen bg-neutral-100 fixed top-0 -left-60 md:left-0 flex flex-col py-10 px-5 transition-[left]"
  >
    <div class="text-xl font-bold mb-5 select-none">对话记录</div>

    <div v-if="isLoading" class="h-full text-sm">
      <span class="text-gray-400">加载中...</span>
    </div>

    <div v-else-if="history.length" class="h-full overflow-y-auto -ml-2">
      <HistoryItem
        v-for="(item, index) in history"
        :id="item.id"
        :key="index"
        :title="item.title"
      />
    </div>

    <div v-else class="h-full text-sm">
      <span class="text-gray-400">暂无对话记录</span>
    </div>

    <AsiderFooter />
  </aside>
</template>
