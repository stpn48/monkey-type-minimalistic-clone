"use client";

import { Caret } from "@/app/components/typing-field/caret";
import { Word } from "@/app/components/typing-field/word";
import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useGameLogic } from "@/hooks/use-game-logic";
import { useGenerateWords } from "@/hooks/use-generate-words";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect } from "react";

const CapsLockAlert = React.lazy(() => import("@/app/components/caps-lock-alert"));
const Timer = React.lazy(() => import("@/app/components/typing-field/timer"));
const WordsLeft = React.lazy(() => import("@/app/components/typing-field/words-left"));

const MemoWord = React.memo(Word);

export function TypingField() {
  const { isLoading } = useGenerateWords();
  const { userWords, userTyping, activeWordIndex, startTimer, setFieldWidth, words } =
    useTypingField();
  const { mode } = useConfigState();

  useGameLogic();

  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current?.offsetWidth) {
      setFieldWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current?.offsetWidth, setFieldWidth]);

  if (isLoading) {
    return (
      <div className="mt-20 flex w-full justify-center">
        <LoaderPinwheel className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="relative flex h-[100px] w-full items-center">
        {mode === "time" && startTimer && <Timer />}
        {mode === "wordCount" && userTyping && <WordsLeft />}
        <CapsLockAlert />
      </div>
      <div ref={containerRef} className="flex flex-wrap gap-4">
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
    </>
  );
}
