import { Logo } from "@/components/icons";
import { Settings, UserRound } from "lucide-react";

export function Header() {
  return (
    <header className="flex w-full px-20">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className="text-2xl font-bold text-logoText">Type</h1>
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
