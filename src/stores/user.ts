import router from '@/router/index.ts';
import { signUp } from '@/services/requests.ts';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const id = ref(localStorage.getItem('user.id') || '');

  if (!id.value) {
    initializeId();
  } else {
    localStorage.setItem('user.id', id.value);
  }

  return {
    id,
    password: '',
    logined: true,

    login: () => {
      router.push('/');
    },

    initializeId
  };

  async function initializeId() {
    if (!id.value) {
      const i = await signUp();
      if (i) {
        id.value = i;
        localStorage.setItem('user.id', i);
      } else {
        throw new Error('Failed to sign up');
      }
    }
  }
});
