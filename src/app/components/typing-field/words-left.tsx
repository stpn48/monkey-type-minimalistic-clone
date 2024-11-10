import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import React from "react";

type Props = {};

export default function WordsLeft({}: Props) {
  const { totalWords } = useStatisticsStore();
  const { words } = useTypingField();

  return (
    <div>
      <h1 className="font-geist-mono text-3xl text-primary">
        {totalWords}/{words.length}
      </h1>
    </div>
  );
}
