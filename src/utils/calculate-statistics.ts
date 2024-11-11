export function calculateStatistics(words: string[], userWords: string[]) {
  let totalCorrectLetters = 0;
  let totalIncorrectLetters = 0;
  let totalCorrectWords = 0;
  let totalIncorrectWords = 0;
  let totalExtraLetters = 0;
  let totalMissedLetters = 0;

  // loop through each user word
  for (let i = 0; i < userWords.length; i++) {
    console.log(`iteration ${i} checking words "${words[i]}" and "${userWords[i]}"`);
    // words match
    if (words[i] === userWords[i]) {
      totalCorrectWords++;
      totalCorrectLetters += userWords[i].length;
      continue;
    }

    // words don't match
    if (words[i] !== userWords[i]) {
      totalIncorrectWords++;
      // if the original word is longer than the user word, they missed some letters
      if (words[i].length > userWords[i].length) {
        totalMissedLetters += words[i].length - userWords[i].length;
      } else if (words[i].length < userWords[i].length) {
        totalExtraLetters += userWords[i].length - words[i].length;
      }

      // check for each letter if it matches
      for (let j = 0; j < userWords[i].length; j++) {
        if (words[i][j] !== userWords[i][j]) {
          totalIncorrectLetters++;
        } else {
          totalCorrectLetters++;
        }
      }
    }
  }

  return {
    totalCorrectLetters,
    totalIncorrectLetters,
    totalExtraLetters,
    totalCorrectWords,
    totalIncorrectWords,
    totalMissedLetters,
  };
}
