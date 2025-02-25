<script setup lang="ts">
import { mdiArrowUp } from '@mdi/js';
import Icon from '@/components/Icon.vue';
import TextBox from '@/components/TextBox.vue';
</script>
<template>
  <div
    class="bg-gray-100 min-w-1/2 border-2 border-gray-200 hover:border-gray-400 focus:border-gray-400 transition-all rounded-xl flex"
  >
    <TextBox placeholder="随便问点什么..." />

    <div class="text-sm m-3 flex items-center justify-center cursor-pointer">
      <button
        type="button"
        title="发送"
        class="w-10 h-10 text-center transition-colors rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center"
      >
        <Icon :path="mdiArrowUp" size="30" />
      </button>
    </div>
  </div>
</template>
