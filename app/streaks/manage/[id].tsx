import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { ThemedIcon } from "@/components/ui/ThemedIcon";
import type { StreakType } from "@/types";
import { showToast } from "@/utils/showToast";
import { useStreakStore } from "@/zustand/streak.store";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    Button,
    Card,
    Dialog,
    Portal,
    Surface,
    Text,
} from "react-native-paper";

const ManageScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { streaksList, updateStreak, resetStreak, deleteStreak } =
    useStreakStore();
  const navigation = useNavigation();
  const [errorMsg, seterrorMsg] = useState("");
  const [formData, setformData] = useState({
    id: 0,
    title: "",
    reason: "",
    startDateMs: 0,
    totalCount: 0,
    completedDates: [],
  } as StreakType);

  const [isResetDiaOpen, setisResetDiaOpen] = useState(false);
  const [isDeleteDiaOpen, setisDeleteDiaOpen] = useState(false);

  useEffect(() => {
    const targetStreak = streaksList.find((item) => item.id === Number(id));
    if (targetStreak) {
      setformData(targetStreak);
    }
  }, []);

  const handleSave = () => {
    if (!formData.title.trim()) {
      seterrorMsg("Please fill the title");
      return false;
    }

    updateStreak(Number(id), formData);
    showToast("Streak Updated!");

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleReset = () => {
    resetStreak(Number(id));
    showToast("Streak Reset");
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    deleteStreak(Number(id));
    showToast("Streak Deleted");
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const showMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: new Date(formData.startDateMs),
      onChange: (_event, selectedDate) => {
        if (selectedDate) {
          setformData({ ...formData, startDateMs: selectedDate.getTime() });
        }
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    formData.id !== 0 && (
      <Surface style={{ flex: 1 }}>
        <Appbar title="Manage Streaks" />

        <View className="px-2">
          <View className="flex-row justify-between items-center py-2">
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <ThemedIcon name="pen" size={20} />
              <Text variant="titleMedium" style={{ fontSize: 20 }}>
                Edit
              </Text>
            </View>

            <View className="flex-row gap-1">
              <Button
                mode="outlined"
                onPress={() => {
                  setisResetDiaOpen(true);
                }}
              >
                Reset
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  setisDeleteDiaOpen(true);
                }}
              >
                Delete
              </Button>
              <Button mode="contained" onPress={handleSave}>
                Save
              </Button>
            </View>
          </View>

          <Card mode="outlined">
            <Card.Content>
              <View>
                <Text variant="titleMedium" className="mb-2">
                  Title
                </Text>
                <M3Input
                  className="border-b"
                  id="small-form-name"
                  value={formData.title}
                  onChangeText={(value) => {
                    seterrorMsg("");
                    setformData({ ...formData, title: value });
                  }}
                  placeholder="Streak Title"
                />
                <Text variant="titleSmall" className="text-red-700 mb-2">
                  {errorMsg}
                </Text>
              </View>
              <View>
                <Text variant="titleMedium" className="mb-2">
                  Duration (days)
                </Text>
                <M3Input
                  className="border-b"
                  id="small-form-name"
                  inputMode="numeric"
                  value={String(formData.totalCount)}
                  onChangeText={(value) => {
                    // seterrorMsg("")
                    setformData({
                      ...formData,
                      totalCount: Number(value),
                    });
                  }}
                  placeholder="Number of Days"
                />
              </View>
              <View>
                <Text variant="titleMedium" className="mb-2 mt-4">
                  Why (Optional)
                </Text>
                <M3Input
                  className="border-b"
                  id="small-form-name"
                  value={formData.reason}
                  onChangeText={(value) => {
                    // seterrorMsg("")
                    setformData({ ...formData, reason: value });
                  }}
                  placeholder="Reason"
                />
              </View>
              <View>
                <Text variant="titleMedium" className="mb-2 mt-4">
                  Start Date
                </Text>
                <TouchableOpacity
                  className="flex-row items-center gap-2 mt-3"
                  onPress={showDatepicker}
                >
                  <ThemedIcon name="pen" size={14} />
                  <Text variant="titleMedium">
                    {new Date(formData.startDateMs).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          <Portal>
            {/* RESTE STREAK DIALOG */}
            <Dialog
              visible={isResetDiaOpen}
              onDismiss={() => {
                setisResetDiaOpen(false);
              }}
            >
              {/* <Dialog.Icon icon="alert" /> */}
              <Dialog.Title>Reset</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure to reset the streaks to 0?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  mode="contained"
                  className="px-4"
                  onPress={() => {
                    handleReset();
                    setisResetDiaOpen(false);
                  }}
                >
                  Reset
                </Button>
              </Dialog.Actions>
            </Dialog>

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
        </View>
      </Surface>
    )
  );
};

export default ManageScreen;

const styles = StyleSheet.create({});
