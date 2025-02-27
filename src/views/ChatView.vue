<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import ChatDialog from '@/components/ChatDialog.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout>
    <div class="flex-grow flex flex-col justify-center items-center h-full">
      <ChatDialog />
      <AskTextBox />
    </div>
  </DefaultLayout>
</template>
