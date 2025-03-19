<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import ChatConversation from '@/components/ChatConversation.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import router from '@/router';
import { IConversation, getConversation } from '@/services/conversations';
import { computed, ref } from 'vue';

const id = router.currentRoute.value.params.id;

if (!id) {
  router.push({ name: 'new' });
}

const conversation = ref<IConversation>(null);
const history = computed(() => conversation.value?.history ?? []);
const prompt = ref('');
const isLoading = ref(true);

getConversation(id as string)
  .then((res) => {
    conversation.value = res;
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
    await conversation.value.chat(t);
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
