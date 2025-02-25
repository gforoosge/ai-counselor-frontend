<script setup lang="ts">
import FooterBar from '@/components/FooterBar.vue';
</script>

<template>
  <div class="min-h-screen w-screen flex flex-col">
    <slot></slot>
    <FooterBar />
  </div>
</template>
