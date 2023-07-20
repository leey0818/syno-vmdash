<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const router = useRouter();
const appStore = useAppStore();

const formInput = reactive({
  domain: '',
  username: '',
  password: '',
});
const formError = reactive({
  domain: '',
  username: '',
  password: '',
});

// 폼 입력값 검증
const doValidateForm = () => {
  let hasError = false;
  if (!formInput.domain) {
    hasError = true;
    formError.domain = '도메인을 입력하세요.';
  } else if (!/^http(s)?:\/\//.test(formInput.domain)) {
    hasError = true;
    formError.domain = '도메인은 http(s):// 으로 시작해야 합니다.';
  } else {
    formError.domain = '';
  }

  if (!formInput.username) {
    hasError = true;
    formError.username = '아이디를 입력하세요.';
  } else {
    formError.username = '';
  }

  if (!formInput.password) {
    hasError = true;
    formError.password = '패스워드를 입력하세요.';
  } else {
    formError.password = '';
  }

  return !hasError;
};

// 로그인
const handleFormSubmit = async () => {
  if (doValidateForm()) {
    const logined = await appStore.loginUser(formInput.domain, formInput.username, formInput.password);
    if (logined) {
      router.push('/');
    }
  }
};
</script>

<template>
  <div class="flex flex-col justify-center h-screen">
    <div class="text-slate-600 mb-16">
      <p class="text-center text-4xl md:text-5xl mb-2 font-semibold">Synology DSM</p>
      <p class="text-center text-2xl md:text-3xl">Virtual Machine Manager</p>
    </div>

    <form class="text-slate-800" @submit.prevent="handleFormSubmit">
      <label class="block mb-4">
        <p class="text-sm leading-relaxed text-slate-400">도메인</p>
        <input
          type="text"
          class="border rounded px-2 h-10 w-full"
          placeholder="ex) https://my.synology.me:5001"
          v-model.trim="formInput.domain"
          :class="{ 'border-red-600': formError.domain }" />
        <p class="text-sm leading-relaxed text-red-600" v-if="formError.domain">{{ formError.domain }}</p>
      </label>
      <label class="block mb-4">
        <p class="text-sm leading-relaxed text-slate-400">아이디</p>
        <input
          type="text"
          class="border rounded px-2 h-10 w-full"
          v-model.trim="formInput.username"
          :class="{ 'border-red-600': formError.username }" />
        <p class="text-sm leading-relaxed text-red-600" v-if="formError.username">{{ formError.username }}</p>
      </label>
      <label class="block mb-4">
        <p class="text-sm leading-relaxed text-slate-400">패스워드</p>
        <input
          type="password"
          class="border rounded px-2 h-10 w-full"
          v-model="formInput.password"
          :class="{ 'border-red-600': formError.password }" />
        <p class="text-sm leading-relaxed text-red-600" v-if="formError.password">{{ formError.password }}</p>
      </label>

      <label class="block mb-4" v-if="false">
        <p class="text-sm leading-relaxed text-slate-400">OTP 번호</p>
        <input type="text" maxlength="6" class="border rounded px-2 h-10 w-full" />
      </label>

      <button type="submit" class="rounded h-10 w-full text-white text-center bg-sky-600">로그인</button>
    </form>
  </div>
</template>
