export type VMStatus = 'running' | 'shutdown' | 'inaccessible' | 'booting' | 'shutting_down' | 'moving' | 'stor_migrating' | 'creating' | 'importing' | 'preparing' | 'ha_standby' | 'crashed' | 'unknown';

export class APIError extends Error {
  code: number;

  constructor(code: number) {
    super(`API response error code: ${code}`);
    this.code = code;
  }
}
