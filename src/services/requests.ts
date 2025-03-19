import { Conversations } from '@/types/conversation.ts';
import { Messages } from '@/types/message.ts';
import { Axios, isAxiosError } from 'axios';

export async function ensureSuccess(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  throw new Error(`${response.status} ${response.statusText}`, {
    cause: (await response.json()) as RequestError
  });
}

type RequestError = {
  detail: {
    loc: string[];
    msg: string;
    type: string;
  }[];
};

const client = new Axios({
  adapter: 'fetch',
  timeout: 1000
});

client.interceptors.response.use(undefined, async (error) => {
  if (!isAxiosError(error) || !error.response?.data) {
    throw error;
  }

  throw new Error(`${error.response.status} ${error.response.statusText}`, {
    cause: error.response.data as RequestError
  });
});

export async function signUp(): Promise<string> {
  return (await client.post<{ id: string }>('/api/users')).data.id;
}

export async function getConversationHistory(id: string): Promise<Messages> {
  return (await client.get<Messages>('/api/chats/' + id)).data;
}
export async function getConversations(userId: string): Promise<Conversations> {
  return (
    await client.get<{ chats: Conversations }>(
      '/api/users/' + userId + '/chats'
    )
  ).data.chats;
}
