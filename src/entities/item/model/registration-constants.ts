// 가격 관련 상수
export const STOP_LOSS_PERCENTAGE = 0.9; // 스탑로스 기본 값 시작가 90%
export const DEFAULT_DROP_PERCENTAGE = 0.01; // 기본 하락 단위 1%
export const MIN_DROP_PERCENTAGE = 0.005; // 기본 하락 단위 최소 값 0.5%
export const MIN_START_PRICE = 1000; // 최소 시작가

// 태그 관련 상수
export const MAX_TAGS = 5; // 최대 태그 개수

// 시간 관련 타입
export type TimeZone = "오전" | "오후";
export type Hour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// 시간 관련 상수
export const TIMEZONES = ["오전", "오후"] as const;
export const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as const;
