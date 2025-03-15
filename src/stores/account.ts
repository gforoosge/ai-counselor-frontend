import router from '@/router/index.ts';
import { defineStore } from 'pinia';

export const useAccountStore = defineStore('user', () => {
  const id =
    localStorage.getItem('account.id') ||
    Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, '0');

  localStorage.setItem('account.id', id);

  return {
    id,
    password: '',

    login: () => {
      localStorage.setItem('account.logined', 'true');
      router.push('/');
    },

    logined: () => Boolean(localStorage.getItem('account.logined'))
  };
});
