import { Mode, QuoteLength } from "@/context/use-config-state";
import { createParser } from "nuqs";

export const modeParser = createParser<Mode>({
  parse(queryValue) {
    if (queryValue === "time" || queryValue === "wordCount" || queryValue === "quote") {
      return queryValue as Mode; // Valid values
    }
    return null; // Invalid value
  },
  serialize(value) {
    return value; // Directly return the mode value
  },
});

export const quoteLengthParser = createParser<QuoteLength>({
  parse(queryValue) {
    if (queryValue === "short" || queryValue === "medium" || queryValue === "long") {
      return queryValue as QuoteLength; // Valid values
    }
    return null; // Invalid value
  },
  serialize(value) {
    return value; // Directly return the mode value
  },
});
