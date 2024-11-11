import { useKeyHandlers } from "./use-key-handlers";
import { useModeHandler } from "./use-mode-handler";

export function useGameLogic() {
  useKeyHandlers();
  useModeHandler();
}
