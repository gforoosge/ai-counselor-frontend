<script setup lang="ts">
import ChatMessage from '@/components/ChatMessage.vue';
import { ref, watch } from 'vue';

const props = defineProps({
  history: {
    type: Array,
    required: true
  }
});

const container = ref<HTMLElement | null>(null);

watch(props.history, () => {
  const length = container.value.children.length;
  const last = container.value.children[length - 1] as HTMLElement;
  last?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
</script>

<template>
  <div ref="container" class="w-full">
    <TransitionGroup name="message">
      <ChatMessage
        v-for="(msg, index) in history"
        :key="index"
        :message="msg"
      />
    </TransitionGroup>
  </div>
</template>

<style>
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
