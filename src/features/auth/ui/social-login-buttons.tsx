"use client";

import Image from "next/image";

import googleIcon from "@/shared/assets/icons/login-icons/google-icon.svg";
import kakaoIcon from "@/shared/assets/icons/login-icons/kakao-icon.svg";
import naverIcon from "@/shared/assets/icons/login-icons/naver-icon.svg";

export function SocialLoginButtons() {
  // 로그인 버튼 공통 레이아웃 스타일
  const baseButtonStyle =
    "flex h-[3.25rem] w-full items-center justify-center gap-[0.5rem] rounded-lg text-[1rem] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div className="flex w-full flex-col gap-[0.75rem]">
      {/* 구글 로그인 */}
      <button
        type="button"
        className={`${baseButtonStyle} border-2 border-[#E5E7EB] bg-[#FFFFFF] text-[#364153] hover:bg-gray-50 hover:text-[#364153]`}
      >
        <Image src={googleIcon} alt="Google" width={20} height={20} />
        구글로 시작하기
      </button>

      {/* 네이버 로그인 */}
      <button
        type="button"
        className={`${baseButtonStyle} border-none bg-[#03C75A] text-white hover:opacity-90`}
      >
        <Image src={naverIcon} alt="Naver" width={16} height={16} />
        네이버로 시작하기
      </button>

      {/* 카카오 로그인 */}
      <button
        type="button"
        className={`${baseButtonStyle} border-none bg-[#FEE500] text-[#000000] hover:opacity-90`}
      >
        <Image src={kakaoIcon} alt="Kakao" width={20} height={20} />
        카카오로 시작하기
      </button>
    </div>
  );
}
