<script setup lang="ts">
import router from '@/router/inedx';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true }
});

const isActive = computed(
  () => router.currentRoute.value.params['id'] == props.id
);
</script>

<template>
  <RouterLink :to="{ name: 'chat', params: { id } }">
    <div
      :class="{ 'bg-neutral-300': isActive, 'hover:bg-neutral-200': !isActive }"
      class="flex items-center justify-between my-2 px-3 py-2 rounded-xl cursor-pointer transition-colors"
    >
      <span class="text-sm">{{ title }}</span>
    </div>
  </RouterLink>
</template>
