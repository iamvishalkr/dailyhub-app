import Appbar from "@/components/Appbar";
// import { M3Input } from "@/components/ui/M3Input";
import { JournalType } from "@/types";
import { showToast } from "@/utils/showToast";
import { useJournalStore } from "@/zustand/journal.store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import Markdown from "react-native-markdown-renderer";
import {
    Button,
    Dialog,
    IconButton,
    Portal,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { M3Input } from "@/components/ui/M3Input";
import { AppFont } from "@/constants/paperConfig";

const ViewJournalScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { journals, updateJournal, deleteJournal } = useJournalStore();
  const navigation = useNavigation();
  const hasSaved = useRef(false);
  const theme = useTheme();

  const [targetJournal, setTargetJournal] = useState<JournalType | null>(null);

  const dateStr = !targetJournal
    ? ""
    : new Date(targetJournal.dateMs).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isDeleteDiaOpen, setisDeleteDiaOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Sync the state value to a Ref so the listener can read it instantly
  const isEditingRef = useRef(isEditing);
  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

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

  useEffect(() => {
    const beforeF = async (e: any) => {
      console.log(hasSaved.current);

      console.log(hasSaved.current);
      if (hasSaved.current || !isEditingRef.current) return;

      e.preventDefault();

      handleSave();

      // 5. Break the loop and leave the page safely
      hasSaved.current = true;
      navigation.dispatch(e.data.action);
    };
    navigation.addListener("beforeRemove", beforeF);

    return () => {
      navigation.removeListener("beforeRemove", beforeF);
    };
  }, [navigation, handleSave]);

  useEffect(() => {
    // Listeners for Android
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (<>
    <Surface className="flex-1">
      <Appbar
        title={dateStr}
        right={
          <>
            <IconButton
              mode={isEditing ? "contained" : "contained-tonal"}
              icon={isEditing ? "check" : "pen"}
              size={24}
              onPress={() => {
                if (isEditing) {
                  handleSave();
                }
                setIsEditing(!isEditing);
              }}
            />
            <IconButton
              mode="contained-tonal"
              icon={"delete"}
              size={24}
              onPress={() => {
                setisDeleteDiaOpen(true);
              }}
            />
          </>
        }
      />

      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        {targetJournal && (
          <View  className="flex-1 px-4 pt-4">
            {/* <M3Input
              style={{ height: 400 }}
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              value={targetJournal.content}
              onChangeText={(value) =>
                setTargetJournal({ ...targetJournal, content: value })
              }
            /> */}
            {!isEditing ? (
              <ScrollView style={{ flex: 1 }}>
                <Markdown
                  style={{
                    text: {
                      fontFamily: AppFont.fontFamily,
                      color: theme.colors.onBackground,
                    },
                    strong: {
                      fontFamily: "JetBrainsMonoBold", //==== TODO ===== Explicitly link your bold file name
                      fontWeight: "normal", // Reset this so Android doesn't look for double bold
                    },
                    em: {
                      fontFamily: "JetBrainsMonoItalic", //==== TODO ===== Explicitly link your italic file name
                      fontStyle: "normal", // Reset this so it doesn't double-slant
                    },
                  }}
                >
                  {targetJournal.content}
                </Markdown>
              </ScrollView>
            ) : (
                <M3Input
                    style={{ flex: 1, marginBottom:keyboardHeight }}
                    multiline={true}
                    textAlignVertical="top"
                    value={targetJournal.content}
                    onChangeText={(value) =>
                      setTargetJournal({ ...targetJournal, content: value })
                    }
                  />
            //   <KeyboardAvoidingView
            //     behavior={Platform.OS === "ios" ? "padding" : "height"}
            //     style={{ flex: 1, }}
            //     keyboardVerticalOffset={
            //       Platform.OS === "ios" ? 0 : Math.floor(keyboardHeight/2)
            //     } // Adjust offset if needed
            //   >
            //     <ScrollView
            //       contentContainerStyle={{ flex: 1 }}
            //     //   keyboardShouldPersistTaps="handled"
            //     >
            //       <M3Input
            //         style={{ flex: 1 }}
            //         multiline={true}
            //         textAlignVertical="top"
            //         value={targetJournal.content}
            //         onChangeText={(value) =>
            //           setTargetJournal({ ...targetJournal, content: value })
            //         }
            //       />
            //     </ScrollView>
            //   </KeyboardAvoidingView>
            )}
          </View>
        )}
      </SafeAreaView>
      </Surface>
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
    </>
  );
};

export default ViewJournalScreen;

const styles = StyleSheet.create({});
