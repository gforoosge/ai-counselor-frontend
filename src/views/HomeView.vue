<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>
<template>
  <DefaultLayout>
    <div class="flex-grow flex flex-col justify-center items-center h-full">
      <div class="text-2xl m-3">HFUT 智能辅导员</div>
      <AskTextBox />
    </div>
  </DefaultLayout>
</template>
