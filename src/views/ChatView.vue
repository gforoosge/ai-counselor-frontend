<script setup lang="ts">
import AskTextBox from '@/components/AskTextBox.vue';
import ChatConversation from '@/components/ChatConversation.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import router from '@/router/inedx';
import { IConversation, getConversation } from '@/services/conversations';
import { computed, ref } from 'vue';

const uuid = router.currentRoute.value.params.id;

if (!uuid) {
  router.push({ name: 'home' });
}

const conversation = ref<IConversation>(null);
const history = computed(() => conversation.value?.history ?? []);
const prompt = ref('');
const loading = ref(false);

getConversation(uuid as string)
  .then((res) => {
    conversation.value = res;
  })
  .catch((error) => {
    console.error(error);
  });

async function submit() {
  const t = prompt.value;

  if (!t) {
    return;
  }

  prompt.value = '';

  try {
    await conversation.value.chat(t);
  } catch (error) {}

  loading.value = false;
}
</script>

<template>
  <DefaultLayout>
    <ChatConversation class="lg:px-40" :history="history" />
    <div class="h-60"></div>
    <AskTextBox
      v-model="prompt"
      :disabled="loading"
      class="bottom-0 fixed mb-10 self-center"
      placeholder="向我提问..."
      @submit="submit"
    />
  </DefaultLayout>
</template>
