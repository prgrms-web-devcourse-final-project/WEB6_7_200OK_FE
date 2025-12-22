"use client";

import { useState } from "react";

import Image from "next/image";

import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { showToast } from "@/shared/lib/utils/toast/show-toast";

import { getSocialLoginUrl } from "../api/auth-api";
import { SOCIAL_MAPS, type SocialProvider } from "../model/social-maps";

const socialButtonVariants = cva(
  "flex h-13 w-full items-center justify-center gap-2 rounded-lg text-base font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      provider: {
        google:
          "text-foreground dark:text-background border-2 border-zinc-200 bg-white hover:bg-gray-50",
        naver: "border-none bg-[#03C75A] text-white hover:opacity-90",
        kakao: "text-foreground dark:text-background border-none bg-[#FEE500] hover:opacity-90",
      },
    },
    defaultVariants: {
      provider: "google",
    },
  }
);

interface SocialButtonProps {
  provider: SocialProvider;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function SocialButton({ provider, onClick, disabled, isLoading }: SocialButtonProps) {
  const { icon, label } = SOCIAL_MAPS[provider];

  return (
    <button
      type="button"
      className={socialButtonVariants({ provider })}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Image src={icon} alt={`${label} 로그인`} width={20} height={20} />
      )}
      {label}
    </button>
  );
}

export function SocialLoginButtons() {
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null);

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      setLoadingProvider(provider);

      const url = await getSocialLoginUrl(provider);

      // URL 유효성 확인 (선택 사항)
      // const validatedUrl = new URL(url);

      window.location.href = url;
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);

      const message =
        error instanceof Error ? error.message : "로그인 중 알 수 없는 오류가 발생했습니다.";
      showToast.error(message);

      setLoadingProvider(null);
    }
  };

  const providers: SocialProvider[] = ["google", "naver", "kakao"];

  return (
    <div className="flex w-full flex-col gap-3">
      {providers.map((provider) => (
        <SocialButton
          key={provider}
          provider={provider}
          onClick={() => handleSocialLogin(provider)}
          disabled={loadingProvider !== null} // 하나라도 로딩 중이면 전체 비활성화
          isLoading={loadingProvider === provider} // 해당 버튼에만 로딩 표시
        />
      ))}
    </div>
  );
}
