import {
  createNewChat,
  deleteChat,
  getChatHistory
} from '@/services/apis/chat.ts';
import { getChatInfo } from '@/services/apis/user.ts';
import { Chat } from '@/services/chat/implementation.ts';
import { useUserStore } from '@/stores/user.ts';
import { ChatInfo, type IChat } from '@/types/chat.ts';

let initialized = false;

const info = new Map<string, ChatInfo>();
const chats = new Map<string, IChat>();

async function getAllChatInfo(
  forceRefresh: boolean = false
): Promise<ChatInfo[]> {
  if (forceRefresh || !initialized) {
    await refreshInfo();
    chats.clear();
  }

  return Array.from(info.values());
}

async function refreshInfo(): Promise<void> {
  info.clear();
  const userId = useUserStore().id;
  const response = await getChatInfo(userId);

  for (const chatInfo of response) {
    info.set(chatInfo.id, chatInfo);
  }

  for (const id of chats.keys()) {
    if (!info.has(id)) {
      chats.delete(id);
    }
  }

  initialized = true;
}

async function getChatById(
  chatId: string,
  forceRefresh: boolean = false
): Promise<IChat> {
  if (forceRefresh || !initialized || !info.has(chatId)) {
    await refreshInfo();
    chats.clear();
  }

  const chatInfo = info.get(chatId);

  if (!chatInfo) {
    throw new Error('未找到指定的对话');
  }

  if (!chats.has(chatId)) {
    const chat = new Chat(chatInfo, await getChatHistory(chatId));
    chats.set(chatId, chat);
    return chat;
  }

  return chats.get(chatId);
}

async function create(): Promise<IChat> {
  const userId = useUserStore().id;
  const chatId = await createNewChat(userId);

  await refreshInfo();

  const chat = new Chat({ id: chatId, created_time: new Date().toISOString() });
  chats.set(chatId, chat);
  return chat;
}

async function remove(chatId: string): Promise<void> {
  await deleteChat(chatId);
  chats.delete(chatId);
  info.delete(chatId);
}

export default {
  getAllChatInfo,
  getChatById,
  create,
  remove
};
