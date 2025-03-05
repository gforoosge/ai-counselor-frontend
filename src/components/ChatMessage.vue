<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue';
import { Message } from '@/types/message';
import { mdiAccount, mdiRobot } from '@mdi/js';
import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import MarkdownItTasklists from 'markdown-it-task-lists';
import sanitizeHtml from 'sanitize-html';
import { computed } from 'vue';

import 'github-markdown-css/github-markdown.css';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

const typed = computed(() => props.message as Message);
const isUser = typed.value.role === 'user';
const md = new MarkdownIt({ html: true })
  .use(MarkdownItTasklists)
  .use(MarkdownItFootnote);
const html = computed(() => sanitizeHtml(md.render(typed.value.content)));
</script>

<template>
  <div class="flex m-10" :class="isUser ? 'flex-row-reverse' : ''">
    <div class="mx-5">
      <div
        class="rounded-full p-1 flex items-center justify-center w-10 h-10"
        :class="isUser ? 'bg-stone-300' : 'bg-gray-300'"
      >
        <BaseIcon v-if="isUser" :path="mdiAccount" />
        <BaseIcon v-else :path="mdiRobot" />
      </div>
    </div>
    <div class="group">
      <div
        class="rounded-xl p-4 break-all"
        :class="isUser ? 'bg-stone-100 ' : 'bg-gray-100 '"
      >
        <span v-if="isUser"> {{ typed.content }}</span>
        <span v-else class="markdown-body" v-html="html"></span>
      </div>
      <div v-if="!isUser" class="text-gray-500 text-xs m-1">
        <div class="select-none">内容由 AI 生成，请仔细甄别</div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          {{ new Date().toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
</template>
