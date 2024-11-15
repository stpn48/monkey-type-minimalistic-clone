import { SignOutButton } from "@/app/profile/[username]/components/sign-out-button";
import { Sign } from "crypto";
import Link from "next/link";
import React from "react";

export function UserOptionsDropdown() {
  return (
    <div className="absolute flex flex-col gap-2 whitespace-nowrap rounded-lg bg-foreground p-2 text-text">
      <Link href={"/login"} className="hover:text-primary">
        Your Profile
      </Link>
      <SignOutButton />
    </div>
  );
}
