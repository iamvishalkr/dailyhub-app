import { trophyData } from "@/components/StreakComponents/constant";
// import { Card } from "@/components/ui/card";
import type { StreakType } from "@/types";
// import { createFileRoute } from "@tanstack/react-router";
// import { ArrowLeft, CalendarClock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import flameLogo from "@/assets/flame.png";
import { useStreakStore } from "@/zustand/streak.store";
// import { toast } from "sonner";

import Appbar from "@/components/Appbar";
import { M3Text } from "@/components/ui/M3Text";
import { M3View } from "@/components/ui/M3View";
import { ThemedIcon } from "@/components/ui/ThemedIcon";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewPage = () => {
  // Access typed search params
  const { id }: { id: string } = useLocalSearchParams();
  // const params = useParams();
  const { streaksList, toggleCompleteToday } = useStreakStore();
  const [targetStreak, setTargetStreak] = useState({
    id: 0,
    title: "",
    reason: "",
    startDateMs: 0,
    totalCount: 0,
    completedDates: [],
  } as StreakType);

  useEffect(() => {
    const targetStreak = streaksList.find((item) => item.id === Number(id));
    if (targetStreak) {
      setTargetStreak(targetStreak);
    }
  }, [streaksList]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <M3View style={{ flex: 1 }}>
        <Appbar title={targetStreak.title} />

        <View style={{ flex: 1, paddingHorizontal: 14 }}>
          <View className="mt-2">
            <View className="header flex-row items-center gap-4">
              <ThemedIcon
                name="calendar-clock-outline"
                size={28}
                style={{ textAlign: "center", marginTop: 10 }}
              />
              <M3Text>Streak View</M3Text>
            </View>
          </View>

          <View style={{ flex: 1 }} className="my-4">
            <WeekGrid
              startDateMs={targetStreak.startDateMs}
              totalCount={targetStreak.totalCount}
              completedDates={targetStreak.completedDates}
              onClickItem={(date) => {
                toggleCompleteToday(targetStreak.id, date.getTime());
                // toast.success("Streak Updated!");
              }}
            />
          </View>

          {/* TROPHY SECTION */}
          <View>
            <View className="mt-4">
              <View className="header flex-row items-center gap-4">
                <ThemedIcon
                  name="trophy"
                  size={28}
                  style={{ textAlign: "center", marginTop: 10 }}
                />
                <M3Text>Trophy: {targetStreak.completedDates.length}</M3Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mt-2  gap-4 pb-4">
              <ScrollView horizontal={true}>
                {trophyData.map((item, i) => (
                  <View key={i} className="p-1">
                    <M3View
                    className={`w-36 h-36 flex items-center justify-center gap-0 border border-on-background rounded-xl shrink-0  ${
                      targetStreak.completedDates.length < item.days
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <ThemedIcon
                      name="fire"
                      size={28}
                      style={{ textAlign: "center", marginTop: 10 }}
                    />
                    <M3Text>{item.trophy}</M3Text>
                    <M3Text>{item.days} Days</M3Text>
                  </M3View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </M3View>
    </SafeAreaView>
  );
};

type Props = {
  startDateMs: number;
  totalCount: number;
  completedDates: number[]; // timestamps in ms
  onClickItem?: (date: Date) => void;
};

const normalizeDate = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const WeekGrid: React.FC<Props> = ({
  startDateMs,
  totalCount,
  completedDates,
  onClickItem,
}) => {
  const normalizedCompleted = new Set(
    completedDates.map((ts) => normalizeDate(new Date(ts)))
  );

  const startDate = new Date(startDateMs);

  const days = Array.from({ length: totalCount }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);

    const normalized = normalizeDate(d);

    return {
      date: d,
      label: formatDate(d),
      isCompleted: normalizedCompleted.has(normalized),
    };
  });

  return (
    <View className="">
      <FlatList
        numColumns={2}
        data={days}
        renderItem={({ item: day }) => (
          <Pressable
            className="w-1/2 p-1"
            onPress={() => {
              if (onClickItem) {
                onClickItem(day.date);
              }
            }}
          >
            <M3Text
              className={`p-3 border border-on-background rounded text-center text-sm
              ${day.isCompleted ? "bg-teal-600 text-white" : ""}`}
            >
              {day.label}
            </M3Text>
          </Pressable>
        )}
        keyExtractor={(_, i) => String(i)}
      />
      {/* {days.map((day, index) => (
        // <Pressable
        //   key={index}
        //   onPress={() => {
        //     if (onClickItem) {
        //       onClickItem(day.date);
        //     }
        //   }}
        // >
        //   <Text
        //     className={`p-3 border rounded text-center text-sm
        //       ${day.isCompleted ? "bg-primary" : ""}`}
        //   >
        //     {day.label}
        //   </Text>
        // </Pressable>
      ))} */}
    </View>
  );
};

export default ViewPage;

const styles = StyleSheet.create({});
