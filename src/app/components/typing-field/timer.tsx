"use client";

import { useTypingField } from "@/context/use-typing-field";
import { useConfigState } from "@/context/useConfigState";
import { formatTime } from "@/utils/format-time";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let intervalId: NodeJS.Timeout | null = null;

export default function Timer() {
  const { startTimer, setFinishedTypingTime } = useTypingField();
  const { timeDuration } = useConfigState();

  const [time, setTime] = useState(timeDuration);

  const router = useRouter();

  useEffect(() => {
    if (startTimer) {
      intervalId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [startTimer]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId!);
      setFinishedTypingTime(new Date().getTime());
      router.replace("/results");
    }
  }, [time, router, intervalId]);

  useEffect(() => {
    setTime(timeDuration);
  }, [timeDuration]);

  return <p className="font-geist-mono text-3xl text-primary">{formatTime(time)}</p>;
}
