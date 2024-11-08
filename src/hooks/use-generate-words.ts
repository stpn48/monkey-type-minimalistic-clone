import { useConfigState } from "@/context/useConfigState";
import { generate as generateRandomWords } from "random-words";
import { useCallback, useEffect, useState } from "react";
import { useHandleTimeMode } from "./use-infinite-words";

export function useGenerateWords() {
  const [words, setWords] = useState<string[]>([]);
  const { mode, wordCount } = useConfigState();

  const generateWords = useCallback((wordCount: number) => {
    const generatedWords = generateRandomWords(wordCount) as string[];
    setWords(generatedWords);
  }, []);

  useHandleTimeMode(setWords, mode);

  // generate initial words
  useEffect(() => {
    switch (mode) {
      case "wordCount":
        generateWords(wordCount);
        break;

      case "time":
        generateWords(30);
        break;

      case "quote":
        break;
    }
  }, [mode, wordCount]);

  return { words };
}
