import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

let timeoutId: NodeJS.Timeout | null = null;

// TODO: Separate this component
export function initGameLogic(words: string[]) {
  const {
    activeLetterIndex,
    activeWordIndex,
    setActiveLetterIndex,
    setActiveWordIndex,
    setUserWords,
  } = useTypingField();

  const { mode, wordCount, timeDuration } = useConfigState();

  const router = useRouter();

  const handleFinishGame = useCallback(() => {
    router.push("/you-win"); //TODO: Implement
  }, [router]);

  const startTimer = useCallback(() => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        handleFinishGame();
      }, timeDuration * 1000);
    }
  }, [timeoutId, timeDuration, handleFinishGame]);

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

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
        handleLetterKey(e);
      } else if (e.code === "Space") {
        handleSpaceKey();
      } else if (e.key === "Backspace") {
        handleBackspaceKey();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleLetterKey, handleSpaceKey, handleBackspaceKey]);

  // TODO: MOve somewhere
  useEffect(() => {
    if (mode === "wordCount") {
      if (activeWordIndex === wordCount - 1 && activeLetterIndex == words[activeWordIndex].length) {
        handleFinishGame();
      }
    }
  }, [activeWordIndex, wordCount, activeLetterIndex, words, router, mode, handleFinishGame]);
}
