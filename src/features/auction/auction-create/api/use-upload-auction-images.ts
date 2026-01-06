"use client";

import { useMutation } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
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
      showToast.error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      console.error("이미지 업로드 실패:", error);
    },
  });
}
