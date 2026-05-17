import DurationStep from "@/components/StreakComponents/DurationStep";
import ResonStep from "@/components/StreakComponents/ResonStep";
import ScheduleStep from "@/components/StreakComponents/ScheduleStep";
import TitleStep from "@/components/StreakComponents/TitleStep";
import type { StreakType } from "@/types";
import { useStreakStore } from "@/zustand/streak.store";
import { useUserStore } from "@/zustand/user.store";
// import * as Notifications from "expo-notifications";
import { useState } from "react";

import Appbar from "@/components/Appbar";
import { showToast } from "@/utils/showToast";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

const AddScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setformData] = useState({
    id: 0,
    title: "",
    reason: "",
    startDateMs: 0,
    totalCount: 0,
    completedDates: [],
  } as StreakType);
  const { streaksList, addStreak } = useStreakStore();
  const { user } = useUserStore();

  const stepTask = ["Title", "Reason", "Schedule", "Duration"];

  //   const scheduleDailyReminder = async () => {
  //     try {
  //       // Best Practice: Clear all existing scheduled notifications first.
  //       // This prevents users from getting double notifications if they click "Schedule" multiple times
  //       // or change their preferred reminder time.

  //       await Notifications.cancelAllScheduledNotificationsAsync();

  //       await Notifications.scheduleNotificationAsync({
  //         content: {
  //           title: "Habit Tracker 🚀",
  //           body: "It's time to check off today's habits! Keep your streak alive.",
  //           sound: true,
  //         },
  //         trigger: {
  //           type: Notifications.SchedulableTriggerInputTypes.DAILY,
  //           hour: 20, // Set to 8:00 PM
  //           minute: 0,
  //         },
  //       });

  //       Alert.alert(
  //         "Reminder Set!",
  //         "You will be reminded every day at 8:00 PM."
  //       );
  //     } catch (error) {
  //       console.error("Failed to schedule notification:", error);
  //     }
  //   };

  const handleAddStreak = async () => {
    if (streaksList.length >= 20 && !user) {
      //   toast.error("Limit exceeded!");
      return false;
    }
    addStreak({ ...formData, id: Date.now() });
    showToast("Streak created Successfully");
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <Surface className="flex-1">
      <Appbar title="Add Streaks" />

      <View className="flex-1 px-4 ">

        <View className="mt-4 mb-2">
          <Text className="text-xl">
            {`Step : ${currentStep}/${stepTask.length} - ${
              stepTask[currentStep - 1]
            }`}
          </Text>
        </View>

        {/* --- Step Content --- */}

        {currentStep === 1 && (
          <TitleStep
            setCurrentStep={setCurrentStep}
            formData={formData}
            setformData={setformData}
          />
        )}
        {currentStep === 2 && (
          <ResonStep
            setCurrentStep={setCurrentStep}
            formData={formData}
            setformData={setformData}
          />
        )}

        {currentStep === 3 && (
          <ScheduleStep
            setCurrentStep={setCurrentStep}
            formData={formData}
            setformData={setformData}
          />
        )}
        {currentStep === 4 && (
          <DurationStep
            setCurrentStep={setCurrentStep}
            formData={formData}
            setformData={setformData}
            handleAddStreak={handleAddStreak}
          />
        )}
      </View>
    </Surface>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});