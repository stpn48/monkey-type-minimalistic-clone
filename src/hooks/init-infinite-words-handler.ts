import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { set } from "lodash";
import { useCallback, useEffect, useState } from "react";

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
    words,
    totalWordsGenerated,
    setTotalWordsGenerated,
  } = useTypingField();

  const { wordCount } = useConfigState();

  const handleThirdRow = useCallback(() => {
    // if on row 3 generate new words, append new words and remove the first ro

    const wordsLeftToGenerate = wordCount - totalWordsGenerated;
    console.log("words left to generate", wordsLeftToGenerate);
    let newWords: string[] = [];

    if (wordsLeftToGenerate === 0) {
      return;
    }

    if (wordsLeftToGenerate >= firstRowWordCount) {
      newWords = generateWords(wordsLeftToGenerate, includeNumbers);
      setTotalWordsGenerated((prev) => prev + newWords.length);
    } else {
      newWords = generateWords(wordsLeftToGenerate, includeNumbers);
    }

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
