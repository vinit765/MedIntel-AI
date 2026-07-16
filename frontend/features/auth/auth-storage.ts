"use client";

import type { AuthToken, User } from "@/types/api";

const tokenKey = "medintel.auth.token";
const userKey = "medintel.auth.user";

export function saveAuthSession(session: AuthToken): void {
  window.localStorage.setItem(tokenKey, session.access_token);
  window.localStorage.setItem(userKey, JSON.stringify(session.user));
}

export function getAccessToken(): string | null {
  return window.localStorage.getItem(tokenKey);
}

export function getStoredUser(): User | null {
  const rawUser = window.localStorage.getItem(userKey);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  window.localStorage.removeItem(tokenKey);
  window.localStorage.removeItem(userKey);
}
