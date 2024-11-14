"use client";

import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { usePreserveSearchParams } from "@/hooks/use-preserve-search-params";
import { useEffect } from "react";
import { getStatistics } from "../hooks/get-statistics";
import { Statistic } from "../../../components/statistic";

export function Statistics() {
  getStatistics();

  const { words, userWords } = useTypingField();
  const { navigateWithParams } = usePreserveSearchParams();

  const { wpm, accuracy, duration, correctLetters, incorrectLetters, missedLetters, extraLetters } =
    useStatisticsStore();

  useEffect(() => {
    if (!words.length || !userWords.length) {
      navigateWithParams("/", "replace");
      return;
    }
  }, [navigateWithParams, words, userWords]);

  if (!words.length || !userWords.length || (!wpm && !accuracy && !duration)) {
    return null;
  }

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
