import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { M3Input } from "../ui/M3Input";
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
    <View>
      <Card mode="outlined">
        <Card.Title title="Why do you want to track?"></Card.Title>
        <Card.Content>
          {/* content */}
          <View className="">
            <Text className="mb-4">Why {`(Optional)`}</Text>
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
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outlined"}>
            Previous
          </Button>

          <Button mode={"contained"} onPress={handleNext}>
            Next
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ResonStep;
