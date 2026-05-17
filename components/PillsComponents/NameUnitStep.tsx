import { useState } from "react";
import { Button, Card } from "react-native-paper";
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
import { Text } from "react-native-paper";
import { M3Input } from "../ui/M3Input";
import type { stepsPropsType } from "./propType";

const NameUnitStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const [errorMsg, seterrorMsg] = useState("");
  const { theme } = useThemeStore();

  const handleNext = () => {
    if (!formData.name.trim()) {
      seterrorMsg("Please enter the medication name");
      return;
    }
    // if (!formData.unit) {
    //   seterrorMsg("Please select a unit");
    //   return;
    // }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <View className="flex-1">
      <Card mode="outlined">
        <Card.Title title="What medication do you want to track?"></Card.Title>
        <Card.Content>
          <View>
            <View>
              <Text variant="titleMedium" className="mb-2">
                Name
              </Text>
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
            <Text variant="titleSmall" style={{ color: "red", marginTop: 4 }}>
              {errorMsg}
            </Text>
            <View className="mt-4">
              <Text>Unit</Text>
              <View>
                <Picker
                  dropdownIconColor={theme === "dark" ? "#ffffff" : "#000000"}
                  style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
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
          </View>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <Button disabled={true} mode={"outlined"}>
            Previous
          </Button>

          <Button mode="contained" onPress={handleNext}>
            Next Step
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default NameUnitStep;
