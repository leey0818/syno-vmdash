<script setup lang="ts">
import { faArrowRightFromBracket, faComputer } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '@/stores/app';
import TabItem from './TabItem.vue';

const router = useRouter();
const appStore = useAppStore();

// 로그아웃
const handleClickLogout = async () => {
  await appStore.logoutUser();
  router.replace('/login');
};
</script>

<template>
  <div class="fixed mx-auto max-w-screen-sm bottom-0 left-0 right-0" v-if="appStore.logined">
    <div class="h-8 bg-gradient-to-b from-transparent via-slate-100/60 to-slate-100"></div>
    <div class="h-16 bg-slate-100 text-neutral-700 flex">
      <TabItem :icon="faComputer" :active="true" label="VMs" />
      <TabItem :icon="faArrowRightFromBracket" :active="false" label="Logout" @click="handleClickLogout" />
    </div>
  </div>
</template>
