"use client";

import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ThemeOption } from "./toggle-theme-button";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  onValueChange?: (value: string) => void;
  openDownwards?: boolean;
  defaultValue?: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

export function Select({
  className,
  options,
  onValueChange,
  openDownwards,
  defaultValue,
  ...props
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || options[0].value);

  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  return (
    <div className="relative">
      <button
        className={twMerge("rounded-lg border-foreground/60 bg-foreground px-4 py-2", className)}
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        {options.find((option) => option.value === value)?.label || value}
      </button>

      {dropdownOpen && (
        <>
          {/* Close overlay */}
          <div
            className="fixed inset-0 z-10 h-screen w-screen"
            onClick={() => setDropdownOpen(false)}
          ></div>

          {/* dropdown */}
          <div
            className={twMerge(
              "absolute left-1/2 z-20 flex -translate-x-1/2 flex-col gap-2 rounded-lg bg-foreground px-2 py-2 shadow-md",
              openDownwards ? "top-full" : "bottom-full",
            )}
          >
            {options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                onClick={() => {
                  setDropdownOpen(false);
                  setValue(option.value);
                }}
                className="cursor-pointer whitespace-nowrap rounded-md bg-foreground px-4 py-1 text-center hover:bg-background"
              >
                {option.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
