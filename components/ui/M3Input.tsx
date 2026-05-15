import { useThemeStore } from "@/zustand/theme";
import React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { useCSSVariable } from "uniwind";

export function M3Input({ className, style, ...props }: TextInputProps) {
  const { theme } = useThemeStore();
  const ss =
    theme === "dark"
      ? useCSSVariable("--color-dark-secondary-container")
      : useCSSVariable("--color-secondary-container");
  return (
    <TextInput
      placeholderTextColor={String(ss)}
      className={`${theme} border-on-background text-on-background ${
        className ?? ""
      }`}
      style={[{ fontFamily: "SpaceMono" }, style]}
      {...props}
    />
  );
}
