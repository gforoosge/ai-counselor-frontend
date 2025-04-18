<script setup lang="ts">
import router from '@/router';
import { mdiDeleteOutline } from '@mdi/js';
import { computed } from 'vue';
import BaseIcon from './BaseIcon.vue';
import manager from '@/services/chat/manager';

const emit = defineEmits(['delete']);

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true }
});

const isActive = computed(
  () => router.currentRoute.value.params['id'] == props.id
);

async function confirmDelete() {
  const confirm = window.confirm('确定要删除吗？');
  if (confirm) {
    await manager.remove(props.id);

    if (isActive.value) {
      const all = await manager.getAllChatInfo();
      if (all.length === 0) {
        router.push({ name: 'new' });
      } else {
        router.push({ name: 'chat', params: { id: all[0].id } });
      }
    }
    emit('delete', props.id);
  }
}
</script>

<template>
  <div
    :class="{ 'bg-neutral-300': isActive, 'hover:bg-neutral-200': !isActive }"
    class="flex items-center justify-between my-2 px-3 py-2 rounded-xl cursor-pointer transition-colors group"
    @click="() => router.push({ name: 'chat', params: { id } })"
  >
    <div class="w-full overflow-hidden text-ellipsis">
      <span class="text-sm text-nowrap break-keep select-none">
        {{ title }}
      </span>
    </div>

    <button
      class="group-hover:opacity-100 opacity-0 transition-opacity transition-color hover:text-red-400 cursor-pointer rounded"
      @click="confirmDelete"
    >
      <BaseIcon :path="mdiDeleteOutline" />
    </button>
  </div>
</template>
