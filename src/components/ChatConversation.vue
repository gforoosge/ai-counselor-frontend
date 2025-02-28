<script setup lang="ts">
import ChatMessage from '@/components/ChatMessage.vue';
</script>

<template>
  <div class="w-full">
    <ChatMessage role="user" text="Question." />
    <ChatMessage role="assistant" text="Anwser." />
  </div>
</template>
