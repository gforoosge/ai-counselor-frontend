import { completeChat } from '@/services/apis/chat.ts';
import { ChatInfo, IChat } from '@/types/chat.ts';
import { type Messages } from '@/types/message.ts';
import { reactive, ref } from 'vue';

export class Chat implements IChat {
  public readonly history: Messages;
  public readonly info: ChatInfo;

  constructor(
    info: Partial<Omit<ChatInfo, 'id'>> & Pick<ChatInfo, 'id'>,
    history: Messages = []
  ) {
    this.info = {
      title: '新对话',
      created_time: new Date().toISOString(),
      ...info
    };
    this.history = reactive(history);
  }

  public async complete(
    prompt: string,
    abortController?: AbortController
  ): Promise<void> {
    // 对话输出结束后返回
    this.history.push({
      content: prompt,
      role: 'user',
      created_time: new Date().toISOString()
    });

    const reply = ref('');
    this.history.push({
      content: reply,
      role: 'assistant',
      created_time: new Date().toISOString()
    });

    await completeChat(this.info.id, prompt, reply, abortController);
  }
}
