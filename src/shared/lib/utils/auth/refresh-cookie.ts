const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthData {
  accessToken: string;
  refreshToken: string;
  userId: string | number;
}

export async function refreshCookie(refreshToken: string): Promise<AuthData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/regenerate-access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`Token refresh failed with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const payload = data?.data;

    if (!payload || typeof payload !== "object") {
      console.error("Token refresh failed: Invalid response format.");
      return null;
    }

    const { accessToken, refreshToken: newRefreshToken, userId } = payload;

    const isValidAccessToken = typeof accessToken === "string" && accessToken.length > 0;
    const isValidRefreshToken = typeof newRefreshToken === "string" && newRefreshToken.length > 0;
    const isValidUserId =
      (typeof userId === "string" && userId.length > 0) || typeof userId === "number";

    if (!isValidAccessToken || !isValidRefreshToken || !isValidUserId) {
      console.error("Token refresh failed: Missing required fields.");
      return null;
    }

    return {
      accessToken,
      refreshToken: newRefreshToken,
      userId,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}
