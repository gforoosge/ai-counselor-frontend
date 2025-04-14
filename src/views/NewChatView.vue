<script setup lang="ts">
import AskSuggestions from '@/components/AskSuggestions.vue';
import AskTextBox from '@/components/AskTextBox.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import router from '@/router';
import manager from '@/services/chat/manager.ts';
import { ref } from 'vue';

const text = ref('');
const disabled = ref(false);

async function submit() {
  if (!text.value) {
    return;
  }

  try {
    disabled.value = true;

    const chat = await manager.create();
    router.push({ name: 'ChatView', params: { id: chat.info.id } });

    chat.complete(text.value);
  } catch (error) {
    console.error(error);
  }
  disabled.value = false;
}
</script>
<template>
  <BaseLayout>
    <div class="flex-grow flex flex-col justify-center items-center h-full">
      <div class="text-3xl mb-5">HFUT 智能辅导员</div>
      <div class="text-sm text-gray-500 mb-3">
        如果你有任何想问的问题，那就快来问我吧 :)
      </div>
      <AskTextBox
        v-model="text"
        :loading="disabled"
        placeholder="随便问点什么..."
        @submit="submit"
      />
      <AskSuggestions @click="(t) => (text = !disabled ? t : text)" />
    </div>
  </BaseLayout>
</template>
