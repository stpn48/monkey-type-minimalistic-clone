import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { MainContent } from "./components/main-content";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col gap-10 py-8">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
