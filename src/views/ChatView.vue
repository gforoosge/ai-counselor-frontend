<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import ChatConversation from '@/components/ChatConversation.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import router from '@/router/inedx';

const uuid = router.currentRoute.value.params.id;

if (!uuid) {
  router.push({ name: 'home' });
}
</script>

<template>
  <DefaultLayout class="flex-grow flex flex-col h-full">
    <ChatConversation class="mb-30 lg:px-40" />
    <AskTextBox
      class="bottom-0 fixed mb-10 self-center"
      placeholder="向我提问..."
    />
  </DefaultLayout>
</template>
