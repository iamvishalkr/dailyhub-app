import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { M3Input } from "@/components/ui/M3Input";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import { ThemedIcon } from "@/components/ui/ThemedIcon";
import type { StreakType } from "@/types";
import { useStreakStore } from "@/zustand/streak.store";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";

const ManageScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { streaksList, updateStreak, resetStreak, deleteStreak } =
    useStreakStore();
  const [errorMsg, seterrorMsg] = useState("");
  const [formData, setformData] = useState({
    id: 0,
    title: "",
    reason: "",
    startDateMs: 0,
    totalCount: 0,
    completedDates: [],
  } as StreakType);

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
    ToastAndroid.show("Streak Updated!", ToastAndroid.SHORT);
    // window.history.back();
  };

  const handleReset = () => {
    resetStreak(Number(id));
    ToastAndroid.show("Streak Reset", ToastAndroid.SHORT);
    // window.history.back();
  };

  const handleDelete = () => {
    deleteStreak(Number(id));
    ToastAndroid.show("Streak Deleted", ToastAndroid.SHORT);
    // window.history.back();
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
      <M3View style={{ flex: 1 }}>
        <Appbar title="Manage Streaks" />

        <View className="px-2">
          <View className="flex-row justify-between items-center py-2">
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <ThemedIcon name="pen" size={20} />
              <M3Text className="text-xl">Edit</M3Text>
            </View>

            <View className="flex-row gap-1">
              <Button title="Reset" mode="outline" onPress={handleReset} />
              <Button title="Delete" mode="outline" onPress={handleDelete} />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>

          {/* <div className="flex justify-between items-center">
          <div className="header flex items-center gap-4">
            <ArrowLeft
              onClick={() => {
                window.history.back();
              }}
            />
            <h4 className="text-primary">{readonlyData.title}</h4>
          </div>
          <div className="desktop-actions hidden xl:block text-black space-x-1">
            <ResetBtnDialog handleOk={handleReset} />
            <DeleteBtnDialog handleOk={handleDelete} />
            <Button onClick={handleSave}>
              <Save /> Save
            </Button>
          </div>
        </div> */}
          {/* <div className="mobile-actions xl:hidden mt-2 mb-8 text-black flex justify-evenly">
          <ResetBtnDialog handleOk={handleReset} />
          <DeleteBtnDialog handleOk={handleDelete} />
          <Button onClick={handleSave}>
            <Save /> Save
          </Button>
        </div> */}

          {/* <div className="flex justify-between items-center mt-8">
          <div className="header flex items-center gap-4">
            <PenBox />
            <h4>Edit Details</h4>
          </div>
        </div> */}

          <Card>
            <CardHeader>
              <View>
                <M3Text>Title</M3Text>
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
                <M3Text className="text-red-700 text-sm">{errorMsg}</M3Text>
              </View>
              <View>
                <M3Text>Duration (days)</M3Text>
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
                <M3Text>Why (Optional)</M3Text>
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
                <M3Text>Start Date</M3Text>
                <TouchableOpacity
                  className="flex-row items-center gap-2 mt-3"
                  onPress={showDatepicker}
                >
                  <ThemedIcon name="pen" size={14} />
                  <M3Text>
                    {new Date(formData.startDateMs).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </M3Text>
                </TouchableOpacity>
              </View>
            </CardHeader>
          </Card>
        </View>
      </M3View>
    )
  );
};

export default ManageScreen;

const styles = StyleSheet.create({});
