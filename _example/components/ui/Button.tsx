import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

type ButtonMode = "filled" | "outline" | "link";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  mode?: ButtonMode;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  mode = "filled",
  style,
  textStyle,
  disabled = false,
  leadingIcon,
  trailingIcon,
}) => {
  const containerStyles = [
    styles.base,
    mode === "filled" && styles.filled,
    mode === "outline" && styles.outline,
    mode === "link" && styles.linkContainer,
    disabled && styles.disabled,
    style,
  ];

  const labelStyles = [
    styles.text,
    mode === "filled" && styles.filledText,
    mode === "outline" && styles.outlineText,
    mode === "link" && styles.linkText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={containerStyles}
    >
      {leadingIcon && <View style={styles.iconLeft}>{leadingIcon}</View>}

      <Text style={labelStyles}>{title}</Text>

      {trailingIcon && <View style={styles.iconRight}>{trailingIcon}</View>}
    </TouchableOpacity>
  );
};

const PRIMARY = "#000000";
const DISABLED = "#9ca3af";

const styles = StyleSheet.create({
  base: {
    flexDirection: "row", // always row
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  filled: {
    backgroundColor: PRIMARY,
  },

  outline: {
    borderWidth: 1,
    borderColor: PRIMARY,
    backgroundColor: "transparent",
  },

  linkContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
  },

  filledText: {
    color: "#ffffff",
  },

  outlineText: {
    color: PRIMARY,
  },

  linkText: {
    color: PRIMARY,
    textDecorationLine: "underline",
  },

  disabled: {
    backgroundColor: DISABLED,
    borderColor: DISABLED,
  },

  disabledText: {
    color: "#e5e7eb",
  },

  iconLeft: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  iconRight: {
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;