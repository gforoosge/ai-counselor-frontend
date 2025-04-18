import { Messages } from '@/types/message.ts';

export type ChatInfo = {
  id: string;
  created_time: string;
  title: string;
};

export interface IChat {
  readonly info: Readonly<ChatInfo>;
  readonly history: Messages;

  complete(prompt: string, abortController?: AbortController): Promise<void>;
}
