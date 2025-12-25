import { useQuery } from "@tanstack/react-query";

import {
  MOCK_NOTIFICATIONS,
  NotificationPreferenceItemType,
} from "@/entities/notification-preference";

// TODO: 실제 API 엔드포인트가 나오면 교체
const fetchNotificationPreferences = async (): Promise<NotificationPreferenceItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_NOTIFICATIONS), 500);
  });

export const notificationKeys = {
  all: ["user", "notification-preferences"] as const,
};

export function useNotificationPreferences() {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: fetchNotificationPreferences,
  });
}
