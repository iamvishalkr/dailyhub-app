import { useJournalStore } from "@/zustand/journal.store";
import { useUserStore } from "@/zustand/user.store";
import { useState } from "react";
import { Button, Surface } from "react-native-paper";
// import { PricingDataLimits } from "@/constants";
// import { toast } from "sonner";

import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { showToast } from "@/utils/showToast";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const AddScreen = () => {
  const { questions, addJournal, journals } = useJournalStore();
  const { user } = useUserStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const router = useRouter();
  const navigation = useNavigation()

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save
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
      addJournal({
        id: Date.now(),
        dateMs: Date.now(),
        content,
      });
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
      showToast("Journal added!")
    }
  };

  return (
    <Surface className="flex-1">
      <Appbar title="New Journal" />

      <View className="px-4">
        {/* --- Top Horizontal Stepper --- */}
        <View className="flex-row items-center justify-between mb-8 relative">
          {/* Background Line (Gray) */}
          {/* <View className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded"></View> */}

          {/* Dynamic Progress Line */}
          {/* <View
          className="absolute left-0  top-0 h-1 bg-primary  transition-all duration-300 ease-in-out rounded"
          style={{
            width: `${(currentStep / (questions.length - 1)) * 100}%`,
          }}
        ></View> */}

          {questions.map((_, i) => (
            <View key={i} className="flex-row items-center mt-1 px-2">
              {/* Step Label */}
              <Text
              variant="titleMedium"
                className={`mt-2 text-sm font-medium transition-colors duration-300
                  ${currentStep >= i ? "text-xl" : "text-sm text-gray-500"}`}
              >
                Q.{i + 1}
              </Text>
            </View>
          ))}
        </View>

        {/* Content Area */}
        {questions.length > 0 ? (
          <View className="px-2">
            <Text variant="titleMedium" className="text-xl font-semibold mb-2">
              {questions[currentStep]}
            </Text>
            <View className="">
              <M3Input
              style={{height:300}}
                multiline={true}
                // numberOfLines={8}
                textAlignVertical="top"
                placeholder="Write your answer... (or skip)"
                value={answers[currentStep]}
                onChangeText={(value) => {
                  const newAnswers = [...answers];
                  newAnswers[currentStep] = value;
                  setAnswers(newAnswers);
                }}
              />
            </View>

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
            <Text variant="titleSmall" style={{textAlign:"center"}}>
              You have no journal questions configured. Add some in settings!
            </Text>
            <View className="mt-4">
              <Button mode="outlined" onPress={() => router.push("/journal/settings")}>
                Go to Settings
              </Button>
            </View>
          </View>
        )}
      </View>
    </Surface>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});
