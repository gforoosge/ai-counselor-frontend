import {
  ensureSuccess,
  getConversationHistory,
  getConversations
} from '@/services/requests.ts';
import { useUserStore } from '@/stores/user.ts';
import { type Messages } from '@/types/message.ts';
import { reactive, type Ref, ref } from 'vue';

export async function createNewConversation(
  prompt: string
): Promise<IConversation> {
  const response = await fetch('/api/chats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: prompt })
  });

  const id = response.headers.get('chat-id');
  const conversation = new Conversation(id);
  conversation.history.push({ content: prompt, role: 'user' });

  const reply = ref('');
  conversation.history.push({ content: reply, role: 'assistant' });

  readResponseAsReplyStream(response, reply); // don't wait for completion

  return conversation;
}

export async function getConversation(id: string): Promise<IConversation> {
  const conversation = (await getConversations(useUserStore().id)).find(
    (c) => c.id === id
  );

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const iconversation = new Conversation(id, await getConversationHistory(id));
  iconversation.createdAt = new Date(conversation.created_at);
  iconversation.title = conversation.title;
  return iconversation;
}

export interface IConversation {
  title: string | null;
  createdAt: Date | null;
  readonly id: string;
  readonly history: Messages;

  chat(prompt: string, abortController?: AbortController): Promise<void>;

  refresh(): Promise<void>;
}

class Conversation implements IConversation {
  public title: string | null = null;
  public createdAt: Date | null = null;
  public readonly id: string;
  public readonly history: Messages;

  constructor(id: string, history: Messages = []) {
    this.id = id;
    this.history = reactive(history);
  }

  public async chat(
    prompt: string,
    abortController?: AbortController
  ): Promise<void> {
    this.history.push({ content: prompt, role: 'user' });

    const reply = ref('');
    this.history.push({ content: reply, role: 'assistant' });

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: prompt })
    });

    ensureSuccess(response);

    await readResponseAsReplyStream(response, reply, abortController);
  }

  public async refresh(): Promise<void> {
    this.history.slice(0, this.history.length);

    const messages = await getConversationHistory(this.id);
    for (const message of messages) {
      this.history.push(message);
    }
  }
}

async function readResponseAsReplyStream(
  response: Response,
  ref: Ref<string>,
  abortController?: AbortController
): Promise<void> {
  const decoder = new TextDecoder('utf-8');
  const reader = response.body.getReader();

  while (true) {
    if (abortController?.signal.aborted) {
      reader.cancel();
      throw new Error('Request aborted');
    }

    const { value, done } = await reader.read();
    ref.value += decoder.decode(value, { stream: true });

    if (!done) {
      break;
    }
  }
}
