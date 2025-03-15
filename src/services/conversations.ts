import { Messages } from '@/types/message.ts';
import { Axios } from 'axios';
import { reactive, Ref, ref } from 'vue';

const client = new Axios();
const map = new Map<string, IConversation>();

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

  readAsStreamResponse(response, reply); // don't wait for completion

  return conversation;
}

export async function getConversation(id: string): Promise<IConversation> {
  if (map.has(id)) {
    return map.get(id);
  }

  const conversation = new Conversation(id);
  return conversation;
}

export interface IConversation {
  readonly id: string;
  readonly history: Messages;

  chat(prompt: string, abortController?: AbortController): Promise<void>;

  refresh(): Promise<void>;
}

class Conversation implements IConversation {
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

    if (!response.ok) {
      throw new Error('Failed to fetch response from server');
    }

    await readAsStreamResponse(response, reply, abortController);
  }

  public async refresh(): Promise<void> {
    this.history.slice(0, this.history.length);

    const messages = (await client.get<Messages>('/api/chats/' + this.id)).data;
    for (const message of messages) {
      this.history.push(message);
    }
  }
}

async function readAsStreamResponse(
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

    const { value, done: _done } = await reader.read();
    ref.value += decoder.decode(value, { stream: true });

    if (!_done) {
      break;
    }
  }
}
