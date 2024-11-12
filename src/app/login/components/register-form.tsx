"use client";

import { signUp } from "@/app/actions/supabase-auth/sign-up";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import React from "react";
import { toast } from "react-hot-toast";

export function RegisterForm() {
  const [isRegistering, startRegistering] = React.useTransition();

  const handleRegisterFormSubmit = (formData: FormData) => {
    const username = formData.get("username");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword");

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    startRegistering(async () => {
      signUp(email, password);

      // TODO: init userData
      toast.success("Registration successful");
    });
  };

  return (
    <form action={handleRegisterFormSubmit} className="flex flex-col gap-2">
      <Input placeholder="username" name="username" />
      <Input placeholder="email" type="email" name="email" />
      <Input placeholder="password" type="password" name="password" />
      <Input placeholder="confirm password" type="password" name="confirmPassword" />
      <Button type="submit">Register</Button>
    </form>
  );
}
