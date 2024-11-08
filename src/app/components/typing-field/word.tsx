import { Letter } from "@/app/components/typing-field/letter";
import React from "react";

type Props = {
  word: string;
  userWord: string;
  wordIndex: number;
};

const MemoLetter = React.memo(Letter);

export function Word({ word, userWord, wordIndex }: Props) {
  return (
    <div className={`word-${wordIndex}`}>
      {Array.from(word).map((letter, letterIndex) => {
        return (
          <MemoLetter key={letterIndex} letter={letter} userLetter={userWord[letterIndex] || ""} />
        );
      })}
      {userWord.length > word.length &&
        Array.from(userWord.slice(word.length, word.length + 20)).map((letter, letterIndex) => {
          return <MemoLetter key={letterIndex} letter={letter} userLetter={"overflow-letter"} />;
        })}
    </div>
  );
}
