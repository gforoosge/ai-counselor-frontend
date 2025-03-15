<script setup lang="ts">
import TextBox from '@/components/TextBox.vue';

defineProps({
  type: { type: String, default: 'text' }
});
const model = defineModel({ type: String, default: '' });
</script>

<template>
  <TextBox
    v-model="model"
    :padding="false"
    :type="type"
    class="border-2 rounded-lg p-2 border-gray-300 hover:border-gray-400 focus:border-gray-500 transition-colors bg-white"
  />
</template>
