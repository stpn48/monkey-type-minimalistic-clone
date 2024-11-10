import { useConfigState } from "@/context/useConfigState";
import { useKeyHandlers } from "./use-key-handlers";
import { useModeHandler } from "./use-mode-handler";

export function useGameLogic() {
  // all the game settings
  const { mode } = useConfigState();
  // handle key presses
  useKeyHandlers(mode);
  // handle wordCount mode and quote mode
  useModeHandler(mode);
}
