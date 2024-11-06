import { useConfigState } from "@/context/useConfigState";
import { generate as generateWords } from "random-words";
import { useEffect, useState } from "react";

export function useGenerateWords() {
  const [words, setWords] = useState<string[]>([]);
  const { mode, wordCount, timeDuration } = useConfigState();

  useEffect(() => {
    if (mode === "wordCount") {
      const words = generateWords(wordCount) as string[];
      setWords(words);
    }
  }, [wordCount, mode]);

  // generate 20 words when user changes time
  useEffect(() => {
    if (mode === "time") {
      const words = generateWords(20) as string[];
      setWords(words);
    }
  }, [timeDuration, mode]);

  return { words };
}
