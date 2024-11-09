"use client";

import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { useTypingField } from "@/context/use-typing-field";
import React from "react";
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
      <h1>footer</h1>
      <ToggleThemeButton />
    </div>
  );
}
