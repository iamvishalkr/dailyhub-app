import { Button } from "@/components/ui/Button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { View } from "react-native";
import { M3Input } from "../ui/M3Input";
import { M3Text } from "../ui/M3Text";
import type { stepsPropsType } from "./propType";

const ResonStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };
  return (
    <View className="px-2">
      <Card>
        <CardHeader>
          <CardTitle>Why do you want to track?</CardTitle>
          <CardDescription></CardDescription>
          {/* content */}
          <View className="">
            <M3Text className="mb-4">Why {`(Optional)`}</M3Text>
            <M3Input
              className="border-b "
              placeholder="Remind Your Future Self"
              value={formData.reason}
              onChangeText={(value) => {
                setformData({ ...formData, reason: value });
              }}
              //   onKeyDown={(e) => {
              //     if (e.code === "Enter" || e.key === "Enter") {
              //       handleNext();
              //     }
              //   }}
            />
          </View>
        </CardHeader>
        <CardFooter style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outline"} title="Previous" />

          <Button onPress={handleNext} title="Next Step" />
        </CardFooter>
      </Card>
    </View>
  );
};

export default ResonStep;
