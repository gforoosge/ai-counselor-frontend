import { useUserStore } from '@/stores/user.ts';
import { Messages } from '@/types/message.ts';
import { Axios, isAxiosError } from 'axios';

type RequestError = {
  detail: {
    loc: string[];
    msg: string;
    type: string;
  }[];
};

export const client = new Axios({
  adapter: window.fetch ? 'fetch' : 'xhr',
  baseURL: '/api'
});

client.interceptors.response.use(undefined, async (error) => {
  if (!isAxiosError(error) || !error.response?.data) {
    throw error;
  }

  throw new Error(`${error.response.status} ${error.response.statusText}`, {
    cause: error.response.data as RequestError
  });
});

export async function getConversationHistory(id: string): Promise<Messages> {
  return (await client.get<Messages>('/chats/' + id)).data;
}

export async function createNewConversation(): Promise<string> {
  const id = useUserStore().id;
  const response = await client.post<{ chat_id: string }>('/chats', {
    user_id: id
  });

  return response.data.chat_id;
}

export async function getMessages(chatId: string): Promise<Messages> {
  const response = await client.get<{
    response: Messages;
  }>(`/chats/${chatId}/messages`);

  return response.data.response;
}
