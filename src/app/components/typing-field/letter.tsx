import { twMerge } from "tailwind-merge";

type Props = {
  letter: string;
  userLetter: string;
};

export function Letter({ letter, userLetter }: Props) {
  return (
    <span
      className={twMerge(
        "font-geist-mono text-3xl",
        userLetter === letter && "text-primary",
        userLetter !== letter && "text-red-600",
        userLetter === "" && "text-text",
        userLetter === "overflow-letter" && "text-red-800",
      )}
    >
      {letter}
    </span>
  );
}
