import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={twMerge(
        "rounded-lg bg-foreground p-2 text-text-primary placeholder-text",
        className,
      )}
      {...props}
    />
  );
}
