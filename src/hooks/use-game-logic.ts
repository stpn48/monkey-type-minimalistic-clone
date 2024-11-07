import { useConfigState } from "@/context/useConfigState";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useKeyHandlers } from "./use-key-handlers";
import { useModeHandler } from "./use-mode-handler";
import { useTimer } from "./use-timer";

export function useGameLogic(words: string[]) {
  const router = useRouter();

  const handleFinishGame = useCallback(() => {
    router.push("/you-win"); //TODO: Implement
  }, [router]);

  // all the game settings
  const { mode, wordCount, timeDuration } = useConfigState();
  // timer logic
  const { startTimer, time, timeoutId } = useTimer(timeDuration, handleFinishGame);
  // handle key presses
  useKeyHandlers(mode, timeoutId, startTimer, words);

  // handle wordCount mode and quote mode
  useModeHandler({ mode, words, handleFinishGame, wordCount });

  return { time };
}
