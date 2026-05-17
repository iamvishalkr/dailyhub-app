import { useJournalStore } from "@/zustand/journal.store";
import { useState } from "react";
import { Button, Card, Surface } from "react-native-paper";

import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { questions, addQuestion, deleteQuestion, resetQuestions } =
    useJournalStore();
  const [newQuestion, setNewQuestion] = useState("");

  const handleAdd = () => {
    if (newQuestion.trim()) {
      addQuestion(newQuestion.trim());
      setNewQuestion("");
    }
  };

  return (
    <Surface className="flex-1 ">
      <Appbar
        title="Settings"
        right={
          <Button mode="outlined" onPress={resetQuestions}>
            {/* <RotateCcw className="w-3 h-3 mr-1" />  */}
            Reset Defaults
          </Button>
        }
      />
      <View className="px-3 my-3">
        <Text variant="titleMedium" className="mb-4">
          Daily Questions ({questions.length})
        </Text>

        <View
          //   onSubmit={handleAdd}
          className="flex-col gap-4 w-full"
        >
          <View>
            <M3Input
              numberOfLines={1}
              multiline={false}
              placeholder="E.g. What could I have done better?"
              value={newQuestion}
              onChangeText={(value) => setNewQuestion(value)}
              style={{ height: 40, padding: 0 }}
              contentStyle={{ wordWrap: "nowrap" }}
            />
          </View>
          <View >
            <Button
              mode="contained"
              disabled={!newQuestion.trim()}
              onPress={handleAdd}
            >
              {/* <Plus className="w-5 h-5" /> */}
              Add
            </Button>
          </View>
        </View>
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <View className="flex-1 flex-col gap-2 px-3">
          <ScrollView className="flex-1">
            {questions.map((q, i) => (
              <Card
                mode="outlined"
                key={i}
                className="mb-2"
              >
                <Card.Content className="flex-row items-center justify-between w-full">
                  <Text variant="titleSmall" style={{ width: "70%" }}>
                    {q}
                  </Text>
                  <Button
                    mode="contained-tonal"
                    onPress={() => deleteQuestion(i)}
                  >
                    {/* <Trash2 className="w-4 h-4" /> */}
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            ))}
            {questions.length === 0 && (
              <Card mode="outlined">
                <Card.Content>
                  <Text variant="titleMedium" style={{ textAlign: "center" }}>
                    No questions configured. Add some below.
                  </Text>
                </Card.Content>
              </Card>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Surface>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
