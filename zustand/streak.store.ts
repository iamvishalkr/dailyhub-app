import type { StreakType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StreakState {
  streaksList: StreakType[];
  addStreak: (streak: StreakType) => void;
  updateStreak: (id: number, streak: Partial<StreakType>) => void;
  resetStreak: (id: number) => void;
  deleteStreak: (id: number) => void;
  toggleCompleteToday: (id: number, todayTimestamp: number) => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set) => ({
      streaksList: [],
      addStreak: (streak) =>
        set((state) => ({ streaksList: [...state.streaksList, streak] })),
      updateStreak: (id, streak) =>
        set((state) => ({
          streaksList: state.streaksList.map((item) => {
            if (item.id === Number(id)) {
              return { ...item, ...streak };
            }
            return item;
          }),
        })),
      resetStreak: (id) =>
        set((state) => ({
          streaksList: state.streaksList.map((item) => {
            if (item.id === Number(id)) {
              return { ...item, completedDates: [] };
            }
            return item;
          }),
        })),
      deleteStreak: (id) =>
        set((state) => ({
          streaksList: state.streaksList.filter(
            (item) => item.id !== Number(id)
          ),
        })),
      toggleCompleteToday: (id, todayTimestamp) =>
        set((state) => ({
          streaksList: state.streaksList.map((item) => {
            if (item.id === Number(id)) {
              const cd = item.completedDates;
              return {
                ...item,
                completedDates: cd.includes(todayTimestamp)
                  ? cd.filter((n) => n !== todayTimestamp)
                  : [...cd, todayTimestamp],
              };
            }
            return item;
          }),
        })),
    }),
    { name: "streakStore",storage: createJSONStorage(() => AsyncStorage) }
  )
);
