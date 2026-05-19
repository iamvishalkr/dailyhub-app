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
import { useThemeStore } from "@/zustand/theme";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { M3Input } from "../ui/M3Input";
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
    <View >
      <Card mode="outlined">
          <Card.Title title="What do you want to track?"></Card.Title>
        <Card.Content>
          <View className="min-h-46">
            <View className="">
              <View>
                <Text variant="titleMedium" className="mb-3">Title</Text>
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
                <Text style={{color:"red", marginTop:8}} >{errorMsg}</Text>
              </View>

              <Text variant="titleSmall" className="text-gray-600 mb-3">Examples:</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => {
                    setformData({ ...formData, title: "No Fast Food" });
                  }}
                >
                  <Text variant="labelSmall" style={{borderColor: theme === "dark" ? "#ffffff":"#000000"}} className="py-1 px-3 border rounded-full cursor-pointer">
                    No Fast Food
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setformData({ ...formData, title: "Read 10 Pages" });
                  }}
                >
                  <Text variant="labelSmall" style={{borderColor: theme === "dark" ? "#ffffff":"#000000"}} className="py-1 px-3 border rounded-full cursor-pointer">
                  Read 10 Pages
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <Button disabled={true} mode={"outlined"} >Previous</Button>

          <Button mode="contained" onPress={handleNext}>Next</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default TitleStep;
