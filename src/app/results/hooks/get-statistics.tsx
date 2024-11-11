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
    setDuration,
    mistakes,
    setAccuracy,
    setMissedLetters,
  } = useStatisticsStore();

  const { startedTypingTime, finishedTypingTime } = useTypingField();

  const getStatistics = useCallback(() => {
    let totalCorrectLetters = 0;
    let totalIncorrectLetters = 0;
    let totalCorrectWords = 0;
    let totalIncorrectWords = 0;
    let totalExtraLetters = 0;
    let totalMissedLetters = 0;
    // loop through each user word
    for (let i = 0; i < userWords.length; i++) {
      console.log(`iteration ${i} checking words "${words[i]}" and "${userWords[i]}"`);
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
          totalMissedLetters += words[i].length - userWords[i].length;
        } else if (words[i].length < userWords[i].length) {
          totalExtraLetters += userWords[i].length - words[i].length;
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
    setMissedLetters(totalMissedLetters);

    setWpm(
      calculateWpm(
        totalCorrectWords + totalIncorrectWords,
        startedTypingTime!,
        finishedTypingTime!,
      ),
    );

    setAccuracy(calculateAccuracy(totalCorrectLetters, mistakes));

    setDuration((finishedTypingTime! - startedTypingTime!) / 1000);
  }, [words, userWords, mistakes]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);
}

function calculateWpm(totalWords: number, startedTypingTime: number, finishedTypingTime: number) {
  const timeDiff = finishedTypingTime - startedTypingTime;
  const timeDiffMinutes = timeDiff / (1000 * 60);
  return totalWords / timeDiffMinutes;
}

function calculateAccuracy(correctLetters: number, mistakes: number) {
  return (correctLetters / (correctLetters + mistakes)) * 100;
}
