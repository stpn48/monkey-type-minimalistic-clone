import { useTypingField } from "@/context/use-typing-field";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Args = {
  words: string[];
  mode: string;
  wordCount: number;
};

export function useModeHandler({ words, mode, wordCount }: Args) {
  const { activeLetterIndex, activeWordIndex } = useTypingField();

  const router = useRouter();

  useEffect(() => {
    if (mode === "wordCount") {
      if (activeWordIndex === wordCount - 1 && activeLetterIndex == words[activeWordIndex].length) {
        router.push("/results");
      }
    }
  }, [activeWordIndex, wordCount, activeLetterIndex, words, mode, router]);
}
