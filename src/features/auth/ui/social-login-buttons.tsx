"use client";

import { useState } from "react";

import Image from "next/image";

import { cva } from "class-variance-authority";

import { showToast } from "@/shared/lib/utils/toast/show-toast";

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

      const response = await fetch(`/api/v1/auth?provider=${provider}`);

      if (!response.ok) {
        throw new Error("OAuth URL을 가져오는데 실패했습니다.");
      }

      const json = await response.json();

      if (json.data) {
        window.location.href = json.data;
      } else {
        throw new Error("OAuth URL이 없습니다.");
      }
    } catch (error) {
      console.error(`${provider} 로그인 오류:`, error);
      showToast.error("로그인 중 오류가 발생했습니다.");
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
