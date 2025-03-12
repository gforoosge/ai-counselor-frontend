<script setup lang="ts">
import { mdiAccountOutline, mdiMessagePlusOutline } from '@mdi/js';
import AsideFooterItem from '@/components/AsideFooterItem.vue';
</script>

<template>
  <AsideFooterItem to="/" :icon="mdiMessagePlusOutline" text="开启新对话" />
  <AsideFooterItem to="/account" :icon="mdiAccountOutline" text="个人信息" />
</template>
