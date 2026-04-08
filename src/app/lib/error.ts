/**
 * Extracts the most accurate user-facing error message from any error shape.
 * Priority:
 *  1. Network/connection → clear "offline" message
 *  2. Server 500 → clear "service unavailable" message
 *  3. Specific backend message (4xx) → relay it
 *  4. Fallback string provided by the caller
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;

  const err = error as any;

  // No response → network or DNS issue (the server was never reached)
  if (err.code === 'ERR_NETWORK' || err.message === 'Network Error' || !err.response) {
    return 'Connection failed. Please check your internet and try again.';
  }

  const status: number | undefined = err.response?.status;
  const backendMessage: string | undefined = err.response?.data?.message;

  // 500-level → server or database problem
  if (status && status >= 500) {
    return 'A server error occurred. Please try again in a moment.';
  }

  // 4xx with a specific backend message → show it (e.g. "Invalid credentials", "User already exists")
  if (backendMessage && typeof backendMessage === 'string') {
    return backendMessage;
  }

  return fallback;
}
