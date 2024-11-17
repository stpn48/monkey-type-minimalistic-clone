import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { MainContent } from "./components/main-content";

export default function Home() {
  return (
    <Suspense fallback={<Loader2 />}>
      <div className="mt-10 flex">
        <MainContent />
      </div>
    </Suspense>
  );
}
