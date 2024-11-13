import { useCallback, useState } from "react";

export function useEmailValidation() {
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [emailInputPopupMsg, setEmailInputPopupMsg] = useState<string>("");

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    // email is empty do not show the icon and message
    if (email === "") {
      setIsEmailValid(null);
      setEmailInputPopupMsg("");
      return;
    }

    if (!/[a-z]/.test(email)) {
      setEmailInputPopupMsg("Email must contain at least one lowercase letter");
      setIsEmailValid(false);
      return;
    }

    if (!/[@]/.test(email)) {
      setEmailInputPopupMsg("Email must contain @");
      setIsEmailValid(false);
      return;
    }

    if (!/[.]/.test(email)) {
      setEmailInputPopupMsg("Email must contain .");
      setIsEmailValid(false);
      return;
    }

    // email made all the checks, its valid
    setEmailInputPopupMsg("Email is good");
    setIsEmailValid(true);
  }, []);

  return { handleEmailChange, emailInputPopupMsg, isEmailValid, setIsEmailValid };
}
