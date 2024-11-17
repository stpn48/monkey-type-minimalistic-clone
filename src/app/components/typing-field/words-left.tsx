import { useConfigState } from "@/context/use-config-state";
import { useStatisticsStore } from "@/context/use-statistics";

export default function WordsLeft() {
  const { totalWords } = useStatisticsStore();
  const { wordCount } = useConfigState();

  return (
    <div>
      <h1 className="font-geist-mono text-3xl text-primary">
        {totalWords}/{wordCount}
      </h1>
    </div>
  );
}
