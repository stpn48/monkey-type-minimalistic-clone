import { useTypingField } from "@/context/use-typing-field";
import React, { useEffect } from "react";

export function useCaretPosition(caretRef: React.RefObject<HTMLSpanElement>) {
  const { activeLetterIndex, activeWordIndex } = useTypingField();

  useEffect(() => {
    if (caretRef.current) {
      // Set a small delay to allow DOM updates
      const wordElement = document.querySelector(`.word-${activeWordIndex}`);
      if (wordElement) {
        const letterElements = wordElement.querySelectorAll<HTMLElement>(".font-geist-mono");

        // Check if activeLetterIndex is within bounds
        const letterElement = letterElements[activeLetterIndex];
        if (letterElement) {
          // Update caret position to the target letter
          caretRef.current!.style.left = `${letterElement.offsetLeft}px`;
          caretRef.current!.style.top = `${letterElement.offsetTop}px`;
        } else {
          // Fallback: Position caret after the last letter if overflow
          const lastLetter = letterElements[letterElements.length - 1];
          if (lastLetter) {
            caretRef.current!.style.left = `${lastLetter.offsetLeft + lastLetter.offsetWidth}px`;
            caretRef.current!.style.top = `${lastLetter.offsetTop}px`;
          }
        }
      }

      // Clear timeout on cleanup
    }
  }, [activeLetterIndex, activeWordIndex]);
}
