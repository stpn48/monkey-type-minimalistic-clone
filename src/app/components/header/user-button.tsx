import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { UserOptionsDropdown } from "./user-options-dropdown";

export async function UserButton() {
  const user = await getUser();

  const userData = await prisma.userData.findUnique({
    where: {
      id: user?.id || "",
    },
    select: {
      id: true,
      username: true,
    },
  });

  return (
    <>
      {userData ? (
        <div className="group relative flex flex-col">
          <div className="flex cursor-pointer gap-2">
            <p className="text-text group-hover:text-primary">{userData.username}</p>
            <UserRound className="size-5 group-hover:text-primary" />
          </div>

          <UserOptionsDropdown />
        </div>
      ) : (
        <Link href={"/login"}>
          <UserRound className="size-5 hover:text-primary" />
        </Link>
      )}
    </>
  );
}
