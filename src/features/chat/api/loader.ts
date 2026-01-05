import type { ChatRoomListItem, ListFilter } from "@/features/chat";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface GetChatRoomsParams {
  scope?: ListFilter;
  accessToken: string;
}

export const chatRoomsLoader = async (params: GetChatRoomsParams) => {
  const scope = params.scope ?? "ALL";
  const { accessToken } = params;
  try {
    const response = await fetch<ChatRoomListItem[]>(`${API_ENDPOINTS.chatRooms}?scope=${scope}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("Failed to fetch chat rooms:", message);
    throw error;
  }
};
