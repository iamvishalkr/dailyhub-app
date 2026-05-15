import type { CartItemType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  cartItems: CartItemType[];
  addToCart: (cart: CartItemType) => void;
  updateCart: (id: number, cart: Partial<CartItemType>) => void;
  deleteInCart: (id: number) => void;
  deleteSelectedInCart: () => void;
  checkAll: (state: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (cart) =>
        set((state) => ({ cartItems: [...state.cartItems, cart] })),
      updateCart: (id, cart) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.id === Number(id)) {
              return { ...item, ...cart };
            }
            return item;
          }),
        })),
      deleteInCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((cart) => cart.id !== id),
        })),
      deleteSelectedInCart: () =>
        set((state) => {
          return {
            cartItems: state.cartItems.filter((cart) => !cart.isChecked),
          };
        }),
      checkAll: (check) =>
        set((state) => ({
          cartItems: state.cartItems.map((m) => ({
            ...m,
            isChecked: check,
          })),
        })),
    }),
    { name: "cartStore", storage: createJSONStorage(() => AsyncStorage) }
  )
);
