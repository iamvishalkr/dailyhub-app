import Appbar from "@/components/Appbar";
import EmptyState from "@/components/EmptyState";
import TodoCard from "@/components/TodoComponents/TodoCard";
import { useTodoStore } from "@/zustand/todo.store";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Surface } from "react-native-paper";
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
    <Surface style={{ flex: 1 }}>
      <Appbar
        title="Todos"
        right={
          <Button
          className="me-2"
            mode="outlined"
            icon={"plus"}
            onPress={handleCreateNew}
          >Add</Button>
        }
      />
      {todos.length === 0 && (
        <View className="p-4">
          <EmptyState
            Logo="checkbox-marked"
            title="No Todos!"
            subtitle="Create Your First Todo Now"
            btnText="Create Todos"
            onPress={handleCreateNew}
          />
        </View>
      )}
      <View className="flex-1 pt-2">
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
      </View>
    </Surface>
  );
}
