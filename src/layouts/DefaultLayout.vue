<script setup lang="ts">
import AsideBar from '@/components/AsideBar.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import router from '@/router/inedx';
import { mdiBackburger, mdiForwardburger } from '@mdi/js';
import { ref, watch } from 'vue';

const isAsideMobileExpanded = ref(false);

watch(router.currentRoute, () => {
  isAsideMobileExpanded.value = false;
});
</script>

<template>
  <div class="md:pl-60 min-h-screen w-full flex flex-col">
    <slot />
  </div>

  <div
    class="fixed top-0 left-0 z-50 p-4 cursor-pointer md:hidden hover:text-gray-500 transition-all"
    :class="{ 'left-45': isAsideMobileExpanded }"
    @click="isAsideMobileExpanded = !isAsideMobileExpanded"
  >
    <BaseIcon
      size="20"
      :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
    />
  </div>

  <div
    class="bg-black w-screen h-screen fixed top-0 left-0 opacity-50 md:hidden transition-[opacity]"
    :class="{ hidden: !isAsideMobileExpanded }"
    @click="isAsideMobileExpanded = false"
  />

  <AsideBar
    :class="{ 'left-0': isAsideMobileExpanded }"
    @close-aside="isAsideMobileExpanded = false"
  />
</template>
