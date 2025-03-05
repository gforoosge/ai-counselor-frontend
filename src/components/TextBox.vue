<script setup lang="ts">
defineProps({
  placeholder: { type: String, default: '' },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['submit']);

const model = defineModel({ type: String, default: '' });
</script>

<template>
  <textarea
    v-model="model"
    class="outline-none p-5 h-auto w-full pre-wrap break-words resize-none max-h-60 text-md"
    :placeholder="placeholder"
    :disabled="disabled"
    @keydown.enter.prevent="$emit('submit')"
  />
</template>
