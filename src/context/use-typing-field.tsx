import { create } from "zustand";

type Store = {
  activeWordIndex: number;
  setActiveWordIndex: (val: number | ((prev: number) => number)) => void;

  activeLetterIndex: number;
  setActiveLetterIndex: (val: number | ((prev: number) => number)) => void;

  userWords: string[];
  setUserWords: (val: string[] | ((prev: string[]) => string[])) => void;

  currRow: number;
  setCurrRow: (val: number | ((prev: number) => number)) => void;

  firstRowWordCount: number;
  setFirstRowWordCount: (val: number | ((prev: number) => number)) => void;

  capsLockActive: boolean;
  setCapsLockActive: (val: boolean | ((prev: boolean) => boolean)) => void;

  startTimer: boolean;
  setStartTimer: (val: boolean | ((prev: boolean) => boolean)) => void;

  userTyping: boolean;
  setUserTyping: (val: boolean | ((prev: boolean) => boolean)) => void;

  resetTypingField: () => void;
};

export const useTypingField = create<Store>((set) => ({
  activeWordIndex: 0,
  setActiveWordIndex: (val) =>
    set((state) => ({
      activeWordIndex: typeof val === "function" ? val(state.activeWordIndex) : val,
    })),

  activeLetterIndex: 0,
  setActiveLetterIndex: (val) =>
    set((state) => ({
      activeLetterIndex: typeof val === "function" ? val(state.activeLetterIndex) : val,
    })),

  userWords: [""],
  setUserWords: (val) =>
    set((state) => ({ userWords: typeof val === "function" ? val(state.userWords) : val })),

  currRow: 1,
  setCurrRow: (val) =>
    set((state) => ({ currRow: typeof val === "function" ? val(state.currRow) : val })),

  firstRowWordCount: 0,
  setFirstRowWordCount: (val) =>
    set((state) => ({
      firstRowWordCount: typeof val === "function" ? val(state.firstRowWordCount) : val,
    })),

  capsLockActive: false,
  setCapsLockActive: (val) =>
    set((state) => ({
      capsLockActive: typeof val === "function" ? val(state.capsLockActive) : val,
    })),

  startTimer: false,
  setStartTimer: (val) =>
    set((state) => ({
      startTimer: typeof val === "function" ? val(state.startTimer) : val,
    })),

  userTyping: false,
  setUserTyping: (val) =>
    set((state) => ({ userTyping: typeof val === "function" ? val(state.userTyping) : val })),

  resetTypingField: () =>
    set({
      startTimer: false,
      userTyping: false,
      activeWordIndex: 0,
      activeLetterIndex: 0,
      userWords: [""],
      currRow: 1,
      firstRowWordCount: 0,
    }),
}));
