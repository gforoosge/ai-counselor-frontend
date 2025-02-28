import ChatView from '@/views/ChatView.vue';
import HomeView from '@/views/HomeView.vue';
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router';

const name = '智能辅导员';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
    meta: { title: '新建对话' }
  },
  {
    name: 'chat',
    path: '/chat/:id',
    component: ChatView,
    meta: { title: '聊天' }
  },
  {
    path: '/:any',
    redirect: '/'
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} · ${name}` : name;
});

export default router;
