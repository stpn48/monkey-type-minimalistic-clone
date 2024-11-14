import { Statistic } from "@/components/statistic";
import React from "react";

type Props = {
  username: string;
  stats: {
    allTimeWpm: number;
    totalTestsCompleted: number;
    totalTestsStarted: number;
    totalTimeTyped: number;
  };
};

export function MainInfo({ username, stats }: Props) {
  return (
    <section className="flex w-[400px] flex-col gap-10 rounded-lg bg-foreground p-8">
      <h1 className="text-4xl text-text-primary">{username}</h1>

      <div className="flex flex-col gap-4">
        <Statistic label="ALL TIME WPM" value={stats.allTimeWpm.toString()} />
        <Statistic label="TOTAL TESTS COMPLETED" value={stats.totalTestsCompleted.toString()} />
        <Statistic label="TOTAL TESTS STARTED" value={stats.totalTestsStarted.toString()} />
        <Statistic label="TOTAL TIME TYPED" value={stats.totalTimeTyped.toString()} />
        <Statistic label="TOTAL WORDS TYPED" value={stats.totalTimeTyped.toString()} />
        <Statistic label="TOTAL LETTERS TYPED" value={stats.totalTimeTyped.toString()} />
        <Statistic label="TOTAL CORRECT LETTERS TYPED" value={stats.totalTimeTyped.toString()} />
        <Statistic label="TOTAL MISTAKES" value={stats.totalTimeTyped.toString()} />
      </div>
    </section>
  );
}
