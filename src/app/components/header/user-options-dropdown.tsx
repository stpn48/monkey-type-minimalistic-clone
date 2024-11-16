import { SignOutButton } from "@/app/profile/[username]/components/sign-out-button";
import Link from "next/link";

export function UserOptionsDropdown() {
  return (
    <div className="invisible absolute top-full flex flex-col gap-2 whitespace-nowrap rounded-lg bg-foreground p-2 text-text shadow-md group-hover:visible">
      <Link href={"/login"} className="rounded-md px-4 py-1 hover:bg-background">
        Your Profile
      </Link>
      <SignOutButton />
    </div>
  );
}
