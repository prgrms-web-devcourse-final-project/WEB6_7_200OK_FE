"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

import { ROUTES } from "@/shared/config/routes";
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
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const themeLabel = isDarkMode ? "라이트모드" : "다크모드";
  const ThemeIcon = isDarkMode ? Sun : Moon;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push(ROUTES.login);
      router.refresh();
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
            마이페이지
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
