import { loginDSM, logoutDSM } from "@/api/auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const getDefaultLoginState = () => ({
  sid: '',
  domain: '',
});

export const useAppStore = defineStore('app', () => {
  const loginInfo = ref(getDefaultLoginState());

  // DSM 로그인
  const loginUser = async (domain: string, username: string, password: string) => {
    try {
      const response = await loginDSM(domain, username, password);

      if (response.success) {
        loginInfo.value = {
          sid: response.data.sid,
          domain: domain,
        };
      } else {
        loginInfo.value = getDefaultLoginState();
      }
    } catch (e) {
      loginInfo.value = getDefaultLoginState();
    }

    return !!loginInfo.value.sid;
  };

  // DSM 로그아웃
  const logoutUser = async () => {
    await logoutDSM(loginInfo.value.domain, loginInfo.value.sid);
    loginInfo.value = getDefaultLoginState();
  };

  return {
    logined: computed(() => !!loginInfo.value.sid),
    sid: computed(() => loginInfo.value.sid),
    domain: computed(() => loginInfo.value.domain),
    loginUser,
    logoutUser,
  };
});
