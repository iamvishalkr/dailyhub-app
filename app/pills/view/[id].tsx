import Appbar from "@/components/Appbar";
import DailyView from "@/components/PillsComponents/view/DailyView";
import IntervalView from "@/components/PillsComponents/view/IntervalView";
import SpecificView from "@/components/PillsComponents/view/SpecificView";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import type { DoseLog, PillsType } from "@/types";
import { usePillStore } from "@/zustand/pills.store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewPillsScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { pillsList } = usePillStore();
  const [targetPill, setTargetPills] = useState({
    name: "Loading...",
    id: 0,
    logs: [] as DoseLog[],
  } as PillsType);

  useEffect(() => {
    const targetPill = pillsList.find((item) => item.id === Number(id));
    if (targetPill) {
      setTargetPills(targetPill);
    }
  }, [pillsList]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <M3View className="flex-1">
        <Appbar title={targetPill.name} />
        <View className="flex-1 px-2">
          <M3Text className="text-sm my-3">{`(Mark pills already taken to track progress)`}</M3Text>
          {/* <View className="">
          <View className="flex items-center gap-2">
            <Button
              mode="link"
              onPress={() => {
                //go back
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <View className="h4 mb-0">
              {targetPill.name} -{" "}
              <span className="text-gray-300 text-sm">{`(Mark pills already taken to track progress)`}</span>
            </View>
          </View>
        </View> */}
          {/* keep above for debug */}

          {targetPill.frequency && targetPill.frequency.type === "daily" && (
            <DailyView targetPill={targetPill} />
          )}

          {targetPill.frequency && targetPill.frequency.type === "interval" && (
            <IntervalView targetPill={targetPill} />
          )}

          {targetPill.frequency && targetPill.frequency.type === "specific" && (
            <SpecificView targetPill={targetPill} />
          )}
        </View>
      </M3View>
    </SafeAreaView>
  );
};

export default ViewPillsScreen;

const styles = StyleSheet.create({});
