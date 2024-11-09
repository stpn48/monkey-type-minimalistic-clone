import { twMerge } from "tailwind-merge";

type Props = {
  letter: string;
  userLetter: string;
};

export function Letter({ letter, userLetter }: Props) {
  return (
    <span
      className={twMerge(
        "font-geist-mono text-[28px]",
        userLetter === letter && "text-text-primary",
        userLetter !== letter && "text-incorrect-text",
        userLetter === "" && "text-text",
        userLetter === "overflow-letter" && "text-incorrect-text-overflow",
      )}
    >
      {letter}
    </span>
  );
}
