import { Settings } from "lucide-react";
import { HeaderContainer } from "./header-container";
import { LogoButton } from "./logo-button";
import { UserButton } from "./user-button";

export function Header() {
  return (
    <HeaderContainer>
      <LogoButton />

      <div className="flex-1" />

      <ul className="flex items-center gap-4">
        <li>
          <UserButton />
        </li>
        <li>
          <Settings className="size-5" />
        </li>
      </ul>
    </HeaderContainer>
  );
}
