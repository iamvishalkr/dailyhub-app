import EmptyState from "@/components/EmptyState";
import StreakCards from "@/components/StreakComponents/StreakCards";
import { useStreakStore } from "@/zustand/streak.store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button, IconButton, Surface } from "react-native-paper";

import Appbar from "@/components/Appbar";
import { useThemeStore } from "@/zustand/theme";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StreakScreen = () => {
  const { streaksList } = useStreakStore();
  const { theme, toggleTheme } = useThemeStore();
  const router = useRouter();

  return (
    <Surface style={{ flex: 1 }}>
      <Appbar
        title={"DailyHub"}
        right={
          <View className="flex-row items-center">
            <Button
              icon="plus"
              mode="contained"
              onPress={() => {
                router.push("/streaks/add");
              }}
            >
              Add
            </Button>
            <IconButton
              mode="contained-tonal"
              onPress={toggleTheme}
              icon={({ color, size }) => {
                if (theme === "dark") {
                  return (
                    <MaterialIcons
                      name="light-mode"
                      color={color}
                      size={size}
                    />
                  );
                }
                return (
                  <MaterialIcons name="dark-mode" color={color} size={size} />
                );
              }}
              size={24}
            />
          </View>
        }
      />

      <View style={{ flex: 1 }}>
        {streaksList.length <= 0 ? (
          <View className="p-4">
            <EmptyState
              Logo={"fire"}
              title="No Streak tracked yet"
              subtitle="Start Your First Streak Now"
              btnText="Create Streaks"
              onPress={() => {
                router.push("/streaks/add");
              }}
            />
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1, height: "100%" }} edges={["bottom"]}>
            <FlatList
              data={streaksList}
              renderItem={({ item }) => <StreakCards data={item} />}
            />
          </SafeAreaView>
        )}
      </View>
    </Surface>
  );
};

export default StreakScreen;

const styles = StyleSheet.create({});
