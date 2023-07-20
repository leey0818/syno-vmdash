export type ProxyResponse<T = { [k: string]: any }> = {
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

export const fetchProxyRequest = <T extends ProxyResponse>(host: string, type: string, params: any) => $fetch(`/proxy/webapi/${type}.cgi`, {
  method: 'POST',
  body: params,
  headers: {
    'X-Syno-Host': host,
  },
}) satisfies Promise<T>;
