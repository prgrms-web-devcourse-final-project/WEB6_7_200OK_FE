export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/v1/auth/verify", {
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
};
