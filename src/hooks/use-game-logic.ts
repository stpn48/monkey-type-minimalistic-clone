import { useConfigState } from "@/context/useConfigState";
import { useKeyHandlers } from "./use-key-handlers";
import { useModeHandler } from "./use-mode-handler";

export function useGameLogic(words: string[]) {
  // all the game settings
  const { mode } = useConfigState();
  // handle key presses
  useKeyHandlers(mode, words);
  // handle wordCount mode and quote mode
  useModeHandler({ mode, words });
}
