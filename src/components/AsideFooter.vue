<script setup lang="ts">
import { mdiAccountOutline, mdiMessagePlusOutline } from '@mdi/js';
import AsideFooterItem from '@/components/AsideFooterItem.vue';
</script>

<template>
  <AsideFooterItem to="/chat" :icon="mdiMessagePlusOutline" text="开启新对话" />
  <AsideFooterItem to="/user" :icon="mdiAccountOutline" text="个人信息" />
</template>
