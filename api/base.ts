import { APIError } from "@/util/types";
import { useAppStore } from "@/stores/app";

export type ProxyResponse<T = ProxyResponseBody> = {
  success: true;
  data: T;
} | {
  success: false;
  error: {
    code: number;
    errors?: {
      [key: string]: any;
    }
  }
};

export type ProxyResponseBody = {
  [k: string]: any;
}

export type ProxyRequestBody = {
  api: string;
  method: string;
  version: string;
  [key: string]: string | number | boolean;
};

const fetch = <T extends ProxyResponse, P extends ProxyRequestBody = ProxyRequestBody>(host: string, type: string, params: P) => $fetch(`/proxy/webapi/${type}.cgi`, {
  method: 'POST',
  body: params,
  headers: {
    'X-Syno-Host': host,
  },
}) satisfies Promise<T>;

export const fetchProxyRequest = async <RES extends ProxyResponseBody, REQ extends ProxyRequestBody = ProxyRequestBody>(host: string, type: string, params: REQ) => {
  const response = await fetch<ProxyResponse<RES>, REQ>(host, type, params);
  if (response.success) {
    return response.data;
  } else {
    // Session timeout.
    if (response.error.code === 105 || response.error.code === 106) {
      const router = useRouter();
      const appStore = useAppStore();
      appStore.clearState();
      router.replace('/login');
    }

    const error = new APIError(response.error.code);
    error.cause = response.error.errors;
    throw error;
  }
};
