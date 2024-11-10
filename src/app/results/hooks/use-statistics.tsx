import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { useCallback, useEffect } from "react";

export function getStatistics(words: string[], userWords: string[]) {
  const {
    setCorrectLetters,
    setCorrectWords,
    setIncorrectLetters,
    setIncorrectWords,
    setExtraLetters,
    setWpm,
    totalWords,
    setAccuracy,
    setDuration,
  } = useStatisticsStore();

  const { startedTypingTime, finishedTypingTime } = useTypingField();

  const getStatistics = useCallback(() => {
    let totalCorrectLetters = 0;
    let totalIncorrectLetters = 0;
    let totalCorrectWords = 0;
    let totalIncorrectWords = 0;
    let totalExtraLetters = 0;
    // loop through each user word
    for (let i = 0; i < userWords.length; i++) {
      // words match
      if (words[i] === userWords[i]) {
        totalCorrectWords++;
        totalCorrectLetters += userWords[i].length;
        continue;
      }

      // words don't match
      if (words[i] !== userWords[i]) {
        totalIncorrectWords++;
        // if the original word is longer than the user word, they missed some letters
        if (words[i].length > userWords[i].length) {
          totalExtraLetters += words[i].length - userWords[i].length;
        }

        // check for each letter if it matches
        for (let j = 0; j < userWords[i].length; j++) {
          if (words[i][j] !== userWords[i][j]) {
            totalIncorrectLetters++;
          } else {
            totalCorrectLetters++;
          }
        }
      }
    }

    setCorrectLetters(totalCorrectLetters);
    setIncorrectLetters(totalIncorrectLetters);
    setExtraLetters(totalExtraLetters);
    setCorrectWords(totalCorrectWords);
    setIncorrectWords(totalIncorrectWords);

    setWpm(
      calculateWpm(
        totalCorrectWords + totalIncorrectWords,
        startedTypingTime!,
        finishedTypingTime!,
      ),
    );

    setAccuracy(calculateAccuracy(totalCorrectLetters, totalIncorrectLetters));

    setDuration((finishedTypingTime! - startedTypingTime!) / 1000);
  }, [words, userWords]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);
}

function calculateWpm(totalWords: number, startedTypingTime: number, finishedTypingTime: number) {
  const timeDiff = finishedTypingTime - startedTypingTime;
  const timeDiffMinutes = timeDiff / (1000 * 60);
  return totalWords / timeDiffMinutes;
}

function calculateAccuracy(correctLetters: number, incorrectLetters: number) {
  return (correctLetters / (correctLetters + incorrectLetters)) * 100;
}
