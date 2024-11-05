import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  active: boolean;
};

export function ConfigButton({ className, active, ...props }: Props) {
  return (
    <button
      className={twMerge("hover:text-primary", className, active && "text-primary")}
      {...props}
    >
      {props.children}
    </button>
  );
}
