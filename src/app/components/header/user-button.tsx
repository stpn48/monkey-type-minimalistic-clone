import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserOptionsDropdown } from "./user-options-dropdown";

type Props = {};

export async function UserButton({}: Props) {
  const user = await getUser();

  const userData = await prisma.userData.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return (
    <div className="group relative">
      {userData ? (
        <div className="flex gap-2">
          <p className="text-text group-hover:text-primary">{userData.username}</p>
          <UserRound className="size-5 group-hover:text-primary" />
        </div>
      ) : (
        <UserRound className="size-5 group-hover:text-primary" />
      )}

      <div className="hidden group-hover:block">
        <UserOptionsDropdown />
      </div>
    </div>
  );
}
