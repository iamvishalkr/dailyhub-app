import { Button } from "@/components/ui/Button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { pillsUnits } from "@/zustand/pills.store";
import { useThemeStore } from "@/zustand/theme";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import { M3Input } from "../ui/M3Input";
import { M3Text } from "../ui/M3Text";
import type { stepsPropsType } from "./propType";

const NameUnitStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const [errorMsg, seterrorMsg] = useState("");
  const {theme} = useThemeStore()

  const handleNext = () => {
    if (!formData.name.trim()) {
      seterrorMsg("Please enter the medication name");
      return;
    }
    if (!formData.unit) {
      seterrorMsg("Please select a unit");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <View className="flex-1">
      <Card >
        <CardHeader>
          <CardTitle>What medication do you want to track?</CardTitle>
          <CardDescription></CardDescription>
          <View className="mt-2 text-left">
            <View>
              <M3Text>Name</M3Text>
              <M3Input
              className="border-b"
                value={formData.name}
                onChangeText={(value) => {
                  seterrorMsg("");
                  setformData({ ...formData, name: value });
                }}
                placeholder="e.g. Vitamin C"
              />
            </View>
            <View className="mt-4">
              <M3Text>Unit</M3Text>
              <View>
                <Picker
                dropdownIconColor={
                    theme === "dark" ? "#ffffff" : "#000000"
                  }
                style={{color:theme === "dark" ? "#ffffff":"#000000"}}
                  selectedValue={formData.unit}
                  onValueChange={(itemValue, _itemIndex) => {
                    seterrorMsg("");
                    setformData({ ...formData, unit: itemValue });
                  }}
                >
                  {pillsUnits.map((u) => (
                    <Picker.Item key={u} label={u} value={u} />
                  ))}
                </Picker>
              </View>
            </View>
            <M3Text className="text-red-700 text-sm mt-2">{errorMsg}</M3Text>
          </View>
        </CardHeader>
        <CardFooter style={{ justifyContent: "space-between" }}>
          <Button disabled={true} mode={"outline"} title="Previous"></Button>

          <Button onPress={handleNext} title="Next Step"></Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default NameUnitStep;
