"use client";

import { useStatisticsStore } from "@/context/use-statistics";
import { getStatistics } from "../hooks/get-statistics";
import { Statistic } from "./statistic";

export function Statistics() {
  getStatistics();

  const { wpm, accuracy, duration, correctLetters, incorrectLetters, missedLetters, extraLetters } =
    useStatisticsStore();

  return (
    <div className="mt-20 flex flex-col flex-wrap gap-10 font-geist-mono text-2xl">
      <Statistic label="WPM" value={wpm.toFixed(2)} />
      <Statistic label="ACCURACY" value={`${accuracy.toFixed(2)}%`} />
      <div className="flex gap-10">
        <Statistic label="CORRECT LETTERS" value={correctLetters} />
        <Statistic label="INCORRECT LETTERS" value={incorrectLetters} />
        <Statistic label="MISSED LETTERS" value={missedLetters} />
        <Statistic label="EXTRA LETTERS" value={extraLetters} />
      </div>
      <Statistic label="TIME" value={`${duration.toFixed(0)}s`} />
    </div>
  );
}
