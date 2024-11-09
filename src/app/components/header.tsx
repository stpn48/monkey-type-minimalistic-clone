"use client";

import { Logo } from "@/components/icons";
import { useTypingField } from "@/context/use-typing-field";
import { motion } from "framer-motion";
import { Settings, UserRound } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function Header() {
  const { userTyping } = useTypingField();

  return (
    <header
      className={twMerge(
        "opacity-1 flex w-full px-20 transition-opacity duration-300",
        userTyping && "opacity-0",
      )}
    >
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-text-primary font-geist-sans text-2xl font-bold">tpye</h1>
      </div>

      <div className="flex-1" />

      <ul className="flex items-center gap-4">
        <li>
          <UserRound className="size-5" />
        </li>
        <li>
          <Settings className="size-5" />
        </li>
      </ul>
    </header>
  );
}
