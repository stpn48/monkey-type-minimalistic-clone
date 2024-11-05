import { ConfigButton } from "@/app/components/configBar/config-button";
import { ConfigSection } from "@/app/components/configBar/config-section";

export function QuotesOptions() {
  return (
    <ConfigSection>
      <ConfigButton>short</ConfigButton>
      <ConfigButton>medium</ConfigButton>
      <ConfigButton>long</ConfigButton>
    </ConfigSection>
  );
}
