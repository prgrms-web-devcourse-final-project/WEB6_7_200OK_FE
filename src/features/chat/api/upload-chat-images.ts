import { useMutation } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import { type ApiResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { compressImages } from "@/shared/lib/utils/image/compress-image";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

export function useUploadChatImages() {
  return useMutation({
    mutationFn: async (files: File[]) => {
      if (!files || files.length === 0) {
        throw new Error("업로드할 파일이 없습니다.");
      }

      files.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          throw new Error("이미지 파일만 업로드할 수 있습니다.");
        }
      });

      const compressedFiles = await compressImages(files);

      const formData = new FormData();
      compressedFiles.forEach((file) => {
        formData.append("uploadFiles", file);
      });

      const response = await httpClient<{ imageUrl: string }[]>(API_ENDPOINTS.chatImages, {
        method: "POST",
        body: formData,
      });
      return response.data;
    },
    onError: (error) => {
      const apiError = error as unknown as ApiResponseType<null>;

      if (apiError.code) {
        switch (apiError.code) {
          case 400:
          case 404:
          case 502:
            showToast.error(apiError.message);
            break;
          // 권한 문제
          case 403:
            showToast.error("이미지 업로드 권한이 없습니다.");
            break;
          // 파일 크기 문제
          case 413:
            showToast.error("이미지 하나당 최대 10MB를 초과할 수 없습니다.");
            break;
          default:
            showToast.error("이미지 업로드에 실패했습니다.");
        }
      }
    },
  });
}
