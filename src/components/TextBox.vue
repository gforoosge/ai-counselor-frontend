<script setup lang="ts">
defineProps({
  placeholder: { type: String, default: '' }
});

const model = defineModel({ type: String, default: '' });
</script>

<template>
  <textarea
    v-model="model"
    class="outline-none p-5 h-auto w-full pre-wrap break-words resize-none max-h-60 text-md"
    :placeholder="placeholder"
  />
</template>
