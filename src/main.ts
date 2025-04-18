import App from '@/App.vue';
import router from '@/router/index.ts';
import { useUserStore } from '@/stores/user.ts';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import '@/styles/main.css';

const pinia = createPinia();
useUserStore(pinia);

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Toast);
app.mount('#app');
