import { useTypingField } from "@/context/use-typing-field";
import { useEffect } from "react";

type Args = {
  words: string[];
  mode: string;
  handleFinishGame: () => void;
  wordCount: number;
};

export function useModeHandler({ words, mode, handleFinishGame, wordCount }: Args) {
  const { activeLetterIndex, activeWordIndex } = useTypingField();

  useEffect(() => {
    if (mode === "wordCount") {
      if (activeWordIndex === wordCount - 1 && activeLetterIndex == words[activeWordIndex].length) {
        handleFinishGame();
      }
    }
  }, [activeWordIndex, wordCount, activeLetterIndex, words, mode, handleFinishGame]);
}
