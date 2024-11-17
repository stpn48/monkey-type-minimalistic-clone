"use client";

import { useConfigState } from "@/context/use-config-state";
import { useTypingField } from "@/context/use-typing-field";
import { usePreserveSearchParams } from "@/hooks/use-preserve-search-params";
import { formatTime } from "@/utils/format-time";
import { useEffect, useState } from "react";

let intervalId: NodeJS.Timeout | null = null;

export default function Timer() {
  const { startTimer, setFinishedTypingTime } = useTypingField();
  const { timeDuration } = useConfigState();
  const { navigateWithParams } = usePreserveSearchParams();

  const [time, setTime] = useState(timeDuration);

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
      navigateWithParams("/results", "replace");
    }
  }, [time, navigateWithParams, intervalId, setFinishedTypingTime]);

  useEffect(() => {
    setTime(timeDuration);
  }, [timeDuration]);

  return <p className="font-geist-mono text-3xl text-primary">{formatTime(time)}</p>;
}
