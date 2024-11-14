"use client";

import { signOut } from "@/app/actions/supabase-auth/sign-out";
import React from "react";

type Props = {};

export function SignOutButton({}: Props) {
  return <button onClick={async () => await signOut()}>logout</button>;
}
