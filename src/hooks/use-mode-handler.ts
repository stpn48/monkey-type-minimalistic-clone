"use client";

import { useConfigState } from "@/context/use-config-state";
import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { useEffect } from "react";
import { usePreserveSearchParams } from "./use-preserve-search-params";

export function useModeHandler() {
  const { setFinishedTypingTime, activeLetterIndex, activeWordIndex, words } = useTypingField();
  const { totalWords } = useStatisticsStore();
  const { wordCount, mode } = useConfigState();
  const { navigateWithParams } = usePreserveSearchParams();

  useEffect(() => {
    if (mode === "wordCount") {
      if (totalWords === wordCount - 1 && activeLetterIndex === words[activeWordIndex].length) {
        setFinishedTypingTime(new Date().getTime());
        navigateWithParams("/results", "replace");
      }
    } else if (mode === "quote") {
      if (totalWords === words.length - 1 && activeLetterIndex === words[activeWordIndex].length) {
        setFinishedTypingTime(new Date().getTime());
        navigateWithParams("/results", "replace");
      }
    }
  }, [totalWords, wordCount, mode, navigateWithParams, words, activeWordIndex, activeLetterIndex]);
}
