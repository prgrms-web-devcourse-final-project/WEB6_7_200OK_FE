import Image from "next/image";

import { SocialLoginButtons } from "@/features/auth/ui/social-login-buttons";
import windfallIcon from "@/shared/assets/icons/windfall.svg";

export function LoginScreen() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4">
      <section className="flex w-full max-w-[382px] flex-col items-center gap-10">
        {/* 로고 및 타이틀 */}
        <div className="flex w-full flex-col items-center gap-1">
          <div className="flex items-center justify-center gap-1">
            <div className="relative flex items-center justify-center">
              <Image src={windfallIcon} alt="Windfall Logo" width={40} height={40} priority />
            </div>
            <h1 className="text-foreground font-sans text-xl leading-6 font-semibold">Windfall</h1>
          </div>

          <p className="font-sans text-sm leading-6 font-normal text-[#6A7282]">
            윈드폴에 가입하고 하락 경매에 참여하세요!
          </p>
        </div>

        {/* 로그인 버튼 영역 */}
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[rgba(209,213,220,0.5)]" />
            </div>
            <span className="bg-background relative px-4 font-sans text-xs font-normal text-[#6A7282]">
              간편 로그인
            </span>
          </div>

          <SocialLoginButtons />
        </div>
      </section>
    </div>
  );
}
