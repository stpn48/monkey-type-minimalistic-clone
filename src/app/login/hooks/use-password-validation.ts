import { useCallback, useEffect, useState } from "react";

export function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [passwordInputPopupMsg, setPasswordInputPopupMsg] = useState("");

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<boolean | null>(null);
  const [confirmPasswordInputPopupMsg, setConfirmPasswordInputPopupMsg] = useState("");

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    if (password.length < 8) {
      setPasswordInputPopupMsg("Password must be at least 8 characters");
      setIsPasswordValid(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setPasswordInputPopupMsg("Password must contain at least one number");
      setIsPasswordValid(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordInputPopupMsg("Password must contain at least one uppercase letter");
      setIsPasswordValid(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordInputPopupMsg("Password must contain at least one lowercase letter");
      setIsPasswordValid(false);
      return;
    }

    // password made all the checks, its valid
    setPasswordInputPopupMsg("Password is good");
    setIsPasswordValid(true);
  }, []);

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  }, []);

  useEffect(() => {
    console.log("password: ", password);
    console.log("confirmPassword: ", confirmPassword);

    if (password === "" || confirmPassword === "") {
      setIsConfirmPasswordValid(null);
      setConfirmPasswordInputPopupMsg("");
      return;
    }

    // if passwords are not empty and match, then they match
    if (password === confirmPassword) {
      setIsConfirmPasswordValid(true);
      setConfirmPasswordInputPopupMsg("Passwords match");
    } else {
      setIsConfirmPasswordValid(false);
      setConfirmPasswordInputPopupMsg("Passwords do not match");
    }
  }, [password, confirmPassword, isPasswordValid]);

  return {
    setIsPasswordValid,
    setIsConfirmPasswordValid,
    handlePasswordChange,
    handleConfirmPasswordChange,
    passwordInputPopupMsg,
    isPasswordValid,
    isConfirmPasswordValid,
    confirmPasswordInputPopupMsg,
  };
}
