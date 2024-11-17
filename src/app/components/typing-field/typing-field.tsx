"use client";

import { Caret } from "@/app/components/typing-field/caret";
import { Word } from "@/app/components/typing-field/word";
import { useConfigState } from "@/context/use-config-state";
import { useTypingField } from "@/context/use-typing-field";
import { useContainerWidth } from "@/hooks/use-contaier-width";
import { useGameLogic } from "@/hooks/use-game-logic";
import { useGenerateWords } from "@/hooks/use-generate-words";
import { Loader2, LoaderPinwheel } from "lucide-react";
import React, { Suspense } from "react";

const CapsLockAlert = React.lazy(() => import("@/app/components/caps-lock-alert"));
const Timer = React.lazy(() => import("@/app/components/typing-field/timer"));
const WordsLeft = React.lazy(() => import("@/app/components/typing-field/words-left"));

const MemoWord = React.memo(Word);

export function TypingField() {
  const { isLoading } = useGenerateWords();
  const { userWords, userTyping, activeWordIndex, startTimer, words } = useTypingField();
  const { mode } = useConfigState();
  const { containerRef } = useContainerWidth();

  useGameLogic();

  if (isLoading) {
    return (
      <div className="mt-20 flex justify-center">
        <LoaderPinwheel className="animate-spin" />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader2 />}>
      <div className="relative flex h-[80px] items-center">
        {mode === "time" && startTimer && <Timer />}
        {mode === "wordCount" && userTyping && <WordsLeft />}
        <CapsLockAlert />
      </div>
      <div ref={containerRef} className="flex w-full flex-wrap gap-4">
        {userTyping && <Caret />}

        {words.map((word, wordIndex) => (
          <MemoWord
            isBehind={wordIndex < activeWordIndex}
            key={wordIndex}
            word={word}
            userWord={userWords[wordIndex] || ""}
            wordIndex={wordIndex}
          />
        ))}
      </div>
    </Suspense>
  );
}
