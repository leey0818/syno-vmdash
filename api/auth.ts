import { ProxyResponse, fetchProxyRequest } from "./base";

type AuthLoginResponse = ProxyResponse<{ sid: string; }>;

/**
 * Synology DSM 로그인
 * @param domain DSM Domain
 * @param username 사용자ID
 * @param password 사용자패스워드
 * @returns
 */
export const loginDSM = (domain: string, username: string, password: string) => fetchProxyRequest<AuthLoginResponse>(domain, 'auth', {
  api: 'SYNO.API.Auth',
  method: 'login',
  version: '3',
  account: username,
  passwd: password,
  format: 'sid',
});

/**
 * Synology DSM 로그아웃
 * @param domain DSM Domain
 * @param sid 로그인 SID
 * @returns
 */
export const logoutDSM = (domain: string, sid: string) => fetchProxyRequest<ProxyResponse<{}>>(domain, 'auth', {
  api: 'SYNO.API.Auth',
  method: 'logout',
  version: '3',
  sid: sid,
});
