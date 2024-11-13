import { validateUsername } from "@/app/actions/validate-username";
import { useCallback, useState, useTransition } from "react";

export function useUsernameValidation() {
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null);
  const [usernameInputPopupMsg, setUsernameInputPopupMsg] = useState("");

  const [validatingUsername, startValidatingUsername] = useTransition();

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;

    if (username === "") {
      setIsUsernameValid(null);
      setUsernameInputPopupMsg("");
      return;
    }

    if (username.length < 3) {
      setUsernameInputPopupMsg("Username must be at least 3 characters");
      setIsUsernameValid(false);
      return;
    }

    // all check passed, username is valid
    startValidatingUsername(async () => {
      const isValid = await validateUsername(username);

      if (isValid) {
        setUsernameInputPopupMsg("Username is available");
        setIsUsernameValid(true);
        return;
      }

      setUsernameInputPopupMsg("Username is not available");
      setIsUsernameValid(false);
    });
  }, []);

  return {
    handleUsernameChange,
    usernameInputPopupMsg,
    isUsernameValid,
    validatingUsername,
    setIsUsernameValid,
  };
}
