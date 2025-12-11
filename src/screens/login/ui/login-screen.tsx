import Image from "next/image";

import { SocialLoginButtons } from "@/features/auth/ui/social-login-buttons";
import windfallIcon from "@/shared/assets/icons/windfall.svg";
import { Separator } from "@/shared/ui/separator";

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
            <h1 className="text-foreground text-xl leading-6 font-semibold">Windfall</h1>
          </div>

          <p className="text-muted-foreground text-sm leading-6 font-normal">
            윈드폴에 가입하고 하락 경매에 참여하세요!
          </p>
        </div>

        {/* 로그인 버튼 영역 */}
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex items-center justify-center py-2">
            <Separator className="absolute w-full" />
            <span className="bg-background text-muted-foreground relative px-4 text-xs font-normal">
              간편 로그인
            </span>
          </div>

          <SocialLoginButtons />
        </div>
      </section>
    </div>
  );
}
