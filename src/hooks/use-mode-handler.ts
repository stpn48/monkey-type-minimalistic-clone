import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useModeHandler(mode: string) {
  const { setFinishedTypingTime, activeLetterIndex, activeWordIndex, words } = useTypingField();
  const { totalWords } = useStatisticsStore();
  const { wordCount } = useConfigState();

  const router = useRouter();

  useEffect(() => {
    if (mode === "wordCount") {
      if (totalWords === wordCount - 1 && activeLetterIndex === words[activeWordIndex].length) {
        setFinishedTypingTime(new Date().getTime());
        router.replace("/results");
      }
    }
  }, [totalWords, wordCount, mode, router, words, activeWordIndex, activeLetterIndex]);
}
