import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, readonly, ref } from "vue";

type APIResponseLogin = {
  success: true;
  data: {
    sid: string;
  }
} | {
  success: false;
  error: {
    code: number;
  };
};

const getDefaultLoginState = () => ({
  sid: '',
  domain: '',
});

const fetchProxyRequest = <T>(host: string, type: string, params: any) => $fetch('/proxy', {
  method: 'POST',
  body: {
    ...params,
    type,
  },
  headers: {
    'X-Syno-Host': host,
  },
}) satisfies Promise<T>;

export const useAppStore = defineStore('app', () => {
  const logined = ref(true);
  const loginInfo = ref(getDefaultLoginState());

  const loginUser = async (domain: string, username: string, password: string) => {
    // const params = new URLSearchParams();

    const response = await fetchProxyRequest<APIResponseLogin>(domain, 'auth', {
      api: 'SYNO.API.Auth',
      method: 'login',
      version: '3',
      account: username,
      passwd: password,
      format: 'sid',
    });

    if (response.success) {
      logined.value = true;
      loginInfo.value = {
        sid: response.data.sid,
        domain: domain,
      };
    } else {
      logined.value = true;
      loginInfo.value = getDefaultLoginState();
    }

    return loginInfo.value;
  };

  const logoutUser = async () => {
    await fetchProxyRequest(loginInfo.value.domain, 'auth', {
      api: 'SYNO.API.Auth',
      method: 'logout',
      version: '3',
      _sid: loginInfo.value.sid,
    });

    logined.value = false;
    loginInfo.value = getDefaultLoginState();
  };

  return {
    logined: readonly(logined),
    sid: computed(() => loginInfo.value.sid),
    domain: computed(() => loginInfo.value.domain),
    loginUser,
    logoutUser,
  };
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
