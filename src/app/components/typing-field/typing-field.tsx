"use client";

import { Caret } from "@/app/components/typing-field/caret";
import { Timer } from "@/app/components/typing-field/timer";
import { Word } from "@/app/components/typing-field/word";
import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useGameLogic } from "@/hooks/use-game-logic";
import { useGenerateWords } from "@/hooks/use-generate-words";
import React from "react";

const MemoWord = React.memo(Word);
const MemoTimer = React.memo(Timer);

export function TypingField() {
  const { words } = useGenerateWords();
  const { userWords } = useTypingField();
  const { mode, timeDuration } = useConfigState();
  useGameLogic(words);

  return (
    <>
      <div className="flex flex-col gap-10 px-20 font-geist-mono">
        {mode === "time" && (
          <MemoTimer startTimer={!!userWords[0][0]} timeDuration={timeDuration} />
        )}

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
      </div>
    </>
  );
}
