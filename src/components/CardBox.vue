<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: null
  }
});
</script>

<template>
  <div class="bg-gray-50 rounded-xl pt-7 pb-10 px-10 flex flex-col">
    <div v-if="title" class="text-2xl text-center font-bold mb-5">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>
