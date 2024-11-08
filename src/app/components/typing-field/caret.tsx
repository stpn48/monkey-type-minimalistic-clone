"use client";

import { useCaretPosition } from "@/hooks/useCaretPosition";
import { useRef } from "react";

export function Caret({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const caretRef = useRef<HTMLSpanElement>(null);
  useCaretPosition(caretRef);

  return (
    <span
      ref={caretRef}
      {...props}
      className="absolute h-[36px] w-[3px] rounded-full bg-primary transition-all duration-[165ms]"
    />
  );
}
