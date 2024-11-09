import { getQuote } from "@/app/actions/get-quote";
import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { generate as generateRandomWords } from "random-words";
import { useCallback, useEffect, useState } from "react";
import { useHandleTimeMode } from "./use-infinite-words";

export function useGenerateWords() {
  const [words, setWords] = useState<string[]>([]);
  const { mode, wordCount, quoteLength } = useConfigState();

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
        const getQuotes = async () => {
          const quote = await getQuote(quoteLength);

          if (!quote) {
            console.error("No quote found");
            return;
          }

          setWords([...quote.quote.split(" ")]);
        };

        getQuotes();
        break;
    }
  }, [mode, wordCount, quoteLength]);

  return { words };
}
