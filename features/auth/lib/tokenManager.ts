const TOKEN_KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
} as const;

// --- Set ----------------
export function setTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}): void {
  localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
  localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEYS.ACCESS, token);
}
export function setRefreshToken(token: string): void {
  localStorage.setItem(TOKEN_KEYS.REFRESH, token);
}

// --- Get ----------------
export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEYS.ACCESS);
}
export function getRefreshToken(): string | null {
  return localStorage.getItem(TOKEN_KEYS.REFRESH);
}
export function getTokens(): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  return { accessToken: getAccessToken(), refreshToken: getRefreshToken() };
}

// -- Delete ---------------
export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
}
export function removeAccessToken(): void {
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
}
export function removeRefreshToken(): void {
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
}

// -- Verify ---------------
export function hasTokens(): boolean {
  return !!getAccessToken() && !!getRefreshToken();
}
