import { create } from "zustand";

type Store = {
  activeWordIndex: number;
  setActiveWordIndex: (val: number | ((prev: number) => number)) => void;

  activeLetterIndex: number;
  setActiveLetterIndex: (val: number | ((prev: number) => number)) => void;

  userWords: string[];
  setUserWords: (val: string[] | ((prev: string[]) => string[])) => void;

  resetTypingField: () => void;
};

export const useTypingField = create<Store>((set) => ({
  activeWordIndex: 0,
  setActiveWordIndex: (val) =>
    set((state) => ({ activeWordIndex: typeof val === "function" ? val(state.activeWordIndex) : val })),

  activeLetterIndex: 0,
  setActiveLetterIndex: (val) =>
    set((state) => ({ activeLetterIndex: typeof val === "function" ? val(state.activeLetterIndex) : val })),

  userWords: [""],
  setUserWords: (val) => set((state) => ({ userWords: typeof val === "function" ? val(state.userWords) : val })),

  resetTypingField: () => set({ activeWordIndex: 0, activeLetterIndex: 0, userWords: [""] }),
}));
