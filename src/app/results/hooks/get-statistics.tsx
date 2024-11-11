import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { usePreserveSearchParams } from "@/hooks/use-preserve-search-params";
import { calculateStatistics } from "@/utils/calculate-statistics";
import { useEffect } from "react";

export function getStatistics() {
  const {
    setCorrectLetters,
    setCorrectWords,
    setIncorrectLetters,
    setIncorrectWords,
    setExtraLetters,
    setWpm,
    setDuration,
    mistakes,
    setAccuracy,
    setMissedLetters,
  } = useStatisticsStore();

  const { startedTypingTime, finishedTypingTime, words, userWords } = useTypingField();
  const { navigateWithParams } = usePreserveSearchParams();

  useEffect(() => {
    if (!words.length || !userWords.length) {
      navigateWithParams("/");
      return;
    }

    const statistics = calculateStatistics(words, userWords);

    setCorrectLetters(statistics.totalCorrectLetters);
    setIncorrectLetters(statistics.totalIncorrectLetters);
    setExtraLetters(statistics.totalExtraLetters);
    setCorrectWords(statistics.totalCorrectWords);
    setIncorrectWords(statistics.totalIncorrectWords);
    setMissedLetters(statistics.totalMissedLetters);

    setWpm(
      calculateWpm(
        statistics.totalCorrectWords + statistics.totalIncorrectWords,
        startedTypingTime!,
        finishedTypingTime!,
      ),
    );

    setAccuracy(calculateAccuracy(statistics.totalCorrectLetters, mistakes));

    setDuration((finishedTypingTime! - startedTypingTime!) / 1000);
  }, [words, userWords, navigateWithParams, startedTypingTime, finishedTypingTime, mistakes]);
}

function calculateWpm(totalWords: number, startedTypingTime: number, finishedTypingTime: number) {
  const timeDiff = finishedTypingTime - startedTypingTime;
  const timeDiffMinutes = timeDiff / (1000 * 60);
  return totalWords / timeDiffMinutes;
}

function calculateAccuracy(correctLetters: number, mistakes: number) {
  return (correctLetters / (correctLetters + mistakes)) * 100;
}
