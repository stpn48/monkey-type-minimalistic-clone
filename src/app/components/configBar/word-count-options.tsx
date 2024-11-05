import { ConfigButton } from "@/app/components/configBar/config-button";
import { ConfigSection } from "@/app/components/configBar/config-section";

export function WordsOptions() {
  return (
    <ConfigSection>
      <ConfigButton>10</ConfigButton>
      <ConfigButton>25</ConfigButton>
      <ConfigButton>50</ConfigButton>
      <ConfigButton>100</ConfigButton>
    </ConfigSection>
  );
}
