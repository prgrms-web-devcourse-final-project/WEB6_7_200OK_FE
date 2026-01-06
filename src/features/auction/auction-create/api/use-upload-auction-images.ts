"use client";

import { useMutation } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import { ApiResponseType } from "@/shared/api/types/response";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { showToast } from "@/shared/lib/utils/toast/show-toast";

import type { UploadImageResponse } from "../model/types";

export function useUploadAuctionImages() {
  return useMutation<UploadImageResponse[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      if (files.length === 0) {
        return [];
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("uploadFiles", file);
      });

      const response = await httpClient<UploadImageResponse[], FormData>(
        API_ENDPOINTS.auctionImages,
        {
          method: "POST",
          body: formData,
        }
      );

      return response.data;
    },
    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
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
          // TODO: 413 이미지 파일 크기 관련 에러 message 업데이트 예정
          case 413:
            showToast.error("이미지 파일은 최대 50MB까지 업로드할 수 있습니다.");
            break;
          default:
            showToast.error(apiError.message || "이미지 업로드에 실패했습니다.");
        }
      }
    },
  });
}
