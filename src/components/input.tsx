import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isValid?: boolean;
  showValidation?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, disabled, ...props }: Props) {
  //TODO: add validation symbols

  return (
    <input
      disabled={disabled}
      className={twMerge(
        "w-[300px] rounded-lg bg-foreground px-4 py-2 text-text-primary placeholder-text outline-text-primary",
        className,
        disabled && "opacity-50",
      )}
      {...props}
    />
  );
}
