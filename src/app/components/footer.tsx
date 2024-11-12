"use client";

import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { useTypingField } from "@/context/use-typing-field";
import { CodeXml } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function Footer() {
  const { userTyping } = useTypingField();

  return (
    <div
      className={twMerge(
        "fixed bottom-8 flex w-screen items-center justify-between px-8 transition-opacity duration-300",
        userTyping && "opacity-0",
      )}
    >
      <Link
        href="https://github.com/stpn48/monkey-type-minimalistic-clone"
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer"
      >
        <CodeXml className="size-5 hover:text-primary" />
      </Link>
      <ToggleThemeButton />
    </div>
  );
}
