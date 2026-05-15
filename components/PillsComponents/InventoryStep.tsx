import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { useState } from "react";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { View } from "react-native";
import { M3Input } from "../ui/M3Input";
import { M3Text } from "../ui/M3Text";
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
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Medication Inventory</CardTitle>
          <CardDescription></CardDescription>
          <View className="">
            <View>
              <M3Text>
                Current total amount (in {formData.unit || "units"})
              </M3Text>
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
            <M3Text className="text-red-700 text-sm mt-2">{errorMsg}</M3Text>
          </View>
        </CardHeader>
        <CardFooter style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outline"} title="Previous">
            
          </Button>

          <Button onPress={handleNext} title="Finish"></Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default InventoryStep;
