import type { ChatRoomListItem, ListFilter } from "@/features/chat";
import { fetch } from "@/shared/api/server";
import { type ApiResponseType } from "@/shared/api/types/response";
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
    const apiError = error as ApiResponseType<null>;
    if (apiError.code === 404) {
      console.warn("Failed to fetch chat rooms [404]:", apiError.message);
      throw new Error("유저를 찾을 수 없습니다.");
    } else {
      console.warn("Failed to fetch chat rooms:", apiError.message);
      throw new Error("서버와의 통신에 실패하였습니다. 잠시후 다시 시도해주세요.");
    }
  }
};
