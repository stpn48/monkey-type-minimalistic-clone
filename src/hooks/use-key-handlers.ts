import { useTypingField } from "@/context/use-typing-field";
import { Mode } from "@/context/useConfigState";
import { useCallback, useEffect } from "react";

export function useKeyHandlers(mode: Mode, words: string[]) {
  const {
    setUserWords,
    setActiveLetterIndex,
    activeLetterIndex,
    activeWordIndex,
    setActiveWordIndex,
    setCurrRow,
  } = useTypingField();

  const handleLetterKey = useCallback(
    (e: KeyboardEvent) => {
      //  add letter to active word, and move to next letter
      setUserWords((prev) => {
        const updatedWords = [...prev];
        const updatedWord = updatedWords[activeWordIndex] + e.key.toLowerCase();
        updatedWords[activeWordIndex] = updatedWord;
        return updatedWords;
      });
      setActiveLetterIndex((prev) => prev + 1);
    },
    [setUserWords, activeWordIndex, mode],
  );

  const handleSpaceKey = useCallback(() => {
    // if user is at the end or beyond the end of the word and clicks space, move to next word
    if (activeLetterIndex >= words[activeWordIndex].length) {
      // get the currWord and next word
      const currWord = document.querySelector(`.word-${activeWordIndex}`) as HTMLElement;
      const nextWord = document.querySelector(`.word-${activeWordIndex + 1}`) as HTMLElement;

      if (!currWord || !nextWord) throw new Error("Could not find current or next word");

      // if next word is lower than the current word its on a new row
      if (nextWord.offsetTop > currWord.offsetTop) {
        setCurrRow((prev) => prev + 1);
      }

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
