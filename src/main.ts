import App from '@/App.vue';
import router from '@/router/index.ts';
import { useUserStore } from '@/stores/user.ts';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/styles/main.css';

const pinia = createPinia();
useUserStore(pinia);

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
