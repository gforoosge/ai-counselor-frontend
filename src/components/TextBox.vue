<script setup lang="ts">
import { computed } from 'vue';

defineEmits(['submit']);

const model = defineModel({ type: String, default: '' });
const props = defineProps({
  placeholder: { type: String, default: '' },
  disabled: {
    type: Boolean,
    default: false
  },
  acceptReturn: {
    type: Boolean,
    default: false
  },
  padding: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  }
});

const classes = computed(() => {
  return [
    'outline-none',
    'h-auto',
    'w-full',
    'text-md',
    props.padding ? 'p-5' : ''
  ];
});
</script>

<template>
  <textarea
    v-if="acceptReturn"
    v-model="model"
    class="pre-wrap break-words resize-none max-h-60"
    :class="classes"
    :placeholder="placeholder"
    :disabled="disabled"
    @keydown.enter.prevent="$emit('submit')"
  />

  <input
    v-else
    v-model="model"
    :class="classes"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="type"
    autocomplete="off"
    @keydown.enter.prevent="$emit('submit')"
  />
</template>
