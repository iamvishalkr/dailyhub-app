import type { TodoType } from "@/types";
import { useTodoStore } from "@/zustand/todo.store";
import { useEffect, useState } from "react";
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    TextInputSubmitEditingEvent,
    TouchableOpacity,
    View
} from "react-native";
import { Card, Text } from "react-native-paper";
import { M3Input } from "../ui/M3Input";
import { ThemedIcon } from "../ui/ThemedIcon";


interface TodoCardProps {
  todo: TodoType;
  isEditing: boolean;
  onStartEdit: () => void;
  onEndEdit: () => void;
}

const TodoCard = ({
  todo,
  isEditing,
  onStartEdit,
  onEndEdit,
}: TodoCardProps) => {
  const { updateTodo, deleteTodo } = useTodoStore();
  const [value, setValue] = useState(todo.title);

  useEffect(() => {
    setValue(todo.title);
  }, [todo.title, isEditing]);

  const handleSave = () => {
    if (value.trim() === "") {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, { title: value });
    }
    onEndEdit();
  };

  const handleKeyDown = (e: TextInputSubmitEditingEvent) => {
    handleSave();
  };

  const handleToggleComplete = (e: GestureResponderEvent) => {
    e.stopPropagation();
    updateTodo(todo.id, { completed: !todo.completed });
  };

  return (
    <Card  mode="outlined" className="mb-2 overflow-hidden" >
      <View
      className=""
        style={styles.container}
      >
        <TouchableOpacity
          onPress={handleToggleComplete}
          style={styles.checkbox}
        >
          <ThemedIcon
          name={todo.completed ? "check" : "square-outline"}
          size={20}
          style={{ textAlign: "center"}}
        />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          {isEditing ? (
            <M3Input
              style={{ width: "100%", padding: 0, margin: 0,fontSize: 16, }}
              autoFocus
              value={value}
              onChangeText={(v) => setValue(v)}
              onSubmitEditing={handleKeyDown}
              onBlur={handleSave}
              placeholder="Type your note here..."
            />
          ) : (
            <Pressable
            style={{height:40, justifyContent:"center"}}
              onPress={() => {
                onStartEdit();
              }}
            >
              <Text style={styles.text}>{todo.title}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Card>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal:8,
    // padding: 12,
    alignItems: "center",
    paddingVertical:8
  },

  checkbox: {
    marginRight: 12,
  },

  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
  },

  checked: {
    backgroundColor: "#000",
  },

  textContainer: {
    flex: 1,
  },

  text: {
    fontSize: 16,
  },
});
