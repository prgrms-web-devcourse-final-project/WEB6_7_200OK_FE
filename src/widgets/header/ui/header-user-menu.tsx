"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

import { userKeys } from "@/features/user/api/use-my-profile";
import { ROUTES } from "@/shared/config/routes";
import { showToast } from "@/shared/lib/utils/toast/show-toast";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";

interface HeaderUserMenuProps {
  avatarUrl?: string;
  avatarAlt: string;
}

export default function HeaderUserMenu({ avatarUrl, avatarAlt }: HeaderUserMenuProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const themeLabel = isDarkMode ? "라이트 모드" : "다크 모드";
  const ThemeIcon = isDarkMode ? Sun : Moon;

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        showToast.error("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      showToast.error("로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      queryClient.removeQueries({ queryKey: userKeys.all, exact: false });
      router.refresh();
      router.push(ROUTES.login);
    }
  };

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="사용자 메뉴"
          className="rounded-full focus-visible:outline-hidden"
        >
          <Avatar className="size-9">
            <AvatarImage src={avatarUrl} alt={avatarAlt} />
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1.5">
        <DropdownMenuItem asChild className="h-10 pl-3">
          <Link href={ROUTES.myPage}>
            <User className="size-4" />
            마이 페이지
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-10 pl-3" onSelect={handleToggleTheme}>
          <ThemeIcon className="size-4" />
          {themeLabel}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10 pl-3" variant="destructive" onSelect={handleLogout}>
          <LogOut className="size-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
