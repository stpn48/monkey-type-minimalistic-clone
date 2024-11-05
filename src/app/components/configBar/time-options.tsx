import { ConfigButton } from "@/app/components/configBar/config-button";
import { ConfigSection } from "@/app/components/configBar/config-section";
import { useQueryState } from "nuqs";

export function TimeOptions() {
  const [time, setTime] = useQueryState("time");

  return (
    <ConfigSection>
      <ConfigButton onClick={() => setTime("15")}>15</ConfigButton>
      <ConfigButton onClick={() => setTime("30")}>30</ConfigButton>
      <ConfigButton onClick={() => setTime("60")}>60</ConfigButton>
      <ConfigButton onClick={() => setTime("120")}>120</ConfigButton>
    </ConfigSection>
  );
}
