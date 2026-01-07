"use client";

import Link from "next/link";

import { LogIn } from "lucide-react";

import { useUserBasic } from "@/features/user/api/use-user-basic";
import { ROUTES } from "@/shared/config/routes";
import Button from "@/shared/ui/button/button";
import HeaderActions from "@/widgets/header/ui/header-actions";

export default function HeaderAuthSlot() {
  const { data, isPending } = useUserBasic();

  if (isPending) {
    return <div className="h-10 w-24" aria-hidden />;
  }

  if (!data) {
    return (
      <Button asChild size="lg">
        <Link href={ROUTES.login} aria-label="로그인">
          <LogIn className="size-5" />
          <span className="font-semibold">로그인</span>
        </Link>
      </Button>
    );
  }

  return (
    <HeaderActions
      avatarUrl={data.userProfileUrl || undefined}
      avatarAlt={data.username || "프로필"}
    />
  );
}
