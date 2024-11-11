"use client";

import { useStatisticsStore } from "@/context/use-statistics";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  letter: string;
  userLetter: string;
};

export function Letter({ letter, userLetter }: Props) {
  const { setMistakes } = useStatisticsStore();

  const isCorrect = userLetter === letter;

  useEffect(() => {
    if (!isCorrect && userLetter !== "" && userLetter !== "overflow-letter") {
      setMistakes((prev) => prev + 1);
    }
  }, [isCorrect, userLetter, setMistakes]);

  return (
    <span
      className={twMerge(
        "font-geist-mono text-3xl",
        isCorrect && "text-text-primary",
        !isCorrect && "text-incorrect-text",
        userLetter === "" && "text-text",
        userLetter === "overflow-letter" && "text-incorrect-text-overflow",
      )}
    >
      {letter}
    </span>
  );
}
