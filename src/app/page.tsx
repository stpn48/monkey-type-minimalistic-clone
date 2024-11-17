import { Suspense } from "react";
import { MainContent } from "./components/main-content";

export default function Home() {
  return (
    <Suspense fallback={<></>}>
      <div className="mt-10 flex">
        <MainContent />
      </div>
    </Suspense>
  );
}
