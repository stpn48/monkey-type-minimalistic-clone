import { Logo } from "@/components/icons";
import { Settings, UserRound } from "lucide-react";

export function Header() {
  return (
    <header className="flex w-full">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-logoText text-2xl font-bold">Type</h1>
      </div>

      <div className="flex-1" />

      <ul className="flex items-center gap-4">
        <li>
          <UserRound className="size-5" />
        </li>
        <li>
          <Settings className="size-5" />
        </li>
      </ul>
    </header>
  );
}
