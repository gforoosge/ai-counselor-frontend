<script setup lang="ts">
import AskSuggestions from '@/components/AskSuggestions.vue';
import AskTextBox from '@/components/AskTextBox.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { ref } from 'vue';

const text = ref('');
</script>
<template>
  <DefaultLayout>
    <div class="flex-grow flex flex-col justify-center items-center h-full">
      <div class="text-3xl m-4">HFUT 智能辅导员</div>
      <AskTextBox v-model="text" placeholder="随便问点什么..." />
      <AskSuggestions @click="(t) => (text = t)" />
    </div>
  </DefaultLayout>
</template>
