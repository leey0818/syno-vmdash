<script setup lang="ts">
import { ref } from 'vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const synoDomain = ref('');
const synoUsername = ref('');
const synoPassword = ref('');

const handleClickLogin = async () => {
  if (synoDomain.value && synoUsername.value && synoPassword.value) {
    const result = await appStore.loginUser(synoDomain.value, synoUsername.value, synoPassword.value);
    console.log(`logined! ${JSON.stringify(result)}`);
  }
};

const handleClickLogout = async () => {
  await appStore.logoutUser();
  alert('done!');
};
</script>

<template>
  <div class="flex flex-col justify-center h-screen">
    <div class="text-slate-600 mb-16">
      <p class="text-center text-4xl md:text-5xl mb-2 font-semibold">Synology DSM</p>
      <p class="text-center text-2xl md:text-3xl">Virtual Machine Manager</p>
    </div>
    <div class="text-slate-800">
      <label class="block mb-4">
        <p class="text-sm leading-relaxed text-slate-400">도메인</p>
        <input type="text" class="border px-2 h-10 w-full" placeholder="ex) https://my.synology.me:5001" v-model="synoDomain"/>
      </label>
      <label class="block mb-4">
        <p class="text-sm leading-relaxed text-slate-400">아이디</p>
        <input type="text" class="border px-2 h-10 w-full" v-model="synoUsername"/>
      </label>
      <label class="block mb-4">
        <p class="text-sm leading-relaxed text-slate-400">패스워드</p>
        <input type="password" class="border px-2 h-10 w-full" v-model="synoPassword"/>
      </label>
      <label class="block mb-4" v-if="false">
        <p class="text-sm leading-relaxed text-slate-400">OTP 번호</p>
        <input type="text" maxlength="6" class="border px-2 h-10 w-full" />
      </label>
      <button class="rounded-md h-10 w-full text-white text-center bg-sky-600" @click="handleClickLogin">로그인</button>
      <button class="rounded-md h-10 w-full text-black text-center bg-white" @click="handleClickLogout">로그아웃</button>
    </div>
  </div>
</template>
