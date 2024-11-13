"use client";

import { login } from "@/app/actions/supabase-auth/login";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useEmailValidation } from "../hooks/use-email-valiation";

export function LoginForm() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { handleEmailChange, emailInputPopupMsg, isEmailValid } = useEmailValidation();

  const [password, setPassword] = useState("");

  const [isLoggingIn, startLoggingIn] = useTransition();

  const router = useRouter();

  const handleLoginFormSubmit = useCallback(
    (formData: FormData) => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      // additional validation, should not be needed
      if (!email || !password) {
        toast.error("Please fill all the fields");
      }

      startLoggingIn(async () => {
        await login(email, password);
        toast.success("Login successful");
        router.push("/account");
      });
    },
    [router],
  );

  useEffect(() => {
    setIsButtonDisabled(!(isEmailValid && password.length > 0));
  }, [isEmailValid, password]);

  return (
    <form className="flex w-fit flex-col gap-2" action={handleLoginFormSubmit}>
      <Input
        disabled={isLoggingIn}
        showValidation
        onChange={handleEmailChange}
        popupMsg={emailInputPopupMsg}
        isContentValid={isEmailValid}
        placeholder="email"
        type="email"
        name="email"
      />
      <Input
        disabled={isLoggingIn}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
      />
      <Button className="w-full" disabled={isButtonDisabled || isLoggingIn}>
        Login
      </Button>
    </form>
  );
}
