import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function ConfigButton({ className, ...props }: Props) {
  return (
    <button className={twMerge("hover:text-primary", className)} {...props}>
      {props.children}
    </button>
  );
}
