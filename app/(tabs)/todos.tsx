import Appbar from "@/components/Appbar";
import EmptyState from "@/components/EmptyState";
import TodoCard from "@/components/TodoComponents/TodoCard";
import { Button } from "@/components/ui/Button";
import { M3View } from "@/components/ui/M3View";
import { ThemedIcon } from "@/components/ui/ThemedIcon";
import { useTodoStore } from "@/zustand/todo.store";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
// import { useUniwind } from "uniwind";

export default function TodoPage() {
  // const { theme } = useUniwind()
  const { todos, addTodo } = useTodoStore();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreateNew = () => {
    const newId = Date.now();
    addTodo({ id: newId, title: "", completed: false });
    setEditingId(newId);
  };

  return (
    <M3View style={{ flex: 1 }}>
      <Appbar
        title="Todos"
        right={
          <Button
            title="Add"
            mode="outline"
            style={{ borderColor: "#fff" }}
            textStyle={{ color: "#fff" }}
            leadingIcon={
              <ThemedIcon
              color={"#ffffff"}
                name="plus"
                size={20}
              />
            }
            onPress={handleCreateNew}
          />
        }
      />
      {todos.length === 0 && (
        <View className="p-4">
          <EmptyState
            Logo="checkbox-marked"
            title="No Todos!"
            subtitle="Create Your First Todo Now"
            btnText="Create Todos"
            link="#"
            onClick={handleCreateNew}
          />
        </View>
      )}
      <M3View className="flex-1">
      <KeyboardAvoidingView
        className=""
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust offset if needed
      >
        <FlatList
          keyboardShouldPersistTaps="handled"
          className="px-3 pt-0"
          data={todos}
          renderItem={({ item }) => (
            <TodoCard
              key={item.id}
              todo={item}
              isEditing={editingId === item.id}
              onStartEdit={() => setEditingId(item.id)}
              onEndEdit={() => setEditingId(null)}
            />
          )}
        />
      </KeyboardAvoidingView>
      </M3View>
    </M3View>
  );
}
