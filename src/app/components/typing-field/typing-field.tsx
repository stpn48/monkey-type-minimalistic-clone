"use client";

import { Word } from "@/app/components/typing-field/word";
import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useGenerateWords } from "@/hooks/use-generate-words";
import { initGameLogic } from "@/utils/init-game-logic";
import React from "react";

const MemoWord = React.memo(Word);

export function TypingField() {
  const { words } = useGenerateWords();
  const { userWords } = useTypingField();
  const { mode } = useConfigState();

  initGameLogic(words);

  return (
    <>
      {mode === "time" && <p>Timer</p>}
      <div className="flex flex-wrap gap-4 px-20 font-geist-mono">
        {words.map((word, wordIndex) => (
          <MemoWord key={wordIndex} word={word} userWord={userWords[wordIndex] || ""} />
        ))}
      </div>
    </>
  );
}
