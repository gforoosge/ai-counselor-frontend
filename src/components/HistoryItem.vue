<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true }
});

const isActive = computed(
  () => router.currentRoute.value.params['id'] == props.id
);
</script>

<template>
  <div
    :class="{ 'bg-neutral-300': isActive, 'hover:bg-neutral-200': !isActive }"
    class="flex items-center justify-between my-2 px-3 py-2 rounded-xl cursor-pointer transition-colors"
    @click="() => router.push({ name: 'chat', params: { id } })"
  >
    <div class="w-full overflow-hidden text-ellipsis">
      <span class="text-sm text-nowrap break-keep select-none">
        {{ title }}
      </span>
    </div>
  </div>
</template>
