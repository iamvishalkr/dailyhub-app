import type { JournalType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const DEFAULT_QUESTIONS = [
  "What happened today?",
  "What are you grateful for?",
  "What did you learn today?",
];

interface JournalState {
  journals: JournalType[];
  questions: string[];
  addJournal: (journal: JournalType) => void;
  updateJournal: (id: number, journal: Partial<JournalType>) => void;
  deleteJournal: (id: number) => void;
  addQuestion: (question: string) => void;
  deleteQuestion: (index: number) => void;
  resetQuestions: () => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      journals: [],
      questions: DEFAULT_QUESTIONS,
      addJournal: (journal) =>
        set((state) => ({ journals: [journal, ...state.journals] })),
      updateJournal: (id, journal) =>
        set((state) => ({
          journals: state.journals.map((item) => {
            if (item.id === Number(id)) {
              return { ...item, ...journal };
            }
            return item;
          }),
        })),
      deleteJournal: (id) =>
        set((state) => ({
          journals: state.journals.filter((j) => j.id !== id),
        })),
      addQuestion: (question) =>
        set((state) => ({ questions: [...state.questions, question] })),
      deleteQuestion: (index) =>
        set((state) => ({
          questions: state.questions.filter((_, i) => i !== index),
        })),
      resetQuestions: () => set({ questions: DEFAULT_QUESTIONS }),
    }),
    { name: "journalStore",storage: createJSONStorage(() => AsyncStorage) }
  )
);
