"use client";

import { ConfigButton } from "@/app/components/configBar/config-button";
import { ConfigSection } from "@/app/components/configBar/config-section";
import { ConfigSpacer } from "@/app/components/configBar/config-spacer";
import { QuotesOptions } from "@/app/components/configBar/quote-size-options";
import { TimeOptions } from "@/app/components/configBar/time-options";
import { WordsOptions } from "@/app/components/configBar/word-count-options";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";

type Props = {};

export function ConfigBar({}: Props) {
  const [mode, setMode] = useQueryState("mode", parseAsString.withDefault("time"));
  const [punctuation, setPunctuation] = useQueryState("punctuation");
  const [numbers, setNumbers] = useQueryState("numbers");
  const [words, setWords] = useQueryState("words");
  const [quotes, setQuotes] = useQueryState("quotes");

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-6 rounded-lg bg-foreground px-4 py-2 shadow-md transition-all">
        {mode !== "quotes" && (
          <>
            <ConfigSection>
              <ConfigButton>@ punctuation</ConfigButton>
              <ConfigButton># numbers</ConfigButton>
            </ConfigSection>
            <ConfigSpacer />
          </>
        )}

        <ConfigSection>
          <ConfigButton onClick={() => setMode("time")}>time</ConfigButton>
          <ConfigButton onClick={() => setMode("words")}>words</ConfigButton>
          <ConfigButton onClick={() => setMode("quotes")}>quotes</ConfigButton>
        </ConfigSection>

        <ConfigSpacer />

        {mode === "time" && <TimeOptions />}
        {mode === "words" && <WordsOptions />}
        {mode === "quotes" && <QuotesOptions />}
      </div>
    </div>
  );
}
