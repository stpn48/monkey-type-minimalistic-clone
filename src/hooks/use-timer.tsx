import { useCallback, useEffect, useRef, useState } from "react";

export function useTimer(timeDuration: number, onTimeEnd: () => void) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(timeDuration);

  useEffect(() => {
    setTime(timeDuration);

    if (timeoutId.current) {
      clearInterval(timeoutId.current);
      timeoutId.current = null;
    }
  }, [timeDuration]);

  const startTimer = useCallback(() => {
    if (!timeoutId.current) {
      timeoutId.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timeoutId.current!);
            timeoutId.current = null;
            onTimeEnd();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }
  }, [timeoutId, timeDuration, time, onTimeEnd]);

  return { startTimer, time, timeoutId: timeoutId.current };
}
