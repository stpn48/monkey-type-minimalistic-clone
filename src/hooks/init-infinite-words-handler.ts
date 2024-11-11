import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { useCallback, useEffect } from "react";

export function initInfiniteWordsHandler(
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
  } = useTypingField();

  const { totalWords } = useStatisticsStore();

  const handleThirdRow = useCallback(() => {
    // if on row 3 generate new words, append new words and remove the first row
    const newWords = generateWords(firstRowWordCount, includeNumbers);

    setWords((prev) => [...prev.slice(firstRowWordCount), ...newWords]);
    setUserWords((prev) => [...prev.slice(firstRowWordCount)]);
    setFirstRowWordCount(0);
    setActiveWordIndex((prev) => prev - firstRowWordCount);
    setCurrRow((prev) => prev - 1);
  }, [includeNumbers, firstRowWordCount, setWords, setUserWords]);

  const handleInfiniteWords = useCallback(() => {
    if (currRow === 2 && firstRowWordCount === 0) {
      console.log("first row words", activeWordIndex);
      setFirstRowWordCount(activeWordIndex);
      return;
    }

    if (currRow === 3) {
      handleThirdRow();
    }
  }, [handleThirdRow, firstRowWordCount, currRow]);

  useEffect(() => {
    handleInfiniteWords();
  }, [handleInfiniteWords]);
}
