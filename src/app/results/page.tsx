import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { Statistics } from "./components/statistics";

export default function ResultsPage() {
  return (
    <Suspense fallback={<Loader2 />}>
      <div className=" ">
        <Statistics />
      </div>
    </Suspense>
  );
}
