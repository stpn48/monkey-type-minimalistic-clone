import { create } from "zustand";

type StatisticsStore = {
  correctLetters: number;
  setCorrectLetters: (val: number | ((prev: number) => number)) => void;
  incorrectLetters: number;
  setIncorrectLetters: (val: number | ((prev: number) => number)) => void;
  correctWords: number;
  setCorrectWords: (val: number | ((prev: number) => number)) => void;
  incorrectWords: number;
  setIncorrectWords: (val: number | ((prev: number) => number)) => void;
  missedLetters: number;
  setMissedLetters: (val: number | ((prev: number) => number)) => void;
  extraLetters: number;
  setExtraLetters: (val: number | ((prev: number) => number)) => void;
  totalWords: number;
  setTotalWords: (val: number | ((prev: number) => number)) => void;
  wpm: number;
  setWpm: (val: number | ((prev: number) => number)) => void;
  accuracy: number;
  setAccuracy: (val: number | ((prev: number) => number)) => void;
  duration: number;
  setDuration: (val: number | ((prev: number) => number)) => void;
  mistakes: number;
  setMistakes: (val: number | ((prev: number) => number)) => void;

  resetStatistics: () => void;
};
export const useStatisticsStore = create<StatisticsStore>((set) => ({
  correctLetters: 0,
  setCorrectLetters: (val) =>
    set((state) => ({
      correctLetters: typeof val === "function" ? val(state.correctLetters) : val,
    })),
  incorrectLetters: 0,
  setIncorrectLetters: (val) =>
    set((state) => ({
      incorrectLetters: typeof val === "function" ? val(state.incorrectLetters) : val,
    })),
  correctWords: 0,
  setCorrectWords: (val) =>
    set((state) => ({ correctWords: typeof val === "function" ? val(state.correctWords) : val })),
  incorrectWords: 0,
  setIncorrectWords: (val) =>
    set((state) => ({
      incorrectWords: typeof val === "function" ? val(state.incorrectWords) : val,
    })),
  missedLetters: 0,
  setMissedLetters: (val) =>
    set((state) => ({ missedLetters: typeof val === "function" ? val(state.missedLetters) : val })),
  extraLetters: 0,
  setExtraLetters: (val) =>
    set((state) => ({ extraLetters: typeof val === "function" ? val(state.extraLetters) : val })),
  totalWords: 0,
  setTotalWords: (val) =>
    set((state) => ({ totalWords: typeof val === "function" ? val(state.totalWords) : val })),
  wpm: 0,
  setWpm: (val) => set((state) => ({ wpm: typeof val === "function" ? val(state.wpm) : val })),
  accuracy: 0,
  setAccuracy: (val) =>
    set((state) => ({ accuracy: typeof val === "function" ? val(state.accuracy) : val })),
  duration: 0,
  setDuration: (val) =>
    set((state) => ({ duration: typeof val === "function" ? val(state.duration) : val })),
  mistakes: 0,
  setMistakes: (val) =>
    set((state) => ({ mistakes: typeof val === "function" ? val(state.mistakes) : val })),

  resetStatistics: () =>
    set({
      mistakes: 0,
      wpm: 0,
      accuracy: 0,
      duration: 0,
      totalWords: 0,
      correctLetters: 0,
      incorrectLetters: 0,
      correctWords: 0,
      incorrectWords: 0,
      missedLetters: 0,
      extraLetters: 0,
    }),
}));
