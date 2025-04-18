<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import ChatHistory from '@/components/ChatHistory.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import router from '@/router';
import manager from '@/services/chat/manager';
import { IChat } from '@/types/chat';
import { computed, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const id = computed(() => router.currentRoute.value.params.id);

if (!id.value) {
  router.push({ name: 'new' });
}

const chat = ref<IChat>(null);
const history = computed(() => chat.value?.history ?? []);
const prompt = ref('');
const isLoading = ref(true);
const toast = useToast();

updateChat();

watch(id, async (newId) => {
  if (newId) {
    isLoading.value = true;
    await updateChat();
  }
});

async function updateChat() {
  try {
    chat.value = await manager.getChatById(id.value as string);
  } catch (error) {
    console.error(error);
    toast.error('加载对话失败。' + error);
  }
  isLoading.value = false;
}

async function submit() {
  const t = prompt.value;

  if (!t) {
    return;
  }

  prompt.value = '';

  try {
    isLoading.value = true;
    await chat.value.complete(t);
  } catch (error) {
    toast.error('发送对话失败。' + error);
  }

  isLoading.value = false;
}
</script>

<template>
  <BaseLayout>
    <ChatHistory class="lg:px-40" :history="history" />
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
