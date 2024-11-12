"use client";

import { Logo } from "@/components/icons";
import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { usePreserveSearchParams } from "@/hooks/use-preserve-search-params";
import { Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export function Header() {
  const { userTyping } = useTypingField();
  const { navigateWithParams } = usePreserveSearchParams();
  const { resetTypingField } = useTypingField();
  const { resetStatistics } = useStatisticsStore();

  const handleLogoClick = useCallback(() => {
    navigateWithParams("/", "replace");
    resetStatistics();
    resetTypingField();
  }, [navigateWithParams, resetStatistics, resetTypingField]);

  return (
    <header
      className={twMerge(
        "opacity-1 flex w-full px-20 transition-opacity duration-300",
        userTyping && "opacity-0",
      )}
    >
      <div onClick={handleLogoClick} className="flex cursor-pointer items-center gap-2">
        <Logo />
        <h1 className="font-geist-sans text-2xl font-bold text-text-primary">tpye</h1>
      </div>

      <div className="flex-1" />

      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/login"}>
            <UserRound className="size-5 hover:text-primary" />
          </Link>
        </li>
        <li>
          <Settings className="size-5" />
        </li>
      </ul>
    </header>
  );
}
