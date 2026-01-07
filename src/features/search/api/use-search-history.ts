"use client";

import { useQuery } from "@tanstack/react-query";

import { httpClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

interface SearchHistoryItem {
  searchHistoryId: number;
  keyword: string;
}

interface SearchHistoryResponse {
  userId: number;
  searchHistoryReadInfos: SearchHistoryItem[];
}

const searchHistoryKey = ["search", "history"] as const;

async function fetchSearchHistory() {
  try {
    const response = await httpClient<SearchHistoryResponse>(API_ENDPOINTS.searchHistory, {
      method: "GET",
    });

    const items = response.data?.searchHistoryReadInfos ?? [];

    return items.filter((item) => item.keyword.trim().length > 0);
  } catch {
    return [];
  }
}

export function useSearchHistory() {
  return useQuery({
    queryKey: searchHistoryKey,
    queryFn: fetchSearchHistory,
    retry: false,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });
}
