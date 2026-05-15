import { Button } from "@/components/ui/Button";
import { useJournalStore } from "@/zustand/journal.store";
import { useUserStore } from "@/zustand/user.store";
import { useState } from "react";
// import { PricingDataLimits } from "@/constants";
// import { toast } from "sonner";

import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

const AddScreen = () => {
  const { questions, addJournal, journals } = useJournalStore();
  const { user } = useUserStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );
  const router = useRouter();

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

    //   window.history.back();
    ToastAndroid.show("Journal add success!", ToastAndroid.SHORT);
    }
  };

  return (
    <M3View className="flex-1">
      <Appbar title="New Journal" />

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
            <M3Text
              className={`mt-2 text-sm font-medium transition-colors duration-300
                  ${currentStep >= i ? "text-xl" : "text-sm text-gray-500"}`}
            >
              Q.{i + 1}
            </M3Text>
          </View>
        ))}
      </View>

      {/* Content Area */}
      {questions.length > 0 ? (
        <View className="px-2">
          <M3Text className="text-xl font-semibold mb-2">
            {questions[currentStep]}
          </M3Text>
          <M3View className="border border-on-background rounded-xl">
            <M3Input
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
            className="h-60"
              placeholder="Write your answer... (or skip)"
              value={answers[currentStep]}
              onChangeText={(value) => {
                const newAnswers = [...answers];
                newAnswers[currentStep] = value;
                setAnswers(newAnswers);
              }}
            />
          </M3View>

          <View className="flex-row justify-between mt-2">
            <Button
              mode="outline"
              onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              title="Back"
            ></Button>
            <Button
              onPress={handleNext}
              title={currentStep === questions.length - 1 ? "Finish" : "Next"}
            >
              
            </Button>
          </View>
        </View>
      ) : (
        <View className="flex-col mt-4 items-center justify-center px-4">
          <M3Text className="text-muted-foreground mb-4 text-center">
            You have no journal questions configured. Add some in settings!
          </M3Text>
          <View>
          <Button
            onPress={() => router.push("/journal/settings")}
            title="Go to Settings"
          ></Button>
          </View>
        </View>
      )}
    </M3View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});
