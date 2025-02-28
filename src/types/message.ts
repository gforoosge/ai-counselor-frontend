export type Messages = Message[];

export type Message = {
  content: string;
  role: 'user' | 'assistant' | 'system';
};
