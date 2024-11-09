import { useTypingField } from "@/context/use-typing-field";
import React from "react";

type Props = {
  wordCount: number;
};

export default function WordsLeft({ wordCount }: Props) {
  const { activeWordIndex } = useTypingField();

  return (
    <div>
      <h1 className="font-geist-mono text-3xl text-primary">
        {activeWordIndex}/{wordCount}
      </h1>
    </div>
  );
}
