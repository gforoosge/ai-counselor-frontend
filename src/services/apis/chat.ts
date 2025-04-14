import { client } from '@/services/apis/index.ts';
import { Messages } from '@/types/message.ts';
import { Ref } from 'vue';

export async function getChatHistory(id: string): Promise<Messages> {
  const response = await client.get<Messages>('/chats/' + id);
  return response.data;
}

export async function createNewChat(userId: string): Promise<string> {
  const response = await client.post<{ chat_id: string }>('/chats', {
    user_id: userId
  });

  return response.data.chat_id;
}

export async function getMessages(chatId: string): Promise<Messages> {
  const response = await client.get<{
    response: Messages;
  }>(`/chats/${chatId}/messages`);

  return response.data.response;
}

export async function completeChat(
  id: string,
  prompt: string,
  reply: Ref<string>,
  abortController?: AbortController
): Promise<void> {
  const response = await fetch('/api/chat/' + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: prompt })
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`, {
      cause: await response.text()
    });
  }

  await readTextStream(response, reply, abortController);
}

async function readTextStream(
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
