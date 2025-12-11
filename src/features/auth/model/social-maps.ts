import googleIcon from "@/shared/assets/icons/login-icons/google-icon.svg";
import kakaoIcon from "@/shared/assets/icons/login-icons/kakao-icon.svg";
import naverIcon from "@/shared/assets/icons/login-icons/naver-icon.svg";

export const SOCIAL_MAPS = {
  google: {
    icon: googleIcon,
    label: "구글로 시작하기",
  },
  naver: {
    icon: naverIcon,
    label: "네이버로 시작하기",
  },
  kakao: {
    icon: kakaoIcon,
    label: "카카오로 시작하기",
  },
} as const;

export type SocialProvider = keyof typeof SOCIAL_MAPS;
