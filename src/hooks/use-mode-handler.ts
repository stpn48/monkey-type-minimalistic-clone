import { useTypingField } from "@/context/use-typing-field";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useModeHandler(mode: string) {
  const { activeLetterIndex, activeWordIndex, words, setFinishedTypingTime } = useTypingField();

  const router = useRouter();

  useEffect(() => {
    if (mode === "wordCount" || mode === "quote") {
      if (
        activeWordIndex === words.length - 1 &&
        activeLetterIndex == words[activeWordIndex].length
      ) {
        setFinishedTypingTime(new Date().getTime());
        router.push("/results");
      }
    }
  }, [activeWordIndex, activeLetterIndex, words, mode, router]);
}
