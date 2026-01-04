"use client";

export function useIsAuthenticated(): boolean {
  return document.cookie.includes("userId=");
}
