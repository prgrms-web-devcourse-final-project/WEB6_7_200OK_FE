import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export function useUploadChatImages() {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("uploadFiles", file);
      });

      const response = await httpClient<{ imageUrl: string }[]>(API_ENDPOINTS.chatImages, {
        method: "POST",
        body: formData,
      });
      return response.data;
    },
    onError: (_error) => {
      toast.error("이미지 업로드에 실패했습니다.");
    },
  });
}
