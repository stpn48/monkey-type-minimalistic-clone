import { useTypingField } from "@/context/use-typing-field";
import { Mode } from "@/context/useConfigState";
import { generate as generateRandomWords } from "random-words";
import { SetStateAction, useCallback, useEffect } from "react";

export function useHandleTimeMode(setWords: React.Dispatch<SetStateAction<string[]>>, mode: Mode) {
  const {
    currRow,
    firstRowWordCount,
    setFirstRowWordCount,
    activeWordIndex,
    setUserWords,
    setActiveWordIndex,
    setCurrRow,
  } = useTypingField();

  const handleInfiniteWords = useCallback(() => {
    if (currRow === 2 && firstRowWordCount === 0) {
      console.log("first row words", activeWordIndex);
      setFirstRowWordCount(activeWordIndex);
      return;
    }

    if (currRow === 3) {
      const newWords = generateRandomWords(firstRowWordCount) as string[];
      setWords((prev) => [...prev.slice(firstRowWordCount), ...newWords]);
      setUserWords((prev) => [...prev.slice(firstRowWordCount)]);
      setFirstRowWordCount(0);
      setActiveWordIndex((prev) => prev - firstRowWordCount);
      setCurrRow((prev) => prev - 1);
    }
  }, [
    currRow,
    activeWordIndex,
    firstRowWordCount,
    setFirstRowWordCount,
    setWords,
    setUserWords,
    setActiveWordIndex,
  ]);

  useEffect(() => {
    if (mode === "time") {
      handleInfiniteWords();
    }
  }, [mode, handleInfiniteWords]);
}
