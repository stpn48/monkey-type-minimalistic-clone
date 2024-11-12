import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, disabled, ...props }: Props) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-lg bg-text-primary px-4 py-2",
        className,
        disabled && "opacity-50",
      )}
    >
      {children}
    </button>
  );
}
