import type { PillsType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const pillsUnits = [
  "IU",
  "injection",
  "capsules",
  "drop",
  "gm",
  "mg",
  "ml",
  "mm",
  "piece",
  "pills",
  "sachet",
  "sprays",
  "tablespoon",
  "teaspoon",
  "unit",
];

interface PillState {
  pillsList: PillsType[];
  addPill: (pill: PillsType) => void;
  updatePill: (id: number, pill: Partial<PillsType>) => void;
  deletePill: (id: number) => void;
}

export const usePillStore = create<PillState>()(
  persist(
    (set) => ({
      pillsList: [],
      addPill: (pill) =>
        set((state) => ({ pillsList: [...state.pillsList, pill] })),
      updatePill: (id, pill) =>
        set((state) => ({
          pillsList: state.pillsList.map((item) => {
            if (item.id === Number(id)) {
              return { ...item, ...pill };
            }
            return item;
          }),
        })),
      deletePill: (id) =>
        set((state) => ({
          pillsList: state.pillsList.filter((pill) => pill.id !== id),
        })),
    }),
    { name: "pillStore",storage: createJSONStorage(() => AsyncStorage) }
  )
);
