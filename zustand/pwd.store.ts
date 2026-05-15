import type { TypePassword } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PasswordState {
  masterPassword: string;
  setMasterpassword: (password: string) => void;
  passwords: TypePassword[];
  addPwd: (password: TypePassword) => void;
  addBatch: (passwordList: TypePassword[]) => void;
  updatePwd: (id: string, password: Partial<TypePassword>) => void;
  deletePwd: (id: string) => void;
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    (set) => ({
      masterPassword: "",
      setMasterpassword: (password) => set({ masterPassword: password }),
      passwords: [],
      addPwd: (password) =>
        set((state) => ({ passwords: [...state.passwords, password] })),
      addBatch: (passwordList) =>
        set((state) => ({ passwords: [...state.passwords, ...passwordList] })),
      updatePwd: (id, password) =>
        set((state) => ({
          passwords: state.passwords.map((item) => {
            if (item.id === id) {
              return { ...item, ...password };
            }
            return item;
          }),
        })),
      deletePwd: (id) =>
        set((state) => ({
          passwords: state.passwords.filter((pwd) => pwd.id !== id),
        })),
    }),
    {
      name: "passwordStore",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ passwords }) => ({
        passwords: passwords,
      }),
    }
  )
);
