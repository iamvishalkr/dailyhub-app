import type { TodoType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TodoState {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  updateTodo: (id: number, todo: Partial<TodoType>) => void;
  deleteTodo: (id: number) => void;
  reset:()=> void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
        reset:()=> set({todos:[]}),
      todos: [],
      addTodo: (todo) => set((state) => ({ todos: [ todo,...state.todos] })),
      updateTodo: (id, todo) =>
        set((state) => ({
          todos: state.todos.map((item) => {
            if (item.id === Number(id)) {
              return { ...item, ...todo };
            }
            return item;
          }),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    { name: "todoStore",storage: createJSONStorage(() => AsyncStorage) }
  )
);
