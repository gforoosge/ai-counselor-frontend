<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue';
import TextBox from '@/components/TextBox.vue';
import { mdiArrowUp } from '@mdi/js';

const model = defineModel({ type: String, default: '' });

defineProps({
  placeholder: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div
    class="bg-gray-100 min-w-1/2 border-2 border-gray-200 hover:border-gray-400 focus:border-gray-400 transition-all rounded-xl flex"
  >
    <TextBox v-model="model" :placeholder="placeholder" />

    <div class="text-sm m-3 flex items-center justify-center cursor-pointer">
      <button
        type="button"
        title="发送"
        class="w-10 h-10 text-center transition-colors rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center"
      >
        <BaseIcon :path="mdiArrowUp" size="30" />
      </button>
    </div>
  </div>
</template>
