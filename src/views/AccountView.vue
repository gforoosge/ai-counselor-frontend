<script setup lang="ts">
import CardBox from '@/components/CardBox.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
</script>

<template>
  <BaseLayout>
    <div class="flex-grow h-full flex flex-col justify-center items-center">
      <CardBox title="个人信息">
        <div class="grid grid-cols-2 gap-4">
          <div>用户ID</div>
          <div>
            <code>{{ accountStore.id }}</code>
          </div>
        </div>
      </CardBox>
    </div>
  </BaseLayout>
</template>
