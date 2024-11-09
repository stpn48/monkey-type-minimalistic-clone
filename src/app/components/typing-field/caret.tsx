"use client";

import { useTypingField } from "@/context/use-typing-field";
import { useCaretPosition } from "@/hooks/useCaretPosition";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

export function Caret({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const caretRef = useRef<HTMLSpanElement>(null);
  useCaretPosition(caretRef);
  const { userTyping } = useTypingField();

  return (
    <span
      ref={caretRef}
      {...props}
      className={twMerge(
        "absolute h-[36px] w-[2.5px] rounded-full bg-primary transition-all duration-[95ms] ease-out",
        !userTyping && "animate-caretFlashSmooth",
      )}
    />
  );
}
