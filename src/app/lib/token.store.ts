/**
 * In-memory access token store.
 * We deliberately avoid localStorage to protect against XSS.
 * The token lives only for the lifetime of the browser tab.
 */
let _accessToken: string | null = null;

export const tokenStore = {
  get: (): string | null => _accessToken,
  set: (token: string | null) => { _accessToken = token; },
  clear: () => { _accessToken = null; },
};
