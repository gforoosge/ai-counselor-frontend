import { client } from '@/services/apis/index.ts';
import { ChatInfo } from '@/types/chat.ts';

export async function signUp(): Promise<string> {
  return (await client.post<{ id: string }>('/users')).data.id;
}

export async function getChatInfo(userId: string): Promise<ChatInfo[]> {
  const response = await client.get<{ chats: ChatInfo[] }>(
    '/users/' + userId + '/chats'
  );

  return response.data.chats;
}
