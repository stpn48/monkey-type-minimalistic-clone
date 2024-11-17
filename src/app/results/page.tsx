import { Suspense } from "react";
import { Statistics } from "./components/statistics";

export default function ResultsPage() {
  return (
    <Suspense fallback={<></>}>
      <div className=" ">
        <Statistics />
      </div>
    </Suspense>
  );
}
