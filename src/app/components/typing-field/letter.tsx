import { twMerge } from "tailwind-merge";

type Props = {
  char: string;
  isCorrect: boolean | null;
};

export function Letter({ char, isCorrect }: Props) {
  return (
    <span
      className={twMerge(
        "font-geist-mono text-3xl",
        isCorrect === true && "text-primary",
        isCorrect === false && "text-red-600",
        isCorrect === null && "text-text",
      )}
    >
      {char}
    </span>
  );
}
