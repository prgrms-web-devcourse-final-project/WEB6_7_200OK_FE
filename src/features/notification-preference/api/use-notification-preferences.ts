import { useQuery } from "@tanstack/react-query";

import {
  MOCK_NOTIFICATIONS,
  NotificationPreferenceItemType,
} from "@/entities/notification-preference";

const fetchNotificationPreferences = async (): Promise<NotificationPreferenceItemType[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_NOTIFICATIONS), 500); // 서비 지연 테스트 0.5초
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
