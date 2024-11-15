"use client";

import { signOut } from "@/app/actions/supabase-auth/sign-out";
import React from "react";

type Props = {};

export function SignOutButton({}: Props) {
  return (
    <button className="hover:text-incorrect-text" onClick={async () => await signOut()}>
      Sign Out
    </button>
  );
}
