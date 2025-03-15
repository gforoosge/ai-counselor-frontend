<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue';
defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  text: { type: String, required: true }
});
</script>

<template>
  <RouterLink class="my-3" :to="to">
    <div class="flex items-center hover:text-gray-500 select-none">
      <BaseIcon :path="icon" />
      <span class="ml-2">{{ text }}</span>
    </div>
  </RouterLink>
</template>
