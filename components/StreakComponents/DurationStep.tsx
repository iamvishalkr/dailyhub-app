import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
// import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { M3Text } from "../ui/M3Text";
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
    <View className="px-2">
      <Card>
        <CardHeader>
          <CardTitle>Select Your Goal</CardTitle>
          <CardDescription></CardDescription>
          {/* content */}

          <ScrollView style={{ height: 400}}>
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
                    style={{borderColor:formData.totalCount === item.days ? "green":"grey", borderWidth:2}}
                  >
                    <CardHeader>
                      <CardTitle>
                        Commit for {item.days.toString()} Days
                      </CardTitle>
                      <View className=" flex-row items-center gap-2 mt-3">
                        <ThemedIcon
                          name="trophy"
                          size={20}
                        />
                        <M3Text>{item.trophy} Trophy</M3Text>
                      </View>
                    </CardHeader>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </CardHeader>
        <CardFooter style={{ justifyContent: "space-between" }}>
          <Button onPress={handlePrev} mode={"outline"} title="Previous" />

          <Button onPress={handleAddStreak} title="Finish" />
        </CardFooter>
      </Card>
    </View>
  );
};

export default DurationStep;
