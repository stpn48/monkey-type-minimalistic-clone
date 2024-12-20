import { useConfigState } from "@/context/use-config-state";
import { useTypingField } from "@/context/use-typing-field";
import { useCallback, useEffect } from "react";
import { useInitInfiniteWordsHandler } from "./use-init-infinite-words-handler";
import { useDebouncedResize } from "./use-debounced-resize";
import { useWordsGenerator } from "./use-words-generator";

export function useGenerateWords() {
  const { mode, quoteLength, includeNumbers } = useConfigState();
  const { resetTypingField, setWords, setTotalWordsGenerated } = useTypingField();
  const { wordCount } = useConfigState();

  const { generateWords, generateQuote, isLoading } = useWordsGenerator();

  useInitInfiniteWordsHandler(includeNumbers, generateWords);

  const generateInitialWords = useCallback(() => {
    switch (mode) {
      case "wordCount":
        const generatedWords = generateWords(wordCount, includeNumbers);
        setTotalWordsGenerated(generatedWords.length);
        setWords([...generatedWords]);
        break;

      case "time":
        const words = generateWords(0, includeNumbers);
        setTotalWordsGenerated(words.length);
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
