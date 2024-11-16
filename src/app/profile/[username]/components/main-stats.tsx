import { Statistic } from "@/components/statistic";
import { formatTime } from "@/utils/format-time";
import React from "react";

type Props = {
  username: string;
  stats: {
    allTimeWpm: number;
    totalTestsCompleted: number;
    totalTestsStarted: number;
    totalTimeTyped: number;
    totalWordsTyped: number;
    totalLettersTyped: number;
    totalCorrectLettersTyped: number;
    totalMistakes: number;
  };
};

export function MainInfo({ username, stats }: Props) {
  return (
    <section className="flex flex-col gap-10 rounded-lg bg-foreground p-10">
      <h1 className="text-3xl text-text-primary">{username}</h1>
      <div className="grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <Statistic label="15 SEC ALL TIME WPM" value={stats.allTimeWpm.toFixed(2).toString()} />
        <Statistic label="TOTAL TESTS COMPLETED" value={stats.totalTestsCompleted.toString()} />
        <Statistic label="TOTAL TESTS STARTED" value={stats.totalTestsStarted.toString()} />
        <Statistic label="TOTAL TIME TYPED" value={formatTime(stats.totalTimeTyped).toString()} />
        <Statistic label="TOTAL WORDS TYPED" value={stats.totalWordsTyped.toString()} />
        <Statistic label="TOTAL LETTERS TYPED" value={stats.totalLettersTyped.toString()} />
        <Statistic
          label="TOTAL CORRECT LETTERS TYPED"
          value={stats.totalCorrectLettersTyped.toString()}
        />
        <Statistic label="TOTAL MISTAKES" value={stats.totalMistakes.toString()} />
      </div>
    </section>
  );
}
