<script setup lang="ts">
import AsiderFooter from '@/components/AsideFooter.vue';
import HistoryItem from '@/components/HistoryItem.vue';
import manager from '@/services/chat/manager';
import { ChatInfo } from '@/types/chat';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const history = ref<ChatInfo[]>([]);
const isLoading = ref(true);
const toast = useToast();

updateHistory();

async function updateHistory() {
  try {
    history.value = await manager.getAllChatInfo();
  } catch (error) {
    console.error(error);
    toast.error('加载对话记录失败。' + error);
  }
  isLoading.value = false;
}
</script>

<template>
  <aside
    class="w-60 h-screen bg-neutral-100 fixed top-0 -left-60 md:left-0 flex flex-col py-10 px-5 transition-[left]"
  >
    <div class="text-xl font-bold mb-5 select-none">对话记录</div>

    <div v-if="isLoading" class="h-full text-sm">
      <span class="text-gray-400 select-none">加载中...</span>
    </div>

    <div v-else-if="history.length" class="h-full overflow-y-auto -ml-2">
      <HistoryItem
        v-for="(item, index) in history"
        :id="item.id"
        :key="index"
        :title="item.title"
        @delete="updateHistory"
      />
    </div>

    <div v-else class="h-full text-sm select-none">
      <span class="text-gray-400">暂无对话记录</span>
    </div>

    <AsiderFooter />
  </aside>
</template>
