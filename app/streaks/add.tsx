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
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const AddScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCongratsOpen, setisCongratsOpen] = useState(false);
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

  const steps = [
    {
      id: 1,
      name: "Title",
    },
    {
      id: 2,
      name: "Reason",
    },
    {
      id: 3,
      name: "Schedule",
    },
    {
      id: 4,
      name: "Duration",
    },
  ];

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
    if (streaksList.length === 0) {
        // await scheduleDailyReminder();
    }
    // toast.success("New Streak Added!");
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    // if (streaksList.length <= 0) {
    //   // open congrats dialog
    //   setisCongratsOpen(true);
    // } else {
    // //   window.history.back();
    // }
  };
  return (
    <M3View className="flex-1">
      <Appbar title="Add Streaks" />

      <View className="flex flex-row items-center  mt-4 justify-between px-2">
        {steps.map((step) => (
          <View key={step.id}>
            {/* Step Label */}
            <M3Text
              className={`my-2 text-lg font-medium transition-colors duration-300  px-4
                  ${currentStep >= step.id ? "" : " text-slate-500"}`}
            >
              {step.name}
            </M3Text>
          </View>
        ))}
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
    </M3View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});

// function RouteComponent() {
//   return (
//     <div className="max-w-4xl mx-auto  rounded-lg shadow-md">
//       {/* --- Top Horizontal Stepper --- */}
//       <div className="flex items-center justify-between mb-8 relative">
//         {/* Background Line (Gray) */}
//         <div className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded"></div>

//         {/* Dynamic Progress Line */}
//         <div
//           className="absolute left-0  top-0 h-1 bg-primary  transition-all duration-300 ease-in-out rounded"
//           style={{
//             width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
//           }}
//         ></div>

//         {steps.map((step) => (
//           <div key={step.id} className="flex flex-col items-center mt-4">
//             {/* Step Label */}
//             <span
//               className={`mt-2 text-sm font-medium transition-colors duration-300
//                   ${
//                     currentStep >= step.id ? "text-gray-200" : "text-gray-400"
//                   }`}
//             >
//               {step.name}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* CONGRATS DIALOG WHEN NEW STREAK CREATED SUCCESSFULLY */}
//       <AlertDialog open={isCongratsOpen}>
//         <AlertDialogContent size="sm">
//           <AlertDialogHeader>
//             <AlertDialogMedia>
//               <PartyPopper className="text-primary" />
//             </AlertDialogMedia>
//             <AlertDialogTitle>Congrats!</AlertDialogTitle>
//             <AlertDialogDescription>
//               Congratulations on your first streak! Consider adding this site to
//               your Home Screen to maintain your streak daily — easy and
//               hassle-free.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel
//               onClick={() => {
//                 setisCongratsOpen(false);
//                 window.history.back();
//               }}
//             >
//               May be Later
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 setisCongratsOpen(false);
//                 window.history.back();
//               }}
//             >
//               Sure
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }
