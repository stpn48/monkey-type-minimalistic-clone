import { ConfigButton } from "@/app/components/config-bar/config-button";
import { ConfigSection } from "@/app/components/config-bar/config-section";
import { useConfigState } from "@/context/use-config-state";

export function TimeOptions() {
  const { timeDuration, setTimeDuration } = useConfigState();
  const durations = [15, 30, 60, 120];

  return (
    <ConfigSection>
      {durations.map((duration) => (
        <ConfigButton
          key={duration}
          active={timeDuration === duration}
          onClick={() => setTimeDuration(duration)}
        >
          {duration}
        </ConfigButton>
      ))}
    </ConfigSection>
  );
}
