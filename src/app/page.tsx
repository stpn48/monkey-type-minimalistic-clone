import { Footer } from "@/app/components/footer";
import { MainContent } from "./components/main-content";

export default function Home() {
  return (
    <div className="flex w-screen flex-col gap-10">
      <MainContent />
      <Footer />
    </div>
  );
}
