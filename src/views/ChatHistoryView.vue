<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import ChatConversation from '@/components/ChatHistory.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import router from '@/router';
import manager from '@/services/chat/manager';
import { IChat } from '@/types/chat';
import { computed, ref } from 'vue';

const id = router.currentRoute.value.params.id;

if (!id) {
  router.push({ name: 'new' });
}

const chat = ref<IChat>(null);
const history = computed(() => chat.value?.history ?? []);
const prompt = ref('');
const isLoading = ref(true);

manager
  .getChatById(id as string)
  .then((res) => {
    chat.value = res;
    isLoading.value = false;
  })
  .catch((error) => {
    console.error(error);
    isLoading.value = false;
  });

async function submit() {
  const t = prompt.value;

  if (!t) {
    return;
  }

  prompt.value = '';

  try {
    isLoading.value = true;
    await chat.value.complete(t);
  } catch (error) {}

  isLoading.value = false;
}
</script>

<template>
  <BaseLayout>
    <ChatConversation class="lg:px-40" :history="history" />
    <div class="h-60"></div>
    <AskTextBox
      v-model="prompt"
      :loading="isLoading"
      class="bottom-0 fixed mb-10 self-center"
      placeholder="向我提问..."
      @submit="submit"
    />
  </BaseLayout>
</template>
