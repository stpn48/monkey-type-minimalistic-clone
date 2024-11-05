"use client";

import { ConfigSpacer } from "@/app/components/config-bar/config-spacer";
import { IncludeSection } from "@/app/components/config-bar/include-section";
import { ModeSection } from "@/app/components/config-bar/mode-section";
import { QuotesOptions } from "@/app/components/config-bar/quote-size-options";
import { TimeOptions } from "@/app/components/config-bar/time-options";
import { WordsOptions } from "@/app/components/config-bar/word-count-options";
import { useConfigState } from "@/context/useConfigState";

export function ConfigBar() {
  const { mode } = useConfigState();

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-6 rounded-lg bg-foreground px-4 py-2 shadow-md transition-all">
        {mode !== "quote" && <IncludeSection />}

        <ModeSection />

        <ConfigSpacer />

        {mode === "time" && <TimeOptions />}
        {mode === "wordCount" && <WordsOptions />}
        {mode === "quote" && <QuotesOptions />}
      </div>
    </div>
  );
}
