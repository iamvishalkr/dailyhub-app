import type { UserType } from "@/types";
import { create } from "zustand";

interface UserState {
  user: UserType | false | null;
  setUser: (user: UserType | false | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (userObj) => set({ user: userObj }),
}));
