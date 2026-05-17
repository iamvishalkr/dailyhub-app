import { useState } from "react";
import {
    Card,
} from "react-native-paper";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { M3Input } from "../ui/M3Input";
import type { stepsPropsType } from "./propType";

const InventoryStep = ({
  setCurrentStep,
  formData,
  setformData,
  handleAddPill,
}: stepsPropsType) => {
  const [errorMsg, seterrorMsg] = useState("");

  const handleNext = () => {
    if (formData.inventory < 0) {
      seterrorMsg("Inventory cannot be negative.");
      return;
    }
    if (handleAddPill) {
      handleAddPill();
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <View className="">
      <Card>
        <Card.Content>
          <Card.Title title="Medication Inventory" ></Card.Title>
          <View className="">
            <View>
              <Text>
                Current total amount (in {formData.unit || "units"})
              </Text>
              <M3Input
              className="border-b"
                inputMode="numeric"
                value={
                  formData.inventory === undefined
                    ? "30"
                    : String(formData.inventory)
                }
                onChangeText={(value) => {
                  seterrorMsg("");
                  setformData({
                    ...formData,
                    inventory: Number(value),
                  });
                }}
                placeholder="e.g. 30"
              />
            </View>
            <Text className="text-red-700 text-sm mt-2">{errorMsg}</Text>
          </View>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outlined"}>
            Previous
          </Button>

          <Button mode="contained" onPress={handleNext}>Finish</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default InventoryStep;
