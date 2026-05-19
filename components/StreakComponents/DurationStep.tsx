import { Card } from "react-native-paper";
// import { Trophy } from "lucide-react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { ThemedIcon } from "../ui/ThemedIcon";
import { trophyData } from "./constant";
import type { stepsPropsType } from "./propType";

const DurationStep = ({
  setCurrentStep,
  formData,
  setformData,
  handleAddStreak,
}: stepsPropsType & { handleAddStreak: () => void }) => {
  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <View>
      <Card mode="outlined">
        <Card.Title title="Select Your Goal"></Card.Title>
        <Card.Content>
          {/* content */}

          <ScrollView style={{ height: 400 }}>
            <View className="gap-4">
              {trophyData.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setformData({ ...formData, totalCount: item.days });
                  }}
                  //   className={`w-full overflow-hidden bg-secondary border-1 ${
                  //     formData.totalCount === item.days ? "border-black" : ""
                  //   }`}
                >
                  <Card
                  mode="outlined"
                    style={{
                      borderColor:
                        formData.totalCount === item.days ? "teal" : "grey",
                    }}
                  >
                    <Card.Title
                      title={`Commit for ${item.days.toString()} Days`}
                    ></Card.Title>
                    <Card.Content>
                      <View className="flex-row items-center gap-2 mt-3">
                        <ThemedIcon name="trophy" size={20} />
                        <Text variant="titleSmall">{item.trophy} Trophy</Text>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outlined"}>
            Previous
          </Button>

          <Button
            mode="contained"
            disabled={formData.totalCount <= 0}
            onPress={handleAddStreak}
          >
            Finish
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default DurationStep;
