"use client";

import { useEffect, useState } from "react";

export function useIsAuthenticated(): boolean {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(document.cookie.includes("userId="));
  }, []);

  return isAuthed;
}
