import App from '@/App.vue';
import router from '@/router/index.ts';
import { useAccountStore } from '@/stores/account.ts';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/styles/main.css';

const pinia = createPinia();
useAccountStore(pinia);

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
