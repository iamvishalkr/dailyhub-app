// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { useThemeStore } from "@/zustand/theme";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { M3Input } from "../ui/M3Input";
import { M3Text } from "../ui/M3Text";
import type { stepsPropsType } from "./propType";

const TitleStep = ({
  setCurrentStep,
  formData,
  setformData,
}: stepsPropsType) => {
  const [errorMsg, seterrorMsg] = useState("");
  const handleNext = () => {
    if (!formData.title.trim()) {
      seterrorMsg("Please fill the title");
      return false;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const {theme} = useThemeStore()

  return (
    <View className="px-2 ">
      <Card>
        <CardHeader>
          <CardTitle>What do you want to track?</CardTitle>
          <View className="min-h-46">
            <View className="mt-2">
              <View>
                <M3Text>Title</M3Text>
                <M3Input
                  className={`border-b`}
                  value={formData.title}
                  onChangeText={(value) => {
                    seterrorMsg("");
                    setformData({ ...formData, title: value });
                  }}
                  //   onKeyDown={(e) => {
                  //     if (e.code === "Enter" || e.key === "Enter") {
                  //       if (!formData.title.trim()) {
                  //         return false;
                  //       }
                  //       handleNext();
                  //     }
                  //   }}
                  placeholder="Streak Title"
                />
                <M3Text className="text-red-700 text-sm">{errorMsg}</M3Text>
              </View>

              <M3Text className="text-gray-600 my-4">Examples:</M3Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => {
                    setformData({ ...formData, title: "No Fast Food" });
                  }}
                >
                  <M3Text className="py-1 px-3 border rounded-full cursor-pointer">
                    No Fast Food
                  </M3Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setformData({ ...formData, title: "Read 10 Pages" });
                  }}
                >
                  <M3Text className="py-1 px-3 border rounded-full cursor-pointer">
                    Read 10 Pages
                  </M3Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CardHeader>
        <CardFooter style={{justifyContent:"space-between"}}>
          <Button disabled={true} mode={"outline"} title="Previous"></Button>

          <Button onPress={handleNext} title="Next Step"></Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default TitleStep;
