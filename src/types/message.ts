import { Ref } from 'vue';

export type Messages = Message[];

export type Message = {
  content: Ref<string> | string;
  role: 'assistant' | 'user' | 'system';
  created_time?: string;
};
