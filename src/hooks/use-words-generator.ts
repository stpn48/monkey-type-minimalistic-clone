import { getQuote } from "@/app/actions/get-quote";
import { useTypingField } from "@/context/use-typing-field";
import { QuoteLength } from "@/context/useConfigState";
import { generate as generateRandomWords } from "random-words";
import { useCallback, useTransition } from "react";

export function useWordsGenerator() {
  const { fieldWidth, setWords } = useTypingField();

  const [isLoading, startLoading] = useTransition();

  const generateWords = useCallback(
    (wordCount?: number, includeNumbers?: boolean) => {
      // this function always return maximum of 3 rows of words.
      if (!fieldWidth) return [];

      const wordWidthPx = 19;
      const maxRows = 3;
      let currRow = 1;
      let wordsGenerated = 0;
      let currRowWidth = 0;
      const newWords: string[] = [];

      while (currRow <= maxRows) {
        // generate a number if includeNumbers is true and its the 10th word
        const newWord =
          includeNumbers && wordsGenerated % 10 === 0
            ? Math.floor(Math.random() * 1000).toString()
            : generateRandomWords(1)[0];

        const wordWidth = newWord.length * wordWidthPx + wordWidthPx; // add space

        // if the curr row width + word width is greater than the field width, move to the next row
        if (currRowWidth + wordWidth > fieldWidth) {
          currRow++; // Move to the next row
          currRowWidth = 0;
        }

        // if curr row is greater than max rows, stop generating words
        if (currRow > maxRows) break;

        // Add the new word to the newWords array
        newWords.push(newWord);
        wordsGenerated++;
        currRowWidth += wordWidth;

        // If the word count is not 0 and the word count is reached, stop generating words
        if (wordCount !== 0 && wordsGenerated === wordCount) break;
      }

      return newWords; // Update state with the accumulated words
    },
    [fieldWidth],
  );

  const generateQuote = useCallback((quoteLength: QuoteLength) => {
    setWords([]);
    startLoading(async () => {
      const quote = await getQuote(quoteLength);

      if (!quote) {
        console.error("No quote found");
        return;
      }

      setWords([...quote.quote.split(" ")]);
    });
  }, []);

  return { generateWords, generateQuote, isLoading };
}
