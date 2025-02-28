import { Messages } from '@/types/message.ts';
import axios from 'axios';
import { ref, Ref } from 'vue';

const instance = axios.create({
  baseURL: '/api/'
});

export async function createNewConversation(): Promise<Conversation> {
  const uuid = '2377aa0f-2c8f-4a40-b6e6-4fcb75d309b2';
  return new Conversation(uuid);
}

export async function getConversation(id: string): Promise<Conversation> {
  // 尝试获取历史
  return new Conversation(id);
}

class Conversation {
  public id: string;
  public history: Ref<Messages>;

  constructor(id: string, history?: Messages) {
    this.id = id;
    this.history = ref(history || []);
  }

  public async chat(text: string, stream: boolean = false) {
    if (stream) {
      throw 'Not implemented';
    }

    return (
      await instance.get<{ response: string }>('/chat', {
        params: { query: text }
      })
    ).data.response;
  }
}
