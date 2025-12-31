import { useServerTimeStore } from "@/shared/lib/hooks/use-server-time-store";

export function useServerTimeNow() {
  return useServerTimeStore((state) => state.serverNowMs);
}
