"use client";

import { useConfigState } from "@/context/useConfigState";
import { ConfigButton } from "./config-button";
import { ConfigSection } from "./config-section";
import { ConfigSpacer } from "./config-spacer";

export function IncludeSection() {
  const { includeNumbers, setIncludeNumbers, includePunctuation, setIncludePunctuation } = useConfigState();

  return (
    <>
      <ConfigSection>
        <ConfigButton active={includePunctuation === true} onClick={() => setIncludePunctuation((prev) => !prev)}>
          @ punctuation
        </ConfigButton>
        <ConfigButton active={includeNumbers === true} onClick={() => setIncludeNumbers((prev) => !prev)}>
          # numbers
        </ConfigButton>
      </ConfigSection>
      <ConfigSpacer />
    </>
  );
}
