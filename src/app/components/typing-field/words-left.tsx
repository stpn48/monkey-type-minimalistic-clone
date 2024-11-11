import { useStatisticsStore } from "@/context/use-statistics";
import { useConfigState } from "@/context/useConfigState";

type Props = {};

export default function WordsLeft({}: Props) {
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
