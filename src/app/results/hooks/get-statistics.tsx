import { updateUserStats } from "@/app/actions/update-user-stats";
import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { usePreserveSearchParams } from "@/hooks/use-preserve-search-params";
import { calculateStatistics } from "@/utils/calculate-statistics";
import { useEffect, useMemo, useRef, useTransition } from "react";
import toast from "react-hot-toast";

export function useGetStatistics() {
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
    totalWords,
  } = useStatisticsStore();

  const { startedTypingTime, finishedTypingTime, words, userWords } = useTypingField();
  const { navigateWithParams } = usePreserveSearchParams();

  const memoWords = useMemo(() => words, [useTypingField]);
  const memoUserWords = useMemo(() => userWords, [useTypingField]);

  const [updatingStats, startUpdatingStats] = useTransition();

  console.log(updatingStats);
  const effectExecuted = useRef(false);

  useEffect(() => {
    if (effectExecuted.current) return;
    effectExecuted.current = true;

    if (!words.length || !userWords.length || (!startedTypingTime && !finishedTypingTime)) {
      return;
    }

    const statistics = calculateStatistics(words, userWords);

    setCorrectLetters(statistics.totalCorrectLetters);
    setIncorrectLetters(statistics.totalIncorrectLetters);
    setExtraLetters(statistics.totalExtraLetters);
    setCorrectWords(statistics.totalCorrectWords);
    setIncorrectWords(statistics.totalIncorrectWords);
    setMissedLetters(statistics.totalMissedLetters);

    const wpm = calculateWpm(totalWords, startedTypingTime!, finishedTypingTime!);
    const duration = parseInt(((finishedTypingTime! - startedTypingTime!) / 1000).toFixed(0));
    const accuracy = calculateAccuracy(statistics.totalCorrectLetters, mistakes);

    setWpm(wpm);
    setAccuracy(accuracy);
    setDuration(duration);

    startUpdatingStats(async () => {
      const { error } = await updateUserStats({
        wpm: duration === 15 ? wpm : 0,
        totalWords,
        correctLetters: statistics.totalCorrectLetters,
        duration,
        mistakes,
      });

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Stats updated successfully"); //TODO: REMOVE FOR PROD
    });
  }, [
    memoWords,
    memoUserWords,
    navigateWithParams,
    totalWords,
    startedTypingTime,
    finishedTypingTime,
    mistakes,
  ]);
}

function calculateWpm(totalWords: number, startedTypingTime: number, finishedTypingTime: number) {
  const timeDiff = finishedTypingTime - startedTypingTime;
  const timeDiffMinutes = timeDiff / (1000 * 60);
  return totalWords / timeDiffMinutes;
}

function calculateAccuracy(correctLetters: number, mistakes: number) {
  return (correctLetters / (correctLetters + mistakes)) * 100;
}
