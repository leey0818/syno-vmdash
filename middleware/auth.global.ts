import { useAppStore } from "@/stores/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const appStore = useAppStore();

  if (to.path !== '/login' && !appStore.logined) {
    return navigateTo('/login');
  }

  if (to.path === '/login' && appStore.logined) {
    return navigateTo('/');
  }
});
