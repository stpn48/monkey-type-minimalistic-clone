import React from "react";
import { Statistics } from "./components/statistics";

type Props = {};

export default function ResultsPage({}: Props) {
  return (
    <div className="px-20">
      <Statistics />
    </div>
  );
}
