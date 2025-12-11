"use client";

import Image from "next/image";

import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils/utils";

import { SOCIAL_PROVIDERS, type SocialProvider } from "../utils/social-providers";

const socialButtonVariants = cva(
  "flex h-[3.25rem] w-full items-center justify-center gap-[0.5rem] rounded-lg text-[1rem] font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      provider: {
        google:
          "border-2 border-[#E5E7EB] bg-[#FFFFFF] text-[#364153] hover:bg-gray-50 hover:text-[#364153]",
        naver: "border-none bg-[#03C75A] text-white hover:opacity-90",
        kakao: "border-none bg-[#FEE500] text-[#000000] hover:opacity-90",
      },
    },
    defaultVariants: {
      provider: "google",
    },
  }
);

interface SocialButtonProps {
  provider: SocialProvider;
  className?: string;
  onClick?: () => void;
}

function SocialButton({ provider, className, onClick }: SocialButtonProps) {
  const config = SOCIAL_PROVIDERS[provider];

  return (
    <button
      type="button"
      className={cn(socialButtonVariants({ provider }), className)}
      onClick={onClick}
    >
      <Image src={config.icon} alt={config.label} className={config.iconClassName} />
      {config.label}
    </button>
  );
}

export function SocialLoginButtons() {
  const handleGoogleLogin = () => {}; // 구글 로그인 처리 함수
  const handleNaverLogin = () => {}; // 네이버 로그인 처리 함수
  const handleKakaoLogin = () => {}; // 카카오 로그인 처리 함수

  return (
    <div className="flex w-full flex-col gap-[0.75rem]">
      <SocialButton provider="google" onClick={handleGoogleLogin} />
      <SocialButton provider="naver" onClick={handleNaverLogin} />
      <SocialButton provider="kakao" onClick={handleKakaoLogin} />
    </div>
  );
}
