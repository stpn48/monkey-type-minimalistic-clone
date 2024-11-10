import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useCallback, useEffect } from "react";
import { initInfiniteWordsHandler } from "./init-infinite-words-handler";
import { useDebouncedResize } from "./use-debounced-resize";
import { useWordsGenerator } from "./use-words-generator";

export function useGenerateWords() {
  const { mode, quoteLength, includeNumbers } = useConfigState();
  const { resetTypingField, setWords } = useTypingField();
  const { wordCount } = useConfigState();

  const { generateWords, generateQuote, isLoading } = useWordsGenerator();

  initInfiniteWordsHandler(includeNumbers, generateWords); // TODO: Fix when generating new wowrds with numbers it adds 3 rows instead of 1

  const generateInitialWords = useCallback(() => {
    switch (mode) {
      case "wordCount":
        const generatedWords = generateWords(wordCount, includeNumbers);
        setWords([...generatedWords]);

        break;

      case "time":
        const words = generateWords(0, includeNumbers);
        setWords([...words]);
        break;

      case "quote":
        generateQuote(quoteLength);
        break;
    }
  }, [mode, generateWords, includeNumbers, quoteLength, setWords, wordCount]);

  useDebouncedResize(() => {
    resetTypingField();
    generateInitialWords();
  });

  // generate initial words
  useEffect(() => {
    generateInitialWords();
  }, [generateInitialWords]);

  return { isLoading };
}
