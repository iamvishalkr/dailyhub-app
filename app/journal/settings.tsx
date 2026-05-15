import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useJournalStore } from "@/zustand/journal.store";
import { useState } from "react";

import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
    <M3View className="flex-1 ">
      <Appbar
        title="Settings"
        right={
          <Button
            style={{ borderColor: "white" }}
            textStyle={{ color: "white" }}
            mode="outline"
            onPress={resetQuestions}
            title="Reset Defaults"
          >
            {/* <RotateCcw className="w-3 h-3 mr-1" />  */}
          </Button>
        }
      />

        <M3Text className="text-lg font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-2">
          Daily Questions ({questions.length})
        </M3Text>

        <View className="px-3 my-3">
          <View
            //   onSubmit={handleAdd}
            className="flex-row gap-4"
          >
            <M3Input
            numberOfLines={1}
              placeholder="E.g. What could I have done better?"
              value={newQuestion}
              onChangeText={(value) => setNewQuestion(value)}
              className="border rounded-xl flex-1"
            />
            <Button
              title="Add"
              disabled={!newQuestion.trim()}
              onPress={handleAdd}
            >
              {/* <Plus className="w-5 h-5" /> */}
            </Button>
          </View>
        </View>

        <SafeAreaView style={{flex:1}} edges={["bottom"]}>
        <View className="flex-1 flex-col gap-2 px-3">
        <ScrollView className="flex-1">
          {questions.map((q, i) => (
            <Card key={i} className="flex-row items-center justify-between p-3 mb-2">
              <M3Text className="text-sm font-medium mr-4">{q}</M3Text>
              <Button
                mode="link"
                onPress={() => deleteQuestion(i)}
                title="Delete"
              >
                {/* <Trash2 className="w-4 h-4" /> */}
              </Button>
            </Card>
          ))}
          {questions.length === 0 && (
            <M3Text className="text-sm text-muted-foreground py-4 text-center border border-dashed border-gray-300 rounded-lg">
              No questions configured. Add some below.
            </M3Text>
          )}
        </ScrollView>
        </View>
        </SafeAreaView>
    </M3View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
