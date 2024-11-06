import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { MainContent } from "@/app/components/main-content";
import { ToggleThemeButton } from "@/components/toggle-theme-button";

export default function Home() {
  return (
    <div className="flex h-screen flex-col px-10 py-4">
      <Header />
      <MainContent />
      <Footer />
      <ToggleThemeButton />
    </div>
  );
}
