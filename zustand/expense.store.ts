import type { ExpenseType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ExpenseState {
  expenses: ExpenseType[];
  addExpense: (expense: ExpenseType) => void;
  deleteExpense: (id: number) => void;
}

export const expenseCategories = [
  {
    title: "Food",
    logo: "",
  },
  {
    title: "Transport",
    logo: "",
  },
  {
    title: "Shopping",
    logo: "",
  },
  {
    title: "Entertainment",
    logo: "",
  },
  {
    title: "Health & Fitness",
    logo: "",
  },
  {
    title: "Bills & Utilities",
    logo: "",
  },
  {
    title: "Education",
    logo: "",
  },
  {
    title: "Savings",
    logo: "",
  },
  {
    title: "Others",
    logo: "",
  },
];
export const incomeCategories = [
  {
    title: "Income",
    logo: "",
  },
  {
    title: "Savings",
    logo: "",
  },
  {
    title: "Others",
    logo: "",
  },
];

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense) =>
        set((state) => ({ expenses: [expense, ...state.expenses] })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
    }),
    { name: "expenseStore",storage: createJSONStorage(() => AsyncStorage) }
  )
);
