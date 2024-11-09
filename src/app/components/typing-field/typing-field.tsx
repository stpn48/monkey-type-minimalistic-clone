"use client";

import { Caret } from "@/app/components/typing-field/caret";
import { Word } from "@/app/components/typing-field/word";
import { useTypingField } from "@/context/use-typing-field";
import { useGameLogic } from "@/hooks/use-game-logic";
import { useGenerateWords } from "@/hooks/use-generate-words";
import React from "react";

const MemoWord = React.memo(Word);

export function TypingField() {
  const { words } = useGenerateWords();
  const { userWords } = useTypingField();
  useGameLogic(words);

  return (
    <div className="flex flex-wrap gap-4">
      <Caret />

      {words.map((word, wordIndex) => (
        <MemoWord
          key={wordIndex}
          word={word}
          userWord={userWords[wordIndex] || ""}
          wordIndex={wordIndex}
        />
      ))}
    </div>
  );
}
