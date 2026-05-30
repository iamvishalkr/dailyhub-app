import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { JournalType } from "@/types";
import { showToast } from "@/utils/showToast";
import { useJournalStore } from "@/zustand/journal.store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Dialog,
    IconButton,
    Portal,
    Surface,
    Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewJournalScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { journals, updateJournal, deleteJournal } = useJournalStore();
  const navigation = useNavigation();

  const [targetJournal, setTargetJournal] = useState<JournalType | null>(null);

  const dateStr = !targetJournal
    ? ""
    : new Date(targetJournal.dateMs).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  const [isDeleteDiaOpen, setisDeleteDiaOpen] = useState(false);

  useEffect(() => {
    const journal = journals.find((item) => item.id === Number(id));
    if (journal) {
      setTargetJournal(journal);
    }
  }, []);

  const handleSave = () => {
    if (targetJournal) {
      updateJournal(targetJournal.id, { content: targetJournal.content });
      showToast("Journal updated!");
    }
  };

  const handleDelete = () => {
    if (targetJournal) {
      deleteJournal(targetJournal.id);
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      showToast("Journal deleted!");
    }
  };

  return (
    <Surface className="flex-1">
      <Appbar
        title={dateStr}
        right={
          <IconButton
            mode="contained-tonal"
            icon={"delete"}
            size={24}
            onPress={() => {
              setisDeleteDiaOpen(true);
            }}
          />
        }
      />

      <SafeAreaView className="flex-1" edges={["bottom"]}>
        {targetJournal && (
          <View className="h-80_ p-4">
            <M3Input
              style={{ height: 400 }}
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              value={targetJournal.content}
              onChangeText={(value) =>
                setTargetJournal({ ...targetJournal, content: value })
              }
            />

            <View className="mt-4 flex justify-end">
              <Button mode="contained" onPress={handleSave}>
                Save Changes
              </Button>
            </View>
          </View>
        )}
      </SafeAreaView>

      <Portal>
        {/* DELETE DIALOG */}
        <Dialog
          visible={isDeleteDiaOpen}
          onDismiss={() => {
            setisDeleteDiaOpen(false);
          }}
        >
          <Dialog.Icon icon="alert" />
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to delete?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="outlined"
              className="px-4"
              onPress={() => {
                handleDelete();
                setisDeleteDiaOpen(false);
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  );
};

export default ViewJournalScreen;

const styles = StyleSheet.create({});
