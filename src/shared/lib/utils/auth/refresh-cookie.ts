const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function refreshCookie(refreshToken: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/regenerate-access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken};`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}
