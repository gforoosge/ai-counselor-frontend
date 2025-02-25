<script setup lang="ts">
defineProps({
  modelValue: Object,
  placeholder: { type: String, default: '' },
});
</script>

<template>
  <textarea
    v-bind="modelValue"
    class="outline-none p-5 w-full pre-wrap break-words resize-none max-h-60 text-md"
    :placeholder="placeholder"
  ></textarea>
</template>
