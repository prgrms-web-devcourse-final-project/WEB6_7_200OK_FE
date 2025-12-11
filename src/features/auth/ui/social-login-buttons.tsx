"use client";

import Image from "next/image";

import { cva } from "class-variance-authority";

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
}

export function SocialButton({ provider, onClick }: SocialButtonProps) {
  const { icon, label } = SOCIAL_MAPS[provider];

  return (
    <button type="button" className={socialButtonVariants({ provider })} onClick={onClick}>
      <Image src={icon} alt={`${label} 로그인`} width={20} height={20} />
      {label}
    </button>
  );
}

export function SocialLoginButtons() {
  const handleGoogleLogin = () => {}; // TODO: 구글 로그인 로직
  const handleNaverLogin = () => {}; // TODO: 네이버 로그인 로직
  const handleKakaoLogin = () => {}; // TODO: 카카오 로그인 로직

  return (
    <div className="flex w-full flex-col gap-3">
      <SocialButton provider="google" onClick={handleGoogleLogin} />
      <SocialButton provider="naver" onClick={handleNaverLogin} />
      <SocialButton provider="kakao" onClick={handleKakaoLogin} />
    </div>
  );
}
