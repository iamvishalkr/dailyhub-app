import { Tabs } from "expo-router";
import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: "teal", //Colors[colorScheme].tint,
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
      />
    </Tabs>
  );
}
