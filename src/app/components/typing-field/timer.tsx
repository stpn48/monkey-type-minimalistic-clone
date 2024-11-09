"use client";

import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let intervalId: NodeJS.Timeout | null = null;

export default function Timer() {
  const { startTimer } = useTypingField();
  const { timeDuration } = useConfigState();

  const [time, setTime] = useState(timeDuration);

  const router = useRouter();

  useEffect(() => {
    if (startTimer) {
      intervalId = setInterval(() => {
        setTime((prev) => {
          // if time is up, redirect to results page
          if (prev < 1) {
            clearInterval(intervalId!);
            intervalId = null;
            router.push("/results");
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [startTimer]);

  useEffect(() => {
    setTime(timeDuration);
  }, [timeDuration]);

  return <p className="font-geist-mono text-3xl text-primary">{formatTime(time)}</p>;
}

function formatTime(timeSeconds: number) {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  if (minutes === 0) {
    return `${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
