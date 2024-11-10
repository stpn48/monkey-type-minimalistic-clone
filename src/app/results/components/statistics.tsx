"use client";

import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { getStatistics } from "../hooks/use-statistics";
import { Statistic } from "./statistic";

type Props = {};

export function Statistics({}: Props) {
  const { words, userWords } = useTypingField();

  const { wpm, accuracy, duration, correctLetters, incorrectLetters, missedLetters } =
    useStatisticsStore();

  getStatistics(words, userWords);

  return (
    <div className="mt-20 flex flex-col flex-wrap gap-10 font-geist-mono text-2xl">
      <Statistic label="WPM" value={wpm.toFixed(2)} />
      <Statistic label="ACCURACY" value={`${accuracy.toFixed(2)}%`} />
      <div className="mt-20 flex gap-10">
        <Statistic label="CORRECT LETTERS" value={correctLetters} />
        <Statistic label="INCORRECT LETTERS" value={incorrectLetters} />
        <Statistic label="MISSED LETTERS" value={missedLetters} />
        <Statistic label="TIME" value={`${duration.toFixed(0)}s`} />
      </div>
    </div>
  );
}
