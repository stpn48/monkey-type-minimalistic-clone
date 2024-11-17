import { useConfigState } from "@/context/use-config-state";
import { useTypingField } from "@/context/use-typing-field";
import { useCallback, useEffect } from "react";

export function useInitInfiniteWordsHandler(
  includeNumbers: boolean,
  generateWords: (wordCount?: number, includeNumbers?: boolean) => string[],
) {
  const {
    currRow,
    firstRowWordCount,
    setFirstRowWordCount,
    activeWordIndex,
    setUserWords,
    setActiveWordIndex,
    setCurrRow,
    setWords,
    words,
    totalWordsGenerated,
    setTotalWordsGenerated,
  } = useTypingField();

  const { mode } = useConfigState();

  const { wordCount } = useConfigState();

  const handleThirdRow = useCallback(() => {
    // if on row 3 generate new words, append new words and remove the first ro
    let newWords: string[] = [];

    if (mode == "wordCount") {
      const wordsLeftToGenerate = wordCount - totalWordsGenerated;

      if (wordsLeftToGenerate === 0) {
        return;
      }

      if (wordsLeftToGenerate >= firstRowWordCount) {
        newWords = generateWords(firstRowWordCount, includeNumbers);
      } else {
        newWords = generateWords(wordsLeftToGenerate, includeNumbers);
      }
    } else {
      newWords = generateWords(firstRowWordCount, includeNumbers);
    }

    setTotalWordsGenerated((prev) => prev + newWords.length);
    setWords((prev) => [...prev.slice(firstRowWordCount), ...newWords]);
    setUserWords((prev) => [...prev.slice(firstRowWordCount)]);
    setFirstRowWordCount(0);
    setActiveWordIndex((prev) => prev - firstRowWordCount);
    setCurrRow((prev) => prev - 1);
  }, [
    includeNumbers,
    firstRowWordCount,
    setWords,
    setUserWords,
    wordCount,
    mode,
    words,
    totalWordsGenerated,
  ]);

  const handleInfiniteWords = useCallback(() => {
    if (currRow === 2 && firstRowWordCount === 0) {
      console.log("first row words", activeWordIndex);
      setFirstRowWordCount(activeWordIndex);
      return;
    }

    if (currRow === 3) {
      handleThirdRow();
    }
  }, [handleThirdRow, firstRowWordCount, currRow, activeWordIndex]);

  useEffect(() => {
    handleInfiniteWords();
  }, [handleInfiniteWords]);
}
