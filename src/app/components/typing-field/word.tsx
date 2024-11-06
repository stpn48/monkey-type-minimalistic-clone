import { Letter } from "@/app/components/typing-field/letter";
import { useTypingField } from "@/context/useTypingField";
import React, { useEffect, useState } from "react";

type Props = {
  word: string;
  wordIndex: number;
};

const MemoLetter = React.memo(Letter);

export function Word({ word, wordIndex }: Props) {
  const { activeWordIndex, setActiveWordIndex, activeLetterIndex, setActiveLetterIndex } = useTypingField();
  const [userWord, setUserWord] = useState("");

  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === "Space") {
      // handle space click
      if (word.length <= activeLetterIndex) {
        setActiveWordIndex((prev) => prev + 1);
        setActiveLetterIndex(0);
      }
    }

    if (e.code === "Backspace") {
      setActiveLetterIndex((prev) => prev - 1);
    }

    // handle other key presses
    setUserWord((prev) => prev + e.key.toLowerCase());
  }

  useEffect(() => {
    if (wordIndex === activeWordIndex) {
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [wordIndex, activeWordIndex, handleKeyDown]);

  return (
    <div>
      {Array.from(word).map((char, letterIndex) => (
        <MemoLetter key={letterIndex} char={char} isCorrect={validateIsCorrect(userWord[letterIndex], char)} />
      ))}
    </div>
  );
}

function validateIsCorrect(letter: string | undefined, correctLetter: string) {
  if (letter === undefined) {
    return null;
  }

  return letter === correctLetter;
}
