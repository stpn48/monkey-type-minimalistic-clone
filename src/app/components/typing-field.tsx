"use client";

import { Word } from "@/app/components/typing-field/word";
import { useGenerateWords } from "@/hooks/use-generate-words";
import { useEffect } from "react";

export function TypingField() {
  const { words } = useGenerateWords();

  return (
    <div className="flex flex-wrap gap-4 px-20 font-geist-mono">
      {words.map((word, index) => (
        <Word key={index} word={word} wordIndex={index} />
      ))}
    </div>
  );
}
