"use client";

import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useCallback, useEffect, useRef } from "react";

export function useKeyHandlers() {
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
    words,
    userWords,
    startedTypingTime,
    setStartedTypingTime,
  } = useTypingField();

  const { mode } = useConfigState();

  const { setTotalWords } = useStatisticsStore();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const capsLockStateInitialized = useRef<boolean>(false);

  const handleLetterKey = useCallback(
    (e: KeyboardEvent) => {
      // start timer if mode is time and timer is not started
      if (mode === "time" && !startTimer) {
        setStartTimer(true);
      }

      if (startedTypingTime === null) {
        setStartedTypingTime(new Date().getTime());
      }
      // add letter to active word, and move to next letter
      setUserWords((prev) => {
        const updatedWords = [...prev];
        const updatedWord = updatedWords[activeWordIndex] + e.key;
        updatedWords[activeWordIndex] = updatedWord;
        return updatedWords;
      });
      setActiveLetterIndex((prev) => prev + 1);
    },
    [setUserWords, activeWordIndex, mode, startTimer, startedTypingTime],
  );

  const handleSpaceKey = useCallback(() => {
    // if user is at the end or beyond the end of the word and clicks space, move to next word
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
    setTotalWords((prev) => prev + 1);
  }, [activeLetterIndex, words, activeWordIndex]);

  const handleBackspaceKey = useCallback(() => {
    // remove letter from active word, move the prev letter
    const prevWord = document.querySelector(`.word-${activeWordIndex - 1}`) as HTMLElement;

    if (activeLetterIndex > 0) {
      setUserWords((prev) => {
        const updatedWords = [...prev];
        const updatedWord = updatedWords[activeWordIndex].slice(0, -1);
        updatedWords[activeWordIndex] = updatedWord;
        return updatedWords;
      });
      setActiveLetterIndex((prev) => prev - 1);
      return;
    }

    // handle when the prev word has a mistake so the user can go back
    if (prevWord && activeLetterIndex === 0 && prevWord.classList.contains("underline")) {
      setUserWords((prev) => prev.slice(0, -1));
      setActiveLetterIndex(userWords[activeWordIndex - 1].length);
      setActiveWordIndex((prev) => prev - 1);
      setTotalWords((prev) => prev - 1);
    }
  }, [activeLetterIndex, setUserWords, activeWordIndex, userWords]);

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
      handleUserTyping();
      if (e.key.length === 1 && e.key !== " ") {
        handleLetterKey(e);
      } else if (e.code === "Space") {
        handleSpaceKey();
      } else if (e.key === "Backspace") {
        handleBackspaceKey();
      } else if (e.key === "CapsLock") setCapsLockActive(true);
    },
    [handleLetterKey, handleSpaceKey, handleBackspaceKey, setCapsLockActive],
  );

  const handleUserTyping = useCallback(() => {
    setUserTyping(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setUserTyping(false);
    }, 750);
  }, [timeoutRef.current, setUserTyping]);

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
}
