<script lang="ts" setup>
import BaseIcon from '@/components/BaseIcon.vue';
import TextBox from '@/components/TextBox.vue';
import { mdiArrowUp, mdiLoading } from '@mdi/js';
import { ref } from 'vue';

const emit = defineEmits(['submit']);
const model = defineModel({ type: String, default: '' });
const textBox = ref<HTMLInputElement | null>(null);

defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineExpose({ focus: () => textBox.value.focus() });
</script>

<template>
  <div
    class="bg-gray-100 min-w-1/2 border-2 border-gray-200 has-[:enabled]:hover:border-gray-400 has-[:enabled:focus]:border-gray-400 transition-all rounded-xl flex has-disabled:opacity-50"
  >
    <TextBox
      ref="textBox"
      v-model="model"
      accept-return
      :placeholder="placeholder"
      :disabled="loading"
      class="disabled:cursor-not-allowed"
      @submit="() => emit('submit')"
    />

    <div class="text-sm m-3 flex items-center justify-center cursor-pointer">
      <button
        type="button"
        title="发送"
        :disabled="loading"
        class="w-10 h-10 text-center transition-colors rounded-full bg-gray-200 enabled:hover:bg-gray-300 enabled:active:bg-gray-400 flex items-center justify-center disabled:cursor-not-allowed"
        @click="() => emit('submit')"
      >
        <BaseIcon v-if="!loading" :path="mdiArrowUp" size="30" />
        <BaseIcon v-else :path="mdiLoading" size="30" class="animate-spin" />
      </button>
    </div>
  </div>
</template>
