"use client";

import { ConfigButton } from "@/app/components/config-bar/config-button";
import { ConfigSection } from "@/app/components/config-bar/config-section";
import { Mode, useConfigState } from "@/context/use-config-state";

export function ModeSection() {
  const { mode: resolvedMode, setMode } = useConfigState();
  const modes: Mode[] = ["time", "wordCount", "quote"];

  return (
    <ConfigSection>
      {modes.map((mode) => (
        <ConfigButton key={mode} active={mode === resolvedMode} onClick={() => setMode(mode)}>
          {mode}
        </ConfigButton>
      ))}
    </ConfigSection>
  );
}
