import FrequencyStep from "@/components/PillsComponents/FrequencyStep";
import InventoryStep from "@/components/PillsComponents/InventoryStep";
import NameUnitStep from "@/components/PillsComponents/NameUnitStep";
import TimeDoseStep from "@/components/PillsComponents/TimeDoseStep";
import type { PillsType } from "@/types";
import { pillsUnits, usePillStore } from "@/zustand/pills.store";
import { useState } from "react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogMedia,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { PricingDataLimits } from "@/constants";
import { useUserStore } from "@/zustand/user.store";

import Appbar from "@/components/Appbar";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import React from "react";
import { StyleSheet, View } from "react-native";

const AddScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setformData] = useState({
    id: 0,
    name: "",
    unit: pillsUnits[0],
    logs: [],
    frequency: { type: "daily", shifts: [] },
    startDate: 0,
    inventory: 30,
  } as PillsType);
  const { pillsList, addPill } = usePillStore();
  const { user } = useUserStore();

  const steps = [
    {
      id: 1,
      name: "Medication",
    },
    {
      id: 2,
      name: "Frequency",
    },
    {
      id: 3,
      name: "Dose & Time",
    },
    {
      id: 4,
      name: "Inventory",
    },
  ];

  const stepTask = ["Medication", "Frequency", "Dose & Time", "Inventory"];

  const handleAddPill = () => {
    if (pillsList.length >= 20 && !user) {
      //PricingDataLimits
      //   toast.error("Limit exceeded!");
      return false;
    }
    addPill({
      ...formData,
      id: formData.startDate !== 0 ? formData.startDate : Date.now(),
    });
    // toast.success("New Medication Tracked!");
    if (pillsList.length <= 0) {
      //   setisCongratsOpen(true);
    } else {
      //   window.history.back();
    }
  };

  return (
    <M3View className="flex-1">
      <Appbar title="Add Pills" />
      {/* --- Top Horizontal Stepper --- */}
      <View className="px-4 flex-1">
        {/* Background Line (Gray) */}
        {/* <View className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded"></View> */}

        {/* Dynamic Progress Line */}
        {/* <View
            className="absolute left-0 top-0 h-1 bg-primary transition-all duration-300 ease-in-out rounded"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></View> */}
        <View className="mt-4 mb-2">
          <M3Text className="text-xl">
            {`Step : ${currentStep}/${stepTask.length} - ${
              stepTask[currentStep - 1]
            }`}
          </M3Text>
        </View>

        
      

      {/* --- Step Content --- */}

      {currentStep === 1 && (
        <NameUnitStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
        />
      )}
      {currentStep === 2 && (
        <FrequencyStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
        />
      )}
      {currentStep === 3 && (
        <TimeDoseStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
        />
      )}
      {currentStep === 4 && (
        <InventoryStep
          setCurrentStep={setCurrentStep}
          formData={formData}
          setformData={setformData}
          handleAddPill={handleAddPill}
        />
      )}
      </View>
    </M3View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});
