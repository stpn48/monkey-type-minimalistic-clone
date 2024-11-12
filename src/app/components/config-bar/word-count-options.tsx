"use client";

import { ConfigButton } from "@/app/components/config-bar/config-button";
import { ConfigSection } from "@/app/components/config-bar/config-section";
import { useConfigState } from "@/context/use-config-state";

export function WordsOptions() {
  const { wordCount, setWordCount } = useConfigState();
  const wordCounts = [10, 25, 50, 100];

  return (
    <ConfigSection>
      {wordCounts.map((count) => (
        <ConfigButton key={count} active={wordCount === count} onClick={() => setWordCount(count)}>
          {count}
        </ConfigButton>
      ))}
    </ConfigSection>
  );
}
