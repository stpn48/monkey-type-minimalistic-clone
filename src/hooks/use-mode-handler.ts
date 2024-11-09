import { useTypingField } from "@/context/use-typing-field";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Args = {
  words: string[];
  mode: string;
};

export function useModeHandler({ words, mode }: Args) {
  const { activeLetterIndex, activeWordIndex } = useTypingField();

  const router = useRouter();

  useEffect(() => {
    if (mode === "wordCount" || mode === "quote") {
      if (
        activeWordIndex === words.length - 1 &&
        activeLetterIndex == words[activeWordIndex].length
      ) {
        router.push("/results");
      }
    }
  }, [activeWordIndex, activeLetterIndex, words, mode, router]);
}
