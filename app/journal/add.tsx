import { useJournalStore } from "@/zustand/journal.store";
import { useUserStore } from "@/zustand/user.store";
import { useEffect, useState } from "react";
import { Button, Surface } from "react-native-paper";
// import { PricingDataLimits } from "@/constants";
// import { toast } from "sonner";

import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { showToast } from "@/utils/showToast";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const AddScreen = () => {
  const { questions, addJournal, journals } = useJournalStore();
  const { user } = useUserStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const router = useRouter();
  const navigation = useNavigation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [selected_date, set_selcted_date] = useState(() => new Date());
  const [selected_time, set_selcted_time] = useState(() => new Date());

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save on last step
      let content = "";
      questions.forEach((q, i) => {
        const ans = answers[i]?.trim();
        if (ans) {
          content += `**${q}**\n${ans}\n\n`;
        }
      });
      content = content.trim();

      if (!content) {
        content = "Nothing much to report today.";
      }
      if (journals.length >= 20 && !user) {
        //PricingDataLimits.Journal
        // toast.error("Limit exceeded!");
        return false;
      }
      const combinedDate = new Date(selected_date);

      combinedDate.setHours(
        selected_time.getHours(),
        selected_time.getMinutes(),
        selected_time.getMinutes(),
        0
      );

      addJournal({
        id: Date.now(),
        dateMs: combinedDate.getTime(),
        content,
      });
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      showToast("Journal added!");
    }
  };

  const showDatepicker = () => {
    showMode(selected_date, "date");
  };
  const showTimePicker = () => {
    showMode(selected_date, "time");
  };
  const showMode = (date: Date, currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_event, selectedValue) => {
        if (selectedValue) {
          if (currentMode === "date") {
            set_selcted_date(selectedValue);
          } else {
            set_selcted_time(selectedValue);
          }
        }
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

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

  return (
    <Surface className="flex-1">
      <Appbar title="New Journal" />

      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, paddingHorizontal: 14 }}
      >
        {/* 1. date and time picker */}
        <View className="flex-row gap-2 my-2">
          <Button
            className="shrink-0 flex-1"
            mode="outlined"
            onPress={showDatepicker}
            icon={"calendar"}
          >
            {selected_date.toDateString()}
          </Button>
          <Button
            className="shrink-0 flex-1"
            mode="outlined"
            onPress={showTimePicker}
            icon={"clock"}
          >
            {selected_time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Button>
        </View>
        {/* 2. journal title */}
        <View>
          <M3Input className="flex-1" placeholder="Title: e.g Today's events" />
        </View>
        {/* 3. */}
        <View className="flex-row items-center justify-between mb-2  mt-2">
          <Text variant="titleMedium">
            Q. {currentStep + 1}/{questions.length} {`)`} :{" "}
            {questions[currentStep]}
          </Text>
        </View>

        {/* Content Area */}
        {questions.length > 0 ? (
          <View className="flex-1">
            {/* <Text variant="titleMedium" className="text-xl font-semibold mb-2">
              {questions[currentStep]}
            </Text> */}

            <M3Input
              style={{ flex: 1, marginBottom: keyboardHeight }}
              multiline={true}
              textAlignVertical="top"
              placeholder="Write your answer... (or skip) (Markdown supported)"
              value={answers[currentStep]}
              onChangeText={(value) => {
                const newAnswers = [...answers];
                newAnswers[currentStep] = value;
                setAnswers(newAnswers);
              }}
            />
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={
                Platform.OS === "ios" ? 0 : keyboardHeight
              } // Adjust offset if needed
            >
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled"
              >
                <M3Input
                  style={{ flex: 1 }}
                  multiline={true}
                  textAlignVertical="top"
                  placeholder="Write your answer... (or skip) (Markdown supported)"
                  value={answers[currentStep]}
                  onChangeText={(value) => {
                    const newAnswers = [...answers];
                    newAnswers[currentStep] = value;
                    setAnswers(newAnswers);
                  }}
                />
              </ScrollView>
            </KeyboardAvoidingView> */}

            <View className="flex-row justify-between mt-2">
              <Button
                mode="outlined"
                onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button mode="contained" onPress={handleNext}>
                {currentStep === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </View>
          </View>
        ) : (
          <View className="flex-col mt-4 items-center justify-center px-4">
            <Text variant="titleSmall" style={{ textAlign: "center" }}>
              You have no journal questions configured. Add some in settings!
            </Text>
            <View className="mt-4">
              <Button
                mode="outlined"
                onPress={() => router.push("/journal/settings")}
              >
                Go to Settings
              </Button>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Surface>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});
