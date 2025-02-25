export type Messages = Message[];

type Message = {
  content: string;
  role: 'user' | 'assistant' | 'system';
};
