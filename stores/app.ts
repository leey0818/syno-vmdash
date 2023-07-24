import { computed } from "vue";
import { defineStore } from "pinia";
import { loginDSM, logoutDSM } from "@/api/auth";
import { APIError } from "@/util/types";

const getDefaultLoginState = () => ({ sid: '', domain: '' });

export const useAppStore = defineStore('app', () => {
  // const loginInfo = ref(getSaveLoginState());
  const loginInfo = useCookie('_api_info', {
    default: getDefaultLoginState,
    sameSite: true,
    watch: true,
  })

  // DSM 로그인
  const loginUser = async (domain: string, username: string, password: string) => {
    try {
      const result = await loginDSM(domain, username, password);
      loginInfo.value = {
        sid: result.sid,
        domain: domain,
      };
    } catch (e) {
      if (e instanceof APIError) {
        // TODO
        console.warn(e);
      }

      loginInfo.value = getDefaultLoginState();
    }

    return !!loginInfo.value.sid;
  };

  // DSM 로그아웃
  const logoutUser = async () => {
    await logoutDSM(loginInfo.value.domain, loginInfo.value.sid);
    loginInfo.value = getDefaultLoginState();
  };

  const clearState = () => {
    loginInfo.value = getDefaultLoginState();
  };

  return {
    logined: computed(() => !!loginInfo.value.sid),
    sid: computed(() => loginInfo.value.sid),
    domain: computed(() => loginInfo.value.domain),
    loginUser,
    logoutUser,
    clearState,
  };
});
