"use client";

import { ConfigButton } from "@/app/components/config-bar/config-button";
import { ConfigSection } from "@/app/components/config-bar/config-section";
import { QuoteLength, useConfigState } from "@/context/use-config-state";

export function QuotesOptions() {
  const { quoteLength, setQuoteLength } = useConfigState();
  const quoteLengths: QuoteLength[] = ["short", "medium", "long"];

  return (
    <ConfigSection>
      {quoteLengths.map((length) => (
        <ConfigButton
          key={length}
          active={length === quoteLength}
          onClick={() => setQuoteLength(length)}
        >
          {length}
        </ConfigButton>
      ))}
    </ConfigSection>
  );
}
