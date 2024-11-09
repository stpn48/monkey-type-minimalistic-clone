import { useTypingField } from "@/context/use-typing-field";
import { Mode } from "@/context/useConfigState";
import { useCallback, useEffect, useRef, useState } from "react";

let timeoutId: NodeJS.Timeout | null = null;

export function useKeyHandlers(mode: Mode, words: string[]) {
  const {
    setUserWords,
    setActiveLetterIndex,
    activeLetterIndex,
    activeWordIndex,
    setActiveWordIndex,
    setCurrRow,
    setCapsLockActive,
    setStartTimer,
    setUserTyping,
    startTimer,
    userTyping,
  } = useTypingField();

  const capsLockStateInitialized = useRef<boolean>(false);

  const handleLetterKey = useCallback(
    (e: KeyboardEvent) => {
      // start timer if mode is type and timer is not started
      if (mode === "time" && !startTimer) {
        setStartTimer(true);
      }

      setUserTyping(true);
      //  add letter to active word, and move to next letter
      setUserWords((prev) => {
        const updatedWords = [...prev];
        const updatedWord = updatedWords[activeWordIndex] + e.key;
        updatedWords[activeWordIndex] = updatedWord;
        return updatedWords;
      });
      setActiveLetterIndex((prev) => prev + 1);
    },
    [setUserWords, activeWordIndex, mode, startTimer],
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

  const handleFirstKeyTyped = useCallback(
    (e: KeyboardEvent) => {
      if (!capsLockStateInitialized.current) {
        // Check if the first key typed is uppercase and set the CapsLock state accordingly
        if (e.key === e.key.toUpperCase() && e.key.length === 1) {
          setCapsLockActive(true);
        } else {
          setCapsLockActive(false);
        }

        capsLockStateInitialized.current = true;
      }
    },
    [capsLockStateInitialized.current, setCapsLockActive],
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      // all letters and symbols regex
      if (/[\p{L}\p{S}\p{P}]/u.test(e.key) && e.key.length === 1) {
        handleLetterKey(e);
      } else if (e.code === "Space") {
        handleSpaceKey();
      } else if (e.key === "Backspace") {
        handleBackspaceKey();
      } else if (e.key === "CapsLock") setCapsLockActive(true);
    },
    [handleLetterKey, handleSpaceKey, handleBackspaceKey, setCapsLockActive],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keydown", handleFirstKeyTyped);
    window.addEventListener("keyup", (e) => {
      if (e.key === "CapsLock") setCapsLockActive(false);
    });

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keydown", handleFirstKeyTyped);
      window.addEventListener("keyup", (e) => {
        if (e.key === "CapsLock") setCapsLockActive(false);
      });
    };
  }, [handleKeydown, handleFirstKeyTyped]);

  // user is not typing anymore
  useEffect(() => {
    if (!userTyping) return;

    timeoutId = setTimeout(() => {
      setUserTyping(false);
    }, 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userTyping]);
}
