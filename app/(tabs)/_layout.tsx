import { Tabs } from "expo-router";
import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: 64 + insets.bottom,
        }, //String(surfaceContainer)
        tabBarActiveTintColor: theme.colors.primary, //String(primary) Colors[colorScheme].tint,
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
    </Tabs>
  );
}
