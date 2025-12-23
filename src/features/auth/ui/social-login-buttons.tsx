"use client";

import { useState } from "react";

import Image from "next/image";

import { cva } from "class-variance-authority";

import { showToast } from "@/shared/lib/utils/toast/show-toast";

import { fetchSocialLoginUrl } from "../api/auth-api";
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
}

export function SocialButton({ provider, onClick, disabled }: SocialButtonProps) {
  const { icon, label } = SOCIAL_MAPS[provider];

  return (
    <button
      type="button"
      className={socialButtonVariants({ provider })}
      onClick={onClick}
      disabled={disabled}
    >
      <Image src={icon} alt={`${label} 로그인`} width={20} height={20} />
      {label}
    </button>
  );
}

export function SocialLoginButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      setIsLoading(true);

      const url = await fetchSocialLoginUrl(provider);

      try {
        const validatedUrl = new URL(url);
        window.location.href = validatedUrl.href;
      } catch {
        throw new Error("유효하지 않은 OAuth URL입니다.");
      }
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);

      if (error instanceof TypeError && error.message.includes("fetch")) {
        showToast.error("네트워크 연결을 확인해주세요.");
      } else if (error instanceof Error) {
        showToast.error(error.message);
      } else {
        showToast.error("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <SocialButton
        provider="google"
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading}
      />
      <SocialButton
        provider="naver"
        onClick={() => handleSocialLogin("naver")}
        disabled={isLoading}
      />
      <SocialButton
        provider="kakao"
        onClick={() => handleSocialLogin("kakao")}
        disabled={isLoading}
      />
    </div>
  );
}
