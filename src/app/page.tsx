import { Logo } from "@/components/icons";
import { ToggleThemeButton } from "@/components/toggle-theme-button";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-background">
      <Logo />
      <ToggleThemeButton />
    </div>
  );
}
