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
}));
