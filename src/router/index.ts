import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';

const name = '智能辅导员';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'new' }
  },
  {
    name: 'new',
    path: '/chat',
    component: () => import('@/views/NewChatView.vue'),
    meta: { title: '新建对话' }
  },
  {
    name: 'chat',
    path: '/chat/:id',
    component: () => import('@/views/ChatHistoryView.vue'),
    meta: { title: '聊天' }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/UserInfoView.vue'),
    meta: { title: '个人信息' }
  },
  {
    name: 'login',
    path: '/user/login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/:any',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404' }
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.afterEach((to) => {
  document.title = to.meta?.title ? `${to.meta.title} · ${name}` : name;
});

export default router;
