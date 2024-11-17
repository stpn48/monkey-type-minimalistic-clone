import { Settings } from "lucide-react";
import { Suspense } from "react";
import { HeaderContainer } from "./header-container";
import { LogoButton } from "./logo-button";
import { SearchButton } from "./search-button";
import { UserButton } from "./user-button";

export function Header() {
  return (
    <Suspense fallback={<></>}>
      <HeaderContainer>
        <LogoButton />

        <div className="flex-1" />

        <ul className="flex items-center gap-4">
          <li>
            <UserButton />
          </li>
          <li>
            <SearchButton />
          </li>
          <li>
            <Settings className="size-5" />
          </li>
        </ul>
      </HeaderContainer>
    </Suspense>
  );
}
