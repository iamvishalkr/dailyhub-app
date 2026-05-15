import { Tabs } from "expo-router";
import React from "react";

import { useThemeStore } from "@/zustand/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCSSVariable } from "uniwind";

export default function TabLayout() {
  const { theme } = useThemeStore();
  const primary =
    theme === "light"
      ? useCSSVariable("--color-primary")
      : useCSSVariable("--color-dark-primary");
  const surfaceContainer =
    theme === "light"
      ? useCSSVariable("--color-surface-container")
      : useCSSVariable("--color-dark-surface-container");
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: String(surfaceContainer) },
        tabBarActiveTintColor: String(primary), //Colors[colorScheme].tint,
        // headerTitleStyle: {
        //   fontFamily: "SpaceMono",
        //   color: "#fff",
        // },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        // tabBarStyle: { height: 110 },
        // headerStyle: { backgroundColor: "teal" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={28} name="fire" />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              size={28}
              name="checkbox-marked"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              size={28}
              name="file-document-edit"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pills"
        options={{
          title: "Pills",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={28} name="pill" />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="index"
        options={{
          title: "DailyHub",
          tabBarLabel: "Productivity",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={28} name="fire" />
          ),
        }}
      />
      <Tabs.Screen
        name="utilities"
        options={{
          title: "Utilities",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={28} name="briefcase" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color={color} size={28} name="cog" />
          ),
        }}
      /> */}
    </Tabs>
  );
}
