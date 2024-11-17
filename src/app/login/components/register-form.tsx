"use client";

import { signUp } from "@/app/actions/supabase-auth/sign-up";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { useEmailValidation } from "../hooks/use-email-valiation";
import { usePasswordValidation } from "../hooks/use-password-validation";
import { useUsernameValidation } from "../hooks/use-username-validation";

export function RegisterForm() {
  const [isRegistering, startRegistering] = useTransition();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const router = useRouter();

  const {
    passwordInputPopupMsg,
    isPasswordValid,
    handlePasswordChange,
    confirmPasswordInputPopupMsg,
    isConfirmPasswordValid,
    handleConfirmPasswordChange,
  } = usePasswordValidation();

  const { handleUsernameChange, usernameInputPopupMsg, isUsernameValid, validatingUsername } =
    useUsernameValidation();

  const { handleEmailChange, emailInputPopupMsg, isEmailValid } = useEmailValidation();

  const handleRegisterFormSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword");

    // additional checks. This should never happen but just in case
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    startRegistering(async () => {
      const { error } = await signUp(username, email, password);

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Registration successful");
      router.push("/profile/" + username);
    });
  };

  useEffect(() => {
    setIsButtonDisabled(!(isEmailValid && isPasswordValid && isUsernameValid));
  }, [isEmailValid, isPasswordValid, isUsernameValid]);

  return (
    <form action={handleRegisterFormSubmit} className="flex w-fit flex-col gap-2">
      <Input
        disabled={isRegistering}
        isLoading={validatingUsername}
        placeholder="username"
        onChange={handleUsernameChange}
        showValidation
        isContentValid={isUsernameValid}
        popupMsg={usernameInputPopupMsg}
        name="username"
      />
      <Input
        disabled={isRegistering}
        showValidation
        placeholder="email"
        onChange={handleEmailChange}
        type="email"
        name="email"
        isContentValid={isEmailValid}
        popupMsg={emailInputPopupMsg}
      />
      <Input
        disabled={isRegistering}
        showValidation
        isContentValid={isPasswordValid}
        popupMsg={passwordInputPopupMsg}
        placeholder="password"
        type="password"
        name="password"
        onChange={handlePasswordChange}
      />
      <Input
        disabled={isRegistering}
        showValidation
        isContentValid={isConfirmPasswordValid}
        popupMsg={confirmPasswordInputPopupMsg}
        placeholder="confirm password"
        type="password"
        name="confirmPassword"
        onChange={handleConfirmPasswordChange}
      />
      <Button className="w-full" disabled={isButtonDisabled || isRegistering} type="submit">
        Register
      </Button>
    </form>
  );
}
