<script setup lang="ts">
import AnimatedTextBox from '@/components/AnimatedTextBox.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import CardBox from '@/components/CardBox.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { mdiArrowRight, mdiLoading } from '@mdi/js';
import { reactive } from 'vue';

const userStore = useUserStore();
const model = reactive({
  id: userStore.id,
  password: ''
});

function click() {
  userStore.id = model.id;
  userStore.password = model.password;
  userStore.login();
}

userStore
  .initializeId()
  .then(() => {
    model.id = userStore.id;
    router.push((router.currentRoute.value.query.redirect as string) || '/');
  })
  .catch((error) => alert(error));
</script>

<template>
  <BaseLayout hide-aside>
    <div class="flex items-center justify-center h-full flex-grow">
      <CardBox v-if="false" title="登录">
        <form>
          <div class="text-sm ml-2 mb-1">ID</div>
          <AnimatedTextBox v-model="model.id" />
          <div class="text-sm mt-7 ml-2 mb-1">密码</div>
          <AnimatedTextBox v-model="model.password" type="password" />
          <div class="flex justify-center mt-10">
            <button
              class="bg-gray-50 hover:bg-gray-100 active:bg-gray-200 py-2 px-4 rounded-xl flex items-center transition-colors"
              type="button"
              @click="click"
            >
              <span>继续</span>
              <BaseIcon :path="mdiArrowRight" />
            </button>
          </div>
        </form>
      </CardBox>

      <BaseIcon
        :path="mdiLoading"
        class="animate-spin"
        size="50"
        w="w-20"
        h="h-20"
      />
    </div>
  </BaseLayout>
</template>
