import { useThemeStore } from "@/zustand/theme";
import React from "react";
import type { TextStyle, ViewStyle } from "react-native";
import { Pressable, View } from "react-native";
import { M3Text } from "./M3Text";

type ButtonMode = "filled" | "outline" | "link";

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  mode?: ButtonMode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button({
  title = "Btn",
  onPress,
  mode = "filled",
  style,
  textStyle,
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
}: ButtonProps) {
  const [pressed, setPressed] = React.useState(false);

  const { theme } = useThemeStore();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={[
        theme,
        "flex-row items-center justify-center self-start",
        "rounded-full overflow-hidden",
        "min-h-10 min-w-12",

        // filled
        mode === "filled" && !disabled && "bg-primary px-6 py-2.5",
        mode === "filled" && disabled && "bg-on-surface/[.12] px-6 py-2.5",

        // outline
        mode === "outline" &&
          !disabled &&
          "bg-transparent border border-outline px-6 py-2.5",
        mode === "outline" &&
          disabled &&
          "bg-transparent border border-on-surface/[.12] px-6 py-2.5",

        // link
        mode === "link" && "bg-transparent px-3 py-2.5",

        // press state layer — outline/link share same tint
        pressed && mode === "filled" && "bg-primary/[.12]",
        pressed && mode !== "filled" && "bg-primary/[.12]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {leadingIcon && <View className="mx-1">{leadingIcon}</View>}

      {children ? (
        children
      ) : (
        <M3Text
          numberOfLines={1}
          className={[
            theme,
            "text-sm font-medium tracking-wide",

            mode === "filled" && !disabled && "text-on-primary",
            mode === "filled" && disabled && "text-on-surface/[.38]",
            mode !== "filled" && !disabled && "text-primary",
            mode !== "filled" && disabled && "text-on-surface/[.38]",
          ]
            .filter(Boolean)
            .join(" ")}
          style={textStyle}
        >
          {title}
        </M3Text>
      )}

      {trailingIcon && <View className="mx-1">{trailingIcon}</View>}
    </Pressable>
  );
}
