import { useThemeStore } from "@/zustand/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

// Extract the props directly from the icon component
type ThemedIconProps = React.ComponentProps<typeof MaterialCommunityIcons>;

export const ThemedIcon = ({
  name,
  size = 24,
  style,
  ...props
}: ThemedIconProps) => {
  const { theme } = useThemeStore();
  const iconColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={iconColor}
      style={style}
      {...props}
    />
  );
};
