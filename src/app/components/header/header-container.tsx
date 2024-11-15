"use client";

import { useTypingField } from "@/context/use-typing-field";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export function HeaderContainer({ children }: PropsWithChildren) {
  const { userTyping } = useTypingField();

  return (
    <header
      className={twMerge(
        "opacity-1 absolute left-0 top-8 flex w-screen px-20 transition-opacity duration-300",
        userTyping && "opacity-0",
      )}
    >
      {children}
    </header>
  );
}
