"use client";

import { modeParser, quoteLengthParser } from "@/nuqs/parsers";
import { Options, parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

export type Mode = "time" | "wordCount" | "quote";
export type QuoteLength = "short" | "medium" | "long";

type UpdateStateFunction<T> = (value: T | ((old: T) => T | null) | null, options?: Options) => Promise<URLSearchParams>;

type ContextType = {
  mode: Mode;
  setMode: UpdateStateFunction<Mode>;
  includePunctuation: boolean;
  setIncludePunctuation: UpdateStateFunction<boolean>;
  includeNumbers: boolean;
  setIncludeNumbers: UpdateStateFunction<boolean>;
  timeDuration: number;
  setTimeDuration: UpdateStateFunction<number>;
  wordCount: number;
  setWordCount: UpdateStateFunction<number>;
  quoteLength: QuoteLength;
  setQuoteLength: UpdateStateFunction<QuoteLength>;
};

const ConfigStateContext = createContext<ContextType | null>(null);

export function ConfigStateProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useQueryState("mode", modeParser.withDefault("time"));
  const [includePunctuation, setIncludePunctuation] = useQueryState(
    "includePunctuation",
    parseAsBoolean.withDefault(false),
  );
  const [includeNumbers, setIncludeNumbers] = useQueryState("includeNumbers", parseAsBoolean.withDefault(false));
  const [timeDuration, setTimeDuration] = useQueryState("timeDuration", parseAsInteger.withDefault(15));
  const [wordCount, setWordCount] = useQueryState("wordCount", parseAsInteger.withDefault(15));
  const [quoteLength, setQuoteLength] = useQueryState("quoteLength", quoteLengthParser.withDefault("short"));

  const value = useMemo(() => {
    return {
      mode,
      setMode,

      includePunctuation,
      setIncludePunctuation,

      includeNumbers,
      setIncludeNumbers,

      timeDuration,
      setTimeDuration,

      wordCount,
      setWordCount,

      quoteLength,
      setQuoteLength,
    };
  }, [
    mode,
    setMode,
    includePunctuation,
    setIncludePunctuation,
    includeNumbers,
    setIncludeNumbers,
    timeDuration,
    setTimeDuration,
    wordCount,
    setWordCount,
    quoteLength,
    setQuoteLength,
  ]);

  return <ConfigStateContext.Provider value={value}>{children}</ConfigStateContext.Provider>;
}

export function useConfigState() {
  const configState = useContext(ConfigStateContext);

  if (!configState) {
    throw new Error("useConfigState must be used within a ConfigStateProvider");
  }

  return configState;
}
