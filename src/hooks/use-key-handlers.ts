import { useTypingField } from "@/context/use-typing-field";
import { Mode } from "@/context/useConfigState";
import { useCallback, useEffect } from "react";

export function useKeyHandlers(
  mode: Mode,
  timeoutId: NodeJS.Timeout | null,
  startTimer: () => void,
  words: string[],
) {
  const {
    setUserWords,
    setActiveLetterIndex,
    activeLetterIndex,
    activeWordIndex,
    setActiveWordIndex,
  } = useTypingField();

  const handleLetterKey = useCallback(
    (e: KeyboardEvent) => {
      if (mode === "time" && !timeoutId) {
        startTimer();
      }

      //  add letter to active word, and move to next letter
      setUserWords((prev) => {
        const updatedWords = [...prev];
        const updatedWord = updatedWords[activeWordIndex] + e.key.toLowerCase();
        updatedWords[activeWordIndex] = updatedWord;
        return updatedWords;
      });
      setActiveLetterIndex((prev) => prev + 1);
    },
    [setUserWords, activeWordIndex, mode, timeoutId, startTimer],
  );

  const handleSpaceKey = useCallback(() => {
    // if user is at the end or beyond the end of the word and clicks space, move to next word
    if (activeLetterIndex >= words[activeWordIndex].length) {
      setUserWords((prev) => [...prev, ""]);
      setActiveWordIndex((prev) => prev + 1);
      setActiveLetterIndex(0);
    }
  }, [activeLetterIndex, words, activeWordIndex]);

  const handleBackspaceKey = useCallback(() => {
    // remove letter from active word, move the prev letter
    if (activeLetterIndex > 0) {
      setUserWords((prev) => {
        const updatedWords = [...prev];
        const updatedWord = updatedWords[activeWordIndex].slice(0, -1);
        updatedWords[activeWordIndex] = updatedWord;
        return updatedWords;
      });
      setActiveLetterIndex((prev) => prev - 1);
    }
  }, [activeLetterIndex, setUserWords, activeWordIndex]);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
        handleLetterKey(e);
      } else if (e.code === "Space") {
        handleSpaceKey();
      } else if (e.key === "Backspace") {
        handleBackspaceKey();
      }
    },
    [handleLetterKey, handleSpaceKey, handleBackspaceKey],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);
}
