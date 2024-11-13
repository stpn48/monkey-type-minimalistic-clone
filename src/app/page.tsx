import { Footer } from "@/app/components/footer";
import { MainContent } from "./components/main-content";

export default function Home() {
  return (
    <div className="mt-10 flex">
      <MainContent />
      <Footer />
    </div>
  );
}
