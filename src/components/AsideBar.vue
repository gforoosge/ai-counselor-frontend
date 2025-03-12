<script setup lang="ts">
import AsiderFooter from '@/components/AsideFooter.vue';
import HistoryItem from '@/components/HistoryItem.vue';

const history = [
  { id: '1', title: '1' },
  { id: '2', title: '2' },
  { id: '3', title: '3' }
];
</script>

<template>
  <aside
    class="w-60 h-screen bg-neutral-50 fixed top-0 -left-60 md:left-0 flex flex-col py-10 px-5 transition-[left]"
  >
    <div class="text-xl font-bold mb-5">对话记录</div>

    <div v-if="history.length" class="h-full overflow-y-auto">
      <HistoryItem
        v-for="(item, index) in history"
        :id="item.id"
        :key="index"
        :title="item.title"
      />
    </div>

    <div v-else class="h-full">
      <span class="text-gray-400">暂无对话记录</span>
    </div>

    <AsiderFooter />
  </aside>
</template>
