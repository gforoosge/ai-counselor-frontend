import { Messages } from '@/types/message.ts';
import { reactive, ref } from 'vue';

const map = new Map<string, IConversation>();

export async function createNewConversation(): Promise<IConversation> {
  const uuid = '2377aa0f-2c8f-4a40-b6e6-4fcb75d309b2';
  const conversation = new Conversation(uuid);
  map.set(uuid, conversation);
  return conversation;
}

export async function getConversation(id: string): Promise<IConversation> {
  return map.get(id) ?? new Conversation(id);
}

export interface IConversation {
  readonly id: string;
  readonly history: Messages;
  chat(prompt: string, abortController?: AbortController): Promise<void>;
}

class Conversation implements IConversation {
  public readonly id: string;
  public readonly history: Messages;

  constructor(id: string, history: Messages = []) {
    this.id = id;
    this.history = reactive([...history]);
  }

  public async chat(
    prompt: string,
    abortController?: AbortController
  ): Promise<void> {
    this.history.push({ content: prompt, role: 'user' });

    const reply = ref('');
    this.history.push({ content: reply, role: 'assistant' });

    const response = await fetch(
      '/api/invoke?query=' + encodeURIComponent(prompt),
      {}
    );

    if (!response.ok) {
      throw new Error('Failed to fetch response from server');
    }

    const decoder = new TextDecoder('utf-8');
    const reader = response.body.getReader();

    let done = false;

    while (!done) {
      if (abortController?.signal.aborted) {
        reader.cancel();
        throw new Error('Request aborted');
      }

      const { value, done: _done } = await reader.read();
      reply.value += decoder.decode(value, { stream: true });
      done = _done;
    }
  }
}
