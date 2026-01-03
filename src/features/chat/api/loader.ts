import type { ChatRoomListItem, ListFilter } from "@/features/chat";
import { fetch } from "@/shared/api/server";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface GetChatRoomsParams {
  scope?: ListFilter;
}

export const chatRoomsLoader = async (params?: GetChatRoomsParams) => {
  const scope = params?.scope ?? "ALL";
  const userId = "11";
  try {
    const response = await fetch<ChatRoomListItem[]>(
      `${API_ENDPOINTS.chatRooms}?scope=${scope}&userId=${userId}`
    );
    console.warn("응답값", response);
    return response.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("Failed to fetch chat rooms:", message);
    throw new Error(`채팅방 목록을 불러오는 도중 에러가 발생했습니다: ${message}`);
  }
};
