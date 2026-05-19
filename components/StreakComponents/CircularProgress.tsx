import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  color?: string;
}

const CircularProgress = ({
  value,
  size = 120,
  strokeWidth = 10,
  children,
  color = "#3B82F6", // theme.colors.primary
}: CircularProgressProps) => {
  const [progress, setProgress] = useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const normalizedValue = Math.min(100, Math.max(0, progress));

  const strokeDashoffset =
    circumference - (normalizedValue / 100) * circumference;

  return (
    <View
      className="relative items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: [{ rotate: "-90deg" }],
        }}
      >
        {/* Background Circle */}
        <Circle
          stroke="#E5E7EB"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <Circle
          stroke={colors.primary}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>

      {/* Center Content */}
      <View className="absolute items-center justify-center">
        {children}
      </View>
    </View>
  );
};

export default CircularProgress;