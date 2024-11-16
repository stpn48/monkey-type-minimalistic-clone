import { Check, Loader2, X } from "lucide-react";
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  showValidation?: boolean;
  popupMsg?: string;
  isContentValid?: boolean | null;
  isLoading?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className,
  disabled,
  isLoading,
  showValidation = false,
  popupMsg,
  isContentValid = null,
  ...props
}: Props) {
  //TODO: add validation symbols

  return (
    <div
      tabIndex={1}
      className="relative flex w-[300px] rounded-lg bg-foreground px-4 py-2 text-text-primary focus:ring-1 focus:ring-primary"
    >
      <input
        disabled={disabled}
        className={twMerge(
          "flex-grow bg-inherit placeholder-text outline-none",
          className,
          disabled && "opacity-50",
        )}
        {...props}
      />

      {showValidation && (
        <div className="group">
          {!isLoading && isContentValid === false && (
            <X className="cursor-pointer text-incorrect-text" />
          )}
          {!isLoading && isContentValid && <Check className="cursor-pointer text-green-500" />}
          {isLoading && <Loader2 className="animate-spin cursor-pointer" />}

          {popupMsg && (
            <div className="absolute right-[50px] top-0 z-10 hidden rounded-lg bg-black bg-opacity-60 p-2 opacity-0 transition-all duration-300 group-hover:block group-hover:opacity-100">
              <p>{popupMsg}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
